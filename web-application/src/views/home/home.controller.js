let Manager = null;
export default class HomeController {
  constructor($state, AuthManager) {
    Manager = AuthManager;
    this.registration = {};
    if (Manager.loadUserCredentials()) {
      console.log("prova");
      $state.go("app.logbook");
    }
  }

  doRegister() {
    Manager.register(this.registration);
    this.registration = {};
  }
}
HomeController.$inject = ["$state","AuthManager"];