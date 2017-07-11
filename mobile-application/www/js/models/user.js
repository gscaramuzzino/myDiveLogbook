angular.module("myDiveLogbook").factory("User", User);
User.$inject = ["$resource", "LocalStorage", "baseURL"];
function User($resource, LocalStorage, baseURL) {
    var User = null;
    return {
        setUser: (user) => {
            User = user;
            User.dateOfBirth = new Date(User.dateOfBirth);
        },

        getUser: () => {
            return User;
        },

        action: () => {
            return $resource(baseURL + "users/profile", null, {
                update: {
                    method: 'PUT' // this method issues a PUT request
                }
            });
        }
    };
}