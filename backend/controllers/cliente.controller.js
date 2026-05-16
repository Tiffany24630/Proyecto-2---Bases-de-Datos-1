import Cliente from "../models/Cliente.js";
import pool from "../db.js";

export const getClientes = async (req, res) => {
    const clientes = await Cliente.findAll();
    res.json(clientes);
};

export const createCliente = async (req, res) => {
    const { nombre, email, telefono } = req.body;

    await pool.query(
        "CALL registrar_cliente($1, $2, $3)",
        [nombre, email, telefono]
    );

    res.json({ message: "Cliente creado" });
};