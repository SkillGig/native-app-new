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

const HeaderSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        {/* Avatar */}
        <ShimmerBox
          width={normalizeWidth(48)}
          height={normalizeHeight(48)}
          borderRadius={24}
          style={styles.avatar}
        />

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <ShimmerBox
            width={normalizeWidth(100)}
            height={normalizeHeight(16)}
            borderRadius={4}
            style={styles.greeting}
          />
          <ShimmerBox
            width={normalizeWidth(80)}
            height={normalizeHeight(20)}
            borderRadius={4}
            style={styles.name}
          />
        </View>
      </View>

      {/* Right Icons */}
      <View style={styles.iconsContainer}>
        <ShimmerBox
          width={normalizeWidth(24)}
          height={normalizeHeight(24)}
          borderRadius={12}
          style={styles.iconSpacing}
        />
        <ShimmerBox
          width={normalizeWidth(24)}
          height={normalizeHeight(24)}
          borderRadius={12}
          style={styles.iconSpacing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(20),
    paddingVertical: normalizeHeight(16),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: normalizeWidth(12),
  },
  profileInfo: {
    justifyContent: 'center',
  },
  greeting: {
    marginBottom: normalizeHeight(6),
  },
  name: {},
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: normalizeWidth(16),
  },
});

export default HeaderSkeleton;
