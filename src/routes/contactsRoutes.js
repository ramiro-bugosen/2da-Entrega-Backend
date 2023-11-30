import { Router } from "express";
import { ContactController } from "../controllers/contactsController.js";
const router = Router();

router.get("/", ContactController.getContacts)
router.post("/", ContactController.createContact )
router.get("/:id", ContactController.getContact )

export {router as contactsRouter};