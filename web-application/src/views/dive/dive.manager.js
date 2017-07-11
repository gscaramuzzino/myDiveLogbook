DiveManager.$inject = ["$http", "baseURL"];
export default function DiveManager($http, baseURL) {
    return {
        get: (id) => {
            let url = (id != null) ? "dives/" + id : "dives/";
            return $http.get(baseURL + url).then((response) => {
                if (id != null) response.data.date = new Date(response.data.date);
                return response.data;
            });
        },
        save: (item) => {
            return $http.post(baseURL + "dives/", item).then((response) => {});
        },
        delete: (item) => {
            return $http.delete(baseURL + "dives/" + item._id).then((response) => {});
        },
        update: (item) => {
            return $http.put(baseURL + "dives/" + item._id, item).then((response) => {});
        },
        getFavorites: () => {
            return $http.get(baseURL + "favorites/").then((response) => {
                return (response.data[0] != null) ? response.data[0].dives : [];
            });
        },
        addFavorites: (item) => {
            return $http.post(baseURL + "favorites/", item);
        },
        deleteFavorites: (item) => {
            return $http.delete(baseURL + "favorites/" + item._id);
        }

    }
}