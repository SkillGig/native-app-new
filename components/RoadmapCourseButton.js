import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';

const RoadmapCourseButton = () => {
  return (
    <View style={styles.container}>
      <BlurView
        style={styles.blurBackground}
        blurType={'dark'}
        blurAmount={3}
      />

      {/* Glassmorphism overlay */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(8),
    borderRadius: 24,
  },
  glassContainer: {},
  blurBackground: {
    borderRadius: 24,
    height: normalizeHeight(60),
    backgroundColor: 'rgba(255, 255, 255)',
    overflow: 'hidden',
    zIndex: 10,
  },
});

export default RoadmapCourseButton;
