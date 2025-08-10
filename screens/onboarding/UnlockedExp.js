import React, {useEffect, useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import images from '../../assets/images';
import {ThemeContext} from '../../src/context/ThemeContext';
import useUserStore from '../../src/store/useUserStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UnlockedExp = ({navigation, route}) => {
  const {isDark, colors} = useContext(ThemeContext);
  const setTokens = useUserStore(state => state.setTokens);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Set tokens from params (if present) before navigating
      if (route?.params?.authToken && route?.params?.refreshToken) {
        setTokens({
          authToken: route.params.authToken,
          refreshToken: route.params.refreshToken,
        });
        // AsyncStorage.setItem('authToken', route.params.authToken || '');
        // AsyncStorage.setItem('refreshToken', route.params.refreshToken || '');
        // setTokens({
        //   authToken: route.params.authToken || '',
        //   refreshToken: route.params.refreshToken || '',
        // });
      }
      navigation.replace('MainDash'); // use 'replace' to prevent back navigation
    }, 3000); // 5 seconds

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigation, route, setTokens]);

  const gradientColors = isDark
    ? ['#381874', '#150534']
    : ['#FBF8FF', '#DFCEFF'];
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
          You've just unlocked premium{'\n'}experience to prep for that{'\n'}
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
});
