export const authService = {
  verifyOrg: '/verify-org',
  login: '/login',
  verifyOtp: '/verify-otp',
  resendOTP: '/resend-otp',
  registerNewUser: '/register-new-user',
  generateNewAuthToken: '/generate-new-auth-token',
  raiseStudentInfoRequest: '/raise-student-info-request',
};
export const userService = {
  userConfig: '/config',
  fetchUserRoadmaps: '/roadmaps',
  getUserProfile: '/profile',
  updateUserProfile: '/profile/update',
  changePassword: '/change-password',
  deleteAccount: '/delete-account',
};

export const notificationsService = {
  registerToken: '/register-token',
  fetchNotifications: '/notifications',
  markNotificationRead: '/notifications/mark-read',
};
