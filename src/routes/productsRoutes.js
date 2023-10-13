import { Router } from "express";
import { productsService } from "../index.js";

const router = Router();

router.get("/",(req,res)=>{
    res.json({message:"listado de productos"});
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

export {router as productsRouter};