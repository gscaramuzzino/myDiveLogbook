angular.module("myDiveLogbook").config(AppConfig);
AppConfig.$inject = ["$httpProvider"];
function AppConfig($httpProvider) {
  $httpProvider.interceptors.push("HttpInterceptor");
}