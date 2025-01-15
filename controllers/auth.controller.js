export const register = (req, res) => {
    res.status(200).json({ message: "Usuario registrado con éxito" }); // dummie code
}

export const login = (req, res) => {
    res.json({ ok: "login" })
}
