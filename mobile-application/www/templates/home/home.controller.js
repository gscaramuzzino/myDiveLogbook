angular.module("myDiveLogbook").controller("HomeController", HomeController);
HomeController.$inject = ["$rootScope", "Logbook", "AuthManager","LocalStorage"];

function HomeController($rootScope, Logbook, AuthManager,LocalStorage) {
    var vm = this;
    vm.loggedIn = false;
    vm.data = Logbook.getLogbook();
    vm.loginData = LocalStorage.getObject('userinfo', '{}');

    if (AuthManager.isAuthenticated()) {
        vm.loggedIn = true;
    }

    $rootScope.$on('logbook:Successful', function () {
        vm.data = Logbook.getLogbook();
        vm.loggedIn = true;
    });

    // Perform the login action when the user submits the login form
    vm.doLogin = function () {
        LocalStorage.storeObject('userinfo', vm.loginData);

        AuthManager.login(vm.loginData);
    };
}