import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';

const SkeletonLoader = ({style}) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const opacity = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        style,
        {
          opacity,
        },
      ]}
    />
  );
};

const NotificationSkeleton = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonItem}>
        <View style={styles.skeletonLeft}>
          <SkeletonLoader style={styles.skeletonIcon} />
          <View style={styles.skeletonText}>
            <SkeletonLoader style={styles.skeletonTitle} />
            <SkeletonLoader style={styles.skeletonSubtitle} />
          </View>
        </View>
        <SkeletonLoader style={styles.skeletonRightIcon} />
      </View>
      <SkeletonLoader style={styles.skeletonDivider} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: 'rgba(176, 149, 227, 0.3)',
    borderRadius: 4,
  },
  skeletonContainer: {
    marginTop: normalizeHeight(12),
  },
  skeletonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalizeWidth(8),
  },
  skeletonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  skeletonIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    borderRadius: 12,
  },
  skeletonText: {
    marginLeft: normalizeWidth(18),
    flex: 1,
  },
  skeletonTitle: {
    height: normalizeHeight(12),
    width: '60%',
    marginBottom: normalizeHeight(6),
  },
  skeletonSubtitle: {
    height: normalizeHeight(16),
    width: '90%',
  },
  skeletonRightIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    borderRadius: 12,
  },
  skeletonDivider: {
    height: normalizeHeight(1),
    width: '100%',
    marginTop: normalizeHeight(12),
  },
});

export {SkeletonLoader, NotificationSkeleton};
