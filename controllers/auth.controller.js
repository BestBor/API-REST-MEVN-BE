import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if (user) throw ({ code: 11000 });
        
        user = new User({ email, password });
        await user.save();

        // jwt token
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);

        return res.status(201).json({ token, expiresIn });
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
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Error de servidor" });
    }
};

export const logout = (req, res) => {
    res.clearCookie('refreshToken')
    res.json({ok: true})
}
