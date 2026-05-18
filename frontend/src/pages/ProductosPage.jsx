import React, {useEffect, useState} from "react";
import { Navbar } from "../components/Navbar.jsx";
import {obtenerProductos} from "../services/producto.service.js";

export const ProductosPage = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            const data = await obtenerProductos();
            setProductos(data);
        };
        cargar();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="page">
                <h1>Productos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            productos.map(p => (
                                <tr key={p.id_prod}>
                                    <td>{p.id_prod}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.precio}</td>
                                    <td>{p.stock}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};