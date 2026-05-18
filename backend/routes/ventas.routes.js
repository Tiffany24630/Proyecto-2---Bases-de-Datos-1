import express from "express";
import {crearVenta, reporteVentas, reporteSubquery, reporteCTE, vistaVentas} from "../controllers/ventas.controller.js";
import {verifyToken} from "../middlewares/auth.middleware.js";
import {requireRole} from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/venta",
  verifyToken,
  requireRole(
    "admin_r",
    "vendedor_r"
  ),
  crearVenta
);

router.get(
  "/reporte-ventas",
  verifyToken,
  requireRole(
    "admin_r",
    "auditor_r"
  ),
  reporteVentas
);

router.get(
  "/reporte-subquery",
  verifyToken,
  requireRole(
    "admin_r",
    "auditor_r"
  ),
  reporteSubquery
);

router.get(
  "/reporte-cte",
  verifyToken,
  requireRole(
    "admin_r",
    "auditor_r"
  ),
  reporteCTE
);

router.get(
  "/vista-ventas",
  verifyToken,
  requireRole(
    "admin_r",
    "auditor_r"
  ),
  vistaVentas
);

export default router;