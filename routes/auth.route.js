import { infoUser, login, register, refreshToken, logout } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { Router } from "express";
import { requireToken } from "../middlewares/requireToken.js";

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

router.get("/secured", requireToken, infoUser);

router.get("/refresh", refreshToken);

router.get("/logout", logout);

export default router;