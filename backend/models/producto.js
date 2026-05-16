import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Producto = sequelize.define("producto", {
  id_prod: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL
  },
  stock: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false,
  tableName: "producto"
});

export default Producto;