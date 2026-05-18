import React, {
    useEffect,
    useState
} from "react";
import { Navbar } from "../components/Navbar.jsx";
import { apiFetch } from "../services/api.js";

export const ReportesPage = () => {
    const [reportes, setReportes] =
        useState([]);

    useEffect(() => {
        const cargar = async () => {
            const data =
                await apiFetch(
                    "/reporte-ventas"
                );

            setReportes(data);
        };
        cargar();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="page">
                <h1>Reportes</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID Venta</th>
                            <th>Cliente</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            reportes.map(r => (
                                <tr key={r.id_ven}>
                                    <td>{r.id_ven}</td>
                                    <td>{r.cliente}</td>
                                    <td>{r.total}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};