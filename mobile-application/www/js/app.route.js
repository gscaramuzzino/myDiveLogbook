angular.module("myDiveLogbook").config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/sidebar/sidebar.html',
      controller: 'SidebarController'
    })

    .state('app.home', {
      url: '/home',
      views: {
        'mainContent': {
          templateUrl: 'templates/home/home.html',
          controller: 'HomeController',
          controllerAs: '$home'
        }
      }
    })

    .state('app.certificate', {
      url: '/certificate',
      views: {
        'mainContent': {
          templateUrl: 'templates/certificate/certificate.html',
          controller: 'CertificateController',
          controllerAs: '$certificate'
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'mainContent': {
          templateUrl: 'templates/profile/profile.html',
          controller: 'ProfileController',
          controllerAs: '$profile'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
