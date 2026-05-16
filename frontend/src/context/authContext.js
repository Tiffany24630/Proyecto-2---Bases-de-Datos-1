export const auth = {
    token: localStorage.getItem("token"),
    rol: localStorage.getItem("rol"),

    isAuth() {
        return !!this.token;
    }
};