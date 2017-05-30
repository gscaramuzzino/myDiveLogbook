
require("./../../images/user_picture.jpg");
let isFavourites = null;
export default class LogbookController {
  constructor($transition$) {
    isFavourites = $transition$.params().isFavourites;
    
  }

  isFavourites() {
    return isFavourites;
  }
}
LogbookController.$inject = ["$transition$"];