/**
 * Refactor prompt:
 // Copilot will now generate the ListHeaderComponent structure with FlatLists + HomeHero.
 */

import React, {useRef, useState, useCallback, useEffect} from 'react';
import {View, Animated, Button} from 'react-native';
import images from '../../assets/images';
import {
  heightFromScreenPercent,
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import PageLayout from './PageLayout';
import Header from './Header';
import NotificationsPanel from './NotificationsPanel';
import ProfileComponent from './Profile';
import useUserStore from '../../src/store/useUserStore';
import HomeSlider from './HomeSlider';
import Snackbar from '../../components/Snackbar';
import useSnackbarStore from '../../src/store/useSnackbarStore';
import BottomNavBar from '../../components/BottomNavBar';

const MainDash = ({navigation}) => {
  const [activeCurrentView, setActiveCurrentView] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const bottomSheetRef = useRef(null);

  const snapPoints = useRef(['12%', '87%']).current;

  const handleHeaderItemsPress = view => {
    bottomSheetRef.current?.snapTo(0); // 25% → reveal profile
    setActiveCurrentView(view);
  };

  const handleHeaderItemsCollapse = () => {
    bottomSheetRef.current?.snapTo(1); // 100% → collapse
    setActiveCurrentView(null);
  };

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

  const logout = useUserStore(state => state.logout);
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);

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
      onPress: () => {
        logout();
        navigation.reset({
          index: 0,
          routes: [{name: 'OnBoarding'}],
        });
      },
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
    {id: '1', title: 'All'},
    {id: '22', title: 'Design'},
    {id: '75', title: 'Coding'},
    {id: '18', skill: 'Animation'},
  ];

  const courseType = [
    {id: '1', title: 'All'},
    {id: '12', title: 'Design'},
    {id: '7', title: 'Animation'},
  ];

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
            setActiveCurrentView={view => handleHeaderItemsPress(view)}
            snapToCollapsed={() => handleHeaderItemsCollapse()}
          />

          {activeCurrentView === 'notifications' && (
            <NotificationsPanel
              notificationData={notificationData}
              handleHeaderItemsCollapse={handleHeaderItemsCollapse}
            />
          )}
          {activeCurrentView === 'profile' && (
            <ProfileComponent
              profileData={profileData}
              handleHeaderItemsCollapse={handleHeaderItemsCollapse}
            />
          )}
        </Animated.View>

        <HomeSlider
          ref={bottomSheetRef}
          initialIndex={2} // Full open
          snapPoints={snapPoints}
          courseFilter={courseFilter}
          exploreCoursesFilter={exploreCoursesFilter}
          recommendedCourses={courseFilter}
          allCourses={courseFilter}
          courseType={courseType}
          weekStatus={weekStatus}
          currentDay={currentDay}
          statusMap={statusMap}
          onSheetChange={index => {
            if (index === 0 && activeCurrentView !== null) {
              setActiveCurrentView('profile');
            } else if (index === 1) {
              setActiveCurrentView(null);
            }
          }}
        />
        {/* Test Snackbar Button */}
        {/* <Button
          title="Show Test Snackbar"
          onPress={() => showSnackbar('This is a test snackbar!', 'success')}
        />
        <Snackbar /> */}
        <BottomNavBar activeKey={activeTab} onTabPress={setActiveTab} />
      </PageLayout>
    </View>
  );
};

export default MainDash;
