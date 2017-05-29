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
    url: 'profile',
    views: {
      'content@': {
        templateUrl: require('./views/profile/profile.html'),
        controller: 'ProfileController',
        controllerAs: '$profile'
      }
    }
  });

  stateProvider.state('app.dive', {
    url: 'dive',
    views: {
      'content@': {
        templateUrl: require('./views/dive/dive.html'),
        controller: 'DiveController',
        controllerAs: '$dive'
      }
    }
  });

  stateProvider.state('app.logbook', {
    url: 'logbook',
    views: {
      'content@': {
        templateUrl: require('./views/logbook/logbook.html'),
        controller: 'LogbookController',
        controllerAs: '$logbook'
      }
    }
  });

  urlProvider.otherwise('/');
}