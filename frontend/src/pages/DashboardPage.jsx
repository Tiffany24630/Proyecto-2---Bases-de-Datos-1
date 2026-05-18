import React, {useEffect, useState} from "react";
import { Navbar } from "../components/Navbar.jsx";
import {obtenerProductos, actualizarStockProducto} from "../services/producto.service.js";
import {crearVentaService} from "../services/venta.service.js";

export const DashboardPage = () => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [idCliente, setIdCliente] = useState(1);

    const cargarProductos = async () => {
        const data = await obtenerProductos();
        setProductos(data);
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const agregarProducto = (producto) => {
        if (producto.stock <= 0) {
            alert("Sin stock");
            return;
        }

        const existe = carrito.find(item => item.id_prod === producto.id_prod);

        if (existe) {
            setCarrito(
                carrito.map(item => item.id_prod === producto.id_prod
                        ? {
                            ...item,
                            cantidad:
                                item.cantidad + 1
                        }
                        : item
                )
            );

        }else{
            setCarrito([
                ...carrito,
                {
                    id_prod:
                        producto.id_prod,

                    nombre:
                        producto.nombre,

                    precio:
                        producto.precio,

                    cantidad: 1
                }
            ]);
        }
    };

    const quitarProducto = (id) => {
        const item = carrito.find(p => p.id_prod === id);

        if (!item) return;

        if (item.cantidad === 1) {
            setCarrito(carrito.filter(p => p.id_prod !== id));
            return;
        }

        setCarrito(
            carrito.map(p =>
                p.id_prod === id
                    ? {
                        ...p,
                        cantidad:
                            p.cantidad - 1
                    }
                    : p
            )
        );
    };

    const crearVenta = async () => {
        if (carrito.length === 0) {
            alert("Agregue productos");
            return;
        }

        const detalles =
            carrito.map(c => ({
                id_prod: c.id_prod,
                cantidad: c.cantidad,
                precio: c.precio
            }));

        const data =
            await crearVentaService({
                id_clien:
                    Number(idCliente),
                detalles
            });

        if (data.error) {
            alert(data.error);
            return;
        }

        for (const item of carrito) {
            const producto = productos.find(p => p.id_prod === item.id_prod);
            await actualizarStockProducto(item.id_prod, producto.stock - item.cantidad);
        }
        alert("Venta creada");
        setCarrito([]);
        cargarProductos();
    };

    const total =
        carrito.reduce(
            (acc, item) =>
                acc +
                item.precio *
                item.cantidad,
            0
        );

    return (
        <div>
            <Navbar />
            <div className="page">
                <h1>
                    Dashboard
                </h1>

                <div className="card">
                    <h2>
                        Registrar Venta
                    </h2>

                    <input
                        type="number"
                        placeholder="ID Cliente"
                        value={idCliente}
                        onChange={(e) =>
                            setIdCliente(
                                e.target.value
                            )
                        }
                    />
                </div>

                <div className="card">
                    <h2>
                        Productos
                    </h2>

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Categoría</th>
                                <th>Proveedor</th>
                                <th></th>
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
                                            Q{p.precio}
                                        </td>

                                        <td>
                                            {p.stock}
                                        </td>

                                        <td>
                                            {p.categoria}
                                        </td>

                                        <td>
                                            {p.proveedor}
                                        </td>

                                        <td>
                                            <button
                                                className="btn-green"
                                                onClick={() =>
                                                    agregarProducto(p)
                                                }
                                            >
                                                +
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="card">
                    <h2>
                        Carrito
                    </h2>

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                carrito.map(item => (
                                    <tr key={item.id_prod}>
                                        <td>
                                            {item.nombre}
                                        </td>

                                        <td>
                                            {item.cantidad}
                                        </td>

                                        <td>
                                            Q{item.precio}
                                        </td>

                                        <td>
                                            Q{
                                                item.precio *
                                                item.cantidad
                                            }
                                        </td>

                                        <td>
                                            <button
                                                className="btn-danger"
                                                onClick={() =>
                                                    quitarProducto(
                                                        item.id_prod
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <h3>
                        Total: Q{total}
                    </h3>

                    <button
                        className="btn-primary"
                        onClick={crearVenta}
                    >
                        Crear Venta
                    </button>
                </div>
            </div>
        </div>
    );
};