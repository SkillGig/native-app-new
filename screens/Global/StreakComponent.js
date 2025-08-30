import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import {ThemeContext} from '../../src/context/ThemeContext';
import images from '../../assets/images';
import DailyStreak from './DailyStreak';
import Loader from '../../components/Loader';
import CommonButton from '../../components/CommonButton';
import useStreak from '../../src/hooks/useStreak';

const StreakComponent = ({statusMap, onClose, visible = false, userConfig}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(300))[0];

  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);

  const {
    weekStatus,
    streakBreakdown,
    loading,
    fetchWeeklyStreaks,
    fetchStreakBreakdown,
    clearStreakBreakdown,
  } = useStreak();

  // Fetch weekly streaks data when component becomes visible
  const handleFetchWeeklyStreaks = useCallback(async () => {
    if (!userConfig?.showUserStreaks) {
      return;
    }
    await fetchWeeklyStreaks();
  }, [userConfig?.showUserStreaks, fetchWeeklyStreaks]);

  // Fetch streak breakdown for specific date
  const handleDayPress = async date => {
    const breakdown = await fetchStreakBreakdown(date);
    if (breakdown) {
      setSelectedDate(date);
      setDetailsVisible(true);
    }
  };

  // Animation effects
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
      handleFetchWeeklyStreaks();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim, handleFetchWeeklyStreaks]);

  const closeDetails = () => {
    setDetailsVisible(false);
    clearStreakBreakdown();
    setSelectedDate(null);
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = dateString => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getTaskIcon = taskType => {
    switch (taskType) {
      case 'course_video':
        return images.COURSEVIDEO;
      case 'quiz':
        return images.QUIZZES;
      case 'project':
        return images.COURSEREADING;
      default:
        return images.STREAKICON;
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <LinearGradient
            colors={['#1A0B2E', '#300B73']}
            style={styles.gradientContainer}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerPlaceholder} />
              <Text style={[fstyles.boldTwentyFour, styles.headerTitle]}>
                Daily Streak
              </Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Image source={images.CLOSE} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>

            {loading && <Loader />}

            <ScrollView
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}>
              {/* Main Streak Display using DailyStreak as base */}
              <View style={styles.mainStreakSection}>
                {/* Large Streak Icon and Count */}
                <View style={styles.streakHeader}>
                  <Image
                    source={images.STREAKICON}
                    style={styles.largeStreakIcon}
                  />
                  <Text style={styles.streakCount}>
                    {weekStatus?.currentStreak || 0} Days Streak!!
                  </Text>
                </View>

                {/* Enhanced Daily Streak Component */}
                {weekStatus && (
                  <View style={styles.dailyStreakContainer}>
                    <DailyStreak
                      weekStatus={weekStatus}
                      statusMap={statusMap}
                    />
                  </View>
                )}

                {/* Interactive Weekly Overview */}
                <View style={styles.weeklyOverviewContainer}>
                  <Text style={[fstyles.mediumSixteen, styles.overviewTitle]}>
                    Tap completed days for details
                  </Text>
                  <View style={styles.weekRow}>
                    {weekStatus?.weekStreakStatus?.map((item, index) => {
                      const {icon} = statusMap[item.status] || {};
                      return (
                        <TouchableOpacity
                          key={`interactive-day-${index}`}
                          style={[
                            styles.dayButton,
                            {
                              backgroundColor:
                                item.status === 'completed'
                                  ? 'rgba(255, 237, 195, 0.2)'
                                  : 'rgba(255, 255, 255, 0.1)',
                              borderColor:
                                item.status === 'completed'
                                  ? '#FFEDC3'
                                  : 'rgba(255, 255, 255, 0.1)',
                            },
                          ]}
                          onPress={() =>
                            item.status === 'completed' &&
                            handleDayPress(item.date)
                          }
                          disabled={item.status !== 'completed'}>
                          <Text
                            style={[
                              fstyles.mediumTwelve,
                              {
                                color:
                                  item.status === 'yet-to-do'
                                    ? 'white'
                                    : 'rgba(229, 220, 246, 0.70)',
                                marginBottom: normalizeHeight(8),
                              },
                            ]}>
                            {item.day}
                          </Text>
                          {item.status === 'completed' ? (
                            <LinearGradient
                              colors={['#FFEDC3', '#FFC29C']}
                              style={styles.completedDayIcon}>
                              <Image source={icon} style={styles.dayIcon} />
                            </LinearGradient>
                          ) : (
                            <Image source={icon} style={styles.dayIcon} />
                          )}
                          {item.status === 'completed' && (
                            <Text style={styles.tapHint}>Tap</Text>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </Animated.View>
      </View>

      {/* Streak Breakdown Details Modal */}
      <Modal
        visible={detailsVisible}
        transparent
        animationType="slide"
        onRequestClose={closeDetails}>
        <View style={styles.detailsOverlay}>
          <View style={styles.detailsContainer}>
            <LinearGradient
              colors={['#1A0B2E', '#2D1B69']}
              style={styles.detailsGradient}>
              {/* Details Header */}
              <View style={styles.detailsHeader}>
                <TouchableOpacity
                  onPress={closeDetails}
                  style={styles.backButton}>
                  <Image source={images.LEFTARROW} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={[fstyles.boldEighteen, styles.detailsTitle]}>
                  {selectedDate && formatDate(selectedDate)}
                </Text>
                <View style={styles.placeholder} />
              </View>

              {/* Details Content */}
              {streakBreakdown && (
                <ScrollView style={styles.detailsScrollView}>
                  {/* Summary Card matching the design */}
                  <LinearGradient
                    colors={['rgba(48, 11, 115, 0.3)', '#300B73']}
                    style={styles.summaryCard}>
                    <View style={styles.summaryCheckmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                      <Text style={[fstyles.boldSixteen, styles.summaryDate]}>
                        {formatDate(streakBreakdown.date)}
                      </Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryStats}>
                      <View style={styles.statItem}>
                        <Text style={styles.statValue}>
                          {streakBreakdown.totalXpEarned}
                        </Text>
                        <Text style={styles.statLabel}>XP Earned</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={styles.statValue}>
                          {streakBreakdown.totalTasks}
                        </Text>
                        <Text style={styles.statLabel}>Tasks</Text>
                      </View>
                    </View>
                  </LinearGradient>

                  {/* Tasks List */}
                  <View style={styles.tasksSection}>
                    {streakBreakdown.tasks?.map((task, index) => (
                      <View key={task.transactionId} style={styles.taskItem}>
                        <Text style={styles.taskCheckmark}>✓</Text>
                        <View style={styles.taskContent}>
                          <Text
                            style={[fstyles.mediumFourteen, styles.taskName]}>
                            {task.taskName}
                          </Text>
                          {task.details.courseName && (
                            <Text style={styles.taskDetail}>
                              {task.details.courseName}
                            </Text>
                          )}
                          {task.details.chapterName && (
                            <Text style={styles.taskDetail}>
                              {task.details.chapterName}
                            </Text>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              )}

              {/* Details Footer */}
              <View style={styles.detailsFooter}>
                <CommonButton
                  title="Great!!"
                  onPress={closeDetails}
                  buttonStyle={styles.greatButton}
                  textStyle={styles.greatButtonText}
                />
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '85%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientContainer: {
    flex: 1,
    paddingVertical: normalizeHeight(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(20),
    marginBottom: normalizeHeight(20),
  },
  headerPlaceholder: {
    width: normalizeWidth(24),
  },
  headerTitle: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: normalizeWidth(8),
  },
  closeIcon: {
    width: normalizeWidth(24),
    height: normalizeHeight(24),
    tintColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  mainStreakSection: {
    paddingHorizontal: normalizeWidth(20),
  },
  streakHeader: {
    alignItems: 'center',
    marginBottom: normalizeHeight(30),
  },
  largeStreakIcon: {
    width: normalizeWidth(120),
    height: normalizeHeight(120),
    marginBottom: normalizeHeight(16),
  },
  streakCount: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  dailyStreakContainer: {
    marginHorizontal: -normalizeWidth(20),
    marginBottom: normalizeHeight(30),
  },
  weeklyOverviewContainer: {
    marginBottom: normalizeHeight(20),
  },
  overviewTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: normalizeHeight(16),
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(8),
  },
  dayButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    marginHorizontal: normalizeWidth(2),
    borderRadius: 12,
    borderWidth: 1,
  },
  completedDayIcon: {
    borderRadius: 20,
    padding: normalizeWidth(4),
    marginBottom: normalizeHeight(4),
  },
  dayIcon: {
    width: normalizeWidth(24),
    height: normalizeHeight(24),
  },
  tapHint: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: normalizeHeight(2),
  },
  // Details Modal Styles
  detailsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  detailsContainer: {
    flex: 1,
    marginTop: normalizeHeight(50),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  detailsGradient: {
    flex: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(20),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: normalizeWidth(8),
  },
  backIcon: {
    width: normalizeWidth(24),
    height: normalizeHeight(24),
    tintColor: 'white',
  },
  detailsTitle: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: normalizeWidth(40),
  },
  detailsScrollView: {
    flex: 1,
    paddingHorizontal: normalizeWidth(20),
  },
  summaryCard: {
    borderRadius: 16,
    padding: normalizeWidth(20),
    marginVertical: normalizeHeight(20),
    borderWidth: 1,
    borderColor: '#00CED1',
  },
  summaryCheckmark: {
    alignItems: 'center',
    marginBottom: normalizeHeight(16),
  },
  checkmarkText: {
    fontSize: 24,
    color: '#00CED1',
    marginBottom: normalizeHeight(8),
  },
  summaryDate: {
    color: 'white',
    textAlign: 'center',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: normalizeHeight(16),
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: normalizeHeight(4),
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  tasksSection: {
    marginBottom: normalizeHeight(20),
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: normalizeHeight(16),
    paddingHorizontal: normalizeWidth(8),
  },
  taskCheckmark: {
    fontSize: 16,
    color: '#00CED1',
    marginRight: normalizeWidth(12),
    marginTop: normalizeHeight(2),
  },
  taskContent: {
    flex: 1,
  },
  taskName: {
    color: 'white',
    marginBottom: normalizeHeight(4),
  },
  taskDetail: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: normalizeHeight(2),
  },
  detailsFooter: {
    paddingHorizontal: normalizeWidth(20),
    paddingBottom: normalizeHeight(30),
  },
  greatButton: {
    backgroundColor: '#7B68EE',
    borderRadius: 16,
    paddingVertical: normalizeHeight(16),
  },
  greatButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default StreakComponent;
