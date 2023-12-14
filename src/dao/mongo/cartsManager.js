import { cartsModel } from "../mongo/models/cartsModel.js";
import { CustomError } from "../../errors/errorManager.js";
import { addToCartError } from "../../errors/productsError.js";
import { EError } from "../../errors/EError.js";
import { logger } from "../../helpers/logger.js";


export class CartsManagerMongo{
    constructor(){
        this.model=cartsModel;
    };

    async getCarts() {
        try {
            const result = await this.model.find().populate("products.productId").lean();
            return result;
        } catch (error) {
            logger.error(error.message);
            throw new Error("No se pudieron obtener los carritos");
        }
    }

    async getCartById(cartId){
        try {
            const result = await this.model.findById(cartId).populate("products.productId");
            if(!result){
                throw new Error(`El carrito con el ID: '${cartId}' no existe.`);
            };
            return result;
        } catch (error) {
            logger.error(error.message);
            throw new Error("No se pudo obtener el carrito");
        }
    };

    async createCart(){
        try {
            const newCart = {};
            const result = await this.model.create(newCart);
            return result;
        } catch (error) {
            logger.error(error.message);
            throw new Error("No se pudo crear el carrito");
        }
    };

    async addProduct(cartId, productId){
        try {
        const carts = await this.model.findById(cartId);
        const productExist=carts.products.findIndex(elm=>elm.productId._id == productId)
        if(productExist!=-1){
        carts.products[productExist].quantity++;
        }else{
        carts.products.push({productId, quantity:1});
        }
        const result = await this.model.findByIdAndUpdate(cartId,carts, {new:true});
        return result;
        } catch (error) {
            CustomError.createError({
                name:"Add product to cart error",
                cause: addToCartError(req.body),
                message: "No se pudo agregar el producto al carrito",
                errorCode: EError.ADDTOCART_ERROR});
        }
        };

    async deleteProduct(cartId, productId){
        try {
            const cart = await this.getCartById(cartId);
            const productExist = cart.products.find(elm=>elm.productId._id == productId);
            if(productExist){
                const newProducts = cart.products.filter(elm => elm.productId._id != productId);
                cart.products = newProducts;
                const result = await this.model.findByIdAndUpdate(cartId,cart, {new:true});
                return result;
            } else {
                throw new Error("El producto no se puede eliminar porque no ha sido agregado");
            }
        } catch (error) {
            logger.error("deleteProduct",error.message);
            throw new Error("No se pudo eliminar el producto del carrito");
        }
    };

    async updateProductCart(cartId, productId, newQuantity){
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(elm=>elm.productId._id == productId);
            if(productIndex>=0){
                cart.products[productIndex].quantity = newQuantity;
                const result = await this.model.findByIdAndUpdate(cartId,cart, {new:true});
                return result;
            } else {
                throw new Error("El producto no se puede actualizar porque no ha sido agregado");
            }
        } catch (error) {
            logger.error("updateProductCart",error.message);
            throw new Error("No se pudo actualizar el producto al carrito");
        }
    };

    async deleteCart(cartId) {
        try {
            const result = await this.model.deleteOne({ _id: cartId });
            if (result.deletedCount === 1) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            logger.error("Error:", error.message);
            throw new Error("Se produjo un error al eliminar el carrito");
        }
    }
}