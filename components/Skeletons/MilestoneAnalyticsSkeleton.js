import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {normalizeHeight, normalizeWidth} from '../Responsivescreen';

// Reuse shimmer pattern from MilestonesSkeleton
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
          backgroundColor: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        },
        style,
      ]}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255,255,255,0.25)',
          transform: [{translateX}],
        }}
      />
    </View>
  );
};

const MilestoneAnalyticsSkeleton = ({width = normalizeWidth(318)}) => {
  const fullWidth = width - 32; // inside padding
  const halfWidth = (fullWidth - 32) / 2; // gap between halves

  return (
    <View style={styles.container}>
      {/* Full-width Problems Solved placeholder */}
      <View style={styles.cardWrapper}>
        <ShimmerBox
          width={fullWidth}
          height={normalizeHeight(120)}
          borderRadius={12}
        />
      </View>

      {/* Row with two halves: Hours and Quiz / or button */}
      <View style={styles.row}>
        <ShimmerBox
          width={halfWidth}
          height={normalizeHeight(96)}
          borderRadius={12}
        />
        <ShimmerBox
          width={halfWidth}
          height={normalizeHeight(96)}
          borderRadius={12}
        />
      </View>

      {/* Button placeholder */}
      <View style={styles.buttonWrapper}>
        <ShimmerBox
          width={normalizeWidth(180)}
          height={normalizeHeight(48)}
          borderRadius={24}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalizeWidth(16),
    marginTop: normalizeHeight(16),
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(229, 220, 246, 0.40)',
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '90%',
    marginHorizontal: '5%',
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: normalizeHeight(16),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: normalizeWidth(16),
    marginBottom: normalizeHeight(18),
  },
  buttonWrapper: {alignItems: 'center', width: '100%'},
});

export default MilestoneAnalyticsSkeleton;
