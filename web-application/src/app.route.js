AppRoute.$inject = ["$stateProvider", "$urlRouterProvider"];

export default function AppRoute(stateProvider, urlProvider) {

  stateProvider.state('app', {
    url: '/',
    views: {
      'header': {
        templateUrl: require('./views/navbar/navbar.html'),
        controller: 'NavbarController',
        controllerAs:'$nav'
      },
      'content': {
        templateUrl: require('./views/home/home.html'),
        controller: 'HomeController',
        controllerAs: '$home'
      },
       'footer': {
        templateUrl: ""
      }
    }
  });
  urlProvider.otherwise('/');
}
