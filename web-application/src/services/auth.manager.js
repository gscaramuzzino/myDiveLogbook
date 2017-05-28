AuthManager.$inject = ["$resource", "$http", "$rootScope", "LocalStorage", "baseURL"];
export default function AuthManager($resource, $http, $rootScope, LocalStorage, baseURL) {
  let authFac = {},
    TOKEN_KEY = 'Token',
    isAuthenticated = false,
    username = '',
    authToken = undefined;
  let authManager = {};

  authManager = {

    loadUserCredentials: () => {
      let credentials = LocalStorage.get(TOKEN_KEY, '{}');
      if (credentials.username != undefined) {
        authManager.useCredentials(credentials);
      }
    },

    storeUserCredentials: (credentials) => {
      LocalStorage.store(TOKEN_KEY, credentials);
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
              LocalStorage.store('userinfo', {
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