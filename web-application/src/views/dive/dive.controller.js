DiveController.$inject = ["$transition$", "$state", "DiveManager", "UiManager"];
export default function DiveController($transition$, $state, Manager, UiManager) {
    const isNew = $transition$.params().isNew;
    const diveId = $transition$.params().diveId;
    let originalDive = [];
    let enabled = isNew;
    let vm = this;

    vm.$onInit = () => {
        if (diveId == null) vm.data = {};
        else {
            Manager.get(diveId).then((data) => {
                vm.data = data;
                originalDive = angular.copy(vm.data);
            });
        }
    }

    vm.isNew = () => {
        return isNew;
    }

    vm.isEnabled = () => {
        return enabled;
    }

    vm.doSave = () => {
        let method = isNew ? "save" : "update";
        Manager[method](vm.data).then(() => {
            vm.data.fav&&Manager.addFavorites(vm.data);
            UiManager.showMessageSuccess();
            $state.go("app.logbook");
        });
    }

    vm.doCancel = () => {
        vm.data = angular.copy(originalDive);
        enabled = false;
    }

    vm.doEdit = () => {
        enabled = true;
    }

    vm.doDelete = () => {
        Manager.delete(vm.data).then(() => {
            UiManager.showMessageSuccess();
            $state.go("app.logbook");
        });
    }
    vm.doFav = () => {
        vm.data.fav = !vm.data.fav;
    }
}