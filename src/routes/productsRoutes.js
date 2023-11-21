import { Router } from "express";
import { productsService } from "../index.js";
import { ProductsController } from "../controllers/productsController.js";

const router = Router();

router.get("/", ProductsController.getProducts);
router.post("/", ProductsController.createProduct);
router.get("/:pid",ProductsController.getProduct);
router.put("/:productId",ProductsController.updateProduct);
router.delete("/:productId", ProductsController.deleteProduct);


export {router as productsRouter};