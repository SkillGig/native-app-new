import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Dimensions, FlatList, Animated} from 'react-native';
import {normalizeHeight, normalizeWidth} from '../Responsivescreen';

// ShimmerBox copied to match the existing shimmer used in MainDashSkeleton
const {width: screenWidth} = Dimensions.get('window');
// helpers not needed here

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

const MilestonesSkeleton = ({count = 3}) => {
  const cardWidth = normalizeWidth(318); // 90% of screen width
  const cardHeight = normalizeHeight(331); // fixed height as requested

  const data = Array.from({length: count}).map((_, i) => ({id: String(i)}));

  const renderItem = () => (
    <View style={[styles.cardContainer]}>
      <View style={styles.cardHeader}>
        {/* Shimmer only for the heading */}
        <ShimmerBox
          width={Math.round(cardWidth * 0.55)}
          height={28}
          borderRadius={6}
        />
        {/* keep the icon area empty/static to satisfy "only heading shimmers" requirement */}
        <View style={styles.iconPlaceholder} />
      </View>

      {/* the rest of the card now shows shimmer as well */}
      <ShimmerBox
        width={Math.round(cardWidth - 32)}
        height={Math.round(cardHeight - 72)}
        borderRadius={8}
        style={{marginTop: 16}}
      />
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View
            style={{
              marginLeft: index === 0 ? 16 : 8,
              marginRight: index === data.length - 1 ? 16 : 16,
            }}>
            {renderItem(item)}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: 'rgba(229, 220, 246, 0.40)',
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  cardBody: {
    flex: 1,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
});

export default MilestonesSkeleton;
