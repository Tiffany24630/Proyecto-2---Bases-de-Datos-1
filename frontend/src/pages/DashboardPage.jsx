import React from "react";
import { Navbar } from "../components/Navbar.jsx";

export const DashboardPage = () => {
    const username =
        localStorage.getItem("username");

    const rol =
        localStorage.getItem("rol");

    return (
        <div>
            <Navbar />
            <div className="page">
                <h1>Dashboard</h1>
                <p>
                    Usuario:
                    <strong> {username}</strong>
                </p>

                <p>
                    Rol:
                    <strong> {rol}</strong>
                </p>
            </div>
        </div>
    );
};