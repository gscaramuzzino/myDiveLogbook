ProfileController.$inject = ["User", "UiManager"];
export default function ProfileController(User, UiManager) {
    this.user = User.getUser();
    this.disableForm = true;

    this.editForm = () => {
        this.disableForm = false;
    }

    this.cancelForm = () => {
        this.disableForm = true;
    }

    this.doSave = () => {
        User.action().update(this.user, () => {
            this.disableForm = true;
            UiManager.showMessageSuccess();
        });
    }
}