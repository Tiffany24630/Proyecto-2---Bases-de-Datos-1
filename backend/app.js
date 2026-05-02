import express from "express";
import pool from "./db.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "http://localhost:5173"
}));
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
  const { nombre, email, telefono } = req.body;

  await pool.query(
    `UPDATE cliente 
     SET nombre=$1, email=$2, telefono=$3 
     WHERE id_clien=$4`,
    [nombre, email, telefono, id]
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
    SELECT 
      v.id_ven,
      v.fecha,
      c.nombre AS cliente,
      p.nombre AS producto,
      dv.cantidad,
      dv.precio_unit
    FROM venta v
    JOIN cliente c ON v.id_clien = c.id_clien
    JOIN detalle_venta dv ON v.id_ven = dv.id_ven
    JOIN producto p ON dv.id_prod = p.id_prod
    ORDER BY v.id_ven DESC
  `);

  res.json(result.rows);
});

app.get("/reporte-cte", async (req, res) => {
  const result = await pool.query(`
    WITH total_compras AS (
      SELECT v.id_clien, SUM(dv.cantidad * dv.precio_unit) AS total
      FROM detalle_venta dv
      JOIN venta v ON dv.id_ven = v.id_ven
      GROUP BY v.id_clien
    )
    SELECT c.nombre, tc.total
    FROM cliente c
    JOIN total_compras tc ON c.id_clien = tc.id_clien
  `);
  res.json(result.rows);
});

app.get("/vista-ventas", async (req, res) => {
  const result = await pool.query(`SELECT * FROM vista_ventas`);
  res.json(result.rows);
});

app.post("/venta", async (req, res) => {
  const client = await pool.connect();
  const { detalles, id_clien } = req.body;

  try {
    await client.query("BEGIN");

    const venta = await client.query(
      "INSERT INTO venta (fecha, id_clien, id_emp) VALUES (NOW(), $1, 1) RETURNING id_ven",
      [id_clien]
    );

    const idVenta = venta.rows[0].id_ven;

    for (const d of detalles) {
      await client.query(
        `INSERT INTO detalle_venta (cantidad, precio_unit, id_ven, id_prod)
         VALUES ($1, $2, $3, $4)`,
        [d.cantidad, d.precio, idVenta, d.id_prod]
      );
    }

    await client.query("COMMIT");

    res.json({ message: "Venta creada", idVenta });

  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

app.get("/reporte-subquery", async (req, res) => {
  const result = await pool.query(`
    SELECT c.nombre,
       (SELECT COUNT(*) 
        FROM venta v 
        WHERE v.id_clien = c.id_clien) AS total_ventas
    FROM cliente c
    WHERE c.id_clien IN (
      SELECT id_clien FROM venta
    );
  `);
  res.json(result.rows);
});

export default app;