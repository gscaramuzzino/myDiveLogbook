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
        vm.data = response[0].licence;
        vm.data.forEach(function (item) {
          item.dateOfLicence&&(item.dateOfLicence = new Date(item.dateOfLicence));
        });
      },
      function (response) { }
      );
  }

  vm.doEdit = (cert, index) => {
    storeOriginalElementInEdit[index] = angular.copy(cert);
    cert.enabled = true;
  }

  vm.cancelForm = () => {
    vm.newCertificate = {};
  }

  vm.doCancel = (cert, index) => {
    this.data[index] = angular.copy(storeOriginalElementInEdit[index]);
    cert.enabled = false;
  }

  vm.doAdd = () => {
    Manager.save(vm.newCertificate, function (response) {
      UiManager.showMessageSuccess();
    });
  }

  vm.doSave = () => {
    User.action().update(vm.user, () => {
      vm.disableForm = true;
      UiManager.showMessageSuccess();
    });
  }
}