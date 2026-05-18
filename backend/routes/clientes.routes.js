import express from "express";
import {getClientes, createCliente, updateCliente, deleteCliente} from "../controllers/cliente.controller.js";
import {verifyToken} from "../middlewares/auth.middleware.js";
import {requireRole} from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtener clientes
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista clientes
 */
router.get(
  "/",
  verifyToken,
  requireRole(
    "admin_r",
    "vendedor_r"
  ),
  getClientes
);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear cliente
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cliente creado
 */
router.post(
  "/",
  verifyToken,
  requireRole("admin_r"),
  createCliente
);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar cliente
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id",
  verifyToken,
  requireRole("admin_r"),
  updateCliente
);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar cliente
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  verifyToken,
  requireRole("admin_r"),
  deleteCliente
);

export default router;