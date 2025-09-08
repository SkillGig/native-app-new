import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {normalizeHeight} from './Responsivescreen';

const ProgressBar = ({
  percentage = 0,
  fillColors = ['#B095E3', '#6C3DF4'], // Default gradient colors
  backgroundColor = 'rgba(255, 255, 255, 0.2)', // Default background color
  height = 4,
  borderRadius = 2,
  style,
}) => {
  // Ensure percentage is between 0 and 100
  const normalizedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <View style={[styles.container, {height: normalizeHeight(height)}, style]}>
      {/* Background bar */}
      <View
        style={[
          styles.backgroundBar,
          {
            backgroundColor,
            borderRadius: normalizeHeight(borderRadius),
            height: normalizeHeight(height),
          },
        ]}
      />

      {/* Progress fill */}
      <LinearGradient
        colors={fillColors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          styles.progressFill,
          {
            width: `${normalizedPercentage}%`,
            borderRadius: normalizeHeight(borderRadius),
            height: normalizeHeight(height),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  backgroundBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
  },
});

export default ProgressBar;
