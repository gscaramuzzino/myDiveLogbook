angular.module("myDiveLogbook").controller('SidebarController', SidebarController);
SidebarController.$inject = ["$scope", "$rootScope", "$ionicModal", "$timeout", "LocalStorage", "$ionicPlatform", "$cordovaCamera", "$cordovaImagePicker", "AuthManager"];

function SidebarController($scope, $rootScope, $ionicModal, $timeout, LocalStorage, $ionicPlatform, $cordovaCamera, $cordovaImagePicker, AuthManager) {

  $scope.loginData = LocalStorage.getObject('userinfo', '{}');
  $scope.reservation = {};
  $scope.registration = {};
  $scope.loggedIn = false;

  if (AuthManager.isAuthenticated()) {
    $scope.loggedIn = true;
    $scope.username = AuthManager.getUsername();
  } 

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login/login.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function () {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function () {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
    LocalStorage.storeObject('userinfo', $scope.loginData);

    AuthManager.login($scope.loginData);

    $scope.closeLogin();
  };

  $scope.logOut = function () {
    AuthManager.logout();
    $scope.loggedIn = false;
    $scope.username = '';
  };

  $rootScope.$on('login:Successful', function () {
    $scope.loggedIn = AuthManager.isAuthenticated();
    $scope.username = AuthManager.getUsername();
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register/register.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.registerform = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRegister = function () {
    $scope.registerform.hide();
  };

  // Open the login modal
  $scope.register = function () {
    $scope.registerform.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doRegister = function () {
    console.log('Doing registration', $scope.registration);
    $scope.loginData.username = $scope.registration.username;
    $scope.loginData.password = $scope.registration.password;

    AuthManager.register($scope.registration);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function () {
      $scope.closeRegister();
    }, 1000);
  };

  $rootScope.$on('registration:Successful', function () {
    $scope.loggedIn = AuthManager.isAuthenticated();
    $scope.username = AuthManager.getUsername();
    LocalStorage.storeObject('userinfo', $scope.loginData);
  });

};
