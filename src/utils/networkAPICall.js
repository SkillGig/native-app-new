import axios from 'axios';
import {authService} from '../config/apiEndPoints';
import backendKeys from '../config/backendKeys';
import useUserStore from '../store/useUserStore';
import useSnackbarStore from '../store/useSnackbarStore';

const getTokens = async () => {
  // Fetch tokens from Zustand user store
  const user = useUserStore.getState().user;
  const accessToken = user.authToken;
  const refreshToken = user.refreshToken;
  return {accessToken, refreshToken};
};

const setAccessToken = async token => {
  // Update token in Zustand user store
  useUserStore.getState().setTokens({
    authToken: token,
    refreshToken: useUserStore.getState().user.refreshToken,
  });
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
    authHeaders['Authorization'] = `${accessToken}`;
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

    console.log(response, authHeaders, 'Network API Call Response');
    // If the response has an error with status 401 or 'Invalid token', throw to trigger refresh
    if (
      response.data?.error === 'Invalid token' ||
      response.data?.status === 401 ||
      response.status === 401
    ) {
      throw new Error('Invalid token');
    }

    // <-- NEW: Trigger Snackbar notification if present in response
    if (response.data.notifyUser) {
      useSnackbarStore.getState().showSnackbar({
        message: response.data.notifyUser,
        type: 'info', // or 'success'/'error' based on your API or logic
      });
    }

    return {...response.data, ...response.headers};
  } catch (error) {
    // If unauthorized and retry is allowed, try to refresh token
    console.log(error, 'Network API Call Error');
    if (
      (error.response?.status === 401 || error.message === 'Invalid token') &&
      retry &&
      refreshToken &&
      url !== authService.generateNewAuthToken &&
      auth
    ) {
      console.log('Attempting to refresh token...');
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

// Example usage in your API call handler or component:
// import useSnackbarStore from '../src/store/useSnackbarStore';

// const response = await networkAPICall({...});
// if (response.notifyUser) {
//   useSnackbarStore.getState().showSnackbar({
//     message: response.notifyUser,
//     type: 'info', // or 'success'/'error' based on your API or logic
//   });
// }
