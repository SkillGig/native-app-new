import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import images from '../assets/images';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';

const CalendarHeader = ({currentMonth, onMonthChange}) => {
  const monthName = currentMonth.toLocaleString('default', {month: 'long'});
  const year = currentMonth.getFullYear();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => onMonthChange(-1)}>
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
      <TouchableOpacity onPress={() => onMonthChange(1)}>
        <Image
          source={images.RIGHTARROW}
          style={{
            height: normalizeHeight(24),
            width: normalizeWidth(24),
            resizeMode: 'contain',
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
