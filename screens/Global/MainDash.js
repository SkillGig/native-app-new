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
  fetchAllNotifications,
  getUserOngoingCourses,
} from '../../src/api/userOnboardingAPIs';
import messaging from '@react-native-firebase/messaging';
import {getUserConfig} from '../../src/api/userOnboardingAPIs';
import useSnackbarStore from '../../src/store/useSnackbarStore';
import {connectNotificationSocket} from '../../src/api/notificationSocket';
import {StreakCalendarBottomSheet} from '../../components';
import HeaderSkeleton from '../../components/Skeletons/HeaderSkeleton';

const MainDash = ({navigation}) => {
  const [activeCurrentView, setActiveCurrentView] = useState(0);
  const [streakStatusResponse, setStreakStatusResponse] = useState(null);
  const [notificationsData, setNotificationsData] = useState([]);
  const [totalUnreadNotifications, setTotalUnreadNotifications] = useState(0);
  const [notificationsPagination, setNotificationsPagination] = useState(null);
  const [isLoadingMoreNotifications, setIsLoadingMoreNotifications] =
    useState(false);
  const [isInitialNotificationsLoading, setIsInitialNotificationsLoading] =
    useState(false);

  // Individual loading states for granular skeleton loading
  const [isConfigLoading, setIsConfigLoading] = useState(true);
  const [isStreakLoading, setIsStreakLoading] = useState(true);
  const [isOngoingCoursesLoading, setIsOngoingCoursesLoading] = useState(true);

  // Ongoing courses data
  const [ongoingCoursesData, setOngoingCoursesData] = useState(null);

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

  // Handle loading more notifications
  const loadMoreNotifications = async () => {
    if (!notificationsPagination || isLoadingMoreNotifications) {
      return;
    }

    const {currentPage, totalPages} = notificationsPagination;
    if (currentPage >= totalPages) {
      return; // No more pages to load
    }

    setIsLoadingMoreNotifications(true);
    try {
      const nextPage = currentPage + 1;
      const notificationsRes = await fetchAllNotifications(nextPage, 10);

      if (notificationsRes?.data?.notifications) {
        // Append new notifications to existing ones
        setNotificationsData(prev => [
          ...prev,
          ...notificationsRes.data.notifications,
        ]);
        setNotificationsPagination(notificationsRes.data.pagination);
      }
    } catch (error) {
      console.error('Error loading more notifications:', error);
    } finally {
      setIsLoadingMoreNotifications(false);
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
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const setFcmToken = useUserStore(state => state.setFcmToken);
  const userConfig = useUserStore(state => state.userConfig);

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
      toValue: heightFromScreenPercent(80), // Reduced from 85 to 80 to avoid covering bottom sheet
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
        setIsConfigLoading(true);
        try {
          const res = await getUserConfig();
          console.log(res, 'User Config Response');
          if (res?.data?.config) {
            setUserConfig(res.data.config);
            setIsConfigLoading(false);

            // Fetch notifications after config is loaded
            try {
              setIsInitialNotificationsLoading(true);
              const notificationsRes = await fetchAllNotifications(1, 10);
              console.log(notificationsRes, 'Notifications Response');
              if (notificationsRes?.data?.notifications) {
                setNotificationsData(notificationsRes.data.notifications);
                setTotalUnreadNotifications(
                  notificationsRes.data.totalUnread || 0,
                );
                setNotificationsPagination(notificationsRes.data.pagination);
              }
            } catch (notificationsError) {
              console.error(
                'Error fetching notifications:',
                notificationsError,
              );
              setNotificationsData([]);
              setTotalUnreadNotifications(0);
            } finally {
              setIsInitialNotificationsLoading(false);
            }

            // Fetch ongoing courses
            try {
              setIsOngoingCoursesLoading(true);
              const ongoingCoursesRes = await getUserOngoingCourses();
              console.log(ongoingCoursesRes, 'Ongoing Courses Response');
              if (ongoingCoursesRes?.data) {
                setOngoingCoursesData(ongoingCoursesRes.data);
              }
            } catch (ongoingCoursesError) {
              console.error(
                'Error fetching ongoing courses:',
                ongoingCoursesError,
              );
              setOngoingCoursesData(null);
            } finally {
              setIsOngoingCoursesLoading(false);
            }

            // if user streaks flag is 1 then we need to call the user streaks API
            const streaksFlag = res.data.config.showUserStreaks;
            if (streaksFlag === 1) {
              setIsStreakLoading(true);
              try {
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
              } catch (streakError) {
                console.error('Error fetching streak data:', streakError);
              } finally {
                setIsStreakLoading(false);
              }
            } else {
              setIsStreakLoading(false);
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
          setTotalUnreadNotifications(0);
          setNotificationsData([]);
          setIsInitialNotificationsLoading(false);
          showSnackbar({
            message: 'Invalid user. Please log in again.',
            type: 'error',
          });
          // navigation.reset({
          //   index: 0,
          //   routes: [{name: 'OnBoarding'}],
          // });
        }
      }
    }
    fetchUserConfig();
  }, [
    user,
    setUserConfig,
    showSnackbar,
    navigation,
    logout,
    setNotificationsData,
    setTotalUnreadNotifications,
    setNotificationsPagination,
    setIsInitialNotificationsLoading,
  ]);

  // Connect to notification WebSocket room if userId is present and socket is not connected
  useEffect(() => {
    if (userConfig) {
      connectNotificationSocket();
    }
  }, [userConfig]);

  // Feature toggles from userConfigData

  return (
    <View style={{flex: 1}}>
      <PageLayout>
        <Animated.View
          style={{
            marginTop: normalizeHeight(32),
            height: headerHeightAnim, // Adjust height based on view
          }}>
          {isConfigLoading ? (
            <HeaderSkeleton />
          ) : (
            <Header
              activeCurrentView={activeCurrentView}
              unreadNotifications={totalUnreadNotifications}
              setActiveCurrentView={view => handleHeaderItemsPress(view)}
            />
          )}

          {activeCurrentView === 'notifications' && (
            <NotificationsPanel
              notificationData={notificationsData}
              isInitialLoading={isInitialNotificationsLoading}
              isLoadingMore={isLoadingMoreNotifications}
              onLoadMore={loadMoreNotifications}
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

        {/* HomeSlider with granular skeletons */}
        <HomeSlider
          courseFilter={courseFilter}
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
          // New props for granular loading
          isStreakLoading={isStreakLoading}
          isOngoingCoursesLoading={isOngoingCoursesLoading}
          ongoingCoursesData={ongoingCoursesData}
        />
      </PageLayout>

      {/* Streak Calendar Bottom Sheet */}
      <StreakCalendarBottomSheet ref={streakCalendarRef} />
    </View>
  );
};

export default MainDash;
