export const auth = {
  token:
    localStorage.getItem("token"),

  rol:
    localStorage.getItem("rol"),

  username:
    localStorage.getItem("username"),

  isAuth() {
    return !!this.token;
  },

  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }
};