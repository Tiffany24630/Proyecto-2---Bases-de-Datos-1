import express from "express";

import {
    crearVenta
} from "../controllers/venta.controller.js";

import pool from "../db.js";

const router = express.Router();

router.post("/venta", crearVenta);

router.get("/reporte-ventas", async (req, res) => {
    try{
        const result = await pool.query(`
            SELECT
                v.id_ven,
                v.fecha,
                c.nombre AS cliente,
                p.nombre AS producto,
                dv.cantidad,
                dv.precio_unit
            FROM ventas v
            JOIN clientes c
                ON v.id_clien = c.id_clien
            JOIN detalle_venta dv
                ON v.id_ven = dv.id_ven
            JOIN productos p
                ON dv.id_prod = p.id_prod
            ORDER BY v.id_ven DESC
        `);

        res.json(result.rows);

    }catch(error){
        console.error(error);

        res.status(500).json({
            error: "Error obteniendo reporte"
        });
    }
});

router.get("/reporte-subquery", async (req, res) => {
    try{
        const result = await pool.query(`
            SELECT
                c.nombre,
                (
                    SELECT COUNT(*)
                    FROM ventas v
                    WHERE v.id_clien = c.id_clien
                ) AS total_ventas
            FROM clientes c
        `);

        res.json(result.rows);

    }catch(error){
        console.error(error);

        res.status(500).json({
            error: "Error subquery"
        });
    }
});

router.get("/reporte-cte", async (req, res) => {
    try{
        const result = await pool.query(`
            WITH total_clientes AS (
                SELECT
                    c.nombre,
                    COUNT(v.id_ven) AS total
                FROM clientes c
                LEFT JOIN ventas v
                    ON c.id_clien = v.id_clien
                GROUP BY c.nombre
            )

            SELECT * FROM total_clientes
        `);

        res.json(result.rows);

    }catch(error){
        console.error(error);

        res.status(500).json({
            error: "Error CTE"
        });
    }
});

router.get("/vista-ventas", async (req, res) => {
    try{
        const result = await pool.query(`
            SELECT * FROM vista_ventas
        `);

        res.json(result.rows);

    }catch(error){
        console.error(error);

        res.status(500).json({
            error: "Error vista"
        });
    }
});

export default router;