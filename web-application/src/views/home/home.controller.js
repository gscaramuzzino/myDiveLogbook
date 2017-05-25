let Manager = null;

export default class HomeController {
  /*@ngInject;*/
  constructor(LocalStorage) {
    this.registration = {};
  }

  doRegister() {
    Manager.register(this.registration);
  }
}
