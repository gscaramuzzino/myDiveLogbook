User.$inject= ["LocalStorage"];
export default function User(LocalStorage) {
    let User = null;
    return {
        setUser: (user) => {
            User = user;
        },

        getUser: () => {
            return User;
        }
    };
}