import Cliente from "../models/cliente.js";
import sequelize from "../config/sequelize.js";

export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      order: [["id_clien", "ASC"]]
    });

    return res.json(clientes);

  }catch (error){

    console.error(error);

    return res.status(500).json({
      error: "Error obteniendo clientes"
    });
  }
};

export const createCliente = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const {nombre, email, telefono} = req.body;

    if (!nombre || !email || !telefono) {
      await transaction.rollback();

      return res.status(400).json({
        error: "Todos los campos son requeridos"
      });
    }

    const cliente = await Cliente.create(
      {
        nombre,
        email,
        telefono
      },
      { transaction }
    );

    await transaction.commit();

    return res.json({
      mensaje: "Cliente creado",
      cliente
    });

  }catch (error){
    await transaction.rollback();
    console.error(error);

    return res.status(500).json({
      error: "Error creando cliente"
    });
  }
};

export const updateCliente = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const {nombre, email, telefono} = req.body;
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      await transaction.rollback();

      return res.status(404).json({
        error: "Cliente no encontrado"
      });
    }

    await cliente.update(
      {
        nombre,
        email,
        telefono
      },
      { transaction }
    );

    await transaction.commit();

    return res.json({
      mensaje: "Cliente actualizado"
    });

  }catch (error){
    await transaction.rollback();
    console.error(error);

    return res.status(500).json({
      error: "Error actualizando cliente"
    });
  }
};

export const deleteCliente = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      await transaction.rollback();

      return res.status(404).json({
        error: "Cliente no encontrado"
      });
    }

    await cliente.destroy({
      transaction
    });

    await transaction.commit();

    return res.json({
      mensaje: "Cliente eliminado"
    });

  }catch (error){
    await transaction.rollback();
    console.error(error);

    return res.status(500).json({
      error: "Error eliminando cliente"
    });
  }
};