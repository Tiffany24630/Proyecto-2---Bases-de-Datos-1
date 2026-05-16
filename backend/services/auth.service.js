import pool from "../db.js";

export const registrarVenta = async ({
    id_clien,
    id_prod,
    cantidad,
    precio
}) => {
    await pool.query(
        "CALL crear_venta($1, $2, $3, $4)",
        [id_clien, id_prod, cantidad, precio]
    );
};