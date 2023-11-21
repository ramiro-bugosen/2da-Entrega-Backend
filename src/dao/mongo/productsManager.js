import { productsModel } from "./models/productsModel.js";

export class ProductsManagerMongo{
    constructor(){
        this.model=productsModel;
    };

    async createProduct(productInfo){
        try {
            const result = await this.model.create(productInfo);
            return result;
        } catch (error) {
            console.log("createProduct: ", error.message);
            throw new Error("Se produjo un error al crear el producto");
        }
    };

    async getProducts(){
        try {
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            console.log("getProducts: ", error.message);
            throw new Error("Se produjo un error al crear el producto");
        }
    };

    async getProductsPaginate(query, options){
        try {
            const result = await this.model.paginate(query, options);
            return result;
        } catch (error) {
            console.log("getProducts: ", error.message);
            throw new Error("Se produjo un error al crear el producto");
        }
    };

    async getProductById(productId) {
        try {
          const result = await this.model.findById(productId).lean();
          return result;
        } catch (error) {
          console.log("getProductById: ", error.message);
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
          console.error('Error al actualizar el producto:', error);
          throw new Error('No se pudo actualizar el producto');
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
          console.error('Error al eliminar el producto:', error);
          throw new Error('No se pudo eliminar el producto');
        }
      }
}