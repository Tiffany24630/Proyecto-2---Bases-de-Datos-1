import jwt from "jsonwebtoken";

export const generarToken = (user) => {
  return jwt.sign(
    {
      id: user.id_user,
      rol: user.rol
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h"
    }
  );
};