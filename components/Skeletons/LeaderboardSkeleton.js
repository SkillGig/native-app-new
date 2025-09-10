import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, FlatList, Animated} from 'react-native';
import {normalizeHeight, normalizeWidth} from '../Responsivescreen';

// ShimmerBox copied to match MilestonesSkeleton appearance
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

const LeaderboardRowSkeleton = () => (
  <View style={styles.rowWrapper}>
    <View style={styles.cardSkeleton}>
      <View style={styles.rowContent}>
        <ShimmerBox
          width={normalizeWidth(200)}
          height={normalizeHeight(42)}
          borderRadius={40}
          style={{marginRight: normalizeWidth(12)}}
        />
      </View>
    </View>
    <ShimmerBox
      width={normalizeWidth(80)}
      height={normalizeHeight(40)}
      borderRadius={6}
      style={styles.rankSkeleton}
    />
  </View>
);

const LeaderboardSkeleton = ({count = 3}) => {
  const data = Array.from({length: count}).map((_, i) => ({id: String(i)}));
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={() => <LeaderboardRowSkeleton />}
    />
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    marginLeft: normalizeWidth(20),
    marginRight: normalizeWidth(16),
    marginBottom: normalizeHeight(12),
    position: 'relative',
  },
  cardSkeleton: {
    borderWidth: 1,
    borderColor: 'rgba(242, 223, 161, 0.50)',
    borderRadius: 50,
    height: normalizeHeight(68),
    justifyContent: 'center',
    width: normalizeWidth(285),
    overflow: 'hidden',
    zIndex: 1,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalizeWidth(12),
  },
  rankSkeleton: {
    position: 'absolute',
    right: 0,
    top: normalizeHeight(12),
    opacity: 0.2,
  },
});

export default LeaderboardSkeleton;
