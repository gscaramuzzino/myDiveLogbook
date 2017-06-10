ProfileController.$inject = ["User", "UiManager"];
export default function ProfileController(User, UiManager) {
    let vm = this;
    let originalUser = angular.copy(User.getUser());
    vm.user = User.getUser();
    vm.disableForm = true;

    vm.editForm = () => {
        vm.disableForm = false;
    }

    vm.cancelForm = () => {
        vm.disableForm = true;
        vm.user = angular.copy(originalUser);
    }

    vm.doSave = () => {
        User.action().update(vm.user, () => {
            vm.disableForm = true;
            originalUser = angular.copy(vm.user);
            UiManager.showMessageSuccess();
        });
    }
}