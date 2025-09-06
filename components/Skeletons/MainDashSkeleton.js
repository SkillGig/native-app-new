import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

// Simple responsive functions for the skeleton
const normalizeWidth = size => (screenWidth / 375) * size;
const normalizeHeight = size => (screenWidth / 375) * size;

// Shimmer Box component with Instagram-style animation
const ShimmerBox = ({width, height, borderRadius = 8, style = {}}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    );
    shimmerAnimation.start();
    return () => shimmerAnimation.stop();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
        },
        style,
      ]}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          transform: [{translateX}],
        }}
      />
    </View>
  );
};

const MainDashSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.profileContainer}>
          <ShimmerBox
            width={normalizeWidth(50)}
            height={normalizeHeight(50)}
            borderRadius={25}
          />
          <View style={styles.profileTextContainer}>
            <ShimmerBox
              width={normalizeWidth(80)}
              height={normalizeHeight(14)}
              borderRadius={4}
              style={styles.textSpacing}
            />
            <ShimmerBox
              width={normalizeWidth(120)}
              height={normalizeHeight(18)}
              borderRadius={4}
            />
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <ShimmerBox
            width={normalizeWidth(24)}
            height={normalizeHeight(24)}
            borderRadius={12}
          />
          <ShimmerBox
            width={normalizeWidth(24)}
            height={normalizeHeight(24)}
            borderRadius={12}
            style={styles.iconSpacing}
          />
        </View>
      </View>

      {/* Streak Section */}
      <View style={styles.streakContainer}>
        <View style={styles.leftSection}>
          <ShimmerBox
            width={normalizeWidth(32)}
            height={normalizeHeight(32)}
            borderRadius={16}
          />
          <View style={styles.streakTextContainer}>
            <ShimmerBox
              width={normalizeWidth(30)}
              height={normalizeHeight(20)}
              borderRadius={4}
            />
            <ShimmerBox
              width={normalizeWidth(50)}
              height={normalizeHeight(12)}
              borderRadius={4}
              style={styles.textSpacing}
            />
          </View>
        </View>
        <View style={styles.calendarSection}>
          {[...Array(7)].map((_, index) => (
            <ShimmerBox
              key={index}
              width={normalizeWidth(8)}
              height={normalizeHeight(8)}
              borderRadius={4}
              style={styles.calendarDot}
            />
          ))}
        </View>
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <ShimmerBox
          width={normalizeWidth(150)}
          height={normalizeHeight(22)}
          borderRadius={4}
        />
        <ShimmerBox
          width={normalizeWidth(60)}
          height={normalizeHeight(14)}
          borderRadius={4}
        />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {[...Array(4)].map((_, index) => (
          <ShimmerBox
            key={index}
            width={normalizeWidth(70)}
            height={normalizeHeight(32)}
            borderRadius={16}
            style={styles.filterTab}
          />
        ))}
      </View>

      {/* Course Cards */}
      <View style={styles.courseCardsContainer}>
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.courseCard}>
            <ShimmerBox
              width={normalizeWidth(100)}
              height={normalizeHeight(80)}
              borderRadius={12}
            />
            <View style={styles.courseCardContent}>
              <ShimmerBox
                width={normalizeWidth(180)}
                height={normalizeHeight(16)}
                borderRadius={4}
                style={styles.textSpacing}
              />
              <ShimmerBox
                width={normalizeWidth(140)}
                height={normalizeHeight(12)}
                borderRadius={4}
                style={styles.textSpacing}
              />
              <ShimmerBox
                width={normalizeWidth(100)}
                height={normalizeHeight(8)}
                borderRadius={4}
                style={styles.progressBarSpacing}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeWidth(20),
    paddingTop: normalizeHeight(40),
    backgroundColor: '#300B73',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalizeHeight(24),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTextContainer: {
    marginLeft: normalizeWidth(12),
  },
  textSpacing: {
    marginBottom: normalizeHeight(6),
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: normalizeWidth(16),
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: normalizeWidth(16),
    padding: normalizeWidth(16),
    marginBottom: normalizeHeight(24),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakTextContainer: {
    marginLeft: normalizeWidth(12),
  },
  calendarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarDot: {
    marginHorizontal: normalizeWidth(3),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalizeHeight(20),
  },
  filterTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: normalizeHeight(24),
  },
  filterTab: {
    marginHorizontal: normalizeWidth(4),
  },
  courseCardsContainer: {
    flex: 1,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: normalizeWidth(16),
    padding: normalizeWidth(16),
    marginBottom: normalizeHeight(16),
  },
  courseCardContent: {
    flex: 1,
    marginLeft: normalizeWidth(16),
    justifyContent: 'center',
  },
  progressBarSpacing: {
    marginTop: normalizeHeight(8),
  },
});

export default MainDashSkeleton;
