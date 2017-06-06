AuthManager.$inject = ["$resource", "$http", "$rootScope", "LocalStorage", "baseURL"];
export default function AuthManager($resource, $http, $rootScope, LocalStorage, baseURL) {
  let authFac = {},
    TOKEN_KEY = 'userinfo',
    isAuthenticated = false,
    username = '',
    authToken = undefined;
  let authManager = {};

  authManager = {

    loadUserCredentials: () => {
      let credentials = LocalStorage.getObject(TOKEN_KEY, '{}');
      if (credentials.username != undefined) {
        authManager.useCredentials(credentials);
        return true;
      }
      return false;
    },

    storeUserCredentials: (credentials) => {
      LocalStorage.storeObject(TOKEN_KEY, credentials);
      authManager.useCredentials(credentials);
    },

    useCredentials: (credentials) => {
      isAuthenticated = true;
      username = credentials.username;
      authToken = credentials.token;
      // Set the token as header for your requests!
      $http.defaults.headers.common['x-access-token'] = authToken;
    },

    destroyUserCredentials: () => {
      authToken = undefined;
      username = '';
      isAuthenticated = false;
      $http.defaults.headers.common['x-access-token'] = authToken;
      LocalStorage.remove(TOKEN_KEY);
      $rootScope.$broadcast('logout:Successful');
    },

    login: (loginData) => {
      $resource(baseURL + "users/login")
        .save(loginData,
          function (response) {
            authManager.storeUserCredentials({
              username: loginData.username,
              token: response.token
            });
            $rootScope.$broadcast('login:Successful');
          },
          function (response) {});
    },

    register: (registerData) => {
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

    logout: () => {
      $resource(baseURL + "users/logout").get(function (response) {
        authManager.destroyUserCredentials();
      });
    },

    isAuthenticated: () => {
      return isAuthenticated;
    },

    getUsername: () => {
      return username;
    }

  };

  authManager.loadUserCredentials();
  return authManager;

}