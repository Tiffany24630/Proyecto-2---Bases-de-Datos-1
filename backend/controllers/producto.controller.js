import Producto from "../models/producto.js";
import pool from "../db.js";

export const getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);

    }catch (error){
        console.error(error);

        res.status(500).json({
            error: "Error obteniendo productos"
        });
    }
};

export const createProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, id_prov, id_cat } = req.body;

        await pool.query(
            "CALL crear_producto($1, $2, $3, $4, $5)",
            [nombre, precio, stock, id_prov, id_cat]
        );

        res.json({
            message: "Producto creado"
        });

    }catch (error){
        console.error(error);

        res.status(500).json({
            error: "Error creando producto"
        });
    }
};