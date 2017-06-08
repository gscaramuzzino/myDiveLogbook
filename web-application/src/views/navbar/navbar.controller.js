let AuthManager = null,
  UiManager = null;
export default class NavbarController {

  constructor($rootScope, $state, AuthManager, UiManager) {
    this.AuthManager = AuthManager;
    this.UiManager = UiManager;
    this.state = $state;
    this.login = {};
    if (this.AuthManager.loadUserCredentials()) {
      $state.go("app.logbook");
    } 
    $rootScope.$on('login:Successful', function () {
      $state.go("app.logbook");
    });
    let myThis = this;
    $rootScope.$on('registration:Successful', function () {
      myThis.UiManager.showMessageSuccess("Registration completed!");
    });
    $rootScope.$on('logout:Successful', function () {
      myThis.state.go("app");
    });
    $rootScope.$on('credentials:Invalid', function() {
      myThis.AuthManager.destroyUserCredentials();
      myThis.state.go("app");
    });
  }

  isAuthenticated() {
    return this.AuthManager.isAuthenticated();
  }

  doLogin() {
    this.AuthManager.login(this.login);
    this.login = {};
  }

  doLogout() {
    this.AuthManager.logout();
  }
}
NavbarController.$inject = ["$rootScope", "$state", "AuthManager", "UiManager"];