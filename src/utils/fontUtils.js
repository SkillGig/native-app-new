// Font configuration utility for Lato font family
import {FONT_FAMILY} from '../styles/FontStyles';

/**
 * Get appropriate Lato font family based on font weight
 * @param {string} fontWeight - Font weight (100, 300, 400, 500, 600, 700, 800, 900)
 * @param {boolean} isItalic - Whether the font should be italic
 * @returns {string} - Lato font family name
 */
export const getLatoFont = (fontWeight = '400', isItalic = false) => {
  let fontFamily;

  switch (fontWeight) {
    case '100':
      fontFamily = isItalic ? 'Lato-ThinItalic' : FONT_FAMILY.thin;
      break;
    case '300':
      fontFamily = isItalic ? 'Lato-LightItalic' : FONT_FAMILY.light;
      break;
    case '400':
      fontFamily = isItalic ? 'Lato-Italic' : FONT_FAMILY.regular;
      break;
    case '500':
      fontFamily = isItalic ? 'Lato-MediumItalic' : FONT_FAMILY.medium;
      break;
    case '600':
      fontFamily = isItalic ? 'Lato-SemiBoldItalic' : FONT_FAMILY.semiBold;
      break;
    case '700':
      fontFamily = isItalic ? 'Lato-BoldItalic' : FONT_FAMILY.bold;
      break;
    case '800':
      fontFamily = isItalic ? 'Lato-ExtraBoldItalic' : FONT_FAMILY.extraBold;
      break;
    case '900':
      fontFamily = isItalic ? 'Lato-BlackItalic' : FONT_FAMILY.black;
      break;
    default:
      fontFamily = isItalic ? 'Lato-Italic' : FONT_FAMILY.regular;
  }

  return fontFamily;
};

/**
 * Create text style with Lato font family
 * @param {object} style - Style object containing fontSize, fontWeight, etc.
 * @returns {object} - Style object with appropriate Lato font family
 */
export const createLatoStyle = (style = {}) => {
  const {fontWeight = '400', fontStyle, ...otherStyles} = style;
  const isItalic = fontStyle === 'italic';

  return {
    ...otherStyles,
    fontFamily: getLatoFont(fontWeight, isItalic),
    fontWeight: fontWeight,
  };
};

/**
 * Common Lato text styles for consistent usage
 */
export const LatoStyles = {
  thin: createLatoStyle({fontWeight: '100'}),
  light: createLatoStyle({fontWeight: '300'}),
  regular: createLatoStyle({fontWeight: '400'}),
  medium: createLatoStyle({fontWeight: '500'}),
  semiBold: createLatoStyle({fontWeight: '600'}),
  bold: createLatoStyle({fontWeight: '700'}),
  extraBold: createLatoStyle({fontWeight: '800'}),
  black: createLatoStyle({fontWeight: '900'}),

  // Italic variants
  thinItalic: createLatoStyle({fontWeight: '100', fontStyle: 'italic'}),
  lightItalic: createLatoStyle({fontWeight: '300', fontStyle: 'italic'}),
  italic: createLatoStyle({fontWeight: '400', fontStyle: 'italic'}),
  mediumItalic: createLatoStyle({fontWeight: '500', fontStyle: 'italic'}),
  semiBoldItalic: createLatoStyle({fontWeight: '600', fontStyle: 'italic'}),
  boldItalic: createLatoStyle({fontWeight: '700', fontStyle: 'italic'}),
  extraBoldItalic: createLatoStyle({fontWeight: '800', fontStyle: 'italic'}),
  blackItalic: createLatoStyle({fontWeight: '900', fontStyle: 'italic'}),
};

export default {
  FONT_FAMILY,
  getLatoFont,
  createLatoStyle,
  LatoStyles,
};
