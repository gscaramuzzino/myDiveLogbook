export default class LocalStorage {

    /*@ngInject;*/
    constructor($window) {
        this.window = $window;
    }

    store(key, value) {
        this.window.localStorage[key] = value;
    }

    get(key, defaultValue) {
        return this.window.localStorage[key] || defaultValue;
    }

    remove(key) {
        this.window.localStorage.removeItem(key);
    }

    storeObject(key, value) {
        this.window.localStorage[key] = JSON.stringify(value);
    }

    getObject(key, defaultValue) {
        return JSON.parse(this.window.localStorage[key] || defaultValue);
    }
}

