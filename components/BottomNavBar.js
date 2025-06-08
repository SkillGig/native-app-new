import React, {useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../assets/images';

const NAV_ITEMS = [
  {
    key: 'home',
    label: 'Home',
    icon: images.HOME,
    activeIcon: images.HOMEACTIVE,
  },
  {
    key: 'milestone',
    label: 'Milestones',
    icon: images.MILESTONE,
    activeIcon: images.MILESTONEACTIVE,
  },
  {
    key: 'connect',
    label: 'Connect',
    icon: images.CONNECT,
    activeIcon: images.CONNECTACTIVE,
  },
  {
    key: 'mockinterview',
    label: 'Mock',
    icon: images.MOCKINTERVIEW,
    activeIcon: images.MOCKINTERVIEWACTIVE,
  },
];

const BottomNavBar = ({activeKey, onTabPress}) => {
  // Animated values for each tab (first 3)
  const opacityArr = [
    useRef(new Animated.Value(activeKey === 'home' ? 1 : 0.5)).current,
    useRef(new Animated.Value(activeKey === 'milestone' ? 1 : 0.5)).current,
    useRef(new Animated.Value(activeKey === 'connect' ? 1 : 0.5)).current,
  ];
  const labelYArr = [
    useRef(new Animated.Value(activeKey === 'home' ? 4 : 8)).current,
    useRef(new Animated.Value(activeKey === 'milestone' ? 4 : 8)).current,
    useRef(new Animated.Value(activeKey === 'connect' ? 4 : 8)).current,
  ];
  const glowYArr = [
    useRef(new Animated.Value(activeKey === 'home' ? 0 : 16)).current,
    useRef(new Animated.Value(activeKey === 'milestone' ? 0 : 16)).current,
    useRef(new Animated.Value(activeKey === 'connect' ? 0 : 16)).current,
  ];

  useEffect(() => {
    ['home', 'milestone', 'connect'].forEach((key, idx) => {
      const isActive = activeKey === key;
      Animated.parallel([
        Animated.timing(opacityArr[idx], {
          toValue: isActive ? 1 : 0.5,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(labelYArr[idx], {
          toValue: isActive ? 24 : 8, // label moves further down when active
          duration: isActive ? 700 : 220,
          useNativeDriver: true,
        }),
        Animated.timing(glowYArr[idx], {
          toValue: isActive ? 0 : 16,
          duration: isActive ? 700 : 220,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [activeKey, opacityArr, labelYArr, glowYArr]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.rowWrap}>
        {/* Grouped pill for Home, Milestones, Connect */}
        <LinearGradient
          colors={['rgba(87, 47, 139, 0.8)', 'rgba(26, 7, 66, 0.85)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.pillBg}>
          {[NAV_ITEMS[0], NAV_ITEMS[1], NAV_ITEMS[2]].map((item, idx) => {
            const isActive = activeKey === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                style={styles.pillTabBtn}
                activeOpacity={0.8}
                onPress={() => onTabPress(item.key)}>
                <Animated.View
                  style={[
                    styles.pillIconCircle,
                    isActive && styles.pillIconCircleActive,
                    {opacity: opacityArr[idx]},
                  ]}>
                  <Image
                    source={isActive ? item.activeIcon : item.icon}
                    style={[styles.pillIcon, isActive && styles.activePillIcon]}
                    resizeMode="contain"
                  />
                </Animated.View>
                <Animated.View
                  style={{
                    opacity: opacityArr[idx],
                    transform: [{translateY: labelYArr[idx]}],
                  }}>
                  {/* Only show label if not active, or animate it out if active */}
                  {!isActive && (
                    <Text style={styles.pillLabel}>{item.label}</Text>
                  )}
                  {isActive && (
                    <Text style={[styles.pillLabel, styles.activePillLabel]}>
                      {item.label}
                    </Text>
                  )}
                </Animated.View>
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    transform: [{translateY: glowYArr[idx]}],
                    opacity: opacityArr[idx],
                  }}>
                  {isActive && (
                    <Image
                      source={images.NAVITEMGLOW}
                      style={styles.pillActiveGlowDot}
                    />
                  )}
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </LinearGradient>
        {/* Floating circular button */}
        <TouchableOpacity
          style={[
            styles.mockBtn,
            activeKey === 'mockinterview' && styles.mockBtnActive,
          ]}
          activeOpacity={0.8}
          onPress={() => onTabPress('mockinterview')}>
          <Image
            source={
              activeKey === 'mockinterview'
                ? NAV_ITEMS[3].icon
                : NAV_ITEMS[3].icon
            }
            style={[
              styles.mockIcon,
              activeKey === 'mockinterview' && styles.mockIconActive,
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PILL_HEIGHT = 64; // slightly taller than before
const PILL_WIDTH = 280; // slight increase
const PILL_RADIUS = 32;
const PILL_BTN_WIDTH = 90;

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 100,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  pillActiveGlowDot: {
    width: 24,
    height: 12,
    position: 'absolute',
    bottom: 0,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    gap: 12,
  },
  pillBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: PILL_RADIUS,
    width: PILL_WIDTH,
    height: PILL_HEIGHT,
    backgroundColor: 'rgba(87,47,139,0.8)',
    borderWidth: 1.2,
    borderColor: 'rgba(191,163,246,0.3)',
    shadowColor: '#BFA3F6',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
    marginRight: 16,
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
  pillTabBtn: {
    width: PILL_BTN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    height: PILL_HEIGHT,
  },
  pillIconCircle: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  pillIconCircleActive: {
    shadowColor: '#BFA3F6',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    minWidth: 32,
    minHeight: 32,
  },
  pillIcon: {
    width: 20,
    height: 20,
    tintColor: '#BFA3F6',
  },
  activePillIcon: {
    tintColor: '#fff',
  },
  pillLabel: {
    fontSize: 10, // slightly smaller per screenshot
    color: '#BFA3F6',
    fontWeight: '500',
    marginTop: -8,
    letterSpacing: 0.1,
  },
  activePillLabel: {
    color: '#fff',
    fontWeight: '600',
  },
  mockBtn: {
    marginLeft: -16,
    width: 68, // larger button
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(87,47,139,0.8)',
    borderWidth: 2,
    borderColor: 'rgba(191,163,246,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#BFA3F6',
    shadowOpacity: 0.22,
    shadowRadius: 32,
    elevation: 24,
  },
  mockBtnActive: {
    backgroundColor: '#BFA3F6',
    borderColor: '#fff',
    shadowColor: '#BFA3F6',
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 32,
  },
  mockIcon: {
    width: 28,
    height: 28,
    tintColor: '#fff',
    opacity: 0.9,
  },
  mockIconActive: {
    tintColor: '#6C3DF4',
    opacity: 1,
  },
});

export default BottomNavBar;
