import React, {useContext, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/images';
import {ThemeContext} from '../../src/context/ThemeContext';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import useUserStore from '../../src/store/useUserStore';
import { useNavigation } from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native';

const PageLayout = ({
  heading,
  description,
  hasBackButton = false,
  onBackButton,
  children,
  hidePattern = false,
  delayRedirectToHome = false, // new prop
}) => {
  const {isDark} = useContext(ThemeContext);
  const navigation = useNavigation();
  const authToken = useUserStore(state => state.user.authToken);
  const refreshToken = useUserStore(state => state.user.refreshToken);

  useEffect(() => {
    console.log(authToken, refreshToken, 'PageLayout Tokens');
    if (authToken && refreshToken && !delayRedirectToHome) {
      navigation.reset({
        index: 0,
        routes: [{name: 'MainDash'}],
      });
    }
  }, [authToken, refreshToken, navigation, delayRedirectToHome]);

  const gradientColors = useMemo(
    () => (isDark ? ['#300B73', '#090215'] : ['#381874', '#150534']),
    [isDark],
  );

  const patternImage = useMemo(
    () => (isDark ? images.SIDEPATTERNDARK : images.SIDEPATTERNLIGHT),
    [isDark],
  );

  // Only render children if tokens are not present, or if delayRedirectToHome is true
  // if (authToken && refreshToken && !delayRedirectToHome) {
  //   return null;
  // }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.7]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFillObject}
      />
      {!hidePattern && (
        <Image source={patternImage} style={styles.sidePattern} />
      )}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        {hasBackButton && (
          <TouchableOpacity
            onPress={onBackButton}
            style={styles.backIconWrapper}
            activeOpacity={0.7}>
            <Image
              source={isDark ? images.BACKICON : images.BLACKBACKICON}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
        {heading && (
          <Text
            style={[
              styles.title,
              {color: isDark ? 'rgba(255,255,255,0.6)' : '#2A0D54'},
            ]}>
            {heading}
          </Text>
        )}
        {description && (
          <Text
            style={[styles.subtitle, {color: isDark ? '#EADDFF' : '#4F378A'}]}>
            {description}
          </Text>
        )}
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    marginTop: normalizeHeight(55),
    marginHorizontal: normalizeWidth(24),
  },
  sidePattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'contain',
  },
  backIconWrapper: {
    alignSelf: 'flex-start',
    marginBottom: normalizeHeight(16),
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
});

export default PageLayout;
