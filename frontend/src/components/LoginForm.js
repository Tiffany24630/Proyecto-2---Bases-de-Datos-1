import { loginService } from "../services/auth.service.js";

export const LoginForm = () => {
  setTimeout(() => {
    const form = document.getElementById("login-form");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username =
        document.getElementById("username").value;

      const password =
        document.getElementById("password").value;

      try {
        const data = await loginService(
          username,
          password
        );

        if (data.error) {
          alert(data.error);
          return;
        }

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "rol",
          data.rol
        );

        localStorage.setItem(
          "username",
          data.username
        );

        alert(
          `Bienvenido ${data.username} (${data.rol})`
        );

        window.location.hash = "#/dashboard";

      }catch (error){
        console.error(error);

        alert("Error iniciando sesión");
      }
    });
  }, 0);

  return `
    <form id="login-form">

      <div>
        <label>Usuario</label>
        <input
          type="text"
          id="username"
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          id="password"
          required
        />
      </div>

      <button type="submit">
        Iniciar sesión
      </button>

    </form>
  `;
};