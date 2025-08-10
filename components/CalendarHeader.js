import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import images from '../assets/images';
import { normalizeHeight, normalizeWidth } from './Responsivescreen';
import dayjs from 'dayjs';

const CalendarHeader = ({ currentMonth, onMonthChange }) => {
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  const today = dayjs();
  const currentMonthJs = dayjs(currentMonth);

  const canGoNext = currentMonthJs.isBefore(today.endOf('month'), 'month');

  const handleMonthChange = (offset) => {
    if (offset === 1 && !canGoNext) return;
    onMonthChange(offset);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => handleMonthChange(-1)}>
        <Image
          source={images.LEFTARROW}
          style={{
            height: normalizeHeight(24),
            width: normalizeWidth(24),
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      <Text style={styles.monthText}>{`${monthName} ${year}`}</Text>
      <TouchableOpacity onPress={() => handleMonthChange(1)} disabled={!canGoNext}>
  <Image
    source={images.RIGHTARROW}
    style={{
      height: normalizeHeight(24),
      width: normalizeWidth(24),
      resizeMode: 'contain',
      opacity: canGoNext ? 1 : 0.3, // visually indicate disabled
    }}
  />
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C0743',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
  },
  monthText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: normalizeWidth(24),
  },
});

export default CalendarHeader;
