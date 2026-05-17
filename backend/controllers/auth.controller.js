import User from "../models/user.js";
import { generarToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username y password requeridos"
      });
    }

    const user = await User.findOne({
      where: {
        username,
        password
      }
    });

    if (!user) {
      return res.status(401).json({
        error: "Credenciales inválidas"
      });
    }

    const token = generarToken(user);

    res.json({
      token,
      rol: user.rol,
      username: user.username
    });

  }catch (error){
    console.error(error);

    res.status(500).json({
      error: "Error en login"
    });
  }
};