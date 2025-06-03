import {Text, StyleSheet, Platform} from 'react-native';
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import LinearGradient from 'react-native-linear-gradient';
import {normalizeWidth, normalizeHeight} from './Responsivescreen';
import {ThemeContext} from '../src/context/ThemeContext';

const CmpCodeField = forwardRef(
  (
    {
      otpData,
      cas,
      verifyOtp = false,
      status = 'normal',
      value: propValue = '', // <-- allow preset value
    },
    ref,
  ) => {
    const {isDark} = useContext(ThemeContext);
    const CELL_COUNT = cas ? 6 : 4;
    const [value, setValue] = useState(propValue);

    // Sync internal value with propValue (for presetting)
    useEffect(() => {
      if (typeof propValue === 'string' && propValue !== value) {
        setValue(propValue);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propValue]);

    // Call otpData callback on value change
    useEffect(() => {
      otpData && otpData(value);
    }, [value, otpData]);

    // Expose clearOtp method via ref
    useImperativeHandle(ref, () => ({
      clearOtp() {
        setValue('');
      },
    }));

    const styles = StyleSheet.create({
      cell: {
        height: normalizeWidth(48),
        width: normalizeWidth(48),
        lineHeight: normalizeWidth(48),
        fontSize: 24,
        borderWidth: 1,
        borderColor:
          status === 'error'
            ? '#CB3A3A'
            : status === 'success'
            ? '#10684F'
            : isDark
            ? '#5013C0'
            : '#B095E3',
        borderRadius: 10,
        textAlign: 'center',
        color: isDark ? 'white' : '#090215',
        backgroundColor:
          status === 'error'
            ? '#FFCDD2'
            : status === 'success'
            ? '#C8E6C9'
            : isDark
            ? '#1C0743'
            : '#E5DCF6',
      },
      focusCell: {
        borderColor: '#B095E3',
      },
    });

    const codefieldref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

    return (
      <CodeField
        ref={codefieldref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={{
          width: verifyOtp
            ? '85%'
            : normalizeWidth(48) * CELL_COUNT + normalizeWidth(40),
        }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({
          android: 'sms-otp',
          default: 'one-time-code',
        })}
        importantForAutofill="yes"
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <LinearGradient
            key={index}
            colors={
              status === 'error'
                ? isDark
                  ? ['#1C0743', '#CB3A3A']
                  : ['#F6F3FC', '#FFA59C']
                : status === 'success'
                ? isDark
                  ? ['#1C0743', '#009E4C']
                  : ['#F6F3FC', '#93D8B4']
                : isDark
                ? ['#1C0743', '#1C0743']
                : ['#E5DCF6', '#E5DCF6']
            }
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            <Text
              style={{
                textAlign: 'center',
                lineHeight: normalizeWidth(48),
                fontSize: 24,
                color: isDark ? 'white' : '#090215',
              }}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </LinearGradient>
        )}
      />
    );
  },
);

export default CmpCodeField;
