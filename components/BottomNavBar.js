import React, { useRef, useEffect, useMemo } from 'react';
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
    key: 'MainDash',
    label: 'Home',
    icon: images.HOME,
    activeIcon: images.HOMEACTIVE,
  },
  {
    key: 'RoadMap',
    label: 'Milestones',
    icon: images.MILESTONE,
    activeIcon: images.MILESTONEACTIVE,
  },
  {
    key: 'OngoingCourses',
    label: 'Connect',
    icon: images.CONNECT,
    activeIcon: images.CONNECTACTIVE,
  },
  {
    key: 'QuizzesDashboard',
    label: 'Mock',
    icon: images.MOCKINTERVIEW,
    activeIcon: images.MOCKINTERVIEWACTIVE,
  },
];

const BottomNavBar = ({ state, descriptors, navigation }) => {
  const userConfig = useUserStore(userState => userState.userConfig) || {};
  const activeKey = state.routes[state.index].name;

  // Animated values for each tab (first 3)
  const homeOpacity = useRef(new Animated.Value(activeKey === 'MainDash' ? 1 : 0.5)).current;
  const milestoneOpacity = useRef(new Animated.Value(activeKey === 'RoadMap' ? 1 : 0.5)).current;
  const connectOpacity = useRef(new Animated.Value(activeKey === 'OngoingCourses' ? 1 : 0.5)).current;
  const opacityArr = useMemo(() => [homeOpacity, milestoneOpacity, connectOpacity], [homeOpacity, milestoneOpacity, connectOpacity]);

  const homeLabelY = useRef(new Animated.Value(activeKey === 'MainDash' ? 24 : 8)).current;
  const milestoneLabelY = useRef(new Animated.Value(activeKey === 'RoadMap' ? 24 : 8)).current;
  const connectLabelY = useRef(new Animated.Value(activeKey === 'OngoingCourses' ? 24 : 8)).current;
  const labelYArr = useMemo(() => [homeLabelY, milestoneLabelY, connectLabelY], [homeLabelY, milestoneLabelY, connectLabelY]);

  const homeGlowY = useRef(new Animated.Value(activeKey === 'MainDash' ? 0 : 16)).current;
  const milestoneGlowY = useRef(new Animated.Value(activeKey === 'RoadMap' ? 0 : 16)).current;
  const connectGlowY = useRef(new Animated.Value(activeKey === 'OngoingCourses' ? 0 : 16)).current;
  const glowYArr = useMemo(() => [homeGlowY, milestoneGlowY, connectGlowY], [homeGlowY, milestoneGlowY, connectGlowY]);

  const homeIconWH = useRef(new Animated.Value(activeKey === 'MainDash' ? 32 : 20)).current;
  const milestoneIconWH = useRef(new Animated.Value(activeKey === 'RoadMap' ? 32 : 20)).current;
  const connectIconWH = useRef(new Animated.Value(activeKey === 'OngoingCourses' ? 32 : 20)).current;
  const iconWHArr = useMemo(() => [homeIconWH, milestoneIconWH, connectIconWH], [homeIconWH, milestoneIconWH, connectIconWH]);

  // Animated value for mock interview icon size
  const mockIconWH = useRef(new Animated.Value(activeKey === 'QuizzesDashboard' ? 40 : 28)).current;

  useEffect(() => {
    ['MainDash', 'RoadMap', 'OngoingCourses'].forEach((key, idx) => {
      const isActive = activeKey === key;
      if (opacityArr[idx] && labelYArr[idx] && glowYArr[idx] && iconWHArr[idx]) {
        Animated.parallel([
          Animated.timing(opacityArr[idx], {
            toValue: isActive ? 1 : 0.5,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(labelYArr[idx], {
            toValue: isActive ? 24 : 8,
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
      }
    });

    Animated.timing(mockIconWH, {
      toValue: activeKey === 'QuizzesDashboard' ? 40 : 28,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [activeKey, opacityArr, labelYArr, glowYArr, iconWHArr, mockIconWH]);

  const onTabPress = (routeName) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeName,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  // Filter visible tabs based on user config
  const getVisibleTabs = () => {
    return NAV_ITEMS.filter(item => {
      if (item.key === 'RoadMap' && userConfig.showMilestones === false) {
        return false;
      }
      if (item.key === 'OngoingCourses' && userConfig.showConnect === false) {
        return false;
      }
      if (item.key === 'QuizzesDashboard' && userConfig.showInterviewPrep === false) {
        return false;
      }
      return true;
    });
  };

  const visibleTabs = getVisibleTabs();
  const pillTabs = visibleTabs.filter(tab => tab.key !== 'QuizzesDashboard').slice(0, 3); // First 3 tabs go in pill
  const floatingTab = visibleTabs.find(tab => tab.key === 'QuizzesDashboard');

  return (
    <View style={styles.outerContainer}>
      <View style={styles.rowWrap}>
        {/* Grouped pill for Home, Milestones, Connect */}
        <LinearGradient
          colors={['rgba(87, 47, 139, 0.8)', 'rgba(26, 7, 66, 0.85)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.pillBg, { width: pillTabs.length * 90 + 16 }]}>
          {pillTabs.map((item, idx) => {
            const isActive = activeKey === item.key;
            const animationIndex = NAV_ITEMS.findIndex(navItem => navItem.key === item.key);
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
                    { opacity: opacityArr[animationIndex] || 0.5 },
                  ]}>
                  <Animated.Image
                    source={isActive ? item.activeIcon : item.icon}
                    style={[
                      styles.pillIcon,
                      isActive && styles.activePillIcon,
                      {
                        width: iconWHArr[animationIndex] || 20,
                        height: iconWHArr[animationIndex] || 20,
                      },
                    ]}
                    resizeMode="contain"
                  />
                </Animated.View>
                <Animated.View
                  style={{
                    opacity: opacityArr[animationIndex] || 0.5,
                    transform: [{ translateY: labelYArr[animationIndex] || 8 }],
                  }}>
                  <Text style={[
                    styles.pillLabel,
                    isActive && styles.activePillLabel,
                  ]}>
                    {item.label}
                  </Text>
                </Animated.View>
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    transform: [{ translateY: glowYArr[animationIndex] || 16 }],
                    opacity: opacityArr[animationIndex] || 0.5,
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

        {/* Floating circular button for mock interview */}
        {floatingTab && (
          <TouchableOpacity
            style={[
              styles.mockBtn,
              activeKey === 'QuizzesDashboard' && styles.mockBtnActive,
            ]}
            activeOpacity={0.8}
            onPress={() => onTabPress('QuizzesDashboard')}>
            <Animated.Image
              source={floatingTab.icon}
              style={[
                styles.mockIcon,
                activeKey === 'QuizzesDashboard' && styles.mockIconActive,
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

const PILL_HEIGHT = 64;
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
    shadowOffset: { width: 0, height: 8 },
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
    fontSize: 10,
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
    width: 68,
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
