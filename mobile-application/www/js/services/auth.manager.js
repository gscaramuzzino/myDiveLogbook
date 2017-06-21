angular.module("myDiveLogbook").factory("AuthManager", AuthManager);
AuthManager.$inject = ["$resource", "$http", "$rootScope", "LocalStorage", "baseURL", "User"];

function AuthManager($resource, $http, $rootScope, LocalStorage, baseURL, User) {
  var authFac = {},
    TOKEN_KEY = 'userinfo',
    isAuthenticated = false,
    username = '',
    authToken = undefined;
  var authManager = {};

  authManager = {

    getCredentials: function () {
      return LocalStorage.getObject(TOKEN_KEY, '{}');
    },

    loadUserCredentials: function () {
      var credentials = LocalStorage.getObject(TOKEN_KEY, '{}');
      if (credentials.username != undefined) {
        authManager.useCredentials(credentials);
        authManager.getUserProfile();
        return true;
      }
      return false;
    },

    storeUserCredentials: function (credentials) {
      LocalStorage.storeObject(TOKEN_KEY, credentials);
      authManager.useCredentials(credentials);
    },

    useCredentials: function (credentials) {
      isAuthenticated = true;
      username = credentials.username;
      authToken = credentials.token;
      // Set the token as header for your requests!
      $http.defaults.headers.common['x-access-token'] = authToken;
    },

    destroyUserCredentials: function () {
      authToken = undefined;
      username = '';
      isAuthenticated = false;
      $http.defaults.headers.common['x-access-token'] = authToken;
      LocalStorage.remove(TOKEN_KEY);
      $rootScope.$broadcast('logout:Successful');
    },

    getUserProfile: function () {
      $http.get(baseURL + "users/profile").then(function (user) {
        User.setUser(user.data);
      });
    },

    login: function (loginData) {
      $resource(baseURL + "users/login")
        .save(loginData,
          function (response) {
            authManager.storeUserCredentials({
              username: loginData.username,
              token: response.token
            });
            authManager.getUserProfile();
            $rootScope.$broadcast('login:Successful');
          },
          function (response) {});
    },

    register: function (registerData) {
      $resource(baseURL + "users/register")
        .save(registerData,
          function (response) {
            authManager.login({
              username: registerData.username,
              password: registerData.password
            });
            if (registerData.rememberMe) {
              LocalStorage.storeObject(TOKEN_KEY, {
                username: registerData.username,
                password: registerData.password
              });
            }
            $rootScope.$broadcast('registration:Successful');
          },
          function (response) {});
    },

    logout: function () {
      $resource(baseURL + "users/logout").get(function (response) {
        authManager.destroyUserCredentials();
      });
    },

    isAuthenticated: function () {
      return isAuthenticated;
    },

    getUsername: function () {
      return username;
    }
  };

  return authManager;

};
