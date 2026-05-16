import { apiFetch } from "./api.js";

export const obtenerProductos = async () => {
    return await apiFetch("/productos");
};