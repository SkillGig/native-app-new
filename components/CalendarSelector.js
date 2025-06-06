import React, {useContext, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  getYear,
} from 'date-fns';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {ThemeContext} from '../src/context/ThemeContext';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const parseInputDate = str => {
  if (!str) return null;
  const [dd, mm, yyyy] = str.split('-').map(Number);
  return new Date(yyyy, mm - 1, dd);
};

const formatOutputDate = date => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const CalendarSelector = ({
  selectedDate,
  onSelect,
  startYear,
  endYear,
  label,
}) => {
  const parsedSelectedDate = parseInputDate(selectedDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    parsedSelectedDate || new Date(),
  );
  const triggerRef = useRef();
  const [position, setPosition] = useState({top: 0});
  const {isDark} = useContext(ThemeContext);

  const openCalendar = () => {
    const baseDate = parsedSelectedDate || new Date();
    setCurrentMonth(baseDate);
    triggerRef.current.measureInWindow((x, y, width, height) => {
      const screenHeight = Dimensions.get('window').height;
      const spaceBelow = screenHeight - y - height;
      const calendarHeight = 320;
      const top = spaceBelow < calendarHeight ? y - calendarHeight : y + height;
      setPosition({top});
      setIsCalendarOpen(true);
    });
  };

  const closeCalendar = () => setIsCalendarOpen(false);

  const handleSelect = date => {
    const formatted = formatOutputDate(date);
    onSelect(formatted);
    closeCalendar();
  };

  const renderDays = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const allDays = eachDayOfInterval({start, end});

    const days = [];
    const firstDayOffset = getDay(start);
    for (let i = 0; i < firstDayOffset; i++) days.push(null);
    allDays.forEach(day => days.push(day));

    while (days.length % 7 !== 0) days.push(null); // Ensure last row has 7 cells

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <View>
        {weeks.map((week, index) => (
          <View key={index} style={styles.weekRow}>
            {week.map((day, idx) => {
              if (!day) return <View key={idx} style={styles.dayCell} />;
              const isSelected =
                parsedSelectedDate && isSameDay(parsedSelectedDate, day);
              return (
                <TouchableOpacity
                  key={day.toISOString()}
                  style={[styles.dayCell, isSelected && styles.selectedDay]}
                  onPress={() => handleSelect(day)}>
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && styles.selectedDayText,
                    ]}>
                    {format(day, 'd')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  const canGoPrev = getYear(subMonths(currentMonth, 1)) >= startYear;
  const canGoNext = getYear(addMonths(currentMonth, 1)) <= endYear;

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={openCalendar}
        ref={triggerRef}>
        <View style={styles.label}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <View style={{position: 'relative', justifyContent: 'center'}}>
          <TextInput
            style={[
              {
                paddingLeft: normalizeWidth(-4),
                fontSize: 16,
                fontWeight: '700',
                borderBottomWidth: 1,
                borderBottomColor: isDark ? 'white' : '#4F378A',
                color: isDark
                  ? 'rgba(255, 255, 255, 0.87)'
                  : 'rgba(0, 0, 0, 0.87)',
                paddingRight: 36,
              },
            ]}
            placeholderTextColor={
              isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.28)'
            }
            returnKeyType="done"
            editable={false}
            value={selectedDate}
          />
          <View style={{position: 'absolute', right: 0, paddingRight: 8}}>
            <Text style={{color: '#fff'}}>D</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        transparent
        visible={isCalendarOpen}
        animationType="fade"
        onRequestClose={closeCalendar}>
        <TouchableWithoutFeedback onPress={closeCalendar}>
          <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={[styles.calendarPopup, {top: position.top}]}>
                <View style={styles.header}>
                  <TouchableOpacity
                    onPress={() =>
                      canGoPrev
                        ? setCurrentMonth(prev => subMonths(prev, 1))
                        : null
                    }>
                    <Text
                      style={[
                        styles.navArrow,
                        !canGoPrev && styles.disabledArrow,
                      ]}>
                      {'<'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.monthText}>
                    {format(currentMonth, 'MMMM yyyy')}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      canGoNext
                        ? setCurrentMonth(prev => addMonths(prev, 1))
                        : null
                    }>
                    <Text
                      style={[
                        styles.navArrow,
                        !canGoNext && styles.disabledArrow,
                      ]}>
                      {'>'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.daysRow}>
                  {DAYS.map(d => (
                    <Text key={d} style={styles.dayHeader}>
                      {d}
                    </Text>
                  ))}
                </View>

                {renderDays()}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    paddingBottom: normalizeHeight(16),
  },
  label: {
    marginBottom: 6,
  },
  labelText: {
    color: '#D6C0FD',
    fontSize: 12,
    fontWeight: '600',
  },
  calendarPopup: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: '#3d1b77',
    borderRadius: 8,
    padding: 10,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    columnGap: 42,
  },
  monthText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  navArrow: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'rgba(176, 149, 227, 0.5)',
    fontWeight: '700',
    borderRadius: 16,
    width: 32,
    height: 32,
    textAlign: 'center',
    lineHeight: 36,
  },
  disabledArrow: {
    opacity: 0.5,
    backgroundColor: 'rgba(176, 149, 227, 0.2)',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingHorizontal: 10,
  },
  dayHeader: {
    width: 32,
    textAlign: 'center',
    color: '#bbb',
    marginVertical: 2,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: 32,
    height: 32,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  dayText: {
    color: '#fff',
  },
  selectedDay: {
    backgroundColor: '#a788f2',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CalendarSelector;
