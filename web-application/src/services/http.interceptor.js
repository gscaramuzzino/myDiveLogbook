HttpInterceptor.$inject = ["$q", "$rootScope","UiManager"];
export default function HttpInterceptor($q,$rootScope, UiManager) {

  return {
    request: (config) => {
      UiManager.showOverlay();
      return config;
    },

    requestError: (rejection) => {
      UiManager.showMessageError('Error with the request!');
      return $q.reject(rejection);
    },

    response: (response) => {
      UiManager.hideOverlay();
      return response;
    },

    responseError: (rejection) => {
      console.log(rejection);
      UiManager.hideOverlay();
      UiManager.showMessageError();
      if (rejection.status == 401) {
        $rootScope.$broadcast('credentials:Invalid');
      }
      return $q.reject(rejection);
    }

  }
}