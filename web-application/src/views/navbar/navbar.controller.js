
export default class NavbarController {

  constructor($rootScope, $state, AuthManager, UiManager) {
    this.AuthManager = AuthManager;
    this.UiManager = UiManager;

    $rootScope.$on('login:Successful', function () {
      $state.go("app.logbook");
    });

    $rootScope.$on('registration:Successful', function () {
      this.UiManager.showMessageSuccess("Registration completed!");
    });

  }

  isAuthenticated() {
    return this.AuthManager.isAuthenticated();
  }
}
NavbarController.$inject = ["$rootScope", "$state", "AuthManager", "UiManager"];