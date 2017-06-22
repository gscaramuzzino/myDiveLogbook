angular.module("myDiveLogbook").controller("HomeController", HomeController);
HomeController.$inject = ["$rootScope", "Logbook", "AuthManager"];

function HomeController($rootScope, Logbook, AuthManager) {
    var vm = this;
    vm.loggedIn = false;
    vm.data = Logbook.getLogbook();

    if (AuthManager.isAuthenticated()) {
        vm.loggedIn = true;
    }
    
    $rootScope.$on('logbook:Successful', function () {
        vm.data = Logbook.getLogbook();
    });
}