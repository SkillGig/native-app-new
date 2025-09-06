import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';

const ShimmerPlaceholder = ({
  width = 100,
  height = 20,
  borderRadius = 4,
  style = {},
  shimmerStyle = {},
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1200,
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
          backgroundColor: '#e1e9ee',
          overflow: 'hidden',
        },
        style,
      ]}>
      <Animated.View
        style={[
          {
            width: '100%',
            height: '100%',
            backgroundColor: '#f7f7f7',
            transform: [{translateX}],
          },
          shimmerStyle,
        ]}
      />
    </View>
  );
};

export default ShimmerPlaceholder;
