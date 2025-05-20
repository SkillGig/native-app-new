import {StyleSheet} from 'react-native';
import {normalizeHeight, normalizeWidth} from '../components/Responsivescreen';
import {useContext} from 'react';
import {ThemeContext} from '../src/context/ThemeContext';
const {isDark, colors} = useContext(ThemeContext);
export const fstyles = StyleSheet.create({
  thirtyTwoHeavy: {
    fontSize: 32,
    fontWeight: '900',
    color: isDark ? 'white' : '#300B73',
  },
  thirteenMedium: {
    fontSize: 13,
    fontWeight: '500',
    color: isDark ? 'white' : '#300B73',
  },
  twentyBold: {
   fontSize: 20,
   fontWeight: '700',
   color: '#300B73',
 },
 flexAlign:{
  flexDirection: 'row', alignItems: 'center'
 }
});

// 400- regular
// 500-medium
// 600- semiBold
// 700-bold
// 800-extraBold
// 900-heavy
