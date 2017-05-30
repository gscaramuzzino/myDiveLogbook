ProfileManager.$inject = ["$resource"];
export default function ProfileManager($resource) {

  return {
    get: (userId) => {
      UiManager.showOverlay();
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
      return config;
    },

    put: (userId) => {
      UiManager.showMessageError('Error with the request!');
      return $q.reject(rejection);
    },

    delete: (userId) => {
      UiManager.hideOverlay();
      return response;
    }
  
  }
}