import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  getStreakMonthlyCalendar,
  currentDayStreakStatus,
} from '../src/api/userOnboardingAPIs';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import images from '../assets/images';
import Loader from './Loader';
import BottomSheet from './BottomSheet';
import useUserStore from '../src/store/useUserStore';

// Enable custom date parsing support
dayjs.extend(customParseFormat);

const weekDays = [
  {key: 'Mon', label: 'M'},
  {key: 'Tue', label: 'T'},
  {key: 'Wed', label: 'W'},
  {key: 'Thu', label: 'T'},
  {key: 'Fri', label: 'F'},
  {key: 'Sat', label: 'S'},
  {key: 'Sun', label: 'S'},
];

// Calendar header component
const CalendarHeader = ({currentDate, changeMonth, minMonth}) => {
  const monthName = currentDate.toLocaleString('default', {month: 'long'});
  const year = currentDate.getFullYear();
  const today = dayjs();
  const currentMonthJs = dayjs(currentDate);
  const canGoNext = currentMonthJs.isBefore(today.endOf('month'), 'month');
  const canGoPrev = minMonth
    ? currentMonthJs.isAfter(dayjs(minMonth), 'month')
    : true;

  return (
    <View style={styles.calendarHeader}>
      <TouchableOpacity
        onPress={() => changeMonth(-1)}
        disabled={!canGoPrev}
        style={{opacity: canGoPrev ? 1 : 0.3}}>
        <Image source={images.LEFTCALENDARARROW} style={styles.arrowIcon} />
      </TouchableOpacity>
      <Text style={styles.monthText}>{`${monthName} ${year}`}</Text>
      <TouchableOpacity
        onPress={() => changeMonth(1)}
        disabled={!canGoNext}
        style={{opacity: canGoNext ? 1 : 0.3}}>
        <Image
          source={images.LEFTCALENDARARROW}
          style={styles.arrowIconRight}
        />
      </TouchableOpacity>
    </View>
  );
};

const formatDateWithOrdinal = date => {
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', {month: 'short'});
  const year = date.getFullYear();

  // Get ordinal suffix
  const getOrdinalSuffix = dayNum => {
    if (dayNum > 3 && dayNum < 21) {
      return 'th';
    }
    switch (dayNum % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const suffix = getOrdinalSuffix(day);

  return {
    day: day.toString(),
    suffix,
    month,
    year: year.toString(),
  };
};

// Task breakdown component
const TaskBreakdown = ({loadingBreakdown, selectedDate, selectedDateTasks}) => {
  if (loadingBreakdown) {
    return <Loader size="small" />;
  }

  if (!selectedDateTasks) {
    return null;
  }

  const formattedDate = formatDateWithOrdinal(new Date(selectedDate));

  // Check if there's an error or no tasks
  if (
    selectedDateTasks.error ||
    !selectedDateTasks.todayTasks ||
    selectedDateTasks.todayTasks.length === 0
  ) {
    console.log('Showing error state:', selectedDateTasks.error);
    return (
      <View
        style={[
          styles.breakdownSection,
          {
            borderColor: '#930000', // Red border for error state
          },
        ]}>
        <LinearGradient
          colors={['rgba(122, 13, 18, 0)', 'rgba(122, 13, 18, 0.4)']} // Red gradient for error state
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientContainer}>
          <View style={styles.breakdownHeader}>
            <Image source={images.SNACKBARINFO} style={styles.infoIcon} />
            <View style={styles.dateContainer}>
              <Text style={[styles.breakdownDateText, {marginLeft: 10}]}>
                {formattedDate.day}
              </Text>
              <Text style={styles.ordinalSuffix}>{formattedDate.suffix}</Text>
              <Text style={styles.breakdownDateText}>
                {' ' + formattedDate.month + ' ' + formattedDate.year}
              </Text>
            </View>
          </View>
          <View style={styles.tasksList}>
            <Text style={styles.noTasksText}>
              {selectedDateTasks.error || 'You missed checking the App!'}
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.breakdownSection}>
      <LinearGradient
        colors={['rgba(16, 104, 79, 0)', 'rgba(16, 104, 79, 0.4)']} // Teal gradient for success state
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientContainer}>
        <View style={styles.breakdownHeader}>
          <Image source={images.TICKGREENCIRCLE} style={styles.checkIcon} />
          <View style={styles.dateContainer}>
            <Text style={[styles.breakdownDateText, {marginLeft: 10}]}>
              {formattedDate.day}
            </Text>
            <Text style={styles.ordinalSuffix}>{formattedDate.suffix}</Text>
            <Text style={styles.breakdownDateText}>
              {' ' + formattedDate.month + ' ' + formattedDate.year}
            </Text>
          </View>
        </View>
        <View style={styles.tasksList}>
          {selectedDateTasks.todayTasks.map(task => (
            <View
              key={`${selectedDate}-${task?.taskName || task}`}
              style={styles.taskItem}>
              <Image source={images.STREAKTASKTICK} style={styles.taskIcon} />
              <Text style={styles.taskText}>
                {task.taskType === 'course_video'
                  ? `Completed video from ${task.details?.courseName} - ${task.details?.chapterName}`
                  : task.taskType === 'quiz'
                  ? `Completed quiz from ${task.details?.courseName} - ${task.details?.chapterName}`
                  : task.taskName || task}
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const StreakCalendarBottomSheet = forwardRef((props, ref) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Start with current date
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // No default selection initially
  const [selectedDateTasks, setSelectedDateTasks] = useState(null);
  const [loadingBreakdown, setLoadingBreakdown] = useState(false);
  const userEnrolledAt = useUserStore(state => state.userConfig.userEnrolledAt);
  console.log(userEnrolledAt, 'the user enrolled date is');
  const enrolledDate = useMemo(() => {
    if (!userEnrolledAt) {
      return null;
    }
    const parsed = dayjs(userEnrolledAt, 'YYYY-MM-DD HH:mm:ss', true);
    return parsed.isValid() ? parsed : dayjs(userEnrolledAt);
  }, [userEnrolledAt]);

  // Get current month and year
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Fetch calendar data when month/year changes (using real API)
  const fetchCalendarData = useCallback(
    async (month, year) => {
      setLoading(true);
      try {
        // Avoid fetching months entirely before enrollment
        if (enrolledDate) {
          const monthStart = dayjs(`${year}-${month}-01`, 'YYYY-M-D');
          if (monthStart.isBefore(enrolledDate.startOf('month'), 'month')) {
            setCalendarData([]);
            return;
          }
        }
        const response = await getStreakMonthlyCalendar(month, year);

        if (response?.message === 'success' && response?.data) {
          setCalendarData(response.data);

          // Find today's date in the response and set it as selected by default
          const today = dayjs().format('DD-MM-YYYY');
          const todayEntry = response.data.find(item => item.date === today);

          if (todayEntry) {
            const formattedToday = dayjs().format('YYYY-MM-DD');
            // Only auto-select today if not before enrollment
            if (
              !enrolledDate ||
              !dayjs(formattedToday).isBefore(enrolledDate, 'day')
            ) {
              setSelectedDate(formattedToday);
              await fetchDateTasks(formattedToday);
            }
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [fetchDateTasks, enrolledDate],
  );

  // Fetch tasks for a specific date
  const fetchDateTasks = useCallback(async dateString => {
    setLoadingBreakdown(true);
    try {
      // Convert YYYY-MM-DD to DD-MM-YYYY format for API
      const formattedDate = dayjs(dateString).format('DD-MM-YYYY');
      const response = await currentDayStreakStatus(formattedDate);

      if (response?.message === 'success' && response?.data?.data) {
        setSelectedDateTasks(response.data.data);
      } else {
        setSelectedDateTasks({
          tasks: [],
          error: 'You missed checking the App!',
        });
      }
    } catch (error) {
      setSelectedDateTasks({
        tasks: [],
        error: 'Failed to load tasks for this date',
      });
    } finally {
      setLoadingBreakdown(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchCalendarData(currentMonth, currentYear);
  }, [fetchCalendarData, currentMonth, currentYear]);

  // Month change handler
  const changeMonth = offset => {
    const candidate = dayjs(currentDate).add(offset, 'month');
    if (
      enrolledDate &&
      candidate.isBefore(enrolledDate.startOf('month'), 'month')
    ) {
      return;
    }
    const newDate = candidate.toDate();
    setCurrentDate(newDate);
    setSelectedDate(null); // Clear selection when month changes
    setSelectedDateTasks(null);
  };

  // Handle date press (using real API)
  const handleDatePress = async day => {
    const dateString = day.dateString;
    const today = dayjs();
    const selectedDay = dayjs(dateString);

    // Block dates before enrollment
    if (enrolledDate && selectedDay.isBefore(enrolledDate, 'day')) {
      return;
    }

    // Prevent clicking on future dates
    if (selectedDay.isAfter(today, 'day')) {
      return; // Don't allow selection of future dates
    }

    // Prevent unnecessary task refresh if same date is selected again
    if (selectedDate === dateString) {
      return; // Don't reload tasks for the same date
    }

    setSelectedDate(dateString);
    await fetchDateTasks(dateString);
  };

  // Build marked dates from API data with streak grouping
  const markedDates = useMemo(() => {
    const marked = {};
    const today = dayjs();

    // Always mark selected date even if calendarData is empty
    if (selectedDate) {
      marked[selectedDate] = {
        customStyles: {
          container: {
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            borderColor: '#6100D0',
            borderWidth: 2,
            width: normalizeWidth(32),
            height: normalizeHeight(32),
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: '#6100D0',
            fontWeight: '600',
          },
        },
      };
    }

    if (
      calendarData &&
      Array.isArray(calendarData) &&
      calendarData.length > 0
    ) {
      // Convert DD-MM-YYYY format to YYYY-MM-DD and sort by date
      const formattedData = calendarData
        .map(item => {
          const [day, month, year] = item.date.split('-');
          const formattedDate = `${year}-${month}-${day}`;
          return {
            ...item,
            formattedDate,
          };
        })
        .sort((a, b) => dayjs(a.formattedDate).diff(dayjs(b.formattedDate)));

      // Group consecutive streaks for green pill-shaped styling
      const streakGroups = [];
      let currentStreak = [];

      formattedData.forEach((item, index) => {
        const isCompleted = item.status === 'done';
        const currentDay = dayjs(item.formattedDate);

        if (isCompleted) {
          // Check if this is consecutive to the previous day in the streak
          if (currentStreak.length === 0) {
            currentStreak = [item.formattedDate];
          } else {
            const lastDateInStreak = dayjs(
              currentStreak[currentStreak.length - 1],
            );
            const daysDiff = currentDay.diff(lastDateInStreak, 'day');

            if (daysDiff === 1) {
              // Consecutive day - add to current streak
              currentStreak.push(item.formattedDate);
            } else {
              // Not consecutive - save current streak and start new one
              if (currentStreak.length > 1) {
                streakGroups.push([...currentStreak]);
              }
              currentStreak = [item.formattedDate];
            }
          }
        } else {
          // Not completed - end current streak if it exists
          if (currentStreak.length > 1) {
            streakGroups.push([...currentStreak]);
          }
          currentStreak = [];
        }

        // Handle last item
        if (index === formattedData.length - 1 && currentStreak.length > 1) {
          streakGroups.push([...currentStreak]);
        }
      });

      // Apply styling based on streaks and individual dates
      formattedData.forEach(item => {
        const date = item.formattedDate;
        const isToday = item.isToday; // Use the API's isToday flag
        const isSelected = date === selectedDate;
        const isCompleted = item.status === 'done';
        const isFutureDate = dayjs(date).isAfter(today, 'day');
        const isBeforeEnrolled = enrolledDate
          ? dayjs(date).isBefore(enrolledDate, 'day')
          : false;

        // Find if this date is part of a streak group
        const streakGroup = streakGroups.find(group => group.includes(date));
        let streakPosition = null;

        if (streakGroup && streakGroup.length > 1) {
          const positionInGroup = streakGroup.indexOf(date);
          if (positionInGroup === 0) {
            streakPosition = 'start';
          } else if (positionInGroup === streakGroup.length - 1) {
            streakPosition = 'end';
          } else {
            streakPosition = 'middle';
          }
        }

        if (isBeforeEnrolled) {
          marked[date] = {
            disabled: true,
            customStyles: {
              container: {
                borderRadius: 24,
                width: normalizeWidth(32),
                height: normalizeHeight(32),
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.5,
              },
              text: {
                fontWeight: '400',
                opacity: 0.5,
              },
            },
          };
        } else if (isSelected) {
          // Selected date styling based on status
          let containerStyle = {};
          let textColor = '#FFFFFF';

          if (isCompleted) {
            // Selected date with done status - green border with white background
            containerStyle = {
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              borderColor: '#00A430',
              borderWidth: 2,
              width: normalizeWidth(32),
              height: normalizeHeight(32),
              justifyContent: 'center',
              alignItems: 'center',
            };
            textColor = '#00A430';
          } else if (isToday) {
            // Selected date that is today but not done - purple border with light purple background
            containerStyle = {
              backgroundColor: '#DAC2F6',
              borderRadius: 24,
              borderColor: '#6100D0',
              borderWidth: 2,
              width: normalizeWidth(32),
              height: normalizeHeight(32),
              justifyContent: 'center',
              alignItems: 'center',
            };
            textColor = '#6100D0';
          } else {
            // Selected date with not-done status - red border with white background
            containerStyle = {
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              borderColor: '#F10026',
              borderWidth: 2,
              width: normalizeWidth(32),
              height: normalizeHeight(32),
              justifyContent: 'center',
              alignItems: 'center',
            };
            textColor = '#F10026';
          }

          marked[date] = {
            customStyles: {
              container: containerStyle,
              text: {
                color: textColor,
                fontWeight: '600',
              },
            },
          };
        } else if (isFutureDate) {
          // Future dates - disabled with reduced opacity
          marked[date] = {
            disabled: true,
            customStyles: {
              container: {
                borderRadius: 24,
                width: normalizeWidth(32),
                height: normalizeHeight(32),
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.7, // Reduced from 0.5 to 0.3 for more disabled appearance
              },
              text: {
                fontWeight: '400',
                opacity: 0.7, // Reduced from 0.5 to 0.3 for more disabled appearance
              },
            },
          };
        } else if (isToday) {
          // Today styling with border - maintain completion color but add border
          let containerStyle = {
            backgroundColor: isCompleted
              ? 'rgba(16, 104, 79, 1)' // Solid color (opacity 1) to prevent overlap darkening
              : 'rgba(122, 13, 18, 0.3)',
            borderRadius: 24,
            borderColor: '#5013C0',
            borderWidth: 2,
            width: normalizeWidth(32),
            height: normalizeHeight(32),
            justifyContent: 'center',
            alignItems: 'center',
          };

          // Apply pill-shape for streak groups if today is part of a streak with aggressive overlapping
          if (isCompleted && streakPosition === 'start') {
            containerStyle = {
              ...containerStyle,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              width: normalizeWidth(50), // Wider for aggressive overlapping
              marginRight: -9, // Aggressive overlap to eliminate gaps
              paddingRight: 9,
              position: 'relative',
              zIndex: 2,
              borderRightWidth: 0,
            };
          } else if (isCompleted && streakPosition === 'end') {
            containerStyle = {
              ...containerStyle,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              width: normalizeWidth(50), // Wider for aggressive overlapping
              marginLeft: -9, // Aggressive overlap to eliminate gaps
              paddingLeft: 9,
              position: 'relative',
              zIndex: 2,
              borderLeftWidth: 0,
            };
          } else if (isCompleted && streakPosition === 'middle') {
            containerStyle = {
              ...containerStyle,
              borderRadius: 0,
              width: normalizeWidth(50), // Wider for aggressive overlapping
              marginLeft: -9, // Aggressive overlap on both sides
              marginRight: -9,
              paddingLeft: 9,
              paddingRight: 9,
              position: 'relative',
              zIndex: 2,
              borderLeftWidth: 0,
              borderRightWidth: 0,
            };
          }

          marked[date] = {
            customStyles: {
              container: containerStyle,
              text: {
                color: '#FFFFFF',
                fontWeight: 'bold',
              },
            },
          };
        } else if (isCompleted) {
          // Completed dates - green with streak grouping and border
          let containerStyle = {
            backgroundColor: 'rgba(16, 104, 79, 1)', // Solid color (opacity 1) to prevent overlap darkening
            borderColor: 'rgba(0, 158, 76, 1)', // Solid border color (opacity 1)
            borderWidth: 1,
            borderRadius: 24,
            width: normalizeWidth(32),
            height: normalizeHeight(32),
            justifyContent: 'center',
            alignItems: 'center',
          };

          // Apply pill-shape for streak groups with aggressive overlapping to eliminate gaps
          if (streakPosition === 'start') {
            // Start of streak - rounded left, connected right
            containerStyle = {
              ...containerStyle,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              width: normalizeWidth(50), // Wider for aggressive overlapping
              marginRight: -9, // Aggressive overlap to eliminate gaps
              paddingRight: 9,
              position: 'relative',
              zIndex: 1,
              borderRightWidth: 0,
            };
          } else if (streakPosition === 'end') {
            // End of streak - connected left, rounded right
            containerStyle = {
              ...containerStyle,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              width: normalizeWidth(50), // Wider for aggressive overlapping
              marginLeft: -9, // Aggressive overlap to eliminate gaps
              paddingLeft: 9,
              position: 'relative',
              zIndex: 1,
              borderLeftWidth: 0,
            };
          } else if (streakPosition === 'middle') {
            // Middle of streak - connected both sides, no rounding
            containerStyle = {
              ...containerStyle,
              borderRadius: 0,
              width: normalizeWidth(50), // Wider for aggressive overlapping
              marginLeft: -9, // Aggressive overlap on both sides
              marginRight: -9,
              paddingLeft: 9,
              paddingRight: 9,
              position: 'relative',
              zIndex: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
            };
          }

          marked[date] = {
            customStyles: {
              container: containerStyle,
              text: {
                color: 'white',
                fontWeight: '400',
              },
            },
          };
        } else {
          // Not completed dates - red
          marked[date] = {
            customStyles: {
              container: {
                backgroundColor: 'rgba(122, 13, 18, 0.3)',
                borderRadius: 24,
                width: normalizeWidth(32),
                height: normalizeHeight(32),
                justifyContent: 'center',
                alignItems: 'center',
              },
              text: {
                color: '#FFA59C',
                fontWeight: '400',
              },
            },
          };
        }
      });
    }

    return marked;
  }, [calendarData, selectedDate, enrolledDate]);

  // Handle close
  const handleClose = () => {
    // Reset to current date when closing
    setSelectedDate(dayjs().format('YYYY-MM-DD'));
    setSelectedDateTasks(null);
    setCurrentDate(new Date());
    return ref.current?.close();
  };

  return (
    <BottomSheet
      ref={ref}
      height={['85%', '85%']} // Fixed at 85% height regardless of content
      enablePanDownToClose={false}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      backdropComponent={() => null}
      handleClose={handleClose}
      showIndicator={false}
      animateOnMount={true}
      onChange={index => {
        if (index === -1) {
          handleClose();
        }
      }}>
      <View style={styles.sheetContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Streak Calendar</Text>
          <TouchableOpacity onPress={handleClose}>
            <Image source={images.CLOSEICON} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#1C0743', '#090215']}
          locations={[0, 0.49, 0.59, 1]}
          start={{x: 0, y: 0}}
          end={{x: 0.6, y: 0.6}}
          style={styles.calendarContainer}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Loader />
              </View>
            ) : (
              <>
                <CalendarHeader
                  currentDate={currentDate}
                  changeMonth={changeMonth}
                  minMonth={
                    enrolledDate ? enrolledDate.startOf('month').toDate() : null
                  }
                />

                {/* Custom weekday header */}
                <View style={styles.weekdayContainer}>
                  {weekDays.map(day => (
                    <Text key={day.key} style={styles.weekdayText}>
                      {day.label}
                    </Text>
                  ))}
                </View>

                <Calendar
                  hideArrows
                  hideDayNames
                  hideExtraDays={true} // This removes previous/next month dates
                  firstDay={1} // start week on Monday
                  current={dayjs(currentDate).format('YYYY-MM-DD')}
                  markingType="custom"
                  markedDates={markedDates}
                  onDayPress={handleDatePress}
                  renderHeader={() => <></>}
                  disableArrowLeft
                  disableArrowRight
                  theme={{
                    calendarBackground: 'transparent',
                    textDayFontWeight: '400',
                    textDayFontSize: 16,
                    dayTextColor: '#FFFFFF',
                    todayBackgroundColor: 'transparent', // Let custom styling handle today
                    todayTextColor: '#FFFFFF',
                    selectedDayTextColor: '#FFFFFF',
                    selectedDayBackgroundColor: 'transparent', // Let custom styling handle selection
                    'stylesheet.calendar.main': {
                      dayContainer: {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 0, // Remove default margins
                        padding: 0, // Remove default padding
                      },
                    },
                    'stylesheet.day.basic': {
                      base: {
                        width: normalizeWidth(32),
                        height: normalizeHeight(32),
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 0,
                        padding: 0,
                      },
                      selected: {
                        backgroundColor: 'transparent', // Let custom styling handle selection
                      },
                      today: {
                        backgroundColor: 'transparent', // Let custom styling handle today
                      },
                    },
                  }}
                />

                {/* Info text - only show when no date is selected */}
                {!selectedDate && (
                  <View
                    style={{
                      maxWidth: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={styles.infoContainer}>
                      <Image
                        source={images.SNACKBARINFO}
                        style={styles.infoIconSmall}
                      />
                      <Text style={styles.infoText}>
                        Click on a date to know more
                      </Text>
                    </View>
                  </View>
                )}

                {/* Divider */}
                <View style={styles.divider} />

                <View>
                  <TaskBreakdown
                    loadingBreakdown={loadingBreakdown}
                    selectedDate={selectedDate}
                    selectedDateTasks={selectedDateTasks}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </LinearGradient>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    backgroundColor: '#331E5C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '100%',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(16),
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(176, 149, 227, 0.40)',
  },
  header: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  closeIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
  },
  calendarContainer: {
    flex: 1,
    minHeight: '150%',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(16),
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: normalizeHeight(300),
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(20),
    borderRadius: 12,
    marginBottom: normalizeHeight(16),
  },
  monthText: {
    color: '#FFFFFF',
    fontSize: normalizeWidth(18),
    fontWeight: 'bold',
  },
  arrowIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  arrowIconRight: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
    transform: [{rotate: '180deg'}],
  },
  weekdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: normalizeHeight(8),
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
    paddingVertical: normalizeHeight(4),
    paddingHorizontal: normalizeWidth(8),
    backgroundColor: '#300B73', // Updated background color as per screenshot
    borderRadius: 8,
    marginTop: normalizeHeight(40),
    marginHorizontal: normalizeWidth(8), // Add horizontal margins for proper width
    maxWidth: '100%',
    opacity: 0.8,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(176, 149, 227, 0.40)',
    marginTop: normalizeHeight(16),
    marginBottom: normalizeHeight(8),
    marginHorizontal: normalizeWidth(16),
  },
  infoIconSmall: {
    width: normalizeWidth(18),
    height: normalizeHeight(18),
    resizeMode: 'contain',
    marginRight: normalizeWidth(8),
    tintColor: '#B095E3',
  },
  infoText: {
    color: '#B095E3',
    fontSize: normalizeWidth(12),
    fontWeight: '600',
  },
  breakdownSection: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 0,
    marginTop: normalizeHeight(8),
    marginHorizontal: normalizeWidth(16),
    borderWidth: 2,
    borderColor: '#006C4B', // Teal/cyan border color from screenshot
    overflow: 'hidden',
  },
  gradientContainer: {
    borderRadius: 20, // Slightly less than parent to fit inside border
    padding: 0,
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent', // Let gradient handle the background
    paddingVertical: normalizeHeight(12),
    marginHorizontal: normalizeWidth(16),
    marginBottom: normalizeHeight(10),
    borderBottomWidth: 1,
    borderBottomColor: '#930000',
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
    tintColor: '#4CAF50', // Green checkmark
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
    paddingVertical: normalizeHeight(8),
    paddingHorizontal: normalizeWidth(0),
  },
  tasksList: {
    backgroundColor: 'transparent', // Let gradient handle the background
    paddingHorizontal: normalizeWidth(16),
    paddingBottom: normalizeHeight(16),
  },
  taskIcon: {
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    resizeMode: 'contain',
    tintColor: '#4CAF50', // Keep green checkmark
    marginRight: normalizeWidth(12),
  },
  taskText: {
    color: '#FFFFFF',
    fontSize: normalizeWidth(14),
    fontWeight: '400',
    flex: 1,
    flexWrap: 'wrap',
  },
  noTasksText: {
    color: '#FFA59C',
    fontSize: normalizeWidth(14),
    fontWeight: '400',
    fontStyle: 'italic',
  },
  breakdownDateText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  ordinalSuffix: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    marginTop: normalizeHeight(-2),
    marginLeft: normalizeWidth(1),
  },
});

export default StreakCalendarBottomSheet;
