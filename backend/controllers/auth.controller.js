import pool from "../db.js";
import { generarToken } from "../utils/jwt.js";

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const result = await pool.query(
            `
            SELECT *
            FROM usuarios
            WHERE username = $1
            `,
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: "Usuario no encontrado"
            });
        }

        const user = result.rows[0];

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