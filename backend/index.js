import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/clientes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM clientes ORDER BY id_cliente"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo clientes" });
  }
});

app.get("/productos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM productos ORDER BY id_producto"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
});

app.post("/venta", async (req, res) => {
  try {
    const {
      id_cliente,
      id_producto,
      cantidad,
      metodo_pago,
    } = req.body;

    const producto = await pool.query(
      "SELECT precio, stock FROM productos WHERE id_producto = $1",
      [id_producto]
    );

    if (producto.rows.length === 0) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    const precio = producto.rows[0].precio;
    const stock = producto.rows[0].stock;

    if (stock < cantidad) {
      return res.status(400).json({
        error: "Stock insuficiente",
      });
    }

    const total = precio * cantidad;

    const venta = await pool.query(
      `
      INSERT INTO ventas
      (id_cliente, total, metodo_pago)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [id_cliente, total, metodo_pago]
    );

    await pool.query(
      `
      INSERT INTO detalle_ventas
      (id_venta, id_producto, cantidad, subtotal)
      VALUES ($1, $2, $3, $4)
      `,
      [
        venta.rows[0].id_venta,
        id_producto,
        cantidad,
        total,
      ]
    );

    await pool.query(
      `
      UPDATE productos
      SET stock = stock - $1
      WHERE id_producto = $2
      `,
      [cantidad, id_producto]
    );

    res.json({
      mensaje: "Venta registrada",
      venta: venta.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error registrando venta",
    });
  }
});

app.get("/reporte-ventas", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        v.id_venta,
        c.nombre AS cliente,
        v.total,
        v.fecha
      FROM ventas v
      JOIN clientes c
      ON v.id_cliente = c.id_cliente
      ORDER BY v.fecha DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error obteniendo reporte",
    });
  }
});

app.get("/reporte-subquery", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT nombre, precio
      FROM productos
      WHERE precio >
      (
        SELECT AVG(precio)
        FROM productos
      )
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error subquery"
    });
  }
});

app.get("/reporte-cte", async (req, res) => {
  try {
    const result = await pool.query(`
      WITH ventas_totales AS (
        SELECT
          id_cliente,
          SUM(total) AS total_gastado
        FROM ventas
        GROUP BY id_cliente
      )
      SELECT
        c.nombre,
        vt.total_gastado
      FROM ventas_totales vt
      JOIN clientes c
      ON vt.id_cliente = c.id_cliente
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error CTE"
    });
  }
});

app.get("/vista-ventas", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM vista_ventas"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error vista"
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    mensaje: "API funcionando"
  });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor corriendo en puerto 3000");
});