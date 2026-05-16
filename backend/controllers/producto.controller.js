import Producto from "../models/producto.model.js";
import pool from "../db.js";

export const getProductos = async (req, res) => {
    const productos = await Producto.findAll();
    res.json(productos);
};

export const createProducto = async (req, res) => {
    const { nombre, precio, stock, id_prov, id_cat } = req.body;

    await pool.query(
        "CALL crear_producto($1, $2, $3, $4, $5)",
        [nombre, precio, stock, id_prov, id_cat]
    );

    res.json({ message: "Producto creado" });
};