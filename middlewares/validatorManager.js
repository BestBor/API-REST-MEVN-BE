import { validationResult, body } from "express-validator";
import axios from "axios";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const bodyLinkValidator = [
    body("longLink", "Formato link incorrecto")
        .trim()
        .notEmpty()
        .custom(async (value) => {
            try {

                if (!value.startsWith("https://")) {
                    value = "https://" + value
                }

                await axios.get(value);
                return value;
            } catch (error) {
                throw new Error("longLink not found");
            }
        }),
    validationResultExpress
];

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
];