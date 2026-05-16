import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

const connectDB = async () => {
  let connected = false;

  while (!connected) {
    try {
      const client = await pool.connect();

      console.log("PostgreSQL conectado");

      client.release();

      connected = true;

    } catch (error) {
      console.log("Esperando PostgreSQL...");
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
};

await connectDB();

export default pool;