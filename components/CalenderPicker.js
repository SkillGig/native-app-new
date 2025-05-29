import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import CalendarHeader from './CalendarHeader';

const getMarkedDates = (data) => {
  const marked = {};
  const today = dayjs().format('YYYY-MM-DD');

  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    const prev = data[i - 1];
    const next = data[i + 1];
    const isStart = !prev || prev.value !== current.value;
    const isEnd = !next || next.value !== current.value;

    const isToday = current.date === today;

    if (isToday) {
      marked[current.date] = {
        customStyles: {
          container: {
            backgroundColor: '#D3C4EF',
            borderRadius: 24,
            borderColor: '#5013C0',
            borderWidth: 2,
          },
          text: {
            color: '#1C0743',
            fontWeight: 'bold',
          },
        },
      };
    } else if (current.value) {
      marked[current.date] = {
        customStyles: {
          container: {
            backgroundColor: 'rgba(16, 104, 79, 0.60)',
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderLeftWidth: isStart ? 2 : 0,
            borderRightWidth: isEnd ? 2 : 0,
            borderColor: 'rgba(0, 158, 76, 0.60)',
            borderTopLeftRadius: isStart ? 24 : 0,
            borderBottomLeftRadius: isStart ? 24 : 0,
            borderTopRightRadius: isEnd ? 24 : 0,
            borderBottomRightRadius: isEnd ? 24 : 0,
          },
          text: {
            color: 'white',
          },
        },
      };
    } else {
      marked[current.date] = {
        customStyles: {
          container: {
            backgroundColor: 'red',
            borderRadius: 24,
          },
          text: {
            color: 'white',
          },
        },
      };
    }
  }

  return marked;
};

const CalendarPicker = ({ dateData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (offset) => {
    const newDate = dayjs(currentDate).add(offset, 'month').toDate();
    setCurrentDate(newDate);
  };

  const markedDates = getMarkedDates(dateData);

  return (
    <LinearGradient colors={['#1C0743', '#090215']} style={styles.container}>
      <CalendarHeader currentMonth={currentDate} onMonthChange={changeMonth} />
      <Calendar
      hideArrows={true}
        current={dayjs(currentDate).format('YYYY-MM-DD')}
        markingType="custom"
        markedDates={markedDates}
        renderHeader={() => <></>} // hide built-in header
        disableArrowLeft
        disableArrowRight
        theme={{
          calendarBackground: 'transparent',
          textSectionTitleColor: '#b6c1cd',
          selectedDayTextColor: '#B095E3',
          textDayFontWeight: '400',
          textDayFontSize: 16,
          textMonthFontWeight: 'bold',
          textMonthFontSize: 20,
          monthTextColor: 'white',
          dayTextColor: 'white',
        }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 16,
  },
});

export default CalendarPicker;
