import User from "../models/user.js";
import { generarToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const {username, password} = req.body;

    const user = await User.findOne({
      where: {
        username
      }
    });

    if (!user) {
      return res.status(401).json({
        error: "Usuario no encontrado"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        error: "Contraseña incorrecta"
      });
    }

    const token = generarToken(user);

    return res.json({
      token,
      rol: user.rol,
      username: user.username
    });

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error: "Error login"
    });
  }
};