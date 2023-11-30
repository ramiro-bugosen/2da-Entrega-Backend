import { Router } from "express";
import { cartsService, productsService } from "../index.js";
import { CartController } from "../controllers/cartController.js";
import { checkRole } from "../middlewares/checkRoles.js";

const router = Router();

router.get("/", CartController.getcarts);
router.get("/:cid", CartController.getCart);
router.post("/", CartController.createCart);
router.post("/:cid/product/:pid",checkRole(["user"]), CartController.addProductToCart);
router.delete("/:cid/product/:pid", CartController.deleteProductCart);
router.put("/:cid/product/:pid", CartController.updateProductCart);
router.post("/652e2622fbd4668e6f853049/product/:pid",checkRole(["user"]), CartController.addProductToCart2);
router.delete("/:cid", CartController.deleteCart);
router.post("/:cid/purchase", CartController.purchaseCart)
export {router as cartsRouter};