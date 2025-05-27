import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useRef} from 'react';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {ThemeContext} from '../src/context/ThemeContext';

const CompTextInput = props => {
  const {
    label,
    label2,
    onPress,
    editable,
    labelstyle,
    noteRight,
    noteLeft,
    infoText = false,
    errorMessage,
    inputstyle,
    opacity = 1,
  } = props;
  const textInRef = useRef(null);
  const {isDark, colors} = useContext(ThemeContext);
  return (
    <View
      pointerEvents={!onPress && editable === false ? 'none' : 'auto'}
      style={{opacity: opacity}}>
      {label ? (
        <View style={[styles.label, {}]}>
          {label ? (
            <>
              <Text
                style={
                  labelstyle
                    ? labelstyle
                    : {
                        color: isDark ? '#D6C0FD' : '#200A47',
                        fontSize: 12,
                        fontWeight: '600',
                      }
                }>
                {label}
                <Text style={styles.label2}>{label2}</Text>
              </Text>
            </>
          ) : null}
          <Text style={styles.note}>{noteRight ? noteRight : noteLeft}</Text>
        </View>
      ) : null}
      <TouchableOpacity
        onPress={() => (onPress ? onPress() : textInRef.current.focus())}
        accessible={false}>
        <TextInput
          ref={textInRef}
          style={[
            inputstyle
              ? inputstyle
              : {
                  paddingLeft: normalizeWidth(-4),
                  fontSize: 16,
                  fontWeight: '700',
                  borderBottomWidth: 1,
                  borderBottomColor: isDark ? 'white' : '#4F378A',
                  color: isDark
                    ? 'rgba(255, 255, 255, 0.87)'
                    : 'rgba(0, 0, 0, 0.87)',
                },
          ]}
          placeholderTextColor={
            isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.28)'
          }
          color={isDark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)'}
          returnKeyType={'done'}
          {...props}
        />
      </TouchableOpacity>

      <Text
        style={[
          {
            color: 'red',
            textAlign: 'right',
            fontSize: 12,
            zIndex: 2,
          },
          {
            paddingLeft: infoText ? normalizeWidth(0) : normalizeWidth(0),
            color: infoText
              ? isDark
                ? 'rgba(255, 255, 255, 0.54)'
                : 'rgba(0, 0, 0, 0.54)'
              : 'red',

            textAlign: infoText ? 'left' : 'right',
          },
        ]}>
        {errorMessage ? errorMessage : '  '}
      </Text>
    </View>
  );
};

export default CompTextInput;

const styles = StyleSheet.create({
  label2: {
    color: 'rgba(255, 255, 255, 0.42)',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    //  paddingBottom: normalizeHeight(4),
    fontSize: 12,
    fontWeight: '600',
  },
  note: {
    color: 'rgba(255, 255, 255, 0.42)',
    fontSize: 11,
  },
});
