import {create} from 'zustand';
import {persist} from 'zustand/middleware';
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
      },
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
    }),
    {
      name: 'user-storage',
      storage: AsyncStorage,
    },
  ),
);

export default useUserStore;
