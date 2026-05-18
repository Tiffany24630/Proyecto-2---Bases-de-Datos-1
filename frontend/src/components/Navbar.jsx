import React from "react";

export const Navbar = () => {
    const logout = () => {
        localStorage.clear();
        window.location.hash = "#/login";
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-title">
                    Sistema Tienda
                </div>

                <div className="navbar-links">
                    <a href="#/dashboard">
                        Dashboard
                    </a>

                    <a href="#/clientes">
                        Clientes
                    </a>

                    <a href="#/productos">
                        Productos
                    </a>

                    <a href="#/reportes">
                        Reportes
                    </a>
                </div>
            </div>

            <div className="navbar-right">
                <span className="user-label">
                    {localStorage.getItem("username")}
                </span>

                <button
                    className="primary-btn"
                    onClick={logout}
                >
                    Salir
                </button>
            </div>
        </nav>
    );
};