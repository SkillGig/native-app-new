import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import {ThemeContext} from '../../src/context/ThemeContext';
import images from '../../assets/images';
import CommonButton from '../../components/CommonButton';
import DailyStreak from './DailyStreak';
import {markStreakAnimationSeen} from '../../src/api/userOnboardingAPIs';
import useSnackbarStore from '../../src/store/useSnackbarStore';

// Helper function to format date with ordinal suffix
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

const CurrentDayStreakBreakdown = ({route, navigation}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);

  const streakBreakDownInfo = route?.params?.streakBreakDownInfo || null;

  // Format current date with ordinal suffix
  const currentDate = new Date();
  const formattedDate = formatDateWithOrdinal(currentDate);

  console.log('Streak Breakdown Info:', streakBreakDownInfo);

  const statusMap = {
    done: {
      icon: images.STREAKICON,
      color: '#4CAF50',
    },
    'yet-to-do': {
      icon: images.YETTOSTARTSTREAK,
      color: '#2196F3',
    },
    'not-done': {
      icon: images.STREAKFAILED,
      color: '#F44336',
    },
  };

  const markTheAnimationAsSeen = async () => {
    try {
      await markStreakAnimationSeen();
      return navigation.goBack();
    } catch (err) {
      return showSnackbar({
        message: 'Unable to move forward! Please try again',
        type: 'error',
      });
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#300B73', '#1A0B2E']}
        locations={[0, 0.3]}
        style={styles.backgroundGradient}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          {/* Main Streak Display Section */}
          <View style={styles.mainStreakSection}>
            {/* Large Flame Icon */}
            <Image source={images.STREAKICON} style={styles.largeFlameIcon} />

            {/* Streak Count Text */}
            <Text style={styles.streakCountText}>3 Days Streak!!</Text>
          </View>

          {/* DailyStreak Component */}
          <DailyStreak
            weekStatus={streakBreakDownInfo}
            statusMap={statusMap}
            currentStreak={true}
          />

          {/* Daily Breakdown Card */}
          <View style={styles.dailyBreakdownContainer}>
            <LinearGradient
              colors={['rgba(16, 104, 79, 0)', 'rgba(16, 104, 79, 0.4)']}
              style={styles.dailyBreakdownCard}>
              {/* Header with checkmark */}
              <View style={styles.breakdownHeader}>
                <Image
                  source={images.STREAKMARKTICK}
                  style={{
                    width: normalizeWidth(18),
                    height: normalizeHeight(18),
                  }}
                />
                <View style={styles.dateContainer}>
                  <Text style={styles.breakdownDateText}>
                    {formattedDate.day}
                  </Text>
                  <Text style={styles.ordinalSuffix}>
                    {formattedDate.suffix}
                  </Text>
                  <Text style={styles.breakdownDateText}>
                    {' ' + formattedDate.month + ' ' + formattedDate.year}
                  </Text>
                </View>
              </View>

              {/* Divider */}
              <View style={styles.breakdownDivider} />

              {/* Tasks List */}
              <View style={styles.tasksList}>
                {streakBreakDownInfo?.tasks?.map((task, index) => (
                  <View
                    key={task.transactionId || index}
                    style={styles.taskItem}>
                    <Image
                      source={images.STREAKTASKTICK}
                      style={{
                        width: normalizeWidth(18),
                        height: normalizeHeight(18),
                        marginRight: normalizeWidth(8),
                      }}
                    />
                    <Text style={styles.taskText}>
                      {task.taskType === 'course_video'
                        ? `Completed video from ${task.details.courseName} - ${task.details.chapterName}`
                        : task.taskType === 'quiz'
                        ? `Completed quiz from ${task.details.courseName} - ${task.details.chapterName}`
                        : task.taskName}
                    </Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>

          {/* Bottom spacing for button */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <CommonButton
            name="Great!!"
            onPress={() => {
              // Handle button press - you can update this manually
              markTheAnimationAsSeen();
            }}
            buttonStyle={styles.greatButton}
            textStyle={styles.greatButtonText}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: normalizeWidth(20),
    height: '100%',
  },

  // Main Streak Section
  mainStreakSection: {
    alignItems: 'center',
    marginBottom: normalizeHeight(40),
    paddingVertical: normalizeHeight(20),
  },
  largeFlameIcon: {
    width: normalizeWidth(120),
    height: normalizeHeight(120),
    marginBottom: normalizeHeight(20),
  },
  streakCountText: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },

  // Daily Breakdown Card
  dailyBreakdownContainer: {
    marginTop: normalizeHeight(30),
    marginBottom: normalizeHeight(20),
  },
  dailyBreakdownCard: {
    borderRadius: 20,
    padding: normalizeWidth(20),
    borderWidth: 1,
    borderColor: '#10684F',
  },
  breakdownHeader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: normalizeWidth(10),
    marginBottom: normalizeHeight(16),
  },
  checkmarkContainer: {
    width: normalizeWidth(40),
    height: normalizeHeight(40),
    borderRadius: 20,
    backgroundColor: 'rgba(0, 206, 209, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalizeHeight(12),
  },
  checkmarkIcon: {
    fontSize: 20,
    color: '#00CED1',
    fontWeight: 'bold',
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
  breakdownDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: normalizeHeight(16),
  },
  tasksList: {
    gap: normalizeHeight(10),
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: normalizeWidth(4),
  },
  taskCheckmark: {
    fontSize: 16,
    color: '#00CED1',
    marginRight: normalizeWidth(12),
    marginTop: normalizeHeight(2),
  },
  taskText: {
    flex: 1,
    fontSize: 14,
    color: 'white',
  },

  // Bottom Button
  bottomSpacing: {
    height: normalizeHeight(20),
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: normalizeHeight(60),
    left: normalizeWidth(20),
    right: normalizeWidth(20),
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

export default CurrentDayStreakBreakdown;
