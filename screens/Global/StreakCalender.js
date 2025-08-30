import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import {
  getStreakMonthlyCalendar,
  getStreakBreakDown,
} from '../../src/api/userOnboardingAPIs';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';
import Loader from '../../components/Loader';

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// Calendar header component
const CalendarHeader = ({currentDate, changeMonth}) => {
  const monthName = currentDate.toLocaleString('default', {month: 'long'});
  const year = currentDate.getFullYear();
  const today = dayjs();
  const currentMonthJs = dayjs(currentDate);
  const canGoNext = currentMonthJs.isBefore(today.endOf('month'), 'month');

  return (
    <View style={styles.calendarHeader}>
      <TouchableOpacity onPress={() => changeMonth(-1)}>
        <Image source={images.LEFTARROW} style={styles.arrowIcon} />
      </TouchableOpacity>
      <Text style={styles.monthText}>{`${monthName} ${year}`}</Text>
      <TouchableOpacity
        onPress={() => changeMonth(1)}
        disabled={!canGoNext}
        style={{opacity: canGoNext ? 1 : 0.3}}>
        <Image source={images.RIGHTARROW} style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

// Task breakdown component
const TaskBreakdown = ({loadingBreakdown, selectedDate, selectedDateTasks}) => {
  if (loadingBreakdown) {
    return (
      <View style={styles.breakdownSection}>
        <Loader size="small" />
      </View>
    );
  }

  if (!selectedDateTasks) {
    return null;
  }

  const dateFormatted = dayjs(selectedDate).format('Do MMM YYYY');

  if (
    selectedDateTasks.error ||
    !selectedDateTasks.tasks ||
    selectedDateTasks.tasks.length === 0
  ) {
    return (
      <View style={styles.breakdownSection}>
        <View style={styles.breakdownHeader}>
          <Image source={images.INFOCHECK} style={styles.infoIcon} />
          <Text style={styles.breakdownDate}>{dateFormatted}</Text>
        </View>
        <Text style={styles.noTasksText}>
          {selectedDateTasks.error || 'You missed checking the App!'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.breakdownSection}>
      <View style={styles.breakdownHeader}>
        <Image source={images.CHECKMARK} style={styles.checkIcon} />
        <Text style={styles.breakdownDate}>{dateFormatted}</Text>
      </View>
      {selectedDateTasks.tasks.map((task, index) => (
        <View key={index} style={styles.taskItem}>
          <Image source={images.CHECKMARK} style={styles.taskIcon} />
          <Text style={styles.taskText}>{task}</Text>
        </View>
      ))}
    </View>
  );
};

const StreakCalendar = ({onDateSelect, onClose}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateTasks, setSelectedDateTasks] = useState(null);
  const [loadingBreakdown, setLoadingBreakdown] = useState(false);

  // Get current month and year
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Fetch calendar data when month/year changes
  const fetchCalendarData = useCallback(async (month, year) => {
    setLoading(true);
    try {
      const response = await getStreakMonthlyCalendar(month, year);
      if (response?.data) {
        setCalendarData(response.data);
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      Alert.alert('Error', 'Failed to load calendar data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchCalendarData(currentMonth, currentYear);
  }, [fetchCalendarData, currentMonth, currentYear]);

  // Month change handler
  const changeMonth = offset => {
    const newDate = dayjs(currentDate).add(offset, 'month').toDate();
    setCurrentDate(newDate);
    setSelectedDate(null); // Clear selected date when month changes
    setSelectedDateTasks(null);
  };

  // Handle date press
  const handleDatePress = async day => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    setLoadingBreakdown(true);

    try {
      const response = await getStreakBreakDown(dateString);
      if (response?.data) {
        setSelectedDateTasks(response.data);
        if (onDateSelect) {
          onDateSelect(dateString, response.data);
        }
      }
    } catch (error) {
      console.error('Error fetching breakdown:', error);
      setSelectedDateTasks({
        tasks: [],
        error: 'Failed to load tasks for this date',
      });
    } finally {
      setLoadingBreakdown(false);
    }
  };

  // Build marked dates from API data
  const markedDates = useMemo(() => {
    const marked = {};
    const today = dayjs().format('YYYY-MM-DD');

    if (calendarData && Array.isArray(calendarData)) {
      calendarData.forEach(item => {
        const date = item.date;
        const isToday = date === today;
        const isSelected = date === selectedDate;

        if (isSelected) {
          marked[date] = {
            selected: true,
            selectedColor: '#B095E3',
            selectedTextColor: '#FFFFFF',
          };
        } else if (isToday) {
          marked[date] = {
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
        } else if (item.completed) {
          marked[date] = {
            customStyles: {
              container: {
                backgroundColor: 'rgba(16, 104, 79, 0.60)',
                borderRadius: 24,
              },
              text: {
                color: 'white',
              },
            },
          };
        } else {
          marked[date] = {
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
      });
    }

    return marked;
  }, [calendarData, selectedDate]);

  return (
    <LinearGradient colors={['#1C0743', '#090215']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Streak Calendar</Text>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Image source={images.CLOSE} style={styles.closeIcon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Calendar or Loading */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Loader />
        </View>
      ) : (
        <View style={styles.calendarContainer}>
          <CalendarHeader currentDate={currentDate} changeMonth={changeMonth} />

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
            hideDayNames
            firstDay={1} // start week on Monday
            current={dayjs(currentDate).format('YYYY-MM-DD')}
            markingType={selectedDate ? undefined : 'custom'}
            markedDates={markedDates}
            onDayPress={handleDatePress}
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
              selectedDayTextColor: '#FFFFFF',
              selectedDayBackgroundColor: '#B095E3',
            }}
          />

          {/* Info text */}
          <View style={styles.infoContainer}>
            <Image source={images.INFO} style={styles.infoIconSmall} />
            <Text style={styles.infoText}>Click on a date to know more</Text>
          </View>
        </View>
      )}

      {/* Task Breakdown */}
      <TaskBreakdown
        loadingBreakdown={loadingBreakdown}
        selectedDate={selectedDate}
        selectedDateTasks={selectedDateTasks}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeWidth(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalizeHeight(16),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(176, 149, 227, 0.40)',
  },
  headerTitle: {
    fontSize: normalizeWidth(18),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: normalizeWidth(8),
  },
  closeIcon: {
    width: normalizeWidth(16),
    height: normalizeHeight(16),
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    paddingVertical: normalizeHeight(10),
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalizeHeight(10),
    paddingHorizontal: normalizeWidth(20),
    backgroundColor: '#1C0743',
    borderRadius: 12,
    marginBottom: normalizeHeight(10),
  },
  monthText: {
    color: '#fff',
    fontSize: normalizeWidth(18),
    fontWeight: 'bold',
  },
  arrowIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  weekdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: normalizeHeight(5),
    paddingHorizontal: normalizeWidth(5),
  },
  weekdayText: {
    color: '#A0A0A0',
    fontSize: normalizeWidth(16),
    fontWeight: '700',
    width: normalizeWidth(32),
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalizeHeight(16),
    backgroundColor: 'rgba(176, 149, 227, 0.20)',
    borderRadius: 8,
    marginTop: normalizeHeight(10),
  },
  infoIconSmall: {
    width: normalizeWidth(16),
    height: normalizeHeight(16),
    resizeMode: 'contain',
    marginRight: normalizeWidth(8),
    tintColor: '#B095E3',
  },
  infoText: {
    color: '#B095E3',
    fontSize: normalizeWidth(14),
    fontWeight: '600',
  },
  breakdownSection: {
    backgroundColor: 'rgba(176, 149, 227, 0.10)',
    borderRadius: 12,
    padding: normalizeWidth(16),
    marginTop: normalizeHeight(16),
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalizeHeight(12),
  },
  breakdownDate: {
    color: '#FFFFFF',
    fontSize: normalizeWidth(16),
    fontWeight: '700',
    marginLeft: normalizeWidth(8),
  },
  checkIcon: {
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    resizeMode: 'contain',
    tintColor: '#4CAF50',
  },
  infoIcon: {
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    resizeMode: 'contain',
    tintColor: '#FF9800',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalizeHeight(4),
  },
  taskIcon: {
    width: normalizeWidth(16),
    height: normalizeHeight(16),
    resizeMode: 'contain',
    tintColor: '#4CAF50',
    marginRight: normalizeWidth(8),
  },
  taskText: {
    color: '#FFFFFF',
    fontSize: normalizeWidth(14),
    fontWeight: '400',
  },
  noTasksText: {
    color: '#FFA59C',
    fontSize: normalizeWidth(14),
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

export default StreakCalendar;
