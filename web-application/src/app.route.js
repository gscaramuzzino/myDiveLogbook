AppRoute.$inject = ["$stateProvider", "$urlRouterProvider"];

export default function AppRoute(stateProvider, urlProvider) {

  stateProvider.state('app', {
    url: '/',
    views: {
      'header': {
        templateUrl: require('./views/navbar/navbar.html'),
        controller: 'NavbarController',
        controllerAs:'navCtrl'
      },
      'content': {
        templateUrl: require('./views/login/login.html'),
        controller: 'LoginController',
        controllerAs: 'logCtrl'
      },
       'footer': {
        templateUrl: ""
      }
    }
  });
  urlProvider.otherwise('/');
}
