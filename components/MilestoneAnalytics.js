import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../assets/images';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import MilestoneAnalyticsSkeleton from './Skeletons/MilestoneAnalyticsSkeleton';

const MilestoneAnalytics = ({
  data = {},
  fontStyles = {},
  onViewAnalytics,
  loading = false,
}) => {
  const {problemsSolved = 0, hoursSpent = 0, quizzesCompleted = 0} = data;

  if (loading) {
    return <MilestoneAnalyticsSkeleton />;
  }

  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.baseBackground}>
        <LinearGradient
          colors={['rgba(48, 11, 115, 0.50)', 'rgba(9, 2, 21, 0.50)']}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1.2}}
          style={styles.gradientLayer}>
          <Text style={[fontStyles.heavyTwenty, styles.analyticsTitle]}>
            Analytics
          </Text>
          <View style={styles.analyticsDivider} />

          <LinearGradient
            colors={['rgba(129, 95, 196, 0.26)', 'rgba(129, 95, 196, 0.26)']}
            style={styles.cardOne}>
            <View style={styles.innerOverlay}>
              <Text style={styles.metricValue}>{problemsSolved}</Text>
              <Text style={fontStyles.semiFourteen}>Problems Solved</Text>
            </View>
          </LinearGradient>

          <View style={styles.analyticsStatsRow}>
            <View style={styles.analyticsBox}>
              <Text style={styles.metricValue}>{hoursSpent}</Text>
              <Text style={fontStyles.semiFourteen}>Hours Spent</Text>
            </View>
            <View style={styles.analyticsBox}>
              <Text style={styles.metricValue}>{quizzesCompleted}</Text>
              <Text style={fontStyles.semiFourteen}>Quiz Completed</Text>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.viewAnalyticsBtn}
              onPress={onViewAnalytics}>
              <Text style={styles.viewAnalyticsText}>View Analytics</Text>
              <Image
                source={images.BACKICON}
                style={styles.viewLeaderboardIcon}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewLeaderboardIcon: {
    height: normalizeHeight(16),
    width: normalizeWidth(16),
    resizeMode: 'contain',
    transform: [{scaleX: -1}],
  },
  shadowWrapper: {
    marginHorizontal: normalizeWidth(18),
    borderRadius: 24,
  },
  baseBackground: {
    backgroundColor: '#0A0A0A',
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradientLayer: {padding: 16},
  analyticsTitle: {color: '#B095E3', textAlign: 'center'},
  analyticsDivider: {
    backgroundColor: 'rgba(129, 95, 196, 0.30)',
    height: normalizeHeight(1),
    width: '100%',
    marginVertical: normalizeHeight(12),
  },
  cardOne: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5013C0',
    overflow: 'hidden',
  },
  innerOverlay: {
    backgroundColor: 'rgba(10, 10, 10, 0.30)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricValue: {
    color: '#E5DCF6',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: normalizeHeight(12),
  },
  analyticsStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalizeHeight(16),
    justifyContent: 'space-between',
  },
  analyticsBox: {
    width: '48%',
    borderColor: '#5013C0',
    borderWidth: 1,
    backgroundColor: 'rgba(129, 95, 196, 0.26)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  viewAnalyticsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalizeHeight(8),
    justifyContent: 'center',
    backgroundColor: '#815FC4',
    borderRadius: 12,
    marginTop: normalizeHeight(26),
    marginBottom: normalizeHeight(23),
    paddingHorizontal: normalizeWidth(12),
  },
  viewAnalyticsText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginRight: normalizeWidth(8),
  },
  completedCoursesHeader: {
    marginTop: normalizeHeight(42),
    paddingHorizontal: normalizeWidth(20),
  },
});

export default MilestoneAnalytics;
