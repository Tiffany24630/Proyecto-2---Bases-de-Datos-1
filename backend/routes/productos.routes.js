import express from "express";
import {getProductos, createProducto, updateStockProducto, deleteProducto} from "../controllers/producto.controller.js";
import {verifyToken} from "../middlewares/auth.middleware.js";
import {requireRole} from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener productos
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  verifyToken,
  requireRole(
    "admin_r",
    "inventario_r",
    "cliente_r",
    "vendedor_r"
  ),
  getProductos
);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear producto
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  verifyToken,
  requireRole(
    "admin_r",
    "inventario_r"
  ),
  createProducto
);

/**
 * @swagger
 * /productos/{id}/stock:
 *   put:
 *     summary: Actualizar stock
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id/stock",
  verifyToken,
  requireRole(
    "admin_r",
    "inventario_r"
  ),
  updateStockProducto
);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  verifyToken,
  requireRole(
    "admin_r",
    "inventario_r"
  ),
  deleteProducto
);

export default router;