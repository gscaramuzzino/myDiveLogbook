let Manager = null;

export default class HomeController {
  /*@ngInject;*/
  constructor(AuthManager) {
    Manager = AuthManager;
    this.registration = {};
  }

  doRegister() {
    Manager.register(this.registration);
  }
}
