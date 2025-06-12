/**
 * Refactor prompt:
 // Copilot will now generate the ListHeaderComponent structure with FlatLists + HomeHero.
 */

import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  View,
  Animated,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
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
import BottomNavBar from '../../components/BottomNavBar';
import {requestAndRegisterFcmToken} from '../../src/api/userOnboardingAPIs';
import messaging from '@react-native-firebase/messaging';

const MainDash = ({navigation}) => {
  const [activeCurrentView, setActiveCurrentView] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const bottomSheetRef = useRef(null);

  const snapPoints = useRef(['12%', '87%']).current;

  const handleHeaderItemsPress = view => {
    setActiveCurrentView(view);
  };

  useEffect(() => {
    // Reset active view when component mounts
    if (activeCurrentView !== null) {
      bottomSheetRef.current?.snapTo(0);
    } else {
      bottomSheetRef.current?.snapTo(1);
    }
  }, [activeCurrentView]);

  const handleHeaderItemsCollapse = () => {
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
  const fcmToken = useUserStore(state => state.fcmToken);
  const user = useUserStore(state => state.user);
  const [hasRequestedPermission, setHasRequestedPermission] = useState(false);

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

  useEffect(() => {
    if (!fcmToken) {
      requestAndRegisterFcmToken();
    }
  }, [fcmToken]);

  useEffect(() => {
    async function requestNotificationPermissionIfNeeded() {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          if (!granted) {
            const result = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
            if (result !== PermissionsAndroid.RESULTS.GRANTED) {
              Alert.alert(
                'Permission Required',
                'Please enable notifications in settings to receive important updates.',
              );
            }
          }
        }
      } else if (Platform.OS === 'ios') {
        const authStatus = await messaging().hasPermission();
        if (
          authStatus !== messaging.AuthorizationStatus.AUTHORIZED &&
          authStatus !== messaging.AuthorizationStatus.PROVISIONAL
        ) {
          const newStatus = await messaging().requestPermission();
          if (
            newStatus !== messaging.AuthorizationStatus.AUTHORIZED &&
            newStatus !== messaging.AuthorizationStatus.PROVISIONAL
          ) {
            Alert.alert(
              'Permission Required',
              'Please enable notifications in settings to receive important updates.',
            );
          }
        }
      }
    }

    // Only request permission after user is logged in and only once
    if (user && user.authToken && !hasRequestedPermission) {
      requestNotificationPermissionIfNeeded();
      setHasRequestedPermission(true);
    }
  }, [user, hasRequestedPermission]);

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
            if (index === 1) {
              setActiveCurrentView(null);
            }
          }}
        />
        <BottomNavBar activeKey={activeTab} onTabPress={setActiveTab} />
      </PageLayout>
    </View>
  );
};

export default MainDash;
