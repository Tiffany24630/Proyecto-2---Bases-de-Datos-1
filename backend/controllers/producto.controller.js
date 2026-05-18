import pool from "../db.js";

export const getProductos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM producto
      ORDER BY id_prod
    `);

    return res.json(
      result.rows
    );

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error:
        "Error obteniendo productos"
    });
  }
};

export const createProducto = async (req, res) => {
  try {
    const {nombre, precio, stock, id_prov, id_cat} = req.body;

    await pool.query(
      `
      CALL crear_producto(
        $1,
        $2,
        $3,
        $4,
        $5
      )
      `,
      [
        nombre,
        precio,
        stock,
        id_prov,
        id_cat
      ]
    );

    return res.json({
      mensaje:
        "Producto creado"
    });

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error:
        "Error creando producto"
    });
  }
};

export const updateStockProducto = async (req, res) => {
  try {
    const { id } =
      req.params;

    const { stock } =
      req.body;

    await pool.query(
      `
      CALL actualizar_stock(
        $1,
        $2
      )
      `,
      [id, stock]
    );

    return res.json({
      mensaje:
        "Stock actualizado"
    });

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error:
        "Error actualizando stock"
    });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } =
      req.params;

    await pool.query(
      `
      CALL eliminar_producto($1)
      `,
      [id]
    );

    return res.json({
      mensaje:
        "Producto eliminado"
    });

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error:
        "Error eliminando producto"
    });
  }
};