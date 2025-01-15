import { validationResult } from "express-validator";

export const register = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    res.status(200).json({ message: "Usuario registrado con éxito" }); // dummie code
}

export const login = (req, res) => {
    res.json({ ok: "login" })
}
