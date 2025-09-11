import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {normalizeHeight, normalizeWidth} from './Responsivescreen';
import {getFontStyles} from '../styles/FontStyles';

const AchievementBadges = ({
  colors,
  isDark,
  badgeTitle = 'Gold I',
  animateOnMount = true,
  mainIcon = null, // Icon from backend
  leftIcon = null, // Icon from backend
  rightIcon = null, // Icon from backend
  isLoading = false,
}) => {
  const fstyles = getFontStyles(isDark, colors);

  // Animation references
  const mainBadgeScale = useRef(new Animated.Value(3.5)).current; // Start much larger (closer to user)
  const mainBadgeOpacity = useRef(new Animated.Value(0.3)).current; // Start very transparent
  const mainBadgeShadow = useRef(new Animated.Value(30)).current; // Start with huge shadow
  const mainBadgeTranslateY = useRef(new Animated.Value(-50)).current; // Start higher
  const leftBadgeTranslateX = useRef(new Animated.Value(0)).current; // Start at center
  const leftBadgeOpacity = useRef(new Animated.Value(0)).current; // Start invisible
  const leftBadgeScale = useRef(new Animated.Value(1.5)).current; // Start larger
  const rightBadgeTranslateX = useRef(new Animated.Value(0)).current; // Start at center
  const rightBadgeOpacity = useRef(new Animated.Value(0)).current; // Start invisible
  const rightBadgeScale = useRef(new Animated.Value(1.5)).current; // Start larger
  const titleOpacity = useRef(new Animated.Value(0)).current; // Title starts invisible

  useEffect(() => {
    if (!animateOnMount) {
      return;
    }

    // Start the animation sequence
    const animateUnlock = () => {
      // Phase 1: Main badge comes from user (dramatic Z-axis simulation) and settles to normal position
      Animated.parallel([
        // Scale down dramatically
        Animated.timing(mainBadgeScale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        // Fade in dramatically
        Animated.timing(mainBadgeOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        // Move down to center position
        Animated.timing(mainBadgeTranslateY, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.back(1.7)),
          useNativeDriver: true,
        }),
        // Reduce shadow dramatically
        Animated.timing(mainBadgeShadow, {
          toValue: 8,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start(() => {
        // Phase 2: Side badges emerge FROM the main badge and slide to their original positions
        Animated.parallel([
          // Left badge: appears and slides left from center to original position
          Animated.parallel([
            Animated.timing(leftBadgeOpacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(leftBadgeTranslateX, {
              toValue: -20, // Move to original left position (same as margin)
              duration: 600,
              easing: Easing.out(Easing.back(1.8)),
              useNativeDriver: true,
            }),
            Animated.timing(leftBadgeScale, {
              toValue: 1,
              duration: 600,
              easing: Easing.out(Easing.back(1.5)),
              useNativeDriver: true,
            }),
          ]),
          // Right badge: appears and slides right from center (with delay)
          Animated.sequence([
            Animated.delay(150),
            Animated.parallel([
              Animated.timing(rightBadgeOpacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(rightBadgeTranslateX, {
                toValue: 20, // Move to original right position (same as margin)
                duration: 600,
                easing: Easing.out(Easing.back(1.8)),
                useNativeDriver: true,
              }),
              Animated.timing(rightBadgeScale, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
              }),
            ]),
          ]),
        ]).start(() => {
          // Phase 3: Animate the title after all badge animations complete
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }).start();
        });
      });
    };

    // Start animation after component mount
    const timer = setTimeout(animateUnlock, 200);
    return () => clearTimeout(timer);
  }, [
    animateOnMount,
    mainBadgeScale,
    mainBadgeShadow,
    mainBadgeOpacity,
    mainBadgeTranslateY,
    leftBadgeTranslateX,
    leftBadgeOpacity,
    leftBadgeScale,
    rightBadgeTranslateX,
    rightBadgeOpacity,
    rightBadgeScale,
    titleOpacity,
  ]);

  return (
    <View style={styles.mainBadgeContainer}>
      {/* Left side badge (animated container) */}
      <Animated.View
        style={[
          styles.sideBadge,
          styles.leftBadge,
          {
            opacity: leftBadgeOpacity,
            transform: [
              {translateX: leftBadgeTranslateX},
              // {scale: leftBadgeScale},
            ],
          },
        ]}>
        <View style={styles.sideBadgeIcon}>
          {/* Icon from backend or placeholder */}
          {leftIcon ? leftIcon : <View style={styles.iconPlaceholder} />}
        </View>
      </Animated.View>

      {/* Center main badge (animated container) */}
      <Animated.View
        style={[
          styles.centerBadge,
          {
            opacity: mainBadgeOpacity,
            transform: [
              {scale: mainBadgeScale},
              {translateY: mainBadgeTranslateY},
            ],
          },
        ]}>
        <View style={styles.mainBadgeIconContainer}>
          {/* Badge container with animated shadow */}
          <Animated.View
            style={[
              styles.mainBadgeIcon,
              {
                shadowRadius: mainBadgeShadow,
                elevation: mainBadgeShadow,
                shadowOpacity: 0.4,
                shadowOffset: {
                  width: 0,
                  height: mainBadgeShadow,
                },
              },
            ]}>
            {/* Icon content - static, not animated */}
            <View style={styles.mainIconContainer}>
              {mainIcon ? (
                mainIcon
              ) : (
                <View style={styles.mainIconPlaceholder}>
                  <View style={styles.starIconContainer}>
                    <View style={styles.starIcon} />
                  </View>
                </View>
              )}
            </View>
          </Animated.View>
        </View>
        {/* Badge title - animated to appear after badges */}
        <Animated.View style={[{opacity: titleOpacity}]}>
          <Text style={[fstyles.heavyTwentyFour, styles.badgeTitle]}>
            {badgeTitle}
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Right side badge (animated container) */}
      <Animated.View
        style={[
          styles.sideBadge,
          styles.rightBadge,
          {
            opacity: rightBadgeOpacity,
            transform: [
              {translateX: rightBadgeTranslateX},
              // {scale: rightBadgeScale},
            ],
          },
        ]}>
        <View style={styles.sideBadgeIcon}>
          {/* Icon from backend or placeholder */}
          {rightIcon ? rightIcon : <View style={styles.iconPlaceholder} />}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalizeHeight(40),
    height: normalizeHeight(140),
    paddingHorizontal: normalizeWidth(20),
    zIndex: 1000, // Static high zIndex for entire badge container
    paddingTop: normalizeHeight(20),
  },
  sideBadge: {
    alignItems: 'center',
  },
  leftBadge: {
    marginRight: normalizeWidth(-30),
  },
  rightBadge: {
    marginLeft: normalizeWidth(-30),
  },
  sideBadgeIcon: {
    width: normalizeWidth(72),
    height: normalizeHeight(72),
    borderRadius: normalizeWidth(18),
    backgroundColor: 'rgba(139, 125, 173, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 125, 173, 0.3)',
    marginBottom: normalizeHeight(32),
  },
  centerBadge: {
    alignItems: 'center',
  },
  mainBadgeIconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBadgeIcon: {
    width: normalizeWidth(104),
    height: normalizeHeight(104),
    borderRadius: normalizeWidth(24),
    backgroundColor: 'rgba(139, 125, 173, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalizeHeight(15),
    borderWidth: 2,
    borderColor: 'rgba(139, 125, 173, 0.6)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  mainIconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainIconPlaceholder: {
    width: normalizeWidth(60),
    height: normalizeHeight(60),
    backgroundColor: 'rgba(197, 173, 115, 0.8)', // Golden color for the star area
    borderRadius: normalizeWidth(12),
    zIndex: 12,
  },
  starIconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalizeWidth(12),
  },
  starIcon: {
    width: normalizeWidth(35),
    height: normalizeHeight(35),
    backgroundColor: '#C5AD73', // Golden star color
    borderRadius: normalizeWidth(6),
    transform: [{rotate: '45deg'}],
  },
  badgeTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: normalizeWidth(18),
  },
  iconPlaceholder: {
    width: normalizeWidth(35),
    height: normalizeHeight(35),
    backgroundColor: 'rgba(139, 125, 173, 0.6)',
    borderRadius: normalizeWidth(10),
  },
});

export default AchievementBadges;
