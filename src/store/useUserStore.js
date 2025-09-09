import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserStore = create(
  persist(
    (set, get) => ({
      user: {
        studentId: '',
        orgCode: '',
        authToken: '',
        refreshToken: '',
        userInfo: null,
        orgInfo: null,
        isUserEnrolledToRoadmap: false,
        availableRoadmaps: [],
        streakModal: false,
        fcmToken: '', // Store FCM token
        communityNotifyClicked: false,
      },
      userConfig: {}, // Add userConfig to Zustand store
      setTokens: ({authToken, refreshToken}) =>
        set(state => ({
          user: {
            ...state.user,
            authToken,
            refreshToken,
          },
        })),
      setUserInfo: userInfo =>
        set(state => ({
          user: {
            ...state.user,
            userInfo,
          },
        })),
      setOrgInfo: orgInfo =>
        set(state => ({
          user: {
            ...state.user,
            orgInfo,
          },
        })),
      setStudentId: studentId =>
        set(state => ({
          user: {
            ...state.user,
            studentId,
          },
        })),
      setOrgCode: orgCode =>
        set(state => ({
          user: {
            ...state.user,
            orgCode,
          },
        })),
      setUser: newUser =>
        set(state => ({
          user: {
            ...state.user,
            ...newUser,
          },
        })),
      setIsUserEnrolledToRoadmap: isUserEnrolledToRoadmap =>
        set(state => ({
          user: {
            ...state.user,
            isUserEnrolledToRoadmap,
          },
        })),
      setAvailableRoadmaps: roadmaps =>
        set(state => ({
          user: {
            ...state.user,
            availableRoadmaps: roadmaps,
          },
        })),
      setFcmToken: fcmToken =>
        set(state => ({
          user: {
            ...state.user,
            fcmToken,
          },
        })),
      setUserConfig: config => set(state => ({userConfig: config})), // Add setUserConfig
      getUserConfig: () => get().userConfig, // Add getUserConfig
      setStreakModal: value => {
        set(state => ({
          user: {
            ...state.user,
            streakModal: value,
          },
        }));
      },
      logout: () =>
        set({
          user: {
            studentId: '',
            orgCode: '',
            authToken: '',
            refreshToken: '',
            userInfo: null,
            orgInfo: null,
          },
        }),
      setCommunityNotifyClicked: value =>
        set(state => ({
          user: {
            ...state.user,
            communityNotifyClicked: value,
          },
        })),
    }),
    {
      name: 'user-storage-v3',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({user: state.user}),
    },
  ),
);

export default useUserStore;
