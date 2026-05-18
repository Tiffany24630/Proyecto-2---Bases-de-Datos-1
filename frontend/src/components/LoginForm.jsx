import React, { useState } from "react";
import { loginService } from "../services/auth.service.js";

export const LoginForm = () => {
    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const submit = async (e) => {
        e.preventDefault();

        const data =
            await loginService(
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

        window.location.hash =
            "#/dashboard";
    };

    return (
        <form onSubmit={submit}>
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button type="submit">
                Iniciar sesión
            </button>
        </form>
    );
};