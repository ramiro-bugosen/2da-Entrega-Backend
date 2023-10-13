import { __dirname } from "./utils.js";
import { ProductsManagerMongo } from "./mongo/productsManager.js";
import { CartsManagerMongo } from "./mongo/cartsManager.js";


export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();