import { productsService } from "../index.js";

export class ProductsController{
    static getProducts = async(req,res)=>{
        try {
            const products = await productsService.getProducts();
            res.json({message:"endpoint para obtener los productos", data:products});
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    };

    static createProduct = async(req,res)=>{
        try {
            const productInfo = req.body;
            const result = await productsService.createProduct(productInfo);
            res.json({status:"success",result});
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    };

    static getProduct = async(req,res)=>{
        try {
            const productId = req.params.pid;
            const product = await productsService.getProduct(productId);
            res.json({message:"endpoint para obtener un producto", data:product});
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    };

    static updateProduct = async(req,res)=>{
        try {
            const productId = req.params.productId;
            const newProductInfo = req.body;
            const updatedProduct = await productsService.updateProduct(productId, newProductInfo);
            res.json({ status: 'success', data: updatedProduct });
          } catch (error) {
            res.json({ status: 'error', message: error.message });
          }
    }

    static deleteProduct = async(req,res)=>{
        try {
            const productId = req.params.productId;
            const deletedProduct = await productsService.deleteProduct(productId);
            res.json({ status: 'success', message: "Producto eliminado" });
          } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
          }
    }
}