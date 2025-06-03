import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';

const CommonButton = ({
  name,
  onPress,
  disabled = false,
  loading = false,
  style = {},
  textStyle = {},
}) => (
  <TouchableOpacity
    disabled={disabled || loading}
    onPress={onPress}
    style={[
      styles.button,
      {
        backgroundColor: !disabled ? '#563593' : 'rgba(255,255,255,0.2)',
        opacity: !disabled ? 1 : 0.3,
      },
      style,
    ]}
  >
    <Text style={[styles.text, textStyle]}>
      {loading ? 'Please wait...' : name}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: normalizeHeight(12),
    borderRadius: normalizeWidth(12),
    marginTop: normalizeHeight(260),
    alignItems: 'center',
  },
  text: {
    color: '#EADDFF',
    fontSize: normalizeWidth(16),
    fontWeight: '700',
  },
});

export default CommonButton;