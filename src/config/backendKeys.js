const keys = {
  development: {
    authService: 'http://192.168.0.101:4001/auth',
    userService: 'http://192.168.0.101:4002/user',
    notificationsService: 'http://192.168.0.101:4024/notifications',
    webSocketService: 'http://192.168.0.101:4024',
  },
  production: {
    authService: 'https://api.skillgig.com/auth',
    userService: 'https://api.skillgig.com/user',
    notificationsService: 'http://192.168.0.100:4024/notifications',
  },
  staging: {
    authService: 'https://api.diwaytech.in/service-auth/auth',
    userService: 'https://api.diwaytech.in/service-core/user',
    notificationsService:
      'https://api.diwaytech.in/service-notifications/notifications',
  },
};

module.exports = keys.development;
