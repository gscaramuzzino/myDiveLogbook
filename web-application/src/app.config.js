export default class AppConfig {

  /*@ngInject;*/
  constructor($httpProvider) {
    $httpProvider.interceptors.push("HttpInterceptor");
  }
}