import { Text, StyleSheet, Platform } from 'react-native';
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
import { normalizeWidth, normalizeHeight } from './Responsivescreen';
import { ThemeContext } from '../src/context/ThemeContext';
const CmpCodeField = forwardRef(({ otpData, cas, verifyOtp = false, status = 'normal' }, ref) => {
 const { isDark, colors } = useContext(ThemeContext);
 const styles = StyleSheet.create({
  cell: {
    height: normalizeWidth(48),
    width: normalizeWidth(48),
    lineHeight: normalizeWidth(48),
    fontSize: 24,
    borderWidth: 1,
    borderColor: status === 'error'?
                 '#CB3A3A':status === 'success'? '#10684F': isDark ? '#5013C0' : '#B095E3',
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

  const CELL_COUNT = cas ? 6 : 4;
  const [value, setValue] = useState('');
  const codefieldref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useImperativeHandle(ref, () => ({
    clearOtp() {
      setValue('');
    },
  }));

  useEffect(() => {
    otpData(value);
  }, [value]);
  
  return (
    <>
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
        renderCell={({ index, symbol, isFocused }) => (
         <LinearGradient
         key={index}
         colors={
         status==='error'
          ? isDark
            ? ['#1C0743', '#CB3A3A'] // error + dark
            : ['#F6F3FC', '#FFA59C'] // error + light
          : status==='success'
            ? isDark
              ? ['#1C0743', '#009E4C'] // success + dark
              : ['#F6F3FC', '#93D8B4'] // success + light
            : isDark
              ? ['#1C0743','#1C0743'] // default + dark
              : ['#E5DCF6','#E5DCF6']
         }
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 1 }}
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
    </>
  );
});

export default CmpCodeField;