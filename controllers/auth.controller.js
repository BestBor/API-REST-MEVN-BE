import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = new User({email, password})

        await User.findOne({email});
        if (user) throw ({code: 11000});

        await user.save()

        // jwt token
        const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET);

        return res.status(201).json({ok: "Usuario registrado"})
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({error: "Usuario ya existente"})
        }
        return res.status(500).json({error: "Error de servidor"})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) return res.status(404).json({error: "No se encuentra registrado un usuario con ese email"})

        const respuestaPass = await user.comparePassword(password)
        if (!respuestaPass) return res.status(404).json({error: "Credenciales incorrectas"});

        // jwt token
        const { token, expiresIn } = generateToken(user.id)

        return res.json({ token , expiresIn});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error de servidor"});
    }
}
