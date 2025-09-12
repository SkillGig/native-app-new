import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, ScrollView, Dimensions} from 'react-native';
import {normalizeHeight, normalizeWidth} from '../Responsivescreen';

const {width: screenWidth} = Dimensions.get('window');

// Shimmer Box component
const ShimmerBox = ({width, height, borderRadius = 8, style = {}}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Convert width to numeric value for animation
  const numericWidth =
    typeof width === 'string' && width.includes('%')
      ? (parseFloat(width) / 100) * screenWidth // Calculate actual width from percentage
      : typeof width === 'number'
      ? width
      : normalizeWidth(100); // Default fallback

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
    outputRange: [-numericWidth, numericWidth],
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
        },
        style,
      ]}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          transform: [{translateX}],
        }}
      />
    </View>
  );
};

// Header skeleton
const HeaderSkeleton = () => (
  <View style={styles.header}>
    <ShimmerBox width={20} height={20} borderRadius={4} />
    <ShimmerBox
      width={normalizeWidth(140)}
      height={normalizeHeight(20)}
      borderRadius={4}
    />
    <ShimmerBox width={20} height={20} borderRadius={4} />
  </View>
);

// Progress card skeleton
const ProgressCardSkeleton = () => (
  <View style={styles.progressCard}>
    <View style={styles.progressHeader}>
      <ShimmerBox
        width={normalizeWidth(180)}
        height={normalizeHeight(20)}
        borderRadius={4}
      />
      <ShimmerBox
        width={normalizeWidth(60)}
        height={normalizeHeight(16)}
        borderRadius={4}
      />
    </View>

    <ShimmerBox
      width="100%"
      height={normalizeHeight(8)}
      borderRadius={4}
      style={{marginVertical: normalizeHeight(12)}}
    />

    <View style={styles.progressDetails}>
      <ShimmerBox
        width={normalizeWidth(100)}
        height={normalizeHeight(14)}
        borderRadius={4}
      />
      <ShimmerBox
        width={normalizeWidth(80)}
        height={normalizeHeight(14)}
        borderRadius={4}
      />
    </View>
  </View>
);

// Filter tabs skeleton
const FilterTabsSkeleton = () => (
  <View style={styles.filterContainer}>
    {['All', 'In Progress', 'Completed'].map((_, index) => (
      <ShimmerBox
        key={index}
        width={normalizeWidth(70 + index * 20)}
        height={normalizeHeight(36)}
        borderRadius={18}
        style={{marginRight: normalizeWidth(12)}}
      />
    ))}
  </View>
);

// Course card skeleton for ongoing courses
const OngoingCourseCardSkeleton = () => (
  <View style={styles.courseCard}>
    <View style={styles.courseCardHeader}>
      <ShimmerBox
        width={normalizeWidth(60)}
        height={normalizeHeight(60)}
        borderRadius={8}
      />
      <View style={styles.courseCardInfo}>
        <ShimmerBox
          width={normalizeWidth(160)}
          height={normalizeHeight(18)}
          borderRadius={4}
          style={{marginBottom: normalizeHeight(6)}}
        />
        <ShimmerBox
          width={normalizeWidth(120)}
          height={normalizeHeight(14)}
          borderRadius={4}
          style={{marginBottom: normalizeHeight(8)}}
        />

        {/* Progress indicator */}
        <View style={styles.progressIndicator}>
          <ShimmerBox
            width="100%"
            height={normalizeHeight(6)}
            borderRadius={3}
          />
        </View>

        <View style={styles.courseMetrics}>
          <ShimmerBox
            width={normalizeWidth(80)}
            height={normalizeHeight(12)}
            borderRadius={4}
          />
          <ShimmerBox
            width={normalizeWidth(60)}
            height={normalizeHeight(12)}
            borderRadius={4}
          />
        </View>
      </View>
    </View>
  </View>
);

// Achievement cards skeleton
const AchievementSkeleton = () => (
  <View style={styles.achievementSection}>
    <ShimmerBox
      width={normalizeWidth(120)}
      height={normalizeHeight(20)}
      borderRadius={4}
      style={{marginBottom: normalizeHeight(16)}}
    />

    <View style={styles.achievementCards}>
      {[...Array(3)].map((_, index) => (
        <View key={index} style={styles.achievementCard}>
          <ShimmerBox
            width={normalizeWidth(40)}
            height={normalizeHeight(40)}
            borderRadius={20}
            style={{marginBottom: normalizeHeight(8)}}
          />
          <ShimmerBox
            width={normalizeWidth(60)}
            height={normalizeHeight(14)}
            borderRadius={4}
            style={{marginBottom: normalizeHeight(4)}}
          />
          <ShimmerBox
            width={normalizeWidth(30)}
            height={normalizeHeight(12)}
            borderRadius={4}
          />
        </View>
      ))}
    </View>
  </View>
);

const OngoingCoursesSkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <HeaderSkeleton />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProgressCardSkeleton />
        <FilterTabsSkeleton />

        {/* Course list */}
        <View style={styles.coursesList}>
          {[...Array(4)].map((_, index) => (
            <OngoingCourseCardSkeleton key={index} />
          ))}
        </View>

        <AchievementSkeleton />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090215',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(16),
  },
  progressCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(211, 196, 239, 0.2)',
    padding: normalizeWidth(20),
    marginHorizontal: normalizeWidth(20),
    marginBottom: normalizeHeight(24),
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: normalizeWidth(20),
    marginBottom: normalizeHeight(20),
  },
  coursesList: {
    paddingHorizontal: normalizeWidth(20),
  },
  courseCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(211, 196, 239, 0.2)',
    padding: normalizeWidth(16),
    marginBottom: normalizeHeight(16),
  },
  courseCardHeader: {
    flexDirection: 'row',
  },
  courseCardInfo: {
    flex: 1,
    marginLeft: normalizeWidth(16),
  },
  progressIndicator: {
    marginBottom: normalizeHeight(8),
  },
  courseMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementSection: {
    paddingHorizontal: normalizeWidth(20),
    marginTop: normalizeHeight(24),
  },
  achievementCards: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievementCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(211, 196, 239, 0.2)',
    padding: normalizeWidth(16),
    width: normalizeWidth(100),
  },
});

export default OngoingCoursesSkeletonLoader;
