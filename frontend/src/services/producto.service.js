import { apiFetch } from "./api.js";

export const obtenerProductos = async () => {
    return await apiFetch(
        "/productos"
    );
};

export const crearProducto = async (producto) => {
    return await apiFetch(
        "/productos",
        {
            method: "POST",
            body: JSON.stringify(producto)
        }
    );
};

export const editarProducto = async (id, producto) => {
    return await apiFetch(
        `/productos/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(producto)
        }
    );
};

export const actualizarStockProducto = async (id, stock) => {
    return await apiFetch(
        `/productos/${id}/stock`,
        {
            method: "PUT",
            body: JSON.stringify({
                stock
            })
        }
    );
};

export const actualizarStockService = actualizarStockProducto;

export const eliminarProducto = async (id) => {
    return await apiFetch(
        `/productos/${id}`,
        {
            method: "DELETE"
        }
    );
};