require("./../../images/user_picture.jpg");
LogbookController.$inject = ["$transition$", "DiveManager", "UiManager", "User"];
export default function LogbookController($transition$, DiveManager, UiManager, User) {
  const isFavourites = $transition$.params().isFavourites;
  let user = User.getUser();
  let vm = this;

  vm.$onInit = () => {
    let method = (isFavourites) ? "getFavorites" : "get";
    DiveManager[method]().then((data) => {
      vm.data = data;
    });
  }

  vm.getNameSurname = () => {
    return User.getUser() && User.getUser().firstname + " " + User.getUser().lastname;
  }

  vm.isFavourites = () => {
    return isFavourites;
  }

  vm.deleteFav = (item, index) => {
    DiveManager.deleteFavorites(item).then(() => {
      UiManager.showMessageSuccess();
      vm.data.splice(index,1);
    });
  }

  vm.addFav = (item) => {
    DiveManager.addFavorites(item).then(() => {
      item.fav = true;
      UiManager.showMessageSuccess();
    });
  }
}