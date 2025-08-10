const keys = {
  development: {
    authService: 'http://192.168.0.112:4001/auth',
    userService: 'http://192.168.0.112:4002/user',
    notificationsService: 'http://192.168.0.112:4024/notifications',
    webSocketService: 'http://192.168.0.112:4024',
  },
  production: {
    authService: 'https://api.skillgig.com/auth',
    userService: 'https://api.skillgig.com/user',
    notificationsService: 'http://192.168.0.112:4024/notifications',
  },
  staging: {
    authService: 'https://staging.api.skillgig.com/auth',
    userService: 'https://staging.api.skillgig.com/user',
    notificationsService: 'http://192.168.0.112:4024/notifications',
  },
};

module.exports = keys[process.env.NODE_ENV || 'development'];

// const keys = {
//   development: {
//     authService: 'https://api.diwaytech.in/service-auth',
//     userService: 'https://api.diwaytech.in/service-network/user',
//     notificationsService: 'http://192.168.0.112:4024/notifications',
//     webSocketService: 'http://192.168.0.112:4024',
//   },
//   production: {
//     authService: 'https://api.skillgig.com/auth',
//     userService: 'https://api.skillgig.com/user',
//     notificationsService: 'http://192.168.0.112:4024/notifications',
//   },
//   staging: {
//     authService: 'https://staging.api.skillgig.com/auth',
//     userService: 'https://staging.api.skillgig.com/user',
//     notificationsService: 'http://192.168.0.112:4024/notifications',
//   },
// };

// module.exports = keys[process.env.NODE_ENV || 'development'];
