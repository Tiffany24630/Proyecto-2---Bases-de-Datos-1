import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Cliente = sequelize.define("cliente", {
  id_clien: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false,
  tableName: "cliente"
});

export default Cliente;