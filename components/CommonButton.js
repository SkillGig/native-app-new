import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';

const CommonButton = ({
  name,
  onPress,
  disabled = false,
  loading = false,
  style = {},
  textStyle = {},
}) => {
  const effectiveDisabled = disabled || loading;
  return (
    <TouchableOpacity
      disabled={effectiveDisabled}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: !effectiveDisabled
            ? '#563593'
            : 'rgba(255,255,255,0.2)',
          opacity: !effectiveDisabled ? 1 : 0.5,
        },
        style,
      ]}
      activeOpacity={effectiveDisabled ? 1 : 0.8}>
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator
            color="#EADDFF"
            size="small"
            style={{marginRight: 8}}
          />
          <Text style={[styles.text, textStyle]} allowFontScaling={false}>
            Please wait...
          </Text>
        </View>
      ) : (
        <Text style={[styles.text, textStyle]} allowFontScaling={false}>
          {name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

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
  loadingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CommonButton;
