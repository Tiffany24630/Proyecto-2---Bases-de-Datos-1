import React, {useEffect, useState} from "react";
import { Navbar } from "../components/Navbar.jsx";
import { apiFetch } from "../services/api.js";

export const ClientesPage = () => {
    const [clientes, setClientes] = useState([]);

    const [form, setForm] =
        useState({
            nombre:"",
            email:"",
            telefono:""
        });

    const cargar = async () => {
        const data = await apiFetch("/clientes");
        setClientes(data);
    };

    useEffect(() => {
        cargar();
    }, []);

    const crearCliente = async () => {
        await apiFetch(
            "/clientes",
            {
                method:"POST",
                body:JSON.stringify(form)
            }
        );

        setForm({
            nombre:"",
            email:"",
            telefono:""
        });

        cargar();
    };

    const eliminarCliente = async (id) => {
        await apiFetch(
            `/clientes/${id}`,
            {
                method:"DELETE"
            }
        );

        cargar();
    };

    return (
        <div>
            <Navbar />
            <div className="page">
                <h1>Clientes</h1>
                <div className="card">
                    <h2>
                        Nuevo Cliente
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
                            placeholder="Email"
                            value={form.email}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    email:e.target.value
                                })
                            }
                        />

                        <input
                            placeholder="Teléfono"
                            value={form.telefono}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    telefono:e.target.value
                                })
                            }
                        />
                    </div>

                    <button onClick={crearCliente}>
                        Crear Cliente
                    </button>
                </div>

                <div className="card">
                    <table>
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
                                        <td>{c.id_clien}</td>
                                        <td>{c.nombre}</td>
                                        <td>{c.email}</td>
                                        <td>{c.telefono}</td>
                                        <td>
                                            <div className="actions">
                                                <button
                                                    className="btn-danger"
                                                    onClick={() =>
                                                        eliminarCliente(
                                                            c.id_clien
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