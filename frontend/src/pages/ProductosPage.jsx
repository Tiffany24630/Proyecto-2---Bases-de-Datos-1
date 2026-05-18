import React, {useEffect, useState} from "react";
import { Navbar } from "../components/Navbar.jsx";
import {obtenerProductos, actualizarStockProducto, eliminarProducto, crearProducto, editarProducto} from "../services/producto.service.js";

export const ProductosPage = () => {
    const [productos, setProductos] = useState([]);
    const [editando, setEditando] = useState(null);

    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        stock: "",
        id_prov: "",
        id_cat: ""
    });

    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        precio: "",
        stock: "",
        id_prov: "",
        id_cat: ""
    });

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        const data = await obtenerProductos();
        setProductos(data);
    };

    const agregarProducto = async () => {
        await crearProducto(nuevoProducto);

        setNuevoProducto({
            nombre: "",
            precio: "",
            stock: "",
            id_prov: "",
            id_cat: ""
        });

        cargar();
    };

    const iniciarEdicion = (p) => {
        setEditando(p.id_prod);

        setForm({
            nombre: p.nombre,
            precio: p.precio,
            stock: p.stock,
            id_prov: p.id_prov,
            id_cat: p.id_cat
        });
    };

    const guardar = async (id) => {
        await editarProducto(id, form);
        setEditando(null);
        cargar();
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
                    <h2>
                        Agregar Producto
                    </h2>

                    <div className="form-grid">
                        <input
                            placeholder="Nombre"
                            value={nuevoProducto.nombre}
                            onChange={(e) =>
                                setNuevoProducto({
                                    ...nuevoProducto,
                                    nombre: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Precio"
                            value={nuevoProducto.precio}
                            onChange={(e) =>
                                setNuevoProducto({
                                    ...nuevoProducto,
                                    precio: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Stock"
                            value={nuevoProducto.stock}
                            onChange={(e) =>
                                setNuevoProducto({
                                    ...nuevoProducto,
                                    stock: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="ID Proveedor"
                            value={nuevoProducto.id_prov}
                            onChange={(e) =>
                                setNuevoProducto({
                                    ...nuevoProducto,
                                    id_prov: e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="ID Categoría"
                            value={nuevoProducto.id_cat}
                            onChange={(e) =>
                                setNuevoProducto({
                                    ...nuevoProducto,
                                    id_cat: e.target.value
                                })
                            }
                        />

                        <button
                            className="success-btn"
                            onClick={agregarProducto}
                        >
                            Agregar
                        </button>
                    </div>
                </div>

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
                                            {
                                                editando === p.id_prod
                                                    ? (
                                                        <input
                                                            value={form.nombre}
                                                            onChange={(e) =>
                                                                setForm({
                                                                    ...form,
                                                                    nombre: e.target.value
                                                                })
                                                            }
                                                        />
                                                    )
                                                    : p.nombre
                                            }
                                        </td>

                                        <td>
                                            {p.proveedor}
                                        </td>

                                        <td>
                                            {p.categoria}
                                        </td>

                                        <td>
                                            {
                                                editando === p.id_prod
                                                    ? (
                                                        <input
                                                            value={form.precio}
                                                            onChange={(e) =>
                                                                setForm({
                                                                    ...form,
                                                                    precio: e.target.value
                                                                })
                                                            }
                                                        />
                                                    )
                                                    : `Q${p.precio}`
                                            }
                                        </td>

                                        <td>
                                            {
                                                editando === p.id_prod
                                                    ? (
                                                        <input
                                                            value={form.stock}
                                                            onChange={(e) =>
                                                                setForm({
                                                                    ...form,
                                                                    stock: e.target.value
                                                                })
                                                            }
                                                        />
                                                    )
                                                    : p.stock
                                            }
                                        </td>

                                        <td className="actions">
                                            {
                                                editando === p.id_prod
                                                    ? (
                                                        <button
                                                            className="success-btn"
                                                            onClick={() =>
                                                                guardar(p.id_prod)
                                                            }
                                                        >
                                                            Guardar
                                                        </button>
                                                    )
                                                    : (
                                                        <button
                                                            className="primary-btn"
                                                            onClick={() =>
                                                                iniciarEdicion(p)
                                                            }
                                                        >
                                                            Editar
                                                        </button>
                                                    )
                                            }

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
                                                onClick={() =>
                                                    eliminar(p.id_prod)
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