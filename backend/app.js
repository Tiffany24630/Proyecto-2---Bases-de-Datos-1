import express from "express";
import pool from "./db.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/clientes", async (req, res) => {
  const result = await pool.query("SELECT * FROM cliente");
  res.json(result.rows);
});

app.post("/clientes", async (req, res) => {
  const { nombre, email, telefono } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Nombre requerido" });
  }

  await pool.query(
    "INSERT INTO cliente (nombre, email, telefono) VALUES ($1,$2,$3)",
    [nombre, email, telefono]
  );

  res.json({ message: "Cliente creado" });
});

app.put("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  await pool.query(
    "UPDATE cliente SET nombre=$1 WHERE id_clien=$2",
    [nombre, id]
  );

  res.json({ message: "Cliente actualizado" });
});

app.delete("/clientes/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "DELETE FROM cliente WHERE id_clien=$1",
    [id]
  );

  res.json({ message: "Cliente eliminado" });
});

app.get("/productos", async (req, res) => {
  const result = await pool.query("SELECT * FROM producto");
  res.json(result.rows);
});

app.post("/productos", async (req, res) => {
  const { nombre, precio } = req.body;

  await pool.query(
    "INSERT INTO producto (nombre, precio, stock, id_prov, id_cat) VALUES ($1,$2,0,1,1)",
    [nombre, precio]
  );

  res.json({ message: "Producto creado" });
});

app.get("/reporte-ventas", async (req, res) => {
  const result = await pool.query(`
    SELECT p.nombre AS producto, SUM(dv.cantidad) AS total_vendido
    FROM detalle_venta dv
    JOIN producto p ON dv.id_prod = p.id_prod
    GROUP BY p.nombre
  `);
  res.json(result.rows);
});

app.get("/reporte-cte", async (req, res) => {
  const result = await pool.query(`
    WITH total_compras AS (
      SELECT v.id_clien, SUM(cantidad * precio) AS total
      FROM detalle_venta dv
      JOIN producto p ON dv.id_prod = p.id_prod
      GROUP BY id_clien
    )
    SELECT c.nombre, tc.total
    FROM cliente c
    JOIN total_compras tc ON c.id_clien = tc.id_clien
  `);
  res.json(result.rows);
});

export default app;