CertificateController.$inject = ["CertificateManager", "UiManager"];
export default function CertificateController(Manager, UiManager) {
  var storeOriginalElementInEdit = [];
  var vm = this;
  vm.data = [];
  vm.newCertificate = {};
  vm.disableForm = true;

  vm.$onInit = () => {
    Manager.get().then((cert) => {
      vm.data = cert;
    });
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
    Manager.add(vm.newCertificate).then((response) => {
      UiManager.showMessageSuccess();
      vm.data.unshift(vm.newCertificate);
      vm.cancelForm(form);
    });
  }

  vm.doDelete = (index) => {
    let certificateId = vm.data[index]._id;
    Manager.delete(certificateId).then(() => {
      UiManager.showMessageSuccess();
      vm.data.splice(index, 1);
    });

  }

  vm.doUpdate = (cert, index) => {
    Manager.update(vm.data[index]).then(() => {
      UiManager.showMessageSuccess();
      cert.enabled = false;
    });
  }

  vm.getNameForm = (index) => {
    return "_form" + index;
  }

  vm.getNameForm = (index) => {
    return "_form" + index;
  }
}