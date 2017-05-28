AppRoute.$inject = ["$stateProvider", "$urlRouterProvider"];

export default function AppRoute(stateProvider, urlProvider) {

  stateProvider.state('app', {
    url: '/',
    views: {
      'header': {
        templateUrl: require('./views/navbar/navbar.html'),
        controller: 'NavbarController',
        controllerAs: '$nav'
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

  stateProvider.state('app.profile', {
    url: 'app.profile',
    views: {
      'content@': {
        templateUrl: require('./views/profile/profile.html'),
        controller: 'ProfileController',
        controllerAs: '$profile'
      }
    }
  });

  stateProvider.state('app.dive', {
    url: 'app.dive',
    views: {
      'content@': {
        templateUrl: require('./views/dive/dive.html'),
        controller: 'DivesController',
        controllerAs: '$dive'
      }
    }
  });

  urlProvider.otherwise('/');
}