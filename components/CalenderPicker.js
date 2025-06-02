import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const getMarkedDates = data => {
  const marked = {};
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    const prev = data[i - 1];
    const next = data[i + 1];
    const isStart = !prev || prev.value !== current.value;
    const isEnd = !next || next.value !== current.value;
    console.log(isStart, 'startt', isEnd, 'enndddd');
    marked[current.date] = {
      startingDay: isStart,
      endingDay: isEnd,
      color: current.value ? 'rgba(16, 104, 79, 0.60)' : 'red',
      textColor: 'white',
    };
  }
  return marked;
};

const CalendarPicker = ({dateData}) => {
  const markedDates = getMarkedDates(dateData);

  return (
    <View style={styles.container}>
      <Calendar
        markingType={'period'}
        markedDates={markedDates}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayTextColor: '#B095E3',
          todayTextColor: '#00adf5',
          arrowColor: 'black',
          textDayFontWeight: '400',
          textDayFontSize: 16,
          textMonthFontWeight: 'bold',
          textMonthFontSize: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default CalendarPicker;
