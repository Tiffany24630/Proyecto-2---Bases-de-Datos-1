import React from "react";

export const Navbar = () => {
    const rol = localStorage.getItem("rol");
    const username = localStorage.getItem("username");

    const logout = () => {
        localStorage.clear();
        window.location.hash = "#/login";
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h2 className="logo">
                    Sistema Tienda
                </h2>

                <a href="#/dashboard">
                    Dashboard
                </a>

                {
                    (
                        rol === "admin_r" ||
                        rol === "vendedor_r"
                    ) && (
                        <a href="#/clientes">
                            Clientes
                        </a>
                    )
                }

                {
                    (
                        rol === "admin_r" ||
                        rol === "inventario_r" ||
                        rol === "cliente_r" ||
                        rol === "vendedor_r"
                    ) && (
                        <a href="#/productos">
                            Productos
                        </a>
                    )
                }

                {
                    (
                        rol === "admin_r" ||
                        rol === "auditor_r"
                    ) && (
                        <a href="#/reportes">
                            Reportes
                        </a>
                    )
                }
            </div>

            <div className="navbar-right">
                <span>
                    {username}
                </span>

                <button
                    onClick={logout}
                    className="danger-btn"
                >
                    Salir
                </button>
            </div>
        </nav>
    );
};