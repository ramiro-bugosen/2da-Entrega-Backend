import { usersModel } from "./models/usersModel.js";

export class UsersManagerMongo{
    constructor(){
        this.model=usersModel;
    };

    async createUser(userInfo){
        try {
            const result = await this.model.create(userInfo);
            return result;
        } catch (error) {
            console.log("createUser: ", error.message);
            throw new Error("Se produjo un error creando el usuario");
        }
    };

    async getUserById(userId){
        try {
            const result = await this.model.findById(userId).lean();
            return result;
        } catch (error) {
            console.log("getUserById: ", error.message);
            throw new Error("Se produjo un error obteniendo el usuario");
        }
    };

    async getUserByEmail(userEmail){
        try {
            const result = await this.model.findOne({email:userEmail}).lean();
            return result;
        } catch (error) {
            console.log("getUserByEmail: ", error.message);
            throw new Error("Se produjo un error obteniendo el usuario");
        }
    };

    async updateUser(id, user){
        try {
            const result = await this.model.findByIdAndUpdate(id, user, {new:true});
            return result;
        } catch (error) {
            console.log("updateUser: ", error.message);
            throw new Error("Se produjo un error actualizando el usuario");
        }
    };

    async getAllUsers() {
        try {
            const users = await this.model.find().lean();
            return users;
        } catch (error) {
            throw new Error("Error al obtener todos los usuarios");
        }
    }

    async deleteInactiveUsers(cutoffDate) {
        try {
            const result = await this.model.deleteMany({ last_connection: { $lt: cutoffDate } });
            return { success: true, message: `${result.deletedCount} usuarios inactivos eliminados` };
        } catch (error) {
            throw new Error("Error al eliminar usuarios inactivos");
        }
    }

    async deleteUser(userId) {
        try {
            const result = await this.model.findByIdAndDelete(userId);
            return result;
        } catch (error) {
            console.log("deleteUser: ", error.message);
            throw new Error("Error al eliminar usuario");
        }
    }
}