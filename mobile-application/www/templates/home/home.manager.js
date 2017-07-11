angular.module("myDiveLogbook").factory("HomeManager", HomeManager);
HomeManager.$inject = ["$http", "baseURL"];

function HomeManager($http, baseURL) {
    return {
        get: function () {
            var data = [];
            return $http.get(baseURL + "dives/").then(function (response) {
                return response.data;
            });
        }
    }
}