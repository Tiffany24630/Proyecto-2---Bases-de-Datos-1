import express from "express";
import cors from "cors";

import clientesRoutes from "./routes/clientes.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/clientes", clientesRoutes);
app.use("/productos", productosRoutes);
app.use("/", ventasRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});