import pool from "../db.js";

export const getClientes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM cliente
      ORDER BY id_clien
    `);

    return res.json(result.rows);

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error: "Error obteniendo clientes"
    });
  }
};

export const createCliente = async (req, res) => {
  try {
    const {nombre, email, telefono} = req.body;

    if (!nombre || !email || !telefono) {
      return res.status(400).json({
        error:
          "Todos los campos son requeridos"
      });
    }

    await pool.query(
      `
      CALL registrar_cliente(
        $1,
        $2,
        $3
      )
      `,
      [nombre, telefono, email]
    );

    return res.json({
      mensaje: "Cliente creado"
    });

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error: "Error creando cliente"
    });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const {nombre, email, telefono} = req.body;

    await pool.query(
      `
      UPDATE cliente
      SET
        nombre = $1,
        email = $2,
        telefono = $3
      WHERE id_clien = $4
      `,
      [nombre, email, telefono, id]
    );

    return res.json({
      mensaje:
        "Cliente actualizado"
    });

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error:
        "Error actualizando cliente"
    });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const { id } =
      req.params;

    await pool.query(
      `
      DELETE FROM cliente
      WHERE id_clien = $1
      `,
      [id]
    );

    return res.json({
      mensaje:
        "Cliente eliminado"
    });

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error:
        "Error eliminando cliente"
    });
  }
};