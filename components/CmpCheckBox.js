
import React, { useContext } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { normalizeWidth,normalizeHeight } from './Responsivescreen';
// import Check from '../assets/images/svgs/Check_w';
import Check from '../assets/svgs/Check_w';
import { ThemeContext } from '../src/context/ThemeContext';

const CmpCheckBox = props => {
  const {
    value,
    onSelect,
    text,
    linkText,
    linkPress,
    text2,
    disabled,
    textStyle,
    linkTextStyle,
    extStyles = {},
  } = props;
  const { isDark, colors } = useContext(ThemeContext);
  const onClick = () => {
    onSelect(!value);
  };
  const backgroundColor = disabled
    ? 'transparent'
    : value
    ? 'blue'
    : 'transparent';
  const borderWidth = value ? normalizeWidth(0) : normalizeWidth(1);
  const borderColor = disabled
    ? 'white'
    : value
    ? 'blue'
    : 'white';
  return (
    <Pressable
      onPress={() => (disabled || linkPress ? null : onClick())}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={[styles.main, extStyles]}
      accessible={false}>
      <Pressable
        onPress={() => (disabled ? null : onClick())}
        style={[styles.box, { backgroundColor, borderColor, borderWidth }]}>
        {disabled ? null : value ? <Check /> : null}
      </Pressable>
      <Text style={[styles.textStyle, textStyle,{ color: colors.text }, ]}>
        {text}
        <Text
          hitslop={{ top: 100, bottom: 100, left: 100, right: 100 }}
          onPress={() => (linkPress ? linkPress() : null)}
          // style={{color: 'blue'}}
          style={[styles.linkTextStyle, linkTextStyle]}>
          {linkText}
        </Text>
        {text2}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    marginTop: normalizeHeight(24),
  },
  box: {
    height: normalizeHeight(18),
    width: normalizeHeight(18),
    borderRadius: normalizeHeight(2),
    alignItems: 'center',
    justifyContent: 'center',

    marginRight: normalizeWidth(8),
  },
  textStyle: {
    fontSize: 12,
    lineHeight: normalizeHeight(16),
    fontFamily: '400',
    letterSpacing: normalizeHeight(0.12),
    flexShrink: 1,
    fontStyle:"italic"
    // backgroundColor: "red"
  },
  linkTextStyle: {
    color: 'blue',
    fontSize: 12,
    fontFamily: '400',
  },
});
export default CmpCheckBox;