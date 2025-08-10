import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';

const FooterBtn = ({onPress, label = 'Submit', style = {}, textStyle = {}}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#563593',
        paddingVertical: normalizeHeight(12),
        borderRadius: normalizeWidth(12),
        marginTop: normalizeHeight(60),
        alignItems: 'center',
        ...style,
      }}
      onPress={onPress}>
      <Text
        style={{
          color: '#815FC4',
          fontSize: normalizeWidth(16),
          fontWeight: '700',
          ...textStyle,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FooterBtn;
