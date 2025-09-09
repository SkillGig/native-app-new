import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  View,
  Animated,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import images from '../../assets/images';
import {
  heightFromScreenPercent,
  normalizeHeight,
} from '../../components/Responsivescreen';
import PageWrapper from '../../components/PageWrapper';
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
  getRoadmapDetails,
  dailyLoginForXp,
} from '../../src/api/userOnboardingAPIs';
import messaging from '@react-native-firebase/messaging';
import {getUserConfig} from '../../src/api/userOnboardingAPIs';
import useSnackbarStore from '../../src/store/useSnackbarStore';
import {connectNotificationSocket} from '../../src/api/notificationSocket';
import {StreakCalendarBottomSheet} from '../../components';
import HeaderSkeleton from '../../components/Skeletons/HeaderSkeleton';

const MainDash = ({navigation}) => {
  const insets = useSafeAreaInsets();
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
  const [roadmapData, setRoadmapData] = useState(null); // Store roadmap details
  const [isRoadmapDataLoading, setIsRoadmapDataLoading] = useState(true);
  const [activeRoadmap, setActiveRoadmap] = React.useState(null);

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

  const fetchRoadmapData = useCallback(async () => {
    // This function is now only used for when activeRoadmap changes after initial load
    if (activeRoadmap && userConfig) {
      setIsRoadmapDataLoading(true);
      try {
        const roadmapDetails = await getRoadmapDetails(activeRoadmap.roadmapId);
        setRoadmapData(roadmapDetails?.data?.categories);
      } catch (error) {
        console.error('Error fetching roadmap data:', error);
      } finally {
        setIsRoadmapDataLoading(false);
      }
    }
  }, [activeRoadmap, userConfig]);

  useEffect(() => {
    // Only fetch roadmap data if activeRoadmap changes AFTER initial config load
    // The initial roadmap data is now fetched in parallel with other APIs
    if (activeRoadmap && userConfig && !isConfigLoading) {
      fetchRoadmapData();
    }
  }, [activeRoadmap, fetchRoadmapData, userConfig, isConfigLoading]);

  // Fetch userConfig on mount (or after login) - Optimized with parallel API calls
  // This optimization runs independent API calls in parallel instead of sequentially:
  // 1. fetchAllNotifications - Get user notifications
  // 2. getUserOngoingCourses - Get user's ongoing courses
  // 3. getRoadmapDetails - Get initial roadmap data (if available)
  // 4. currentDayStreakStatus + getWeeklyStreaks - Get streak data (if enabled)
  // This reduces total loading time significantly without changing any business logic
  useEffect(() => {
    async function fetchUserConfig() {
      if (user && user.authToken) {
        setIsConfigLoading(true);
        try {
          const res = await getUserConfig();
          await dailyLoginForXp();
          console.log(res, 'User Config Response');
          if (res?.data?.config) {
            setUserConfig(res.data.config);
            setIsConfigLoading(false);

            // fetch details about the first roadmap which is in res.data.config.availableRoadmaps[0]
            const firstRoadmapId =
              res.data.config.availableRoadmaps[0]?.roadmapId;
            if (firstRoadmapId) {
              setActiveRoadmap(res.data.config.availableRoadmaps[0]);
            }

            // Set loading states for all parallel operations
            setIsInitialNotificationsLoading(true);
            setIsOngoingCoursesLoading(true);

            // Set roadmap loading state if we have a roadmap to fetch
            if (firstRoadmapId) {
              setIsRoadmapDataLoading(true);
            }

            const streaksFlag = res.data.config.showUserStreaks;
            if (streaksFlag === 1) {
              setIsStreakLoading(true);
            } else {
              setIsStreakLoading(false);
            }

            // Create array of independent API calls to run in parallel
            const parallelApiCalls = [];

            // 1. Notifications API call
            parallelApiCalls.push(
              fetchAllNotifications(1, 10)
                .then(notificationsRes => ({
                  type: 'notifications',
                  success: true,
                  data: notificationsRes,
                }))
                .catch(error => ({
                  type: 'notifications',
                  success: false,
                  error,
                })),
            );

            // 2. Ongoing courses API call
            parallelApiCalls.push(
              getUserOngoingCourses()
                .then(ongoingCoursesRes => ({
                  type: 'ongoingCourses',
                  success: true,
                  data: ongoingCoursesRes,
                }))
                .catch(error => ({
                  type: 'ongoingCourses',
                  success: false,
                  error,
                })),
            );

            // 3. Roadmap details API call (if we have a roadmap to fetch)
            if (firstRoadmapId) {
              parallelApiCalls.push(
                getRoadmapDetails(firstRoadmapId)
                  .then(roadmapDetails => ({
                    type: 'roadmapDetails',
                    success: true,
                    data: roadmapDetails,
                  }))
                  .catch(error => ({
                    type: 'roadmapDetails',
                    success: false,
                    error,
                  })),
              );
            }

            // 4. Streak data API calls (only if streaks are enabled)
            if (streaksFlag === 1) {
              parallelApiCalls.push(
                Promise.all([currentDayStreakStatus(), getWeeklyStreaks()])
                  .then(([todayStreakStatus, streaksRes]) => ({
                    type: 'streaks',
                    success: true,
                    data: {todayStreakStatus, streaksRes},
                  }))
                  .catch(error => ({
                    type: 'streaks',
                    success: false,
                    error,
                  })),
              );
            }

            // Execute all API calls in parallel
            const results = await Promise.all(parallelApiCalls);

            // Process results sequentially to maintain original logic
            for (const result of results) {
              try {
                switch (result.type) {
                  case 'notifications':
                    if (result.success) {
                      console.log(result.data, 'Notifications Response');
                      if (result.data?.data?.notifications) {
                        setNotificationsData(result.data.data.notifications);
                        setTotalUnreadNotifications(
                          result.data.data.totalUnread || 0,
                        );
                        setNotificationsPagination(result.data.data.pagination);
                      }
                    } else {
                      console.error(
                        'Error fetching notifications:',
                        result.error,
                      );
                      setNotificationsData([]);
                      setTotalUnreadNotifications(0);
                    }
                    setIsInitialNotificationsLoading(false);
                    break;

                  case 'ongoingCourses':
                    if (result.success) {
                      console.log(result.data, 'Ongoing Courses Response');
                      if (result.data?.data) {
                        setOngoingCoursesData(result.data.data);
                      }
                    } else {
                      console.error(
                        'Error fetching ongoing courses:',
                        result.error,
                      );
                      setOngoingCoursesData(null);
                    }
                    setIsOngoingCoursesLoading(false);
                    break;

                  case 'roadmapDetails':
                    if (result.success) {
                      console.log(result.data, 'Roadmap Details Response');
                      if (result.data?.data?.categories) {
                        setRoadmapData(result.data.data.categories);
                      }
                    } else {
                      console.error(
                        'Error fetching roadmap details:',
                        result.error,
                      );
                      setRoadmapData(null);
                    }
                    setIsRoadmapDataLoading(false);
                    break;

                  case 'streaks':
                    if (result.success) {
                      const {todayStreakStatus, streaksRes} = result.data;
                      console.log(
                        todayStreakStatus,
                        'the todays streak status',
                      );
                      setStreakStatusResponse(streaksRes.data);

                      // Check if animation should be shown
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

                        // This API call depends on streak data, so it runs after parallel calls
                        try {
                          const streakBreakDown = await getStreakBreakDown(
                            formattedStreakDate,
                          );
                          return navigation.navigate(
                            'CurrentDayStreakBreakdown',
                            {
                              streakBreakDownInfo: streakBreakDown.data,
                            },
                          );
                        } catch (streakBreakDownError) {
                          console.error(
                            'Error fetching streak breakdown:',
                            streakBreakDownError,
                          );
                        }
                      }
                    } else {
                      console.error(
                        'Error fetching streak data:',
                        result.error,
                      );
                    }
                    setIsStreakLoading(false);
                    break;
                }
              } catch (processingError) {
                console.error(
                  `Error processing ${result.type} result:`,
                  processingError,
                );
                // Ensure loading states are reset even if processing fails
                if (result.type === 'notifications') {
                  setIsInitialNotificationsLoading(false);
                }
                if (result.type === 'ongoingCourses') {
                  setIsOngoingCoursesLoading(false);
                }
                if (result.type === 'roadmapDetails') {
                  setIsRoadmapDataLoading(false);
                }
                if (result.type === 'streaks') {
                  setIsStreakLoading(false);
                }
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
          setTotalUnreadNotifications(0);
          setNotificationsData([]);
          setIsInitialNotificationsLoading(false);
          setIsOngoingCoursesLoading(false);
          setIsRoadmapDataLoading(false);
          setIsStreakLoading(false);
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

  // Calculate marginTop: 32px from screen top, minus safe area top that's already applied by HOC
  const calculatedMarginTop = Math.max(0, normalizeHeight(32) - insets.top);

  return (
    <View style={{flex: 1}}>
      <PageWrapper>
        <Animated.View
          style={{
            marginTop: calculatedMarginTop,
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

        <HomeSlider
          roadmapData={roadmapData}
          allCourses={courseFilter}
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
          isStreakLoading={isStreakLoading}
          isOngoingCoursesLoading={isOngoingCoursesLoading}
          isRoadmapDataLoading={isRoadmapDataLoading}
          ongoingCoursesData={ongoingCoursesData}
          activeRoadmap={activeRoadmap}
          setActiveRoadmap={setActiveRoadmap}
          isConfigLoading={isConfigLoading}
        />
      </PageWrapper>

      {/* Streak Calendar Bottom Sheet */}
      <StreakCalendarBottomSheet ref={streakCalendarRef} />
    </View>
  );
};

export default MainDash;
