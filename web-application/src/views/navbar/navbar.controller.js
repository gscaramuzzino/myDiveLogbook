export default class NavbarController {
  constructor(LocalStorage, $rootScope, $state) {

    $rootScope.$on('login:Successful', function () {
      //this.loggedIn = AuthFactory.isAuthenticated();
      //this.username = AuthFactory.getUsername();
      $state.go("app.logbook");
    });

    $rootScope.$on('registration:Successful', function () {
      //this.loggedIn = AuthFactory.isAuthenticated();
      //this.username = AuthFactory.getUsername();
    });

  }
}
NavbarController.$inject = ["LocalStorage", "$rootScope", "$state"];