import Cliente from "../models/cliente.js";
import pool from "../db.js";

export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);

    }catch (error){
        console.error(error);

        res.status(500).json({
            error: "Error obteniendo clientes"
        });
    }
};

export const createCliente = async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body;

        await pool.query(
            "CALL registrar_cliente($1, $2, $3)",
            [nombre, email, telefono]
        );

        res.json({
            message: "Cliente creado"
        });

    }catch (error){
        console.error(error);

        res.status(500).json({
            error: "Error creando cliente"
        });
    }
};