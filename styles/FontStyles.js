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
   color:'white'
 },
 mediumTen: {
  fontSize: 10,
  fontWeight: '500',
  color:'white'
},

boldTwelwe: {
  fontSize: 12,
  fontWeight: '700',
  color:'white'
},

twelweRegular: {
  fontSize: 12,
  fontWeight: '400',
  color:'white'
},
semiTwelwe: {
  fontSize: 12,
  fontWeight: '600',
  color:'white'
},


boldSixteen: {
  fontSize: 16,
  fontWeight: '700',
  color:'white'
},
boldFourteen: {
  fontSize: 14,
  fontWeight: '700',
  color:'white'
},
regularSixteen: {
  fontSize: 16,
  fontWeight: '400',
  color:'white'
},
heavyTwenty: {
  fontSize: 20,
  fontWeight: '900',
  color:'white'
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
