import {StyleSheet} from 'react-native';
import {normalizeHeight, normalizeWidth} from '../components/Responsivescreen';

// This is now a FUNCTION
export const getFontStyles = (isDark, colors) =>
  StyleSheet.create({
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
      color: 'white',
    },
    mediumTen: {
      fontSize: 10,
      fontWeight: '500',
      color: 'white',
    },
    boldTwelwe: {
      fontSize: 12,
      fontWeight: '700',
      color: 'white',
    },
    twelweRegular: {
      fontSize: 12,
      fontWeight: '400',
      color: 'white',
    },
    semiTwelwe: {
      fontSize: 12,
      fontWeight: '600',
      color: 'white',
    },
    boldSixteen: {
      fontSize: 16,
      fontWeight: '700',
      color: 'white',
    },
    boldFourteen: {
      fontSize: 14,
      fontWeight: '700',
      color: 'white',
    },
    extraBoldFourteen: {
      fontSize: 14,
      fontWeight: '800',
      color: 'white',
    },
    semiFourteen: {
      fontSize: 14,
      fontWeight: '600',
      color: 'white',
    },
    regularSixteen: {
      fontSize: 16,
      fontWeight: '400',
      color: 'white',
    },
    heavyTwenty: {
      fontSize: 20,
      fontWeight: '900',
      color: 'white',
    },
    heavyTwentyFour: {
      fontSize: 24,
      fontWeight: '900',
      color: 'white',
    },
    flexAlign: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flexAlignJustify:{
      flexDirection: 'row', alignItems: 'center',justifyContent:"space-between"
     },
     line:{
      height:normalizeHeight(1),
      backgroundColor:'#D3C4EF',
      width:"100%"
     },
  });
