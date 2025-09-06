import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
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

const StreakSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Left Section - Fire icon and streak count */}
      <View style={styles.leftSection}>
        <ShimmerBox
          width={normalizeWidth(20)}
          height={normalizeHeight(20)}
          borderRadius={10}
          style={styles.fireIcon}
        />
        <ShimmerBox
          width={normalizeWidth(35)}
          height={normalizeHeight(14)}
          borderRadius={4}
          style={styles.streakText}
        />
      </View>

      {/* Week Calendar Section */}
      <View style={styles.weekSection}>
        <View style={styles.weekDays}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
            (day, index) => (
              <View key={index} style={styles.dayContainer}>
                <ShimmerBox
                  width={normalizeWidth(16)}
                  height={normalizeHeight(6)}
                  borderRadius={3}
                  style={styles.dayLabel}
                />
                <ShimmerBox
                  width={normalizeWidth(24)}
                  height={normalizeHeight(24)}
                  borderRadius={12}
                  style={styles.dayCircle}
                />
              </View>
            ),
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(12),
    marginHorizontal: normalizeWidth(20),
    marginVertical: normalizeHeight(8),
    minHeight: normalizeHeight(92),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: normalizeHeight(12),
  },
  fireIcon: {},
  streakText: {},
  weekSection: {
    flex: 1,
    marginLeft: normalizeWidth(20),
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '100%',
  },
  dayContainer: {
    alignItems: 'center',
    gap: normalizeHeight(4),
  },
  dayLabel: {},
  dayCircle: {},
});

export default StreakSkeleton;
