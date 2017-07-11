angular.module("myDiveLogbook").factory("HttpInterceptor", HttpInterceptor);
HttpInterceptor.$inject = ["$q"];

function HttpInterceptor($q) {

  return {
    request: (config) => {
      return config;
    },

    requestError: (rejection) => {
      return $q.reject(rejection);
    },

    response: (response) => {
      return response;
    },

    responseError: (rejection) => {
      return $q.reject(rejection);
    }

  }
}
