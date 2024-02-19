import { cartsService } from "../index.js";
import { productsService } from "../index.js";
import {v4 as uuidv4} from 'uuid';

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
            const product = await productsService.getProducts(productId);
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
            const cartId = "65cb1fb62bf9e9c4d56d47f2";
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

    static purchaseCart = async(req,res) => {
        try {
            const {cid: cartId} = req.params;
            const cart = await cartsService.getCartById(cartId);
            if(cart.products.length){
                const ticketProducts=[];
                const rejectedProducts=[];
                for(let i=0;i<cart.products.length;i++){
                    const cartProduct =cart.products[i];
                    const productInfo = cartProduct.productId;
                    if(cartProduct.quantity <= productInfo.stock){
                        ticketProducts.push(cartProduct);
                    } else {
                        rejectedProducts.push(cartProduct);
                    }
                };
                console.log("ticketProducts",ticketProducts);
                console.log("rejectedProducts",rejectedProducts);
                const newTicket = {
                    code:uuidv4(),
                    purchase_datetime: new Date(),
                    amount:100,
                    purchaser:req.user.email
                };
                console.log("newTicket",newTicket);
                //crear el ticket en base de datos.
                //actualizar el carrito del usuario con los productos rechazados
                res.json({status:"success", message:"Compra realizada, algunos productos no se pudieron comprar por falta de stock", rejectedProducts});
            } else {
                res.json({status:"error", message:"El carrito esta vacio"});
            }
        } catch (error) {
            res.json({error:error.message})
        }
    }
}