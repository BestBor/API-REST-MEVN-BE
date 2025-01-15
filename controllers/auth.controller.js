import { User } from "../models/User.js" 

export const register = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = new User({email, password})

        await User.findOne({email});
        if (user) throw ({code: 11000});

        await user.save()

        // jwt token

        return res.status(201).json({ok: "Usuario registrado"})
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({error: "Usuario ya existente"})
        }
        return res.status(500).json({error: "Error de servidor"})
    }
}

export const login = async (req, res) => {
    res.json({ ok: "login" })
}
