angular.module("myDiveLogbook").factory("Logbook", Logbook);
Logbook.$inject = [];

function Logbook() {
    var Logbook = null;
    return {
        setLogbook: (logbook) => {
            Logbook = logbook;
        },

        getLogbook: () => {
            return Logbook;
        }
    };
}