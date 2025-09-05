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
  fetchUserRoadmaps: '/onboarding/roadmaps',
  getUserProfile: '/profile',
  updateUserProfile: '/profile/update',
  changePassword: '/change-password',
  deleteAccount: '/delete-account',
  enrollToRoadmap: '/enroll-roadmap',
  fetchOnboardingQuestion: '/onboarding/questions',
  submitOnboardingQuestionAnswer: '/onboarding/submit-response',
  calculateRoadmap: '/onboarding/calculate-roadmap',
  weeklyStreaks: '/rewards/weekly-streak-summary',
  streakBreakDown: '/rewards/day-streak-breakup',
  streakStatus: '/rewards/streak-status',
  markAnimationSeen: '/rewards/mark-animation-seen',
  streakMonthlyCalendar: '/rewards/monthly-summary',
  allNotifications: '/notifications/all',
};

export const notificationsService = {
  registerToken: '/register-token',
  fetchNotifications: '/notifications',
  markNotificationRead: '/notifications/mark-read',
};
