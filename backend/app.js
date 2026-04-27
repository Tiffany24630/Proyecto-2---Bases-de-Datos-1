import express from "express";
import pool from "./db.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ventas", async (req, res) => {
  const result = await pool.query(`
    SELECT v.id_ven, c.nombre AS cliente, e.nombre AS empleado
    FROM venta v
    JOIN cliente c ON v.id_clien = c.id_clien
    JOIN empleado e ON v.id_emp = e.id_emp
  `);
  res.json(result.rows);
});

export default app;