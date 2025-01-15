import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/login", login);

router.post("/register",
    [
        body("email", "Formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Formato de password incorrecto")
            .trim()
            .isLength({ min: 6 })
    ],
    register
);

// app.get("/", (req, res) => {
//     res.json({ok: true})
// });

export default router;