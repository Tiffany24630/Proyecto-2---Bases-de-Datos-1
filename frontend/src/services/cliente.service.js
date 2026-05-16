import { apiFetch } from "./api.js";

export const obtenerClientes = async () => {
    return await apiFetch("/clientes");
};