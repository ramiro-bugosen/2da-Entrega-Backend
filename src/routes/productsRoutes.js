import { Router } from "express";
import { productsService } from "../index.js";

const router = Router();

router.get("/", async(req,res)=>{
    try {
        const products = await productsService.getProducts();
        res.json({data:products});
    } catch (error) {
        res.json({error:error.message});
    }
});

router.post("/", async(req,res)=>{
    try {
        const productInfo = req.body;
        const result = await productsService.createProduct(productInfo);
        res.json({status:"success",result});
    } catch (error) {
        res.json({status:"error",message:error.message});
    }
});

router.get("/:pid", async(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsService.getProductById(productId);
        res.json({message:"endpoint para obtener un producto", data:product});
    } catch (error) {
        res.json({status:"error",message:error.message});
    }
});

router.put("/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const newProductInfo = req.body;
      const updatedProduct = await productsManager.updateProduct(productId, newProductInfo);
      res.json({ status: 'success', data: updatedProduct });
    } catch (error) {
      res.json({ status: 'error', message: error.message });
    }
  });

  router.delete("/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const deletedProduct = await productsManager.deleteProduct(productId);
      res.json({ status: 'success', message: "Producto eliminado" });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  });




export {router as productsRouter};