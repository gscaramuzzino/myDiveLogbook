
LocalStorage.$inject= ["$window"];
export default function LocalStorage($window) {

    return {
        store: (key, value) => {
            $window.localStorage[key] = value;
        },

        get: (key, defaultValue) => {
            return $window.localStorage[key] || defaultValue;
        },

        remove: (key) => {
            $window.localStorage.removeItem(key);
        },

        storeObject: (key, value) => {
            $window.localStorage[key] = JSON.stringify(value);
        },

        getObject: (key, defaultValue) => {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    };
}