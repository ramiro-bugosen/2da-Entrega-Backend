import { __dirname } from "./utils";
import path from "path";
import { ProductsManagerMongo } from "./mongo/productsManager";
import { CartsManagerMongo } from "./mongo/cartsManager";


export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();