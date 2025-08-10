import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export const CircularProgress = ({
  size = size?size:36,
  strokeWidth = 4,
  value = 2,
  maxProgress = 4,
  textStyle
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(value, maxProgress);
  const progressPercent = clampedValue / maxProgress;
  const strokeDashoffset = circumference * (1 - progressPercent);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          stroke={'rgba(211, 196, 239, 0.20)'}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={"#B095E3"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={[{ fontSize: 10, fontWeight: '500', color: "#EEE7F9" }, textStyle]}>
          {clampedValue}/{maxProgress}
        </Text>
      </View>
    </View>
  );
};

