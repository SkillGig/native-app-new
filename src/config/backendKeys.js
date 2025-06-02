const keys = {
  development: {
    authService: 'http://192.168.0.100:4001/auth',
    userService: 'http://localhost:4002/user',
  },
  production: {
    authService: 'https://api.skillgig.com/auth',
    userService: 'https://api.skillgig.com/user',
  },
  staging: {
    authService: 'https://staging.api.skillgig.com/auth',
    userService: 'https://staging.api.skillgig.com/user',
  },
};

module.exports = keys[process.env.NODE_ENV || 'development'];
