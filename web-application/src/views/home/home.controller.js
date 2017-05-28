let Manager = null;
export default class HomeController {
  constructor(AuthManager) {
    Manager = AuthManager;
    this.registration = {};
  }

  doRegister() {
    Manager.register(this.registration);
    this.registration = {};
  }
}
HomeController.$inject = ["AuthManager"];