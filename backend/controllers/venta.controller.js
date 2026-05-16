import { registrarVenta } from "../services/venta.service.js";

export const crearVenta = async (req, res) => {
    await registrarVenta(req.body);

    res.json({ message: "Venta creada" });
};