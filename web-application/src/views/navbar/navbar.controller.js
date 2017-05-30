export default class NavbarController {

  constructor($rootScope, $state, AuthManager, UiManager) {
    this.AuthManager = AuthManager;
    this.UiManager = UiManager;
    this.login = {};
    if (this.AuthManager.loadUserCredentials()) {
      $state.go("app.logbook");
    }
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

  doLogin() {
    this.AuthManager.login(this.login);
  }

  doLogout() {
    this.AuthManager.logout();
  }
}
NavbarController.$inject = ["$rootScope", "$state", "AuthManager", "UiManager"];