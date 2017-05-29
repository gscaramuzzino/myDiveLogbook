import toastr from 'toastr';
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    //"progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
UiManager.$inject = ["$rootScope"];
export default function UiManager($rootScope) {

    return {
        showMessageSuccess: (message) => {
            toastr.success('Operation completed!' || message);
        },

        showMessageError: (message) => {
            toastr.error('Operation not completed!' || message);
        },

        showOverlay: () => {
            $(".overlay").show();
        },

        hideOverlay: () => {
            $(".overlay").hide();
        }
    }
}