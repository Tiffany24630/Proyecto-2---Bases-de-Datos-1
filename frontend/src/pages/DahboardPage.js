import { auth } from "../context/authContext.js";

export const DashboardPage = () => {
  const rol = auth.rol;
  const username = auth.username;

  return `
    <div>
      <h1>Dashboard</h1>

      <p>
        Usuario:
        <strong>${username}</strong>
      </p>

      <p>
        Rol:
        <strong>${rol}</strong>
      </p>

      <button id="logout-btn">
        Cerrar sesión
      </button>

      <hr>

      ${
        rol === "admin_r"
        ? `
          <h2>Panel Administrador</h2>
          <p>
            Acceso total al sistema
          </p>
        `
        : ""
      }

      ${
        rol === "vendedor_r"
        ? `
          <h2>Panel Vendedor</h2>
          <p>
            Puede registrar ventas
          </p>
        `
        : ""
      }

      ${
        rol === "inventario_r"
        ? `
          <h2>Panel Inventario</h2>
          <p>
            Puede administrar productos
          </p>
        `
        : ""
      }

      ${
        rol === "auditor_r"
        ? `
          <h2>Panel Auditor</h2>
          <p>
            Puede ver reportes
          </p>
        `
        : ""
      }

      ${
        rol === "cliente_r"
        ? `
          <h2>Panel Cliente</h2>
          <p>
            Puede visualizar productos
          </p>
        `
        : ""
      }
    </div>
  `;
};

setTimeout(() => {
  const btn =
    document.getElementById("logout-btn");

  if (btn) {
    btn.addEventListener(
      "click",
      () => {
        localStorage.clear();
        window.location.hash = "#/login";
      }
    );
  }
}, 0);