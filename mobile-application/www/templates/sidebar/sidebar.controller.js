angular.module("myDiveLogbook").controller('SidebarController', SidebarController);
SidebarController.$inject = ["$scope", "$rootScope","$window", "$ionicModal", "$state", "$timeout", "LocalStorage", "$ionicPlatform", "$cordovaCamera", "$cordovaImagePicker", "AuthManager"];

function SidebarController($scope, $rootScope,$window, $ionicModal, $state, $timeout, LocalStorage, $ionicPlatform, $cordovaCamera, $cordovaImagePicker, AuthManager) {

  $scope.loginData = LocalStorage.getObject('userinfo', '{}');
  $scope.reservation = {};
  $scope.registration = {};
  $scope.loggedIn = false;

  if (AuthManager.isAuthenticated()) {
    $scope.loggedIn = true;
    $scope.username = AuthManager.getUsername();
  }

  $rootScope.$on('login:Successful', function () {
    $scope.loggedIn = AuthManager.isAuthenticated();
    $scope.username = AuthManager.getUsername();
  });

  $scope.logOut = function () {
    console.log("logOut");
    AuthManager.logout();
    $scope.loggedIn = false;
    $scope.username = '';

    $window.location.reload()
    $state.go("home");
  };
};