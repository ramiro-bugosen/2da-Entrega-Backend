import { __dirname } from "./utils.js";
import { ProductsManagerMongo } from "./dao/mongo/productsManager.js";
import { CartsManagerMongo } from "./dao/mongo/cartsManager.js";


export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();