import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {getFontStyles} from '../styles/FontStyles';

const AchievementProgress = ({
  colors,
  isDark,
  basePoints = 0,
  finalPoints = 3000,
  currentPoints = 0,
  userAvatar = null,
  animateOnMount = true,
}) => {
  const fstyles = getFontStyles(isDark, colors);

  // Calculate progress percentage
  const progressPercentage = Math.min(
    Math.max((currentPoints - basePoints) / (finalPoints - basePoints), 0),
    1,
  );

  // Animation references
  const progressWidth = useRef(new Animated.Value(0)).current;
  const avatarTranslateX = useRef(new Animated.Value(0)).current; // Use translateX instead of left
  const avatarScale = useRef(new Animated.Value(0)).current;
  const avatarOpacity = useRef(new Animated.Value(0)).current;
  const shieldScale = useRef(new Animated.Value(0)).current;
  const shieldOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animateOnMount) {
      return;
    }

    // Start progress bar animation with enhanced effects
    const animateProgress = () => {
      // Animate progress bar, avatar position and scale simultaneously
      Animated.parallel([
        Animated.timing(progressWidth, {
          toValue: progressPercentage,
          duration: 2500,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: false,
        }),
        Animated.timing(avatarTranslateX, {
          toValue: progressPercentage * 120, // Move 120 units based on progress
          duration: 2500,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true, // Use native driver for transforms
        }),
        // Animate avatar scale from 0 to 1 while moving
        Animated.timing(avatarScale, {
          toValue: 1, // Grow from 0 to 1 while moving
          duration: 2500, // Same duration as movement
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        }),
        // Animate avatar opacity
        Animated.timing(avatarOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Then animate the shield with enhanced effects
        Animated.parallel([
          Animated.sequence([
            Animated.spring(shieldScale, {
              toValue: 1.2,
              friction: 6,
              tension: 120,
              useNativeDriver: true,
            }),
            Animated.spring(shieldScale, {
              toValue: 1,
              friction: 8,
              tension: 100,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(shieldOpacity, {
              toValue: 1,
              duration: 500,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });
    };

    // Start animation after a short delay
    const timer = setTimeout(animateProgress, 300);
    return () => clearTimeout(timer);
  }, [
    animateOnMount,
    progressWidth,
    avatarTranslateX,
    avatarScale,
    avatarOpacity,
    shieldScale,
    shieldOpacity,
    progressPercentage,
  ]);

  return (
    <LinearGradient
      colors={['rgba(176, 149, 227, 0.05)', 'rgba(176, 149, 227, 0.12)']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.progressContainer}>
      {/* Progress Bar Container */}
      <View style={styles.progressBarContainer}>
        {/* Progress Bar with Avatar */}
        <View style={styles.progressBarWrapper}>
          {/* Background progress bar */}
          <View style={styles.progressBarBackground}>
            {/* Animated progress fill with gradient */}
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progressWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '60%'], // Adjust to match screenshot progress
                  }),
                },
              ]}>
              <LinearGradient
                colors={['#D3C4EF', '#815FC4']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.progressGradient}
              />
            </Animated.View>
          </View>

          {/* User Avatar positioned based on progress */}
          <Animated.View
            style={[
              styles.avatarContainer,
              {
                opacity: avatarOpacity,
                transform: [
                  {translateX: avatarTranslateX},
                  {scale: avatarScale},
                ],
              },
            ]}>
            {userAvatar ? (
              <View style={styles.avatarWrapper}>{userAvatar}</View>
            ) : (
              <View style={styles.avatarPlaceholder}>
                <View style={styles.avatarIcon} />
              </View>
            )}
          </Animated.View>
        </View>

        {/* Shield Badge Icon on the right */}
        <Animated.View
          style={[
            styles.shieldContainer,
            {
              opacity: shieldOpacity,
              transform: [{scale: shieldScale}],
            },
          ]}>
          <View style={styles.shieldPlaceholder}>
            {/* Shield/Star icon placeholder */}
            <View style={styles.shieldIcon} />
          </View>
        </Animated.View>
      </View>

      {/* Progress Text */}
      <View style={styles.progressTextContainer}>
        <Text style={[fstyles.regularFourteen, styles.progressText]}>
          You need {finalPoints - currentPoints} XP points unlock new level
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    borderRadius: normalizeWidth(20),
    paddingTop: normalizeWidth(16),
    paddingHorizontal: normalizeWidth(20),
    borderWidth: 1,
    borderColor: 'rgba(120, 120, 140, 0.3)',
  },
  progressBarContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: normalizeHeight(16),
    height: normalizeHeight(40), // Reduced height to match screenshot
  },
  progressBarWrapper: {
    flex: 1,
    position: 'relative',
    marginRight: normalizeWidth(10),
  },
  progressBarBackground: {
    height: normalizeHeight(10), // Thinner progress bar to match screenshot
    backgroundColor: 'rgba(120, 120, 140, 0.3)', // Darker background
    borderRadius: normalizeHeight(5),
    overflow: 'visible',
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: normalizeHeight(25),
    overflow: 'hidden',
  },
  progressGradient: {
    flex: 1,
    borderRadius: normalizeHeight(5),
  },
  avatarContainer: {
    position: 'absolute',
    top: normalizeHeight(-24), // Adjusted to center the larger avatar on progress bar
    left: normalizeWidth(0), // Start from left
    width: normalizeWidth(48), // Updated to match the 48x48 avatarIcon
    height: normalizeHeight(48),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
  },
  avatarWrapper: {
    borderRadius: normalizeWidth(24),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  avatarPlaceholder: {
    width: normalizeWidth(48), // Updated to match 48x48 avatarIcon
    height: normalizeHeight(48),
    borderRadius: normalizeWidth(24), // Half of width for perfect circle
    backgroundColor: '#E8D6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3, // Restored border width for larger avatar
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  avatarIcon: {
    width: normalizeWidth(48), // Updated to 48x48 as requested
    height: normalizeHeight(48),
    borderRadius: normalizeWidth(24), // Half of width for perfect circle
    backgroundColor: '#8B7BCC',
  },
  shieldContainer: {
    width: normalizeWidth(40),
    height: normalizeHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalizeHeight(-4),
  },
  shieldPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(120, 120, 140, 0.4)',
    borderRadius: normalizeWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(120, 120, 140, 0.6)',
  },
  shieldIcon: {
    width: normalizeWidth(40),
    height: normalizeHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  starShape: {
    width: normalizeWidth(20),
    height: normalizeHeight(20),
    backgroundColor: '#9D8DF1',
    borderRadius: normalizeWidth(3),
  },
  progressTextContainer: {
    alignItems: 'center',
    maxWidth: '80%',
  },
  progressText: {
    color: '#B095E3',
    fontFamily: 'Lato',
    fontSize: normalizeWidth(10),
    lineHeight: normalizeHeight(20),
    fontWeight: '500',
    letterSpacing: 0.5,
    marginTop: normalizeHeight(-12),
    marginLeft: normalizeWidth(-10),
  },
});

export default AchievementProgress;
