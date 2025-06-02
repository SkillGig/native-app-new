import networkAPICall from '../utils/networkAPICall';
import {authService} from '../config/apiEndPoints';

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
  orgId,
  studentId,
  dataToUpdate,
}) => {
  return await networkAPICall({
    url: authService.raiseStudentInfoRequest,
    method: 'POST',
    data: {orgId, studentId, dataToUpdate},
    service: 'authService',
    auth: false,
  });
};
