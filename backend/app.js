import express from "express";
import pool from "./db.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middlewares/auth.middleware.js";
import { requireRole } from "./middlewares/role.middleware.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.post("/login", async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;

    const result = await pool.query(
      `
      SELECT *
      FROM usuarios
      WHERE username = $1
      AND password = $2
      `,
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Usuario no encontrado"
      });
    }

    const usuario = result.rows[0];

    const token = jwt.sign(
      {
        username: usuario.username,
        rol: usuario.rol
      },
      "secretkey",
      {
        expiresIn: "8h"
      }
    );

    res.json({
      token,
      rol: usuario.rol,
      username: usuario.username
    });

  }catch (error){
    console.error(error);

    res.status(500).json({
      error: "Error login"
    });
  }
});

app.get(
  "/clientes",
  verifyToken,
  requireRole("admin_r", "vendedor_r"),
  async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT *
        FROM cliente
        ORDER BY id_clien
      `);

      res.json(result.rows);

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error obteniendo clientes"
      });
    }
  }
);

app.post(
  "/clientes",
  verifyToken,
  requireRole("admin_r"),
  async (req, res) => {
    try {
      const {
        nombre,
        email,
        telefono
      } = req.body;

      if (!nombre || !email || !telefono) {
        return res.status(400).json({
          error: "Todos los campos son requeridos"
        });
      }

      await pool.query(
        `
        CALL registrar_cliente($1, $2, $3)
        `,
        [nombre, telefono, email]
      );

      res.json({
        mensaje: "Cliente creado"
      });

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error creando cliente"
      });
    }
  }
);

app.put(
  "/clientes/:id",
  verifyToken,
  requireRole("admin_r"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        nombre,
        email,
        telefono
      } = req.body;

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

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error actualizando cliente"
      });
    }
  }
);

app.delete(
  "/clientes/:id",
  verifyToken,
  requireRole("admin_r"),
  async (req, res) => {
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

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error eliminando cliente"
      });
    }
  }
);

app.get(
  "/productos",
  verifyToken,
  requireRole(
    "admin_r",
    "inventario_r",
    "cliente_r",
    "vendedor_r"
  ),
  async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT *
        FROM producto
        ORDER BY id_prod
      `);

      res.json(result.rows);

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error obteniendo productos"
      });
    }
  }
);

app.post(
  "/productos",
  verifyToken,
  requireRole(
    "admin_r",
    "inventario_r"
  ),
  async (req, res) => {
    try {
      const {
        nombre,
        precio,
        stock,
        id_prov,
        id_cat
      } = req.body;

      await pool.query(
        `
        CALL crear_producto($1, $2, $3, $4, $5)
        `,
        [
          nombre,
          precio,
          stock,
          id_prov,
          id_cat
        ]
      );

      res.json({
        mensaje: "Producto creado"
      });

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error creando producto"
      });
    }
  }
);

app.put(
  "/productos/:id/stock",
  verifyToken,
  requireRole(
    "admin_r",
    "inventario_r"
  ),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { stock } = req.body;

      await pool.query(
        `
        CALL actualizar_stock($1, $2)
        `,
        [id, stock]
      );

      res.json({
        mensaje: "Stock actualizado"
      });

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error actualizando stock"
      });
    }
  }
);

app.delete(
  "/productos/:id",
  verifyToken,
  requireRole(
    "admin_r",
    "inventario_r"
  ),
  async (req, res) => {
    try {
      const { id } = req.params;

      await pool.query(
        `
        CALL eliminar_producto($1)
        `,
        [id]
      );

      res.json({
        mensaje: "Producto eliminado"
      });

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error eliminando producto"
      });
    }
  }
);

app.post(
  "/venta",
  verifyToken,
  requireRole(
    "admin_r",
    "vendedor_r"
  ),
  async (req, res) => {
    try {
      const {
        detalles,
        id_clien
      } = req.body;

      if (!id_clien) {
        return res.status(400).json({
          error: "Debe enviar id_clien"
        });
      }

      if (!detalles || detalles.length === 0) {
        return res.status(400).json({
          error: "Debe agregar productos"
        });
      }

      for (const d of detalles) {
        await pool.query(
            `
            CALL crear_venta(
                $1,
                $2,
                $3,
                $4
            )
            `,
            [
                id_clien,
                d.id_prod,
                d.cantidad,
                d.precio
            ]
        );
      }
      res.json({
        mensaje: "Venta creada correctamente"
      });

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: error.message
      });
    }
  }
);

app.get(
  "/reporte-ventas",
  verifyToken,
  requireRole(
    "admin_r",
    "auditor_r"
  ),
  async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          v.id_ven,
          v.fecha,
          c.nombre AS cliente,
          SUM(
            dv.cantidad * dv.precio_unit
          ) AS total
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

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error obteniendo reporte"
      });
    }
  }
);

app.get(
  "/reporte-subquery",
  verifyToken,
  requireRole(
    "admin_r",
    "auditor_r"
  ),
  async (req, res) => {
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

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error subquery"
      });
    }
  }
);

app.get(
  "/reporte-cte",
  verifyToken,
  requireRole(
    "admin_r",
    "auditor_r"
  ),
  async (req, res) => {
    try {
      const result = await pool.query(`
        WITH ventas_totales AS (
          SELECT
            v.id_clien,
            SUM(
              dv.cantidad * dv.precio_unit
            ) AS total_gastado
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

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error CTE"
      });
    }
  }
);

app.get(
  "/vista-ventas",
  verifyToken,
  requireRole(
    "admin_r",
    "auditor_r"
  ),
  async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT *
        FROM vista_ventas
      `);

      res.json(result.rows);

    } catch (error){
      console.error(error);

      res.status(500).json({
        error: "Error vista"
      });
    }
  }
);

app.get(
  "/debug/roles",
  verifyToken,
  requireRole("admin_r"),
  async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          rolname
        FROM pg_roles
        WHERE rolname IN (
          'admin_r',
          'vendedor_r',
          'inventario_r',
          'auditor_r',
          'cliente_r'
        )
        ORDER BY rolname
      `);

      res.json(result.rows);

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: error.message
      });
    }
  }
);

app.get(
  "/debug/procedures",
  verifyToken,
  requireRole("admin_r"),
  async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          routine_name
        FROM information_schema.routines
        WHERE routine_type = 'PROCEDURE'
        AND routine_schema = 'public'
        ORDER BY routine_name
      `);

      res.json(result.rows);

    }catch (error){
      console.error(error);

      res.status(500).json({
        error: error.message
      });
    }
  }
);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API funcionando"
  });
});

export default app;