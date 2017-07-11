angular.module("myDiveLogbook").controller("ProfileController", ProfileController);
ProfileController.$inject = ["User"];
function ProfileController(User) {
    var vm = this;
    vm.user = User.getUser();
}