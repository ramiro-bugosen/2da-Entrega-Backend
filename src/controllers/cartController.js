import { cartsService } from "../index.js";
import { productsService } from "../index.js";

export class CartController {
    static getcarts = async(req,res)=>{
        try {
            const carts = await cartsService.getCarts();
            res.json({status:"success", data:carts});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    static getCart = async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const cart = await cartsService.getCartById(cartId);
            res.json({status:"success", data: cart});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    static createCart = async(req,res)=>{
        try {
            const cartCreated = await cartsService.createCart();
            res.json({status:"success",data: cartCreated});
        } catch (error) {
            res.json({status:"error",error:error.message});
        }
    };

    static addProductToCart = async(req,res)=>{
        try {
            const {cid:cartId,pid:productId} = req.params;
            const cart = await cartsService.getCartById(cartId);
            const product = await productsService.getProduct(productId);
            const result = await cartsService.addProduct(cartId,productId);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    static deleteProductCart = async(req,res)=>{
        try {
            const {cid:cartId,pid:productId} = req.params;
            const cart = await cartsService.getCartById(cartId);
            const result = await cartsService.deleteProduct(cartId, productId);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    static updateProductCart = async(req,res)=>{
        try {
            const {cid:cartId,pid:productId} = req.params;
            const {newQuantity} = req.body;
            const cart = await cartsService.getCartById(cartId);
            const result = await cartsService.updateProductCart(cartId,productId,newQuantity);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    };

    static addProductToCart2 = async(req,res) => {
        try {
            const { pid: productId } = req.params;
            const cartId = "652e2622fbd4668e6f853049";
            const cart = await cartsService.getCartById(cartId);
            const result = await cartsService.addProduct(cartId, productId);
            res.json({ status: "success", result });
        } catch (error) {
            res.json({ error: error.message });
        }
    }

    static deleteCart = async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const result = await cartsService.deleteCart(cartId);
            if (result) {
                res.json({ status: "success", message: "Carrito eliminado" });
            } else {
                res.json({ status: "error", message: "Carrito no encontrado" });
            }
        } catch (error) {
            res.json({ status: "error", error: error.message });
        }
    }
}