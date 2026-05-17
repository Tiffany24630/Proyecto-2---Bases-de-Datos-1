import express from "express";
import pool from "./db.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/clientes", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM cliente
      ORDER BY id_clien
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error obteniendo clientes"
    });
  }
});

app.post("/clientes", async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;

    if (!nombre || !email || !telefono) {
      return res.status(400).json({
        error: "Todos los campos son requeridos"
      });
    }

    await pool.query(
      `
      INSERT INTO cliente
      (nombre, email, telefono)
      VALUES ($1, $2, $3)
      `,
      [nombre, email, telefono]
    );

    res.json({
      mensaje: "Cliente creado"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error creando cliente"
    });
  }
});

app.put("/clientes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;

    await pool.query(
      `
      UPDATE cliente
      SET nombre = $1,
          email = $2,
          telefono = $3
      WHERE id_clien = $4
      `,
      [nombre, email, telefono, id]
    );

    res.json({
      mensaje: "Cliente actualizado"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error actualizando cliente"
    });
  }
});

app.delete("/clientes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM cliente
      WHERE id_clien = $1
      `,
      [id]
    );

    res.json({
      mensaje: "Cliente eliminado"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error eliminando cliente"
    });
  }
});

app.get("/productos", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM producto
      ORDER BY id_prod
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error obteniendo productos"
    });
  }
});

app.post("/productos", async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    await pool.query(
      `
      INSERT INTO producto
      (nombre, precio, stock, id_prov, id_cat)
      VALUES ($1, $2, 0, 1, 1)
      `,
      [nombre, precio]
    );

    res.json({
      mensaje: "Producto creado"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error creando producto"
    });
  }
});

app.post("/venta", async (req, res) => {
  const client = await pool.connect();

  try {
    const { detalles, id_clien } = req.body;

    if (!detalles || detalles.length === 0) {
      return res.status(400).json({
        error: "Debe agregar productos"
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

    for (const d of detalles) {

      const producto = await client.query(
        `
        SELECT stock
        FROM producto
        WHERE id_prod = $1
        `,
        [d.id_prod]
      );

      if (producto.rows.length === 0) {
        throw new Error("Producto no encontrado");
      }

      const stock = producto.rows[0].stock;

      if (stock < d.cantidad) {
        throw new Error(
          `Stock insuficiente para producto ${d.id_prod}`
        );
      }

      await client.query(
        `
        INSERT INTO detalle_venta
        (cantidad, precio_unit, id_ven, id_prod)
        VALUES ($1, $2, $3, $4)
        `,
        [
          d.cantidad,
          d.precio,
          idVenta,
          d.id_prod
        ]
      );

      await client.query(
        `
        UPDATE producto
        SET stock = stock - $1
        WHERE id_prod = $2
        `,
        [d.cantidad, d.id_prod]
      );
    }

    await client.query("COMMIT");

    res.json({
      mensaje: "Venta creada",
      idVenta
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error(error);

    res.status(500).json({
      error: error.message
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
        SUM(dv.cantidad * dv.precio_unit) AS total
      FROM venta v
      JOIN cliente c
        ON v.id_clien = c.id_clien
      JOIN detalle_venta dv
        ON v.id_ven = dv.id_ven
      GROUP BY
        v.id_ven,
        v.fecha,
        c.nombre
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
      SELECT
        nombre,
        precio
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

    const result = await pool.query(`
      SELECT *
      FROM vista_ventas
    `);

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

export default app;