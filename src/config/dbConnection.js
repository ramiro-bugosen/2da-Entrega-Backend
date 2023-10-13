import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb+srv://RamiroBugosen:gBI1RKFzBHLU19DF@coderhousecluster.sl1alid.mongodb.net/ecommerce?retryWrites=true&w=majority")
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(`Error al conectar la base de datos ${error.message}`);
    }
}