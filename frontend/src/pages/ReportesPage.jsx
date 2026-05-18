import React, {useEffect, useState} from "react";
import { Navbar } from "../components/Navbar.jsx";
import { apiFetch } from "../services/api.js";

export const ReportesPage = () => {
    const [ventas, setVentas] = useState([]);
    const [subquery, setSubquery] = useState([]);
    const [cte, setCte] = useState([]);
    const [vista, setVista] = useState([]);

    useEffect(() => {
        cargarTodo();
    }, []);

    const cargarTodo = async () => {
        const ventasData = await apiFetch("/reporte-ventas");
        const subqueryData = await apiFetch("/reporte-subquery");
        const cteData = await apiFetch("/reporte-cte");
        const vistaData = await apiFetch("/vista-ventas");

        setVentas(ventasData);
        setSubquery(subqueryData);
        setCte(cteData);
        setVista(vistaData);
    };

    return (
        <div>
            <Navbar />
            <div className="page">
                <h1>
                    Reportes
                </h1>

                <div className="card">
                    <h2>
                        Reporte Ventas
                    </h2>

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                ventas.map(v => (
                                    <tr key={v.id_ven}>
                                        <td>
                                            {v.id_ven}
                                        </td>

                                        <td>
                                            {v.cliente}
                                        </td>

                                        <td>
                                            Q{Number(v.total).toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="card">
                    <h2>
                        Productos arriba del promedio
                    </h2>

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                subquery.map((p, i) => (
                                    <tr key={i}>
                                        <td>
                                            {p.nombre}
                                        </td>

                                        <td>
                                            Q{Number(p.precio).toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="card">
                    <h2>
                        CTE Clientes
                    </h2>

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Total Gastado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                cte.map((c, i) => (
                                    <tr key={i}>
                                        <td>
                                            {c.nombre}
                                        </td>

                                        <td>
                                            Q{Number(c.total_gastado).toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="card">
                    <h2>
                        Vista Ventas
                    </h2>

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                vista.map((v, i) => (
                                    <tr key={i}>
                                        <td>
                                            {v.cliente}
                                        </td>

                                        <td>
                                            Q{Number(v.total).toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};