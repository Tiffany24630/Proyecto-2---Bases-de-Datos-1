import React from "react";

export const Navbar = () => {
    const rol =
        localStorage.getItem("rol");

    const logout = () => {
        localStorage.clear();

        window.location.hash =
            "#/login";
    };

    return (
        <nav className="navbar">
            <a href="#/dashboard">
                Inicio
            </a>

            {
                ["admin_r", "vendedor_r"]
                .includes(rol) && (
                    <a href="#/clientes">
                        Clientes
                    </a>
                )
            }

            {
                [
                    "admin_r",
                    "inventario_r",
                    "cliente_r"
                ].includes(rol) && (
                    <a href="#/productos">
                        Productos
                    </a>
                )
            }

            {
                [
                    "admin_r",
                    "auditor_r"
                ].includes(rol) && (
                    <a href="#/reportes">
                        Reportes
                    </a>
                )
            }

            <button onClick={logout}>
                Logout
            </button>

        </nav>
    );
};