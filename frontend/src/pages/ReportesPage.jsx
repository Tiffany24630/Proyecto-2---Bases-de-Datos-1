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
                        Reporte Ventas (Join)
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
                                            Q{v.total
                                                ? parseFloat(v.total).toFixed(2)
                                                : "0.00"
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="card">
                    <h2>
                        Clientes y cantidad de ventas (Subquery)
                    </h2>

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Cantidad de Ventas</th>
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
                                            {p.total_ventas}
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
                                <th>Total veces Gastado</th>
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
                                            {c.total}
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
                                <th>ID Venta</th>
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
                                            {v.id_ven}
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