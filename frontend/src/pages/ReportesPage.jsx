import React, {useEffect, useState} from "react";
import { Navbar } from "../components/Navbar.jsx";
import { apiFetch } from "../services/api.js";

export const ReportesPage = () => {
    const [ventas, setVentas] = useState([]);
    const [subquery, setSubquery] = useState([]);
    const [cte, setCte] = useState([]);
    const [vista, setVista] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            const dataVentas = await apiFetch("/reporte-ventas");
            const dataSubquery = await apiFetch("/reporte-subquery");
            const dataCTE = await apiFetch("/reporte-cte");
            const dataVista = await apiFetch("/vista-ventas");

            setVentas(dataVentas);
            setSubquery(dataSubquery);
            setCte(dataCTE);
            setVista(dataVista);
        };
        cargar();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="page">
                <h1>Reportes</h1>
                <h2>
                    Reporte Ventas
                </h2>
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
                            ventas.map(v => (
                                <tr key={v.id_ven}>
                                    <td>{v.id_ven}</td>
                                    <td>{v.cliente}</td>
                                    <td>{v.total}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <h2>
                    Productos arriba del promedio
                </h2>

                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            subquery.map((p, i) => (
                                <tr key={i}>
                                    <td>{p.nombre}</td>
                                    <td>{p.precio}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <h2>
                    Clientes y total gastado
                </h2>

                <table>
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
                                    <td>{c.nombre}</td>
                                    <td>{c.total_gastado}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <h2>
                    Vista Ventas
                </h2>

                <table>
                    <thead>
                        <tr>
                            {
                                vista.length > 0 &&
                                Object.keys(vista[0]).map(k => (
                                    <th key={k}>
                                        {k}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            vista.map((v, i) => (
                                <tr key={i}>
                                    {
                                        Object.values(v).map(
                                            (value, j) => (
                                                <td key={j}>
                                                    {value}
                                                </td>
                                            )
                                        )
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};