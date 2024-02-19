import { Router } from "express";
import { checkRole, isAuth } from "../middlewares/checkRoles.js";
import { UsersController } from "../controllers/usersController.js";
import { uploadDocuments } from "../utils.js";

const router = Router();

router.put("/premium/:uid", checkRole(["admin"]), UsersController.modifyRole );

router.post("/:uid/documents", isAuth, uploadDocuments.fields([
    {name:"identificacion", maxCount:1},
    {name:"domicilio", maxCount:1},
    {name:"estadoDeCuenta", maxCount:1},
]),  UsersController.uploadUserDocuments );

export { router as usersRouter};