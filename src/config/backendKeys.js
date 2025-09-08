const keys = {
  development: {
    authService: 'http://192.168.0.102:4001/auth',
    userService: 'http://192.168.0.102:4002/user',
    notificationsService: 'http://192.168.0.102:4024/notifications',
    webSocketService: 'http://192.168.0.102:4024',
  },
  production: {
    authService: 'https://api.diwaytech.in/service-auth/auth',
    userService: 'https://api.diwaytech.in/service-core/user',
    notificationsService:
      'https://api.diwaytech.in/service-notifications/notifications',
  },
  staging: {
    authService: 'https://api.diwaytech.in/service-auth/auth',
    userService: 'https://api.diwaytech.in/service-core/user',
    notificationsService:
      'https://api.diwaytech.in/service-notifications/notifications',
  },
};

// Make release version behave like development for testing
const environment = __DEV__ ? 'development' : 'development'; // Always use development config
module.exports = keys.development;
