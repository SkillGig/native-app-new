import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CodeField, CustomSvg} from '../../components';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';
import CompTextInput from '../../components/CompTextInput';
import {ThemeContext} from '../../src/context/ThemeContext';

const UnlockedExp = ({navigation}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const gradientColors = isDark
    ? ['#381874', '#150534']
    : ['#FBF8FF', '#DFCEFF']; // adjust light mode gradient
  const patternImage = isDark
    ? images.SIDEPATTERNDARK
    : images.SIDEPATTERNLIGHT;
  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      {!isDark && <Image source={patternImage} style={styles.sidePattern} />}
      <Image
        source={images.TICKSUCCESS}
        style={{
          height: normalizeHeight(200),
          width: normalizeWidth(200),
          resizeMode: 'contain',
        }}
      />
      <View style={{marginTop: normalizeHeight(128), alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: '900',
            color: isDark ? 'white' : '#300B73',
          }}>
          Great!!
        </Text>

        <Text
          style={{
            textAlign: 'center',
            marginTop: normalizeHeight(10),
            fontSize: 14,
            fontWeight: '600',
            color: isDark ? 'white' : '#300B73',
          }}>
          You’ve just unlocked premium{'\n'}experience to prep for that{'\n'}
          Dream Job !!
        </Text>
      </View>
    </LinearGradient>
  );
};

export default UnlockedExp;
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidePattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'contain',
  },

  backIcon: {
    height: normalizeHeight(24),
    width: normalizeWidth(24),
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  shared: {
    fontSize: 16,
    fontWeight: '700',
  },
});
