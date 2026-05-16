import { protectedRoute } from "./protectedRoute.js";

export const isProductos = () => {
    if (!protectedRoute(["admin", "inventario"])) {
        return;
    }

    cargarProductos();
}