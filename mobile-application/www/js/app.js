angular.module('myDiveLogbook', ['ionic', 'ngCordova', 'ngResource'])
  .constant("baseURL", "http://ec2-52-23-211-176.compute-1.amazonaws.com:3000/")
  .run(function ($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
    $ionicPlatform.ready(function () {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      $timeout(function () {
        //$cordovaSplashscreen.hide();
      }, 2000);
    });

    $rootScope.$on('loading:show', function () {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Loading ...'
      })
    });

    $rootScope.$on('loading:hide', function () {
      $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.$broadcast('loading:hide');
    });
  });