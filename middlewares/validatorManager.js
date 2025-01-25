import { validationResult, body } from "express-validator"

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const bodyRegisterValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Formato de password incorrecto")
        .trim()
        .isLength({ min: 6 }),
    validationResultExpress
];

export const bodyLoginValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Formato de password incorrecto")
        .trim()
        .isLength({ min: 6 }),
    validationResultExpress,
]