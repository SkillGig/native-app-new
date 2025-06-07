import React, {
  useContext,
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {View, Animated, useAnimatedValue} from 'react-native';
import images from '../../assets/images';
import {
  heightFromScreenPercent,
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import PageLayout from '../../components/MainDash/PageLayout';
import Header from '../../components/MainDash/Header';
import NotificationsPanel from '../../components/MainDash/NotificationsPanel';
import HomeHero from '../../components/MainDash/HomeHero';
import {ThemeContext} from '../../src/context/ThemeContext';
import ProfileComponent from '../../components/MainDash/Profile';

const MainDash = ({navigation}) => {
  const [activeCurrentView, setActiveCurrentView] = useState(null);

  const weekStatus = [
    {day: 'Mon', status: 'completed'},
    {day: 'Tue', status: 'yet_to_start'},
    {day: 'Wed', status: 'not_done'},
    {day: 'Thu', status: 'not_done'},
    {day: 'Fri', status: 'completed'},
    {day: 'Sat', status: 'yet_to_start'},
    {day: 'Sun', status: 'completed'},
  ];

  const statusMap = {
    completed: {
      icon: images.STREAKICON,
      color: '#4CAF50',
    },
    yet_to_start: {
      icon: images.YETTOSTARTSTREAK,
      color: '#2196F3',
    },
    not_done: {
      icon: images.STREAKFAILED,
      color: '#F44336',
    },
  };

  const today = new Date();
  const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = dayMap[today.getDay()];

  const notificationData = [
    {
      id: 'a1',
      title: 'Lesson Unlocked',
      text: 'Andrew Fisk has updates on Figma & it’s basics',
      leftIcon: images.COURSEREADING,
    },
    {
      id: 'a2',
      title: 'Lesson Unlocked',
      text: 'Andrew Fisk has updates on Figma & it’s basics',
      leftIcon: images.FEMALEAVATAR,
    },
    {
      id: '23',
      title: 'Lesson Unlocked',
      text: 'Andrew Fisk has updates on Figma & it’s basics',
      leftIcon: images.COURSEVIDEO,
    },
    {
      id: 'a8',
      title: 'Lesson Unlocked',
      text: 'Andrew Fisk has updates on Figma & it’s basics',
      leftIcon: images.NOTIFICATION,
    },
  ];

  const profileData = [
    {
      id: 'a1',
      option: 'My Details - visible',
      leftIcon: images.PROFILE,
    },
    {
      id: 'a2',
      option: 'Notification Settings',
      leftIcon: images.SETTINGS,
    },
    {
      id: '23',
      option: 'Log out',
      leftIcon: images.LOGOUT,
    },
  ];

  const courseFilter = [
    {id: '1', title: 'All'},
    {id: '12', title: 'Design'},
    {id: '7', title: 'Coding'},
    {id: '5', title: 'Animation'},
    {id: '3', title: 'All'},
    {id: '22', title: 'Design'},
    {id: '75', title: 'Coding'},
    {id: '18', title: 'Animation'},
  ];

  const exploreCoursesFilter = [
    {id: '1', title: 'All'},
    {id: '22', title: 'Design'},
    {id: '75', title: 'Coding'},
    {id: '18', skill: 'Animation'}, // Changed to skill for uniqueness in example
  ];

  const courseType = [
    {id: '1', title: 'All'},
    {id: '12', title: 'Design'},
    {id: '7', title: 'Animation'},
  ];

  const {isDark} = useContext(ThemeContext);

  const gradientColors = useMemo(
    () => (isDark ? ['#300B73', '#090215'] : ['#381874', '#150534']),
    [isDark],
  );

  const headerHeightAnim = useRef(
    new Animated.Value(heightFromScreenPercent(10)),
  ).current;

  const increaseHeaderHeight = useCallback(() => {
    Animated.timing(headerHeightAnim, {
      toValue: heightFromScreenPercent(85), // Example height, adjust as needed
      duration: 400,
      useNativeDriver: false, // Use false for height animations
    }).start();
  }, [headerHeightAnim]);

  const decreaseHeaderHeight = useCallback(() => {
    Animated.timing(headerHeightAnim, {
      toValue: heightFromScreenPercent(10),
      duration: 400,
      useNativeDriver: false, // Use false for height animations
    }).start();
  }, [headerHeightAnim]);

  useEffect(() => {
    if (activeCurrentView === null) {
      decreaseHeaderHeight();
    } else {
      increaseHeaderHeight();
    }
  }, [activeCurrentView, decreaseHeaderHeight, increaseHeaderHeight]);

  return (
    <View style={{flex: 1}}>
      <PageLayout>
        <Animated.View
          style={{
            marginHorizontal: normalizeWidth(20),
            marginTop: normalizeHeight(32),
            height: headerHeightAnim, // Adjust height based on view
          }}>
          <Header
            activeCurrentView={activeCurrentView}
            setActiveCurrentView={view => setActiveCurrentView(view)}
            snapToCollapsed={() => console.log('Snap to collapsed')}
          />

          {/* Conditional rendering for NotificationsPanel/ProfileComponent above the sheet */}
          {activeCurrentView === 'notifications' && (
            <NotificationsPanel
              notificationData={notificationData}
              setActiveCurrentView={setActiveCurrentView}
            />
          )}
          {activeCurrentView === 'profile' && (
            <ProfileComponent
              profileData={profileData}
              setActiveCurrentView={setActiveCurrentView}
            />
          )}
        </Animated.View>

        <HomeHero
          weekStatus={weekStatus}
          currentDay={currentDay}
          statusMap={statusMap}
          courseFilter={courseFilter}
          exploreCoursesFilter={exploreCoursesFilter}
          courseType={courseType}
          gradientColors={gradientColors}
          activeCurrentView={activeCurrentView}
          setActiveCurrentView={setActiveCurrentView}
        />
      </PageLayout>
    </View>
  );
};

export default MainDash;
