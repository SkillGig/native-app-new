import {StyleSheet} from 'react-native';
import {normalizeHeight} from '../components/Responsivescreen';

// Font family constants
const FONT_FAMILY = {
  thin: 'Lato-Thin',
  light: 'Lato-Light',
  regular: 'Lato-Regular',
  medium: 'Lato-Medium',
  semiBold: 'Lato-SemiBold',
  bold: 'Lato-Bold',
  extraBold: 'Lato-ExtraBold',
  black: 'Lato-Black',
};

// Export font family for use throughout the app
export {FONT_FAMILY};

// Helper function to get font family based on weight
const getFontFamily = weight => {
  switch (weight) {
    case '100':
      return FONT_FAMILY.thin;
    case '300':
      return FONT_FAMILY.light;
    case '400':
      return FONT_FAMILY.regular;
    case '500':
      return FONT_FAMILY.medium;
    case '600':
      return FONT_FAMILY.semiBold;
    case '700':
      return FONT_FAMILY.bold;
    case '800':
      return FONT_FAMILY.extraBold;
    case '900':
      return FONT_FAMILY.black;
    default:
      return FONT_FAMILY.regular;
  }
};

// This is now a FUNCTION with Lato font family applied
export const getFontStyles = colors =>
  StyleSheet.create({
    thirtyTwoHeavy: {
      fontSize: 32,
      fontWeight: '900',
      fontFamily: getFontFamily('900'),
      color: 'white',
    },
    thirteenMedium: {
      fontSize: 13,
      fontWeight: '500',
      fontFamily: getFontFamily('500'),
      color: 'white',
    },
    twentyBold: {
      fontSize: 20,
      fontWeight: '700',
      fontFamily: getFontFamily('700'),
      color: 'white',
    },
    mediumTen: {
      fontSize: 10,
      fontWeight: '500',
      fontFamily: getFontFamily('500'),
      color: 'white',
    },
    boldTwelwe: {
      fontSize: 12,
      fontWeight: '700',
      fontFamily: getFontFamily('700'),
      color: 'white',
    },
    twelweRegular: {
      fontSize: 12,
      fontWeight: '400',
      fontFamily: getFontFamily('400'),
      color: 'white',
    },
    semiTwelwe: {
      fontSize: 12,
      fontWeight: '600',
      fontFamily: getFontFamily('600'),
      color: 'white',
    },
    boldSixteen: {
      fontSize: 16,
      fontWeight: '700',
      fontFamily: getFontFamily('700'),
      color: 'white',
    },
    boldFourteen: {
      fontSize: 14,
      fontWeight: '700',
      fontFamily: getFontFamily('700'),
      color: 'white',
    },
    extraBoldFourteen: {
      fontSize: 14,
      fontWeight: '800',
      fontFamily: getFontFamily('800'),
      color: 'white',
    },
    semiFourteen: {
      fontSize: 14,
      fontWeight: '600',
      fontFamily: getFontFamily('600'),
      color: 'white',
    },
    regularSixteen: {
      fontSize: 16,
      fontWeight: '400',
      fontFamily: getFontFamily('400'),
      color: 'white',
    },
    heavyTwenty: {
      fontSize: 20,
      fontWeight: '900',
      fontFamily: getFontFamily('900'),
      color: 'white',
    },
    heavyTwentyFour: {
      fontSize: 24,
      fontWeight: '900',
      fontFamily: getFontFamily('900'),
      color: 'white',
    },
    flexAlign: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flexAlignJustify: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    line: {
      height: normalizeHeight(1),
      backgroundColor: '#D3C4EF',
      width: '100%',
    },
  });
