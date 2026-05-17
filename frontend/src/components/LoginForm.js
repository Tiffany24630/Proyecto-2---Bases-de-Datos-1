import { loginService } from "../services/auth.service.js";

export const LoginForm = () => `
    <form id="loginForm">
        <input
            type="text"
            id="username"
            placeholder="Usuario"
        />

        <input
            type="password"
            id="password"
            placeholder="Contraseña"
        />

        <button type="submit">
            Iniciar sesión
        </button>
    </form>
`;

window.addEventListener("submit", async (e) => {
    if (e.target.id !== "loginForm") return;

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

        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("username", data.username);

        alert("Login exitoso");
        window.location.href = "/";

    }catch (error){
        console.error(error);
        alert("Error login");
    }
});