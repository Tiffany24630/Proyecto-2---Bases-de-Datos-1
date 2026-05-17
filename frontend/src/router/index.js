import { LoginPage } from "../pages/LoginPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";

const app = document.getElementById("app");

const routes = {
  "#/login": LoginPage,
  "#/dashboard": DashboardPage
};

export const router = () => {
  const hash =
    window.location.hash || "#/login";

  const page =
    routes[hash];

  if (page) {
    app.innerHTML = page();
  } else {
    app.innerHTML = `
      <h1>404</h1>
    `;
  }
};

window.addEventListener(
  "load",
  router
);

window.addEventListener(
  "hashchange",
  router
);