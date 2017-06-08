require("./../../images/user_picture.jpg");
LogbookController.$inject = ["$transition$", "$state", "LogbookManager", "User"];
export default function LogbookController($transition$, $state, Manager, User) {
  const isFavourites = $transition$.params().isFavourites;
  let user = User.getUser();

  this.$onInit = () => {
    this.data = [];
    Manager.get()
      .$promise.then( 
        function (response) {},
        function (response) {}
      )
  }

  this.getColspan = () => {
    return isFavourites ? 2 : 1;
  }

  this.getNameSurname = () => {
    return User.getUser()&&User.getUser().firstname + " " + User.getUser().lastname;
  }

  this.isFavourites = () => {
    return isFavourites;
  }

  this.createDive = () => {
    $state.go("app.dive");
  }
} 