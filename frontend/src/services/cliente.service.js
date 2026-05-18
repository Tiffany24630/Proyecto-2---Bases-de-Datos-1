import { apiFetch } from "./api.js";

export const obtenerClientes = async () => {
    return await apiFetch("/clientes");
};

export const crearCliente = async (cliente) => {
    return await apiFetch(
        "/clientes",
        {
            method: "POST",
            body: JSON.stringify(cliente)
        }
    );
};

export const actualizarCliente = async (id, cliente) => {
    return await apiFetch(
        `/clientes/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(cliente)
        }
    );
};

export const editarCliente = actualizarCliente;

export const eliminarCliente = async (id) => {
    return await apiFetch(
        `/clientes/${id}`,
        {
            method: "DELETE"
        }
    );
};