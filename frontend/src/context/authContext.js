export const auth = {
  get token() {
    return localStorage.getItem("token");
  },

  get rol() {
    return localStorage.getItem("rol");
  },

  get username() {
    return localStorage.getItem("username");
  },

  isAuth() {
    return !!localStorage.getItem("token");
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("username");
    window.location.hash = "#/login";
  }
};