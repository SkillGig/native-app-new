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
import {
  currentDayStreakStatus,
  getStreakBreakDown,
  getWeeklyStreaks,
  requestAndRegisterFcmToken,
} from '../../src/api/userOnboardingAPIs';
import messaging from '@react-native-firebase/messaging';
import Loader from '../../components/Loader';
import {getUserConfig} from '../../src/api/userOnboardingAPIs';
import useSnackbarStore from '../../src/store/useSnackbarStore';
import {connectNotificationSocket} from '../../src/api/notificationSocket';
import {StreakCalendarBottomSheet} from '../../components';

const MainDash = ({navigation}) => {
  const [activeCurrentView, setActiveCurrentView] = useState(0);
  const [streakStatusResponse, setStreakStatusResponse] = useState(null);

  // Refs for bottom sheets
  const streakCalendarRef = useRef(null);

  const handleHeaderItemsPress = view => {
    setActiveCurrentView(view);
  };

  const handleHeaderItemsCollapse = () => {
    setActiveCurrentView(null);
  };

  // Handle streak calendar open
  const handleStreakPress = () => {
    if (streakCalendarRef.current) {
      streakCalendarRef.current.present();
    }
  };

  const statusMap = {
    done: {
      icon: images.STREAKICON,
      color: '#4CAF50',
    },
    'yet-to-do': {
      icon: images.YETTOSTARTSTREAK,
      color: '#2196F3',
    },
    'not-done': {
      icon: images.STREAKFAILED,
      color: '#F44336',
    },
  };

  const logout = useUserStore(state => state.logout);
  const fcmToken = useUserStore(state => state.fcmToken);
  const user = useUserStore(state => state.user);
  const setUserConfig = useUserStore(state => state.setUserConfig);
  const [loading, setLoading] = useState(false);
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const setFcmToken = useUserStore(state => state.setFcmToken);
  const userConfig = useUserStore(state => state.userConfig);

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
    const requestAndRegisterFcmTokenForDevice = async () => {
      if (!useUserStore.getState().user?.authToken) {
        const newFcmToken = await requestAndRegisterFcmToken(fcmToken);
        if (newFcmToken) {
          setFcmToken(newFcmToken);
        }
      }
    };

    requestAndRegisterFcmTokenForDevice();
  }, [fcmToken, setFcmToken]);

  const permissionRequestedRef = useRef(false);

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
    // Only request permission after user is logged in and only once per session
    if (user && user.authToken && !permissionRequestedRef.current) {
      requestNotificationPermissionIfNeeded();
      permissionRequestedRef.current = true;
    }
  }, [user]);

  // Fetch userConfig on mount (or after login)
  useEffect(() => {
    async function fetchUserConfig() {
      if (user && user.authToken) {
        setLoading(true);
        try {
          const res = await getUserConfig();
          console.log(res, 'User Config Response');
          if (res?.data?.config) {
            setUserConfig(res.data.config);
            // if user streaks flag is 1 then we need to call the user streaks API
            const streaksFlag = res.data.config.showUserStreaks;
            if (streaksFlag === 1) {
              const todayStreakStatus = await currentDayStreakStatus();
              console.log(todayStreakStatus, 'the todays streak status');
              const streaksRes = await getWeeklyStreaks();
              setStreakStatusResponse(streaksRes.data);
              if (
                todayStreakStatus.data.data.completedStreak &&
                !todayStreakStatus.data.data.animationSeen
              ) {
                const streakDate = new Date();
                const formattedStreakDate = `${streakDate
                  .getDate()
                  .toString()
                  .padStart(2, '0')}-${(streakDate.getMonth() + 1)
                  .toString()
                  .padStart(2, '0')}-${streakDate.getFullYear()}`;
                const streakBreakDown = await getStreakBreakDown(
                  formattedStreakDate,
                );
                return navigation.navigate('CurrentDayStreakBreakdown', {
                  streakBreakDownInfo: streakBreakDown.data,
                });
              }
            }
          } else {
            showSnackbar({
              message: 'Invalid user. Please log in again.',
              type: 'error',
            });
            // navigation.reset({
            //   index: 0,
            //   routes: [{name: 'OnBoarding'}],
            // });
          }
        } catch (e) {
          showSnackbar({
            message: 'Invalid user. Please log in again.',
            type: 'error',
          });
          // navigation.reset({
          //   index: 0,
          //   routes: [{name: 'OnBoarding'}],
          // });
        } finally {
          setLoading(false);
        }
      }
    }
    fetchUserConfig();
  }, [user, setUserConfig, showSnackbar, navigation, logout]);

  // Connect to notification WebSocket room if userId is present and socket is not connected
  useEffect(() => {
    if (userConfig) {
      connectNotificationSocket();
    }
  }, [userConfig]);

  // Feature toggles from userConfigData

  return (
    <View style={{flex: 1}}>
      {loading && <Loader />}
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
          />

          {activeCurrentView === 'notifications' && (
            <NotificationsPanel
              notificationData={notificationData}
              handleHeaderItemsCollapse={() => handleHeaderItemsCollapse()}
            />
          )}
          {activeCurrentView === 'profile' && (
            <ProfileComponent
              profileData={profileData}
              handleHeaderItemsCollapse={() => handleHeaderItemsCollapse()}
            />
          )}
        </Animated.View>

        {/* Example: show/hide HomeSlider based on featureToggles.showUserRoadmap */}
        <HomeSlider
          courseFilter={courseFilter}
          exploreCoursesFilter={exploreCoursesFilter}
          recommendedCourses={courseFilter}
          allCourses={courseFilter}
          courseType={courseType}
          weekStatus={streakStatusResponse}
          statusMap={statusMap}
          activeCurrentView={activeCurrentView}
          onStreakPress={handleStreakPress}
          onSheetChange={index => {
            console.log(index, 'the current sheet index');
            if (index === 1) {
              setActiveCurrentView(null);
            }
          }}
        />
      </PageLayout>

      {/* Streak Calendar Bottom Sheet */}
      <StreakCalendarBottomSheet ref={streakCalendarRef} />
    </View>
  );
};

export default MainDash;
