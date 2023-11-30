import { Router } from "express";
import { productsService } from "../index.js";
import { ProductsController } from "../controllers/productsController.js";
import { checkRole } from "../middlewares/checkRoles.js";

const router = Router();

router.get("/", ProductsController.getProducts);
router.post("/", checkRole(["admin"]), ProductsController.createProduct);
router.get("/:pid",ProductsController.getProduct);
router.put("/:productId",checkRole(["admin"]), ProductsController.updateProduct);
router.delete("/:productId",checkRole(["admin"]), ProductsController.deleteProduct);


export {router as productsRouter};