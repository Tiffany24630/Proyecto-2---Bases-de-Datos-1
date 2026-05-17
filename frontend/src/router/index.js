import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor corriendo en puerto 3000");
});