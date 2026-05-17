import { registrarVenta } from "../services/venta.service.js";

export const crearVenta = async (req, res) => {
    try {
        const idVenta = await registrarVenta(req.body);

        res.json({
            message: "Venta creada",
            idVenta
        });

    }catch (error){
        console.error(error);

        res.status(500).json({
            error: "Error creando venta"
        });
    }
};