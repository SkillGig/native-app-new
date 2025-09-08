import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';

const CourseButton = ({name, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <View style={styles.customButton}>
        <Text style={styles.buttonText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#815FC4',
    marginTop: normalizeHeight(12),
  },
  customButton: {
    paddingVertical: normalizeHeight(4),
    paddingHorizontal: normalizeWidth(16),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Lato',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default CourseButton;
