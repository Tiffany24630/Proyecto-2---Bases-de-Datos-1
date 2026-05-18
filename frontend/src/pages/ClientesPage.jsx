import React, {useEffect, useState} from "react";
import { Navbar } from "../components/Navbar.jsx";
import {obtenerClientes, actualizarCliente} from "../services/cliente.service.js";

export const ClientesPage = () => {
    const [clientes, setClientes] = useState([]);
    const [editando, setEditando] = useState(null);

    const [form, setForm] =
        useState({
            nombre: "",
            email: "",
            telefono: ""
        });

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        const data = await obtenerClientes();
        setClientes(data);
    };

    const iniciarEdicion = (c) => {
        setEditando(c.id_clien);

        setForm({
            nombre: c.nombre,
            email: c.email,
            telefono: c.telefono
        });
    };

    const guardar = async (id) => {
        await actualizarCliente(id, form);
        setEditando(null);
        cargar();
    };

    return (
        <div>
            <Navbar />
            <div className="page">
                <h1>
                    Clientes
                </h1>

                <div className="card">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                clientes.map(c => (
                                    <tr key={c.id_clien}>
                                        <td>
                                            {c.id_clien}
                                        </td>

                                        <td>
                                            {
                                                editando === c.id_clien
                                                    ? (
                                                        <input
                                                            value={
                                                                form.nombre
                                                            }
                                                            onChange={(e) =>
                                                                setForm({
                                                                    ...form,
                                                                    nombre:
                                                                        e.target.value
                                                                })
                                                            }
                                                        />
                                                    )
                                                    : c.nombre
                                            }
                                        </td>

                                        <td>
                                            {
                                                editando === c.id_clien
                                                    ? (
                                                        <input
                                                            value={
                                                                form.email
                                                            }
                                                            onChange={(e) =>
                                                                setForm({
                                                                    ...form,
                                                                    email:
                                                                        e.target.value
                                                                })
                                                            }
                                                        />
                                                    )
                                                    : c.email
                                            }
                                        </td>

                                        <td>
                                            {
                                                editando === c.id_clien
                                                    ? (
                                                        <input
                                                            value={
                                                                form.telefono
                                                            }
                                                            onChange={(e) =>
                                                                setForm({
                                                                    ...form,
                                                                    telefono:
                                                                        e.target.value
                                                                })
                                                            }
                                                        />
                                                    )
                                                    : c.telefono
                                            }
                                        </td>

                                        <td>
                                            {
                                                editando === c.id_clien
                                                    ? (
                                                        <button
                                                            className="success-btn"
                                                            onClick={() =>
                                                                guardar(
                                                                    c.id_clien
                                                                )
                                                            }
                                                        >
                                                            Guardar
                                                        </button>
                                                    )
                                                    : (
                                                        <button
                                                            className="primary-btn"
                                                            onClick={() =>
                                                                iniciarEdicion(c)
                                                            }
                                                        >
                                                            Editar
                                                        </button>
                                                    )
                                            }
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