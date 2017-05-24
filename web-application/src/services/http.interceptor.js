import toastr from 'toastr';

toastr.options = {
  "positionClass": "toast-bottom-right"
}

let q = null;

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

export default class HttpInterceptor {

  /*@ngInject;*/
  constructor($q) {
    q = $q;
  }
  request(config) {
    return config;
  }

  requestError(rejection) {
    toastr.error('Error with the request!')
    return $q.reject(rejection);
  }

  response(response) {
    if (response.config.method == "POST") {
      toastr.success('Operation completed!')
    }
    return response;
  }

  responseError(rejection) {
    toastr.error('Operation not completed!')
    return $q.reject(rejection);
  }

}