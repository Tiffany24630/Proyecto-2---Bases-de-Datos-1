import React from "react";
import { LoginPage } from "../pages/LoginPage.jsx";
import { DashboardPage } from "../pages/DashboardPage.jsx";
import { ClientesPage } from "../pages/ClientesPage.jsx";
import { ProductosPage } from "../pages/ProductosPage.jsx";
import { ReportesPage } from "../pages/ReportesPage.jsx";
import { protectedRoute } from "./protectedRoute.js";

export const router = () => {
    const hash =
        window.location.hash || "#/login";

    switch (hash) {
        case "#/login":
            return <LoginPage />;

        case "#/dashboard":
            if (!protectedRoute()) return null;

            return <DashboardPage />;

        case "#/clientes":
            if (
                !protectedRoute([
                    "admin_r",
                    "vendedor_r"
                ])
            ) return null;

            return <ClientesPage />;

        case "#/productos":
            if (
                !protectedRoute([
                    "admin_r",
                    "inventario_r",
                    "cliente_r"
                ])
            ) return null;

            return <ProductosPage />;

        case "#/reportes":
            if (
                !protectedRoute([
                    "admin_r",
                    "auditor_r"
                ])
            ) return null;

            return <ReportesPage />;

        default:
            return <h1>404</h1>;
    }
};