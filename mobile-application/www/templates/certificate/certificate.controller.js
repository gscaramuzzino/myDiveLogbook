angular.module("myDiveLogbook").controller("CertificateController", CertificateController);
CertificateController.$inject = ["CertificateManager"];

function CertificateController(Manager) {
  var vm = this;
  vm.data = [];
  Manager.get().then(function (cert) {
    vm.data = cert;
  });
}
