import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

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
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) return res.status(404).json({error: "Usuario inexistente"});

        const respuestaPass = await user.comparePassword(password);
        if (!respuestaPass) return res.status(404).json({error: "Contraseña incorrecta"});

        // jwt token
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res)

        return res.json({ token , expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error de servidor"});
    }
};


// Intento con ruta protegida
export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean()
        return res.json({ uid: user.id, email: user.email });
    } catch (error) {
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const refreshToken = (req, res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("No Token");

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        const { token, expiresIn } = generateToken(uid);

        return res.json({ token, expiresIn });

    } catch (error) {
        console.log(error.message)
        const TokenVerificationErrors = {
            "invalid signature": "La firma del JWT no es válida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no válido",
            "No Token": "No existe el token",
            "jwt malformed": "JWT con formato incorrecto"
        };

        return res
            .status(401)
            .send({ error: TokenVerificationErrors[error.message] });
    }
};

export const logout = (req, res) => {
    res.clearCookie('refreshToken')
    res.json({ok: true})
}
