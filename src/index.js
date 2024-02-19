import { __dirname } from "./utils.js";
import { ProductsManagerMongo } from "./dao/mongo/productsManager.js";
import { CartsManagerMongo } from "./dao/mongo/cartsManager.js";
import { UsersManagerMongo } from "./dao/mongo/usersManager.js";

export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();
export const usersService = new UsersManagerMongo