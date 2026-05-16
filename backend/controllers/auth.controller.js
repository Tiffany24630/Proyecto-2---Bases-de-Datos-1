import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username, password } });

    if (!user){
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
        {
            id: user.id_user,
            rol: user.rol
        },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
    );

    res.json({ 
        token, 
        rol: user.rol,
        username: user.username
    });
};