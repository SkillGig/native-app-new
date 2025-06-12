import networkAPICall from '../utils/networkAPICall';
import {
  authService,
  userService,
  notificationsService,
} from '../config/apiEndPoints';
import messaging from '@react-native-firebase/messaging';
import useUserStore from '../store/useUserStore';
import {Platform} from 'react-native';

// 1. Find Org with Org Code (No Auth)
export const findOrgWithOrgCode = async orgCode => {
  return await networkAPICall({
    url: authService.verifyOrg,
    method: 'GET',
    params: {orgCode},
    service: 'authService',
    auth: false,
  });
};

// 2. Login with Org Code and Student Id (No Auth)
export const loginWithOrgAndStudentId = async ({
  orgCode,
  studentId,
  platform = 'ios',
}) => {
  return await networkAPICall({
    url: authService.login,
    method: 'POST',
    data: {orgCode, studentId},
    headers: {platform},
    service: 'authService',
    auth: false,
  });
};

// 3. Verify OTP (No Auth)
export const verifyOTP = async (payload, platform = 'ios') => {
  return await networkAPICall({
    url: authService.verifyOtp,
    method: 'POST',
    data: payload,
    headers: {platform},
    service: 'authService',
    auth: false,
  });
};

// 4. Register a new Student (No Auth)
export const registerNewStudent = async ({
  orgCode,
  studentId,
  platform = 'ios',
}) => {
  return await networkAPICall({
    url: authService.registerNewUser,
    method: 'POST',
    data: {orgCode, studentId},
    headers: {platform, 'Content-Type': 'application/json'},
    service: 'authService',
    auth: false,
  });
};

// 5. Generate New Auth Token from refresh token (No Auth, uses x-refresh-token header)
export const generateNewAuthToken = async (refreshToken, platform = 'ios') => {
  return await networkAPICall({
    url: authService.generateNewAuthToken,
    method: 'GET',
    headers: {'x-refresh-token': refreshToken, platform},
    service: 'authService',
    auth: false,
  });
};

// 6. Raise Student Info Request (No Auth)
export const raiseStudentInfoRequest = async ({
  orgCode,
  studentId,
  dataToUpdate,
}) => {
  return await networkAPICall({
    url: authService.raiseStudentInfoRequest,
    method: 'POST',
    data: {orgCode, studentId, dataToUpdate},
    service: 'authService',
    auth: false,
  });
};

export const resendOTP = async (payload, platform = 'ios') => {
  return await networkAPICall({
    url: authService.resendOTP,
    method: 'POST',
    data: payload,
    headers: {platform},
    service: 'authService',
    auth: false,
  });
};

export const fetchUserRoadmaps = async () => {
  return await networkAPICall({
    url: userService.fetchUserRoadmaps,
    method: 'GET',
    service: 'userService',
    auth: true,
  });
};

export const requestAndRegisterFcmToken = async (fcmTokenFromStore = null) => {
  // Request permission
  if (fcmTokenFromStore) {
    return false; // If token is already provided, return it
  }
  let fcmToken = fcmTokenFromStore;
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    return null;
  }

  // Get FCM token
  if (!fcmToken) {
    // If no token provided, fetch a new one
    fcmToken = await messaging().getToken();
  }

  // Store locally (Zustand)
  useUserStore.getState().setFcmToken(fcmToken);
  // No need to store in AsyncStorage directly, Zustand persist will handle it

  // Register with backend
  try {
    await networkAPICall({
      url: notificationsService.registerToken,
      method: 'POST',
      data: {},
      headers: {
        'device-token': fcmToken,
        'user-type': 'app-user',
        platform: Platform.OS,
      },
      auth: true,
      service: 'notificationsService',
    }).then(() => fcmToken);
  } catch (e) {
    // Optionally handle error
  }

  return fcmToken;
};

export const getUserConfig = async () => {
  return await networkAPICall({
    url: userService.userConfig,
    method: 'GET',
    service: 'userService',
    auth: true,
  });
};
