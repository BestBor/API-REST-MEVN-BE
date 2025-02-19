import { Router } from "express";
import { createLink, getLink2, getLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";

const router = Router();

// GET      /api/v1/links       all links
// GET      /api/v1/links/:id   single link
// POST     /api/v1/links       create link
// PATCH    /api/v1/links/:id   update link
// DELETE   /api/v1/links/:id   remove link

router.get("/", requireToken, getLinks);
router.get("/:nanoLink", getLink2);
router.post("/", requireToken, bodyLinkValidator, createLink);
router.patch("/:id", requireToken, paramLinkValidator, bodyLinkValidator, updateLink);
router.delete("/:id", requireToken, paramLinkValidator, removeLink);

export default router;