import { apiFetch } from "./api.js";

export const crearVentaService = async (data) => {
    return await apiFetch("/venta", {
        method: "POST",
        body: JSON.stringify(data)
    });
};