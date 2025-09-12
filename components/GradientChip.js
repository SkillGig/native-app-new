import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {getFontStyles} from '../styles/FontStyles';
import {ThemeContext} from '../src/context/ThemeContext';
import {useContext} from 'react';

const GradientChip = ({title, icon}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(isDark, colors);

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[
          'rgba(28, 7, 67, 0.5)',
          'rgba(80, 19, 192, 0.5)',
          'rgba(28, 7, 67, 0.5)',
        ]}
        locations={[0.0866, 0.5201, 0.8421]}
        start={{x: 0, y: 0}}
        end={{
          x: Math.cos((112 * Math.PI) / 180),
          y: Math.sin((112 * Math.PI) / 180),
        }}
        style={styles.gradient}>
        <View style={styles.overlay} />
        <View style={styles.row}>
          {icon && <Image source={icon} style={styles.icon} />}
          <Text style={fstyles.semiTwelwe}>{title}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default GradientChip;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: normalizeWidth(8),
    marginBottom: normalizeHeight(8),
    alignSelf: 'flex-start', // This makes the component only take content width
  },
  gradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 'auto', // Allow dynamic width based on content
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderColor: 'rgba(211, 196, 239, 0.20)',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap', // Prevent wrapping within the chip
  },
  icon: {
    height: normalizeHeight(12),
    width: normalizeWidth(12),
    resizeMode: 'contain',
    marginRight: 6, // Use fixed value instead of normalized for consistent spacing
  },
});
