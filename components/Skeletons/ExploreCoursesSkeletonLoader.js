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
      width={normalizeWidth(120)}
      height={normalizeHeight(20)}
      borderRadius={4}
    />
    <ShimmerBox width={20} height={20} borderRadius={4} />
  </View>
);

// Search bar skeleton
const SearchBarSkeleton = () => (
  <View style={styles.searchContainer}>
    <ShimmerBox width="100%" height={normalizeHeight(48)} borderRadius={24} />
  </View>
);

// Filter tabs skeleton
const FilterTabsSkeleton = () => (
  <View style={styles.filterContainer}>
    {[...Array(3)].map((_, index) => (
      <ShimmerBox
        key={index}
        width={normalizeWidth(80 + index * 20)}
        height={normalizeHeight(36)}
        borderRadius={18}
        style={{marginRight: normalizeWidth(12)}}
      />
    ))}
  </View>
);

// Course card skeleton
const CourseCardSkeleton = () => (
  <View style={styles.courseCard}>
    {/* Course Image */}
    <ShimmerBox
      width={normalizeWidth(160)}
      height={normalizeHeight(120)}
      borderRadius={12}
    />

    {/* Course Info */}
    <View style={styles.courseInfo}>
      <ShimmerBox
        width="80%"
        height={normalizeHeight(16)}
        borderRadius={4}
        style={{marginBottom: normalizeHeight(4)}}
      />
      <ShimmerBox
        width="100%"
        height={normalizeHeight(20)}
        borderRadius={4}
        style={{marginBottom: normalizeHeight(8)}}
      />
      <ShimmerBox
        width="60%"
        height={normalizeHeight(20)}
        borderRadius={4}
        style={{marginBottom: normalizeHeight(8)}}
      />

      {/* Rating and details */}
      <View style={styles.courseDetails}>
        <View style={styles.ratingRow}>
          {[...Array(5)].map((_, index) => (
            <ShimmerBox
              key={index}
              width={12}
              height={12}
              borderRadius={2}
              style={{marginRight: normalizeWidth(2)}}
            />
          ))}
          <ShimmerBox
            width={normalizeWidth(40)}
            height={normalizeHeight(14)}
            borderRadius={4}
            style={{marginLeft: normalizeWidth(8)}}
          />
        </View>

        <View style={styles.detailsRow}>
          <ShimmerBox
            width={normalizeWidth(60)}
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
    </View>
  </View>
);

// Course grid skeleton
const CourseGridSkeleton = () => (
  <View style={styles.courseGrid}>
    {[...Array(6)].map((_, index) => (
      <CourseCardSkeleton key={index} />
    ))}
  </View>
);

const ExploreCoursesSkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <HeaderSkeleton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBarSkeleton />
        <FilterTabsSkeleton />
        <CourseGridSkeleton />
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
  searchContainer: {
    paddingHorizontal: normalizeWidth(20),
    marginBottom: normalizeHeight(20),
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: normalizeWidth(20),
    marginBottom: normalizeHeight(24),
  },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(20),
  },
  courseCard: {
    width: normalizeWidth(160),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(211, 196, 239, 0.2)',
    padding: normalizeWidth(12),
    marginBottom: normalizeHeight(16),
  },
  courseInfo: {
    marginTop: normalizeHeight(12),
  },
  courseDetails: {
    marginTop: normalizeHeight(8),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalizeHeight(6),
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ExploreCoursesSkeletonLoader;
