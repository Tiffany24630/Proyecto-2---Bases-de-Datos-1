import React, {
    useEffect,
    useState
} from "react";
import { Navbar } from "../components/Navbar.jsx";
import {
    obtenerClientes
} from "../services/cliente.service.js";

export const ClientesPage = () => {
    const [clientes, setClientes] =
        useState([]);

    useEffect(() => {
        const cargar = async () => {
            const data =
                await obtenerClientes();

            setClientes(data);
        };
        cargar();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="page">
                <h1>Clientes</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            clientes.map(c => (
                                <tr key={c.id_clien}>
                                    <td>{c.id_clien}</td>
                                    <td>{c.nombre}</td>
                                    <td>{c.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};