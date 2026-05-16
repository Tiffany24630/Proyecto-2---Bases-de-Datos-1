import pool from "../db.js";

export const crearVenta = async (req, res) => {
    const { id_clien, id_prod, cantidad, precio } = req.body;

    await pool.query(
        "CALL crear_venta($1, $2, $3, $4)",
        [id_clien, id_prod, cantidad, precio]
    );

    res.json({ message: "Venta creada" });
};