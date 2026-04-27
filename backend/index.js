import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});