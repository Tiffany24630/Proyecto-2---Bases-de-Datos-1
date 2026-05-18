import Producto from "../models/producto.js";
import sequelize from "../config/sequelize.js";

export const getProductos = async (req, res) => {
  try {
    const [productos] = await sequelize.query(`
      SELECT
        p.id_prod,
        p.nombre,
        p.precio,
        p.stock,
        p.id_cat,
        p.id_prov,
        c.nombre AS categoria,
        pr.nombre AS proveedor
      FROM producto p
      JOIN categoria c
        ON p.id_cat = c.id_cat
      JOIN proveedor pr
        ON p.id_prov = pr.id_prov
      ORDER BY p.id_prod
    `);

    return res.json(productos);

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error: "Error obteniendo productos"
    });
  }
};

export const createProducto = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {nombre, precio, stock, id_prov, id_cat} = req.body;

    const producto = await Producto.create(
      {
        nombre,
        precio,
        stock,
        id_prov,
        id_cat
      },
      { transaction }
    );

    await transaction.commit();

    return res.json({
      mensaje: "Producto creado",
      producto
    });

  }catch (error){
    await transaction.rollback();
    console.error(error);

    return res.status(500).json({
      error: "Error creando producto"
    });
  }
};

export const updateStockProducto = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { stock } = req.body;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      await transaction.rollback();

      return res.status(404).json({
        error: "Producto no encontrado"
      });
    }

    await producto.update(
      { stock },
      { transaction }
    );

    await transaction.commit();

    return res.json({
      mensaje: "Stock actualizado"
    });

  }catch (error){
    await transaction.rollback();
    console.error(error);

    return res.status(500).json({
      error: "Error actualizando stock"
    });
  }
};

export const deleteProducto = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      await transaction.rollback();

      return res.status(404).json({
        error: "Producto no encontrado"
      });
    }

    await sequelize.query(
      `
      DELETE FROM detalle_venta
      WHERE id_prod = :id
      `,
      {
        replacements: { id },
        transaction
      }
    );

    await producto.destroy({
      transaction
    });

    await transaction.commit();

    return res.json({
      mensaje: "Producto eliminado"
    });

  }catch (error){
    await transaction.rollback();
    console.error(error);

    return res.status(500).json({
      error: "Error eliminando producto"
    });
  }
};

export const updateProducto = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const {nombre, precio, stock, id_prov, id_cat} = req.body;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      await transaction.rollback();

      return res.status(404).json({
        error: "Producto no encontrado"
      });
    }

    await producto.update(
      {
        nombre,
        precio,
        stock,
        id_prov,
        id_cat
      },
      { transaction }
    );

    await transaction.commit();

    return res.json({
      mensaje: "Producto actualizado"
    });

  }catch (error){
    await transaction.rollback();
    console.error(error);

    return res.status(500).json({
      error: "Error actualizando producto"
    });
  }
};