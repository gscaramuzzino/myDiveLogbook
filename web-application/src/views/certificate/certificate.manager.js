CertificateManager.$inject = ["$http", "baseURL"];
export default function CertificateManager($http, baseURL) {
  return {
    get: () => {
      var data = [];
      return $http.get(baseURL + "licences/").then(function (response) {
        data = response.data[0] != undefined ? response.data[0].licence : [];
        data.forEach(function (item) {
          item.dateOfLicence && (item.dateOfLicence = new Date(item.dateOfLicence));
        });
        return data;
      });
    },
    add: (item) => {
      return $http.post(baseURL + "licences/", item).then((response) => {});
    },
    delete: (id) => {
      return $http.delete(baseURL + "licences/" + id).then((response) => {});
    },
    update: (item) => {
      return $http.put(baseURL + "licences/" + item._id, item).then((response) => {});
    }
  }
}