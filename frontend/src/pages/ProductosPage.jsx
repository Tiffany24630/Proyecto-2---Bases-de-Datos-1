import React, {useEffect, useState} from "react";
import { Navbar } from "../components/Navbar.jsx";
import { apiFetch } from "../services/api.js";

export const ProductosPage = () => {
    const [productos, setProductos] = useState([]);

    const [form, setForm] =
        useState({
            nombre:"",
            precio:"",
            stock:"",
            id_prov:"",
            id_cat:""
        });

    const cargar = async () => {
        const data = await apiFetch("/productos");
        setProductos(data);
    };

    useEffect(() => {
        cargar();
    }, []);

    const crearProducto = async () => {
        await apiFetch(
            "/productos",
            {
                method:"POST",
                body:JSON.stringify(form)
            }
        );

        cargar();
    };

    const eliminarProducto = async (id) => {
        await apiFetch(
            `/productos/${id}`,
            {
                method:"DELETE"
            }
        );

        cargar();
    };

    const actualizarStock = async (id, stock) => {
        await apiFetch(
            `/productos/${id}/stock`,
            {
                method:"PUT",
                body:JSON.stringify({
                    stock
                })
            }
        );

        cargar();
    };

    return (
        <div>
            <Navbar />
            <div className="page">
                <h1>Productos</h1>
                <div className="card">
                    <h2>
                        Nuevo Producto
                    </h2>

                    <div className="form-grid">
                        <input
                            placeholder="Nombre"
                            value={form.nombre}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    nombre:e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Precio"
                            value={form.precio}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    precio:e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Stock"
                            value={form.stock}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    stock:e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Proveedor ID"
                            value={form.id_prov}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    id_prov:e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Categoría ID"
                            value={form.id_cat}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    id_cat:e.target.value
                                })
                            }
                        />
                    </div>

                    <button onClick={crearProducto}>
                        Crear Producto
                    </button>
                </div>

                <div className="card">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
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
                                        <td>
                                            <div className="actions">
                                                <button
                                                    className="btn-secondary"
                                                    onClick={() =>
                                                        actualizarStock(
                                                            p.id_prod,
                                                            Number(
                                                                p.stock
                                                            ) + 1
                                                        )
                                                    }
                                                >
                                                    +1 Stock
                                                </button>

                                                <button
                                                    className="btn-danger"
                                                    onClick={() =>
                                                        eliminarProducto(
                                                            p.id_prod
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
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