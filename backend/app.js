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
    SELECT v.id_ven, c.nombre AS cliente, e.nombre AS empleado FROM venta v
    JOIN cliente c ON v.id_clien = c.id_clien
    JOIN empleado e ON v.id_emp = e.id_emp
  `);
  res.json(result.rows);
});

app.get("/clientes-activos", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT nombre FROM cliente
      WHERE id_clien IN (SELECT id_clien FROM venta)
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/ventas-altas", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_ven, SUM(precio_unit * cantidad) AS total FROM detalle_venta
      GROUP BY id_ven
      HAVING SUM(precio_unit * cantidad) > 100
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/reporte-clientes", async (req, res) => {
  try {
    const result = await pool.query(`
      WITH total_compras AS (
        SELECT v.id_clien, SUM(d.precio_unit * d.cantidad) AS total FROM venta v
        JOIN detalle_venta d ON v.id_ven = d.id_ven
        GROUP BY v.id_clien
      )
      SELECT * FROM total_compras WHERE total > 200
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/vista-ventas", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM vista_ventas`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/venta", async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const venta = await client.query(
      "INSERT INTO venta (fecha, id_clien, id_emp) VALUES (NOW(), 1, 1) RETURNING id_ven"
    );

    const idVenta = venta.rows[0].id_ven;

    await client.query(
      "INSERT INTO detalle_venta (cantidad, precio_unit, id_ven, id_prod) VALUES (1, 50, $1, 1)",
      [idVenta]
    );

    await client.query("COMMIT");

    res.json({ message: "Venta creada", idVenta });

  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.post("/clientes", async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "Nombre requerido" });
    }

    await pool.query(
      "INSERT INTO cliente (nombre, email, telefono) VALUES ($1,$2,$3)",
      [nombre, email, telefono]
    );

    res.json({ message: "Cliente creado" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;