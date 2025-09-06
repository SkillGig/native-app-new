import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, FlatList, Animated} from 'react-native';
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
const TabSeparator = () => <View style={styles.tabSeparator} />;

const FilterTabsSkeleton = () => {
  // Create dummy data with varying widths to simulate different tab lengths
  const skeletonTabs = [
    {id: '1', width: normalizeWidth(60)}, // "Design"
    {id: '2', width: normalizeWidth(70)}, // "Coding"
    {id: '3', width: normalizeWidth(140)}, // "Full stack development"
    {id: '4', width: normalizeWidth(90)}, // "Computer Science"
    {id: '5', width: normalizeWidth(80)}, // "Marketing"
  ];

  const renderFilterTab = ({item}) => (
    <ShimmerBox
      width={item.width}
      height={normalizeHeight(32)}
      borderRadius={16}
      style={styles.filterTab}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={skeletonTabs}
        renderItem={renderFilterTab}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={TabSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalizeHeight(10),
  },
  flatListContent: {
    paddingHorizontal: normalizeWidth(20),
  },
  tabSeparator: {
    width: normalizeWidth(8),
  },
  filterTab: {},
});

export default FilterTabsSkeleton;
