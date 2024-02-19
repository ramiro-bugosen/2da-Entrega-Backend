import { Router } from "express";
import { cartsService, productsService } from "../index.js";
import { CartController } from "../controllers/cartController.js";
import { checkRole } from "../middlewares/checkRoles.js";

const router = Router();

router.get("/", CartController.getcarts);
router.get("/:cid", CartController.getCart);
router.post("/", CartController.createCart);
router.post("/:cid/product/:pid", CartController.addProductToCart);
router.delete("/:cid/product/:pid", CartController.deleteProductCart);
router.put("/:cid/product/:pid", CartController.updateProductCart);
router.post("/65d352ef9c9061c919f07c84/product/:pid", CartController.addProductToCart2);
router.delete("/:cid", CartController.deleteCart);
router.post("/:cid/purchase", CartController.purchaseCart)
export {router as cartsRouter};