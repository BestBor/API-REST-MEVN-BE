import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ uid: req.uid });

        return res.json({links});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const getLink = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);
        if (!link) return res.status(404).json({error: "No existe este link"});
        if (!link.uid.equals(req.uid)) return res.status(401).json({error: "Este link no le pertenece"});

        return res.json({link});
    } catch (error) {
        console.log(error.message)
        if (error.kind === "ObjectId") return res.status(403).json({error: "Formato incorrecto"})
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const createLink = async (req, res) => {
    try {
        let { longLink } = req.body;

        if (!longLink.startsWith("https://")) {
            longLink = "https://" + longLink
        }

        const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
        const newLink = await link.save();

        return res.status(201).json({ newLink });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "error de servidor" });
    }
};

export const removeLink = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);
        if (!link) return res.status(404).json({error: "No existe este link"});
        if (!link.uid.equals(req.uid)) return res.status(401).json({error: "Este link no le pertenece"});

        await link.remove();

        return res.json({link});
    } catch (error) {
        console.log(error.message)
        if (error.kind === "ObjectId") return res.status(403).json({error: "Formato incorrecto"})
        return res.status(500).json({ error: "error de servidor" });
    }
};