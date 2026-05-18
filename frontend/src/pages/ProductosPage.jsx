import React, {useEffect, useState} from "react";
import { Navbar } from "../components/Navbar.jsx";
import {obtenerProductos, actualizarStockProducto, eliminarProducto} from "../services/producto.service.js";

export const ProductosPage = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        const data = await obtenerProductos();
        setProductos(data);
    };

    const cambiarStock = async (id, stockActual, cambio) => {
        const nuevoStock = stockActual + cambio;

        if (nuevoStock < 0) return;

        await actualizarStockProducto(
            id,
            nuevoStock
        );

        cargar();
    };

    const eliminar = async (id) => {
        if (!confirm("¿Eliminar producto?")) return;

        await eliminarProducto(id);
        cargar();
    };

    return (
        <div>
            <Navbar />
            <div className="page">
                <h1>
                    Productos
                </h1>

                <div className="card">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Proveedor</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                productos.map(p => (
                                    <tr key={p.id_prod}>
                                        <td>
                                            {p.id_prod}
                                        </td>

                                        <td>
                                            {p.nombre}
                                        </td>

                                        <td>
                                            {p.proveedor}
                                        </td>

                                        <td>
                                            {p.categoria}
                                        </td>

                                        <td>
                                            Q{p.precio}
                                        </td>

                                        <td>
                                            {p.stock}
                                        </td>

                                        <td
                                            className="actions"
                                        >
                                            <button
                                                className="danger-btn"
                                                onClick={() =>
                                                    cambiarStock(
                                                        p.id_prod,
                                                        p.stock,
                                                        -1
                                                    )
                                                }
                                            >
                                                -1
                                            </button>

                                            <button
                                                className="success-btn"
                                                onClick={() =>
                                                    cambiarStock(
                                                        p.id_prod,
                                                        p.stock,
                                                        1
                                                    )
                                                }
                                            >
                                                +1
                                            </button>

                                            <button
                                                className="danger-btn"
                                                onClick={() => eliminar(p.id_prod)
                                                }
                                            >
                                                Eliminar
                                            </button>
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