import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, FlatList} from 'react-native';
import {normalizeHeight, normalizeWidth} from '../Responsivescreen';

// Shimmer Box component
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

// Separator component for FlatList
const CardSeparator = () => <View style={styles.cardSeparator} />;

const OngoingCoursesSkeleton = () => {
  // Create dummy data for FlatList
  const skeletonData = [
    {id: '1'},
    {id: '2'},
    {id: '3'}, // Adding extra item to show scrolling
  ];

  const renderCourseCard = ({item, index}) => (
    <View style={styles.courseCard}>
      {/* Course Background/Image Area */}
      <View style={styles.courseImageContainer}>
        <ShimmerBox
          width={normalizeWidth(184)}
          height={normalizeHeight(100)}
          borderRadius={12}
          style={styles.courseBackground}
        />
      </View>

      {/* Course Content */}
      <View style={styles.courseContent}>
        {/* Course Title */}
        <ShimmerBox
          width={normalizeWidth(140)}
          height={normalizeHeight(18)}
          borderRadius={4}
          style={styles.courseTitle}
        />

        {/* Course Status Row with circle icon */}
        <View style={styles.courseStatusRow}>
          <ShimmerBox
            width={normalizeWidth(12)}
            height={normalizeHeight(12)}
            borderRadius={6}
            style={styles.statusIcon}
          />
          <ShimmerBox
            width={normalizeWidth(100)}
            height={normalizeHeight(14)}
            borderRadius={4}
            style={styles.statusText}
          />
        </View>

        {/* Progress Info Row - fraction and time */}
        <View style={styles.progressInfoRow}>
          <ShimmerBox
            width={normalizeWidth(70)}
            height={normalizeHeight(10)}
            borderRadius={4}
            style={styles.timeText}
          />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <ShimmerBox
            width={normalizeWidth(180)}
            height={normalizeHeight(6)}
            borderRadius={3}
          />
        </View>

        {/* Resume Course Button */}
        <ShimmerBox
          width={normalizeWidth(180)}
          height={normalizeHeight(36)}
          borderRadius={12}
          style={styles.resumeButton}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Horizontal FlatList for Course Cards */}
      <FlatList
        data={skeletonData}
        renderItem={renderCourseCard}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={CardSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: normalizeHeight(16),
  },
  sectionTitle: {
    marginBottom: normalizeHeight(16),
    marginHorizontal: normalizeWidth(20),
  },
  flatListContent: {
    paddingHorizontal: normalizeWidth(20),
  },
  cardSeparator: {
    width: normalizeWidth(16),
  },
  courseCard: {
    width: normalizeWidth(208),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: normalizeWidth(12),
  },
  courseImageContainer: {
    position: 'relative',
    marginBottom: normalizeHeight(12),
  },
  courseBackground: {},
  courseLogoContainer: {
    position: 'absolute',
    top: normalizeHeight(10),
    left: normalizeWidth(10),
  },
  courseContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  courseTitle: {
    marginBottom: normalizeHeight(8),
  },
  courseStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalizeHeight(6),
  },
  statusIcon: {
    marginRight: normalizeWidth(6),
  },
  statusText: {},
  progressInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalizeHeight(8),
  },
  progressFraction: {},
  timeText: {},
  progressBarContainer: {
    marginBottom: normalizeHeight(12),
  },
  resumeButton: {
    alignSelf: 'stretch',
  },
});

export default OngoingCoursesSkeleton;
