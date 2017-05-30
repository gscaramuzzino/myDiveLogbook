export default class ProfileController {
    constructor() {
        this.user = {};
        this.disableForm = true;
    }

    editForm() {
        this.disableForm = false;
    }

    cancelForm() {
        this.disableForm = true;
    }
}
