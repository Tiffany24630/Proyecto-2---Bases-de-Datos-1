import express from "express";
import pool from "./db.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/ventas", async (req, res) => {
  const result = await pool.query(`
    SELECT v.id_ven, c.nombre AS cliente, e.nombre AS empleado
    FROM venta v
    JOIN cliente c ON v.id_clien = c.id_clien
    JOIN empleado e ON v.id_emp = e.id_emp
  `);
  res.json(result.rows);
});

app.get("/clientes-activos", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT nombre
      FROM cliente
      WHERE id_clien IN (
        SELECT id_clien FROM venta
      )
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/ventas-altas", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_ven, SUM(precio_unit * cantidad) AS total
      FROM detalle_venta
      GROUP BY id_ven
      HAVING SUM(precio_unit * cantidad) > 100
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;