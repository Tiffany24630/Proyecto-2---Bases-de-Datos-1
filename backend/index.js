import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import authRoutes from "./routes/auth.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import swaggerOptions from "./swagger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const swaggerSpec =
  swaggerJsdoc(swaggerOptions);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/auth", authRoutes);
app.use("/clientes", clientesRoutes);
app.use("/productos", productosRoutes);
app.use("/", ventasRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando"
  });
});

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en puerto ${PORT}`
  );

  console.log(
    `Swagger: http://localhost:${PORT}/api-docs`
  );
});