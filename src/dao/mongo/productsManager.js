import { productsModel } from "../mongo/models/productsModel.js";
import { CustomError } from "../../errors/errorManager.js";
import { productCreateError, updateProductError } from "../../errors/productsError.js";
import { EError } from "../../errors/EError.js";
import { logger } from "../../helpers/logger.js";

export class ProductsManagerMongo{
    constructor(){
        this.model=productsModel;
    };

    async createProduct(productInfo){
        try {
            const result = await this.model.create(productInfo);
            return result;
        } catch (error) {
          CustomError.createError({
            name:"Create product error",
            cause: productCreateError(req.body),
            message:"Datos invalidos para crear el producto",
            errorCode: EError.INVALID_BODY_JSON
        });
        }
    };

    async getProducts(){
        try {
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            logger.error("getProducts: ", error.message);
            throw new Error("Se produjo un error al crear el producto");
        }
    };

    async getProductsPaginate(query, options){
        try {
            const result = await this.model.paginate(query, options);
            return result;
        } catch (error) {
            logger.error("getProducts: ", error.message);
            throw new Error("Se produjo un error al crear el producto");
        }
    };

    async getProductById(productId) {
        try {
          const result = await this.model.findById(productId).lean();
          return result;
        } catch (error) {
          logger.error("getProductById: ", error.message);
          throw new Error("Se produjo un error al obtener el producto por ID");
        }
      }

      async updateProduct(productId, newProductInfo) {
        try {
          const result = await this.model.findByIdAndUpdate(productId, newProductInfo, { new: true });
          if (!result) {
            throw new Error('Producto no encontrado');
          }
          return result;
        } catch (error) {
          CustomError.createError({
            name:"Update product error",
            cause: updateProductError(req.body),
            message:"Datos invalidos para actualizar el producto",
            errorCode: EError.UPDATE_PRODUCT_ERROR
        });
        }
      }

    async deleteProduct(productId) {
        try {
          const result = await this.model.findByIdAndRemove(productId);
          if (!result) {
            throw new Error('Producto no encontrado');
          }
          return result;
        } catch (error) {
          logger.error('Error al eliminar el producto:', error);
          throw new Error('No se pudo eliminar el producto');
        }
      }
}