import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, ScrollView, Dimensions} from 'react-native';
import {normalizeHeight, normalizeWidth} from '../Responsivescreen';
import LinearGradient from 'react-native-linear-gradient';

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

// Header skeleton component
const HeaderSkeleton = () => (
  <View style={styles.headerContainer}>
    <View style={styles.headerContent}>
      <ShimmerBox width={20} height={20} borderRadius={4} />
      <ShimmerBox
        width={normalizeWidth(180)}
        height={normalizeHeight(20)}
        borderRadius={4}
        style={{marginLeft: normalizeWidth(8)}}
      />
    </View>
  </View>
);

// Background image skeleton
const BackgroundImageSkeleton = () => (
  <View style={styles.backgroundImageContainer}>
    <ShimmerBox width="100%" height={normalizeHeight(260)} borderRadius={0} />
  </View>
);

// Course header skeleton (title, description, rating)
const CourseHeaderSkeleton = () => (
  <View style={styles.courseHeaderContainer}>
    {/* Course Title */}
    <ShimmerBox
      width={normalizeWidth(280)}
      height={normalizeHeight(28)}
      borderRadius={6}
    />

    {/* Course Description */}
    <View style={styles.descriptionContainer}>
      <ShimmerBox
        width="100%"
        height={normalizeHeight(16)}
        borderRadius={4}
        style={{marginTop: normalizeHeight(8)}}
      />
      <ShimmerBox
        width="80%"
        height={normalizeHeight(16)}
        borderRadius={4}
        style={{marginTop: normalizeHeight(4)}}
      />
    </View>

    {/* Rating Section */}
    <View style={styles.ratingContainer}>
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <ShimmerBox
            key={index}
            width={12}
            height={12}
            borderRadius={2}
            style={{marginRight: normalizeWidth(2)}}
          />
        ))}
      </View>
      <ShimmerBox
        width={normalizeWidth(120)}
        height={normalizeHeight(16)}
        borderRadius={4}
        style={{marginLeft: normalizeWidth(8)}}
      />
    </View>

    {/* Course Details Chips */}
    <View style={styles.chipsContainer}>
      <View style={styles.chipsRow}>
        <ShimmerBox
          width={normalizeWidth(140)}
          height={normalizeHeight(32)}
          borderRadius={16}
        />
        <ShimmerBox
          width={normalizeWidth(80)}
          height={normalizeHeight(32)}
          borderRadius={16}
          style={{marginLeft: normalizeWidth(12)}}
        />
      </View>
      <View style={styles.chipsRow}>
        <ShimmerBox
          width={normalizeWidth(120)}
          height={normalizeHeight(32)}
          borderRadius={16}
        />
        <ShimmerBox
          width={normalizeWidth(100)}
          height={normalizeHeight(32)}
          borderRadius={16}
          style={{marginLeft: normalizeWidth(12)}}
        />
      </View>
    </View>
  </View>
);

// Tab navigation skeleton
const TabNavigationSkeleton = () => (
  <View style={styles.tabContainer}>
    {['Overview', 'Course content', 'Tutor Info', 'Reviews'].map((_, index) => (
      <View key={index} style={styles.tabItem}>
        <ShimmerBox
          width={normalizeWidth(80 + index * 20)}
          height={normalizeHeight(16)}
          borderRadius={4}
        />
        <View style={styles.tabIndicator}>
          <ShimmerBox
            width={normalizeWidth(80 + index * 20)}
            height={normalizeHeight(2)}
            borderRadius={1}
          />
        </View>
      </View>
    ))}
  </View>
);

// Content section skeleton
const ContentSectionSkeleton = () => (
  <View style={styles.contentContainer}>
    {/* Overview Section */}
    <View style={styles.sectionContainer}>
      <ShimmerBox
        width={normalizeWidth(100)}
        height={normalizeHeight(20)}
        borderRadius={4}
      />
      <View style={styles.overviewContent}>
        <ShimmerBox
          width="100%"
          height={normalizeHeight(16)}
          borderRadius={4}
          style={{marginTop: normalizeHeight(8)}}
        />
        <ShimmerBox
          width="90%"
          height={normalizeHeight(16)}
          borderRadius={4}
          style={{marginTop: normalizeHeight(4)}}
        />
        <ShimmerBox
          width="70%"
          height={normalizeHeight(16)}
          borderRadius={4}
          style={{marginTop: normalizeHeight(4)}}
        />
      </View>
      <ShimmerBox
        width={normalizeWidth(80)}
        height={normalizeHeight(16)}
        borderRadius={4}
        style={{marginTop: normalizeHeight(8)}}
      />
    </View>

    {/* Learning Points Section */}
    <View style={styles.sectionContainer}>
      <ShimmerBox
        width={normalizeWidth(180)}
        height={normalizeHeight(18)}
        borderRadius={4}
      />
      {[...Array(3)].map((_, index) => (
        <View key={index} style={styles.learningPoint}>
          <ShimmerBox
            width={normalizeWidth(16)}
            height={normalizeHeight(16)}
            borderRadius={8}
          />
          <ShimmerBox
            width={normalizeWidth(200 + index * 30)}
            height={normalizeHeight(16)}
            borderRadius={4}
            style={{marginLeft: normalizeWidth(12)}}
          />
        </View>
      ))}
    </View>

    {/* Skills Chips Section */}
    <View style={styles.sectionContainer}>
      <ShimmerBox
        width={normalizeWidth(120)}
        height={normalizeHeight(18)}
        borderRadius={4}
      />
      <View style={styles.skillsChipsContainer}>
        {[...Array(5)].map((_, index) => (
          <ShimmerBox
            key={index}
            width={normalizeWidth(80 + (index % 3) * 20)}
            height={normalizeHeight(28)}
            borderRadius={14}
            style={{
              marginRight: normalizeWidth(8),
              marginBottom: normalizeHeight(8),
            }}
          />
        ))}
      </View>
    </View>

    {/* Module Cards Section */}
    <View style={styles.sectionContainer}>
      <ShimmerBox
        width={normalizeWidth(140)}
        height={normalizeHeight(20)}
        borderRadius={4}
      />
      {[...Array(4)].map((_, index) => (
        <View key={index} style={styles.moduleCard}>
          <View style={styles.moduleHeader}>
            <View style={styles.moduleInfo}>
              <ShimmerBox
                width={normalizeWidth(80)}
                height={normalizeHeight(16)}
                borderRadius={4}
              />
              <ShimmerBox
                width={normalizeWidth(160)}
                height={normalizeHeight(20)}
                borderRadius={4}
                style={{marginTop: normalizeHeight(4)}}
              />
              <ShimmerBox
                width={normalizeWidth(200)}
                height={normalizeHeight(14)}
                borderRadius={4}
                style={{marginTop: normalizeHeight(4)}}
              />
            </View>
            <ShimmerBox
              width={normalizeWidth(16)}
              height={normalizeHeight(16)}
              borderRadius={8}
            />
          </View>
        </View>
      ))}
    </View>
  </View>
);

const VideoSectionSkeleton = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#300B73', '#090215']}
        locations={[0, 0.7]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFillObject}
      />

      <HeaderSkeleton />
      <BackgroundImageSkeleton />

      {/* Content Container */}
      <View style={styles.contentWrapper}>
        <LinearGradient
          colors={['#1C0743', '#090215']}
          locations={[0, 0.4]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.contentGradient}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CourseHeaderSkeleton />
            <TabNavigationSkeleton />
            <ContentSectionSkeleton />
          </ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: normalizeWidth(20),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    top: 64,
  },
  backgroundImageContainer: {
    alignItems: 'center',
  },
  courseHeaderContainer: {
    marginHorizontal: normalizeWidth(24),
    marginTop: normalizeHeight(32),
  },
  descriptionContainer: {
    marginTop: normalizeHeight(8),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalizeHeight(28),
  },
  starsContainer: {
    flexDirection: 'row',
  },
  chipsContainer: {
    marginTop: normalizeHeight(28),
  },
  chipsRow: {
    flexDirection: 'row',
    marginBottom: normalizeHeight(12),
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: normalizeWidth(24),
    paddingVertical: normalizeHeight(12),
    backgroundColor: '#090215',
  },
  tabItem: {
    marginRight: normalizeWidth(24),
  },
  tabIndicator: {
    marginTop: normalizeHeight(4),
  },
  contentWrapper: {
    flex: 1,
    marginTop: normalizeHeight(-64),
    zIndex: 20,
    position: 'relative',
  },
  contentGradient: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    paddingTop: normalizeHeight(16),
  },
  contentContainer: {
    paddingHorizontal: normalizeWidth(16),
    paddingBottom: normalizeHeight(32),
  },
  sectionContainer: {
    marginBottom: normalizeHeight(32),
  },
  overviewContent: {
    marginTop: normalizeHeight(16),
  },
  learningPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalizeHeight(12),
  },
  skillsChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: normalizeHeight(12),
  },
  moduleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(211, 196, 239, 0.2)',
    padding: normalizeWidth(16),
    marginTop: normalizeHeight(12),
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  moduleInfo: {
    flex: 1,
  },
});

export default VideoSectionSkeleton;
