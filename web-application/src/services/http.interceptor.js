HttpInterceptor.$inject = ["$q", "UiManager"];
export default function HttpInterceptor($q, UiManager) {

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
      UiManager.hideOverlay();
      UiManager.showMessageError();
      return $q.reject(rejection);
    }

  }
}