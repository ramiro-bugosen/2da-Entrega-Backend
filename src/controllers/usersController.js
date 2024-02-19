import { usersService } from "../index.js";

export class UsersController{
    static modifyRole = async(req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await usersService.getUserById(userId);
            console.log(user);
            //validar que el usuario haya subido todos los documentos
            if(user.status !== "completo"){
                return res.json({status:"error", message:"El usuario no ha subido todos los documentos"});
            }
            if(user.role === "premium"){
                user.role = "user";
            } else if(user.role === "user"){
                user.role = "premium";
            } else {
                res.json({status:"error", message:"No se puede cambiar el role del usuario"});
            }
            await UsersService.updateUser(user._id, user);
            res.json({status:"success", message:"rol de usuario modificado"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static uploadUserDocuments = async(req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await usersService.getUserById(userId);
            // console.log("documentos", req.files);
            const identificacion = req.files['identificacion']?.[0] || null;
            const domicilio = req.files['domicilio']?.[0] || null;
            const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
            const docs = [];
            if(identificacion){
                docs.push({name:"identificacion", reference: identificacion.filename});
            }
            if(domicilio){
                docs.push({name:"domicilio", reference: domicilio.filename});
            }
            if(estadoDeCuenta){
                docs.push({name:"estadoDeCuenta", reference: estadoDeCuenta.filename});
            }
            user.documents = docs;
            if(docs.length<3){
                user.status = "incompleto";
            } else {
                user.status = "completo";
            }
            await UsersService.updateUser(user._id, user);
            res.json({status:"success", message:"documentos actualizados"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static getAllUsers = async (req, res) => {
        try {
            const users = await usersService.getAllUsers();
            const usersData = users.map(user => ({
                first_name: user.first_name,
                email: user.email,
                role: user.role
            }));
            res.json({ status: "success", data: usersData });
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    }

    static async deleteInactiveUsers(req, res) { // No pude enviar el email con el mensaje de eliminacion de cuenta, ya que me crasheaba el server.
        try {
            const currentDate = new Date();
            const inactivePeriod = 2;
            const cutoffDate = new Date(currentDate.getTime() - inactivePeriod * 24 * 60 * 60 * 1000);
            const result = await usersService.deleteInactiveUsers(cutoffDate);
            res.json({ status: "success", message: result.message });
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const userId = req.params.userId;
            await usersService.deleteUser(userId);
            res.redirect("/admin");
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            res.send("Error al eliminar el usuario: " + error.message);
        }
    }

    static async showAdminUsersPage(req, res) {
        try {
            const users = await usersService.getAllUsers();
            res.render("layouts/admin", { users });
        } catch (error) {
            res.send("Error al cargar la página de administración de usuarios");
        }
    }
}