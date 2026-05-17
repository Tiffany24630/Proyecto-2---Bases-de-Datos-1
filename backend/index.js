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
      "SELECT * FROM cliente ORDER BY id_clien"
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error obteniendo clientes"
    });
  }
});

app.get("/productos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM producto ORDER BY id_prod"
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error obteniendo productos"
    });
  }
});

app.post("/venta", async (req, res) => {

  const client = await pool.connect();

  try {

    const {
      id_clien,
      id_prod,
      cantidad
    } = req.body;

    const producto = await client.query(
      `
      SELECT precio, stock
      FROM producto
      WHERE id_prod = $1
      `,
      [id_prod]
    );

    if (producto.rows.length === 0) {

      return res.status(404).json({
        error: "Producto no encontrado"
      });
    }

    const precio = Number(producto.rows[0].precio);
    const stock = producto.rows[0].stock;

    if (stock < cantidad) {

      return res.status(400).json({
        error: "Stock insuficiente"
      });
    }

    await client.query("BEGIN");

    const venta = await client.query(
      `
      INSERT INTO venta
      (fecha, id_clien, id_emp)
      VALUES (NOW(), $1, 1)
      RETURNING id_ven
      `,
      [id_clien]
    );

    const idVenta = venta.rows[0].id_ven;

    await client.query(
      `
      INSERT INTO detalle_venta
      (cantidad, precio_unit, id_ven, id_prod)
      VALUES ($1, $2, $3, $4)
      `,
      [
        cantidad,
        precio,
        idVenta,
        id_prod
      ]
    );

    await client.query(
      `
      UPDATE producto
      SET stock = stock - $1
      WHERE id_prod = $2
      `,
      [
        cantidad,
        id_prod
      ]
    );

    await client.query("COMMIT");

    res.json({
      mensaje: "Venta registrada",
      id_venta: idVenta
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error(error);

    res.status(500).json({
      error: "Error registrando venta"
    });

  } finally {

    client.release();
  }
});

app.get("/reporte-ventas", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        v.id_ven,
        v.fecha,
        c.nombre AS cliente,
        p.nombre AS producto,
        dv.cantidad,
        dv.precio_unit,
        (dv.cantidad * dv.precio_unit) AS total
      FROM venta v
      JOIN cliente c
        ON v.id_clien = c.id_clien
      JOIN detalle_venta dv
        ON v.id_ven = dv.id_ven
      JOIN producto p
        ON dv.id_prod = p.id_prod
      ORDER BY v.fecha DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error obteniendo reporte"
    });
  }
});

app.get("/reporte-subquery", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT nombre, precio
      FROM producto
      WHERE precio >
      (
        SELECT AVG(precio)
        FROM producto
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
          v.id_clien,
          SUM(dv.cantidad * dv.precio_unit) AS total_gastado

        FROM venta v

        JOIN detalle_venta dv
          ON v.id_ven = dv.id_ven

        GROUP BY v.id_clien
      )

      SELECT
        c.nombre,
        vt.total_gastado

      FROM ventas_totales vt

      JOIN cliente c
        ON vt.id_clien = c.id_clien

      ORDER BY vt.total_gastado DESC
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