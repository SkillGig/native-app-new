import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authService} from '../config/apiEndPoints';
import backendKeys from '../config/backendKeys';

const getTokens = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  return {accessToken, refreshToken};
};

const setAccessToken = async token => {
  await AsyncStorage.setItem('accessToken', token);
};

const networkAPICall = async ({
  url,
  method = 'GET',
  data = null,
  params = null,
  headers = {},
  timeout = 10000,
  retry = true,
  service = 'authService',
  auth = true, // <-- NEW: whether to include Authorization header
}) => {
  const {accessToken, refreshToken} = await getTokens();
  let authHeaders = {...headers};
  if (auth && accessToken) {
    authHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  console.log(
    `Making ${method} request to ${url} with params: ${JSON.stringify(
      params,
    )}, data: ${JSON.stringify(data)}, headers: ${JSON.stringify(
      authHeaders,
    )}, service: ${service}`,
  );

  try {
    const response = await axios({
      baseURL: backendKeys[service],
      url,
      method,
      data,
      params,
      headers: authHeaders,
      timeout,
    });
    return {...response.data, ...response.headers};
  } catch (error) {
    // If unauthorized and retry is allowed, try to refresh token
    if (
      error.response?.status === 401 &&
      retry &&
      refreshToken &&
      url !== authService.generateNewAuthToken &&
      auth // Only try refresh if auth was required
    ) {
      try {
        // Attempt to get a new access token
        const refreshResponse = await axios.post(
          backendKeys[service] + authService.generateNewAuthToken,
          {refreshToken},
        );
        const newAccessToken = refreshResponse.data?.accessToken;
        if (newAccessToken) {
          await setAccessToken(newAccessToken);
          // Retry original request with new token
          return await networkAPICall({
            url,
            method,
            data,
            params,
            headers,
            timeout,
            retry: false, // Prevent infinite loop
            service,
            auth,
          });
        }
      } catch (refreshError) {
        return {
          success: false,
          error: 'Session expired. Please login again.',
          status: 401,
        };
      }
    }
    return {
      success: false,
      error: error.response?.data || error.message || 'Network Error',
      status: error.response?.status,
    };
  }
};

export default networkAPICall;
