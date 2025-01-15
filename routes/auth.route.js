import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { Router } from "express";

const router = Router();


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
    validationResultExpress,
    register
);

router.post("/login",
    [
        body("email", "Formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Formato de password incorrecto")
            .trim()
            .isLength({ min: 6 })
    ],
    login
);

// app.get("/", (req, res) => {
//     res.json({ok: true})
// });

export default router;