CertificateController.$inject = ["CertificateManager", "UiManager"];
export default function CertificateController(Manager, UiManager) {
  var storeOriginalElementInEdit = [];
  var vm = this;
  vm.data = [];
  vm.newCertificate = {};
  vm.disableForm = true;

  vm.$onInit = () => {
    Manager.query()
      .$promise.then(
        function (response) {
          if (response[0] != undefined) {
            vm.data = response[0].licence;
            vm.data.forEach(function (item) {
              item.dateOfLicence && (item.dateOfLicence = new Date(item.dateOfLicence));
            });
          }
        },
        function (response) {}
      );
  }

  vm.doEdit = (cert, index) => {
    storeOriginalElementInEdit[index] = angular.copy(cert);
    cert.enabled = true;
  }

  vm.cancelForm = (form) => {
    vm.newCertificate = {};
    form.$setPristine(true);
    form.$valid = true;
  }

  vm.doCancel = (cert, index) => {
    vm.data[index] = angular.copy(storeOriginalElementInEdit[index]);
    cert.enabled = false;
  }

  vm.doAdd = (form) => {
    Manager.save(vm.newCertificate, (response) => {
      UiManager.showMessageSuccess();
      vm.data.unshift(vm.newCertificate);
      vm.cancelForm(form);
    });
  }

  vm.doDelete = (index) => {
    let certificateId = vm.data[index]._id;
    Manager.remove(({id: certificateId}) => {

    });
  }

  vm.doSave = () => {
    User.action().update(vm.user, () => {
      vm.disableForm = true;
      UiManager.showMessageSuccess();
    });
  }

  vm.getNameForm = (index) => {
    return "_form" + index;
  }
}