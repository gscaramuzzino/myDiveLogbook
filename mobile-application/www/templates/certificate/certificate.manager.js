angular.module("myDiveLogbook").factory("CertificateManager", CertificateManager);
CertificateManager.$inject = ["$http", "baseURL"];
function CertificateManager($http, baseURL) {
  return {
    get: function() {
      var data = [];
      return $http.get(baseURL + "licences/").then(function (response) {
        data = response.data[0] != undefined ? response.data[0].licence : [];
        data.forEach(function (item) {
          item.dateOfLicence && (item.dateOfLicence = new Date(item.dateOfLicence));
        });
        return data;
      });
    }
  }
}