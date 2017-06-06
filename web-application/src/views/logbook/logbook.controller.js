require("./../../images/user_picture.jpg");
let isFavourites = null;
export default class LogbookController {
  constructor($transition$, Manager) {
    isFavourites = $transition$.params().isFavourites;
    this.Manager = Manager;
    Manager.get()
      .$promise.then(
        function (response) {},
        function (response) {}
      );
  }

  isFavourites() {
    return isFavourites;
  }
}
LogbookController.$inject = ["$transition$", "LogbookManager"];