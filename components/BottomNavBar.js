import React, {useRef, useEffect, useMemo} from 'react';
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
import useUserStore from '../src/store/useUserStore';

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
  const userConfig = useUserStore(state => state.userConfig);
  // Animated values for each tab (first 3)
  const homeOpacity = useRef(new Animated.Value(activeKey === 'home' ? 1 : 0.5)).current;
  const milestoneOpacity = useRef(new Animated.Value(activeKey === 'milestone' ? 1 : 0.5)).current;
  const connectOpacity = useRef(new Animated.Value(activeKey === 'connect' ? 1 : 0.5)).current;
  const opacityArr = useMemo(() => [homeOpacity, milestoneOpacity, connectOpacity], [homeOpacity, milestoneOpacity, connectOpacity]);

  const homeLabelY = useRef(new Animated.Value(activeKey === 'home' ? 4 : 8)).current;
  const milestoneLabelY = useRef(new Animated.Value(activeKey === 'milestone' ? 4 : 8)).current;
  const connectLabelY = useRef(new Animated.Value(activeKey === 'connect' ? 4 : 8)).current;
  const labelYArr = useMemo(() => [homeLabelY, milestoneLabelY, connectLabelY], [homeLabelY, milestoneLabelY, connectLabelY]);

  const homeGlowY = useRef(new Animated.Value(activeKey === 'home' ? 0 : 16)).current;
  const milestoneGlowY = useRef(new Animated.Value(activeKey === 'milestone' ? 0 : 16)).current;
  const connectGlowY = useRef(new Animated.Value(activeKey === 'connect' ? 0 : 16)).current;
  const glowYArr = useMemo(() => [homeGlowY, milestoneGlowY, connectGlowY], [homeGlowY, milestoneGlowY, connectGlowY]);

  const homeIconWH = useRef(new Animated.Value(activeKey === 'home' ? 32 : 20)).current;
  const milestoneIconWH = useRef(new Animated.Value(activeKey === 'milestone' ? 32 : 20)).current;
  const connectIconWH = useRef(new Animated.Value(activeKey === 'connect' ? 32 : 20)).current;
  const iconWHArr = useMemo(() => [homeIconWH, milestoneIconWH, connectIconWH], [homeIconWH, milestoneIconWH, connectIconWH]);

  // Animated value for mock interview icon size
  const mockIconWH = useRef(new Animated.Value(activeKey === 'mockinterview' ? 40 : 28)).current;

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
        Animated.timing(iconWHArr[idx], {
          toValue: isActive ? 32 : 20,
          duration: 220,
          useNativeDriver: false,
        }),
      ]).start();
    });
    Animated.timing(mockIconWH, {
      toValue: activeKey === 'mockinterview' ? 40 : 28,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [activeKey, opacityArr, labelYArr, glowYArr, iconWHArr, mockIconWH]);

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
            if (item.key === 'milestone' && !userConfig.showMilestones) {
              return null;
            }
            if (item.key === 'connect' && !userConfig.showConnect) {
              return null;
            }
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
                  <Animated.Image
                    source={isActive ? item.activeIcon : item.icon}
                    style={[
                      styles.pillIcon,
                      isActive && styles.activePillIcon,
                      {
                        width: iconWHArr[idx],
                        height: iconWHArr[idx],
                      },
                    ]}
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
        {userConfig.showInterviewPrep && (
          <TouchableOpacity
            style={[
              styles.mockBtn,
              activeKey === 'mockinterview' && styles.mockBtnActive,
            ]}
            activeOpacity={0.8}
            onPress={() => onTabPress('mockinterview')}>
            <Animated.Image
              source={NAV_ITEMS[3].icon}
              style={[
                styles.mockIcon,
                activeKey === 'mockinterview' && styles.mockIconActive,
                { width: mockIconWH, height: mockIconWH },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const PILL_HEIGHT = 64; // slightly taller than before
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
    paddingHorizontal: 16,
  },
  pillBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: PILL_RADIUS,
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
    width: 32,
    height: 32,
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
