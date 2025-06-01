import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import CalendarHeader from './CalendarHeader';

import { StyleSheet, View, Text } from 'react-native';

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
            color: '#5013C0',
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
            backgroundColor: 'rgba(122, 13, 18, 0.30)',
            borderRadius: 24,
          },
          text: {
            color: '#FFA59C',
          },
        },
      };
    }
  }

  return marked;
};

 const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const CalendarPicker = ({ dateData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (offset) => {
    const newDate = dayjs(currentDate).add(offset, 'month').toDate();
    setCurrentDate(newDate);
  };

  const markedDates = getMarkedDates(dateData); // keep your original logic here

  return (
    <LinearGradient colors={['#1C0743', '#090215']} style={styles.container}>
      <CalendarHeader currentMonth={currentDate} onMonthChange={changeMonth} />

      {/* Custom weekday header */}
      <View style={styles.weekdayContainer}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>

      <Calendar
        hideArrows
        hideDayNames // hide default weekday header
        firstDay={1} // start week on Monday
        current={dayjs(currentDate).format('YYYY-MM-DD')}
        markingType="custom"
        markedDates={markedDates}
        renderHeader={() => <></>}
        disableArrowLeft
        disableArrowRight
        theme={{
          calendarBackground: 'transparent',
          textDayFontWeight: '400',
          textDayFontSize: 16,
          dayTextColor: '#484646',
          todayBackgroundColor: '#D3C4EF',
          todayTextColor: '#5013C0',
          selectedDayTextColor: '#B095E3',
        }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  weekdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  weekdayText: {
    color: '#A0A0A0',
    fontSize: 16,
    fontWeight: '700',
    width: 32,
    textAlign: 'center',
  },
});

export default CalendarPicker;