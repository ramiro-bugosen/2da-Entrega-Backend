import { config } from "../config/config.js";
import { transporter } from "../config/gmail.js";
import { emailTemplate } from "../config/gmail.js";
import { twilioClient } from "../config/twilio.js";
import { logger } from "../helpers/logger.js";
import { usersService } from "../index.js";
import { createHash, inValidPassword } from "../utils.js";
import { generateEmailToken, sendChangePasswordEmail, verifyEmailToken } from "../helpers/email.js";
export class SessionsController {
    
    static logout = async(req,res)=>{
        console.log(req.user);
        const user = {...req.user};
        user.last_connection = new Date();
        await usersService.updateUser(user._id, user);
        req.session.destroy((error)=>{
            res.send("sesion finalizada");
        });
    };

    static sendMail = async (req,res) => {
        try {
            const result = await transporter.sendMail({
                from:config.gmail.account,
                to:"(Mail a enviar)",
                subject:"Tu registro ha sido exitoso",
                html: emailTemplate("Proyecto"),
            });
            logger.info(result);
            res.json({status:"success", message:"correo enviado"});
        } catch (error) {
            logger.error(error);
            res.json({status:"error", message:"Hubo un error al enviar el correo"})
        }
    }

    static sendSMS = async (req,res) => {
        try {
            const result = await twilioClient.messages.create({
                from:config.twilio.phone,
                to: "Numero a enviar",
                body:"Su pedido fue realizado correctamente"
            });
            logger.info(result);
            res.json({status:"success", message:"Envio de mensaje exitoso"});
        } catch (error) {
            logger.error(error);
            res.json({status:"error", message:"Hubo un error al enviar el mensaje de texto"})
        }
    }

    static forgotPassword = async(req,res)=>{
        const {email} = req.body;
        console.log(email);
        try {
            const user  = await usersService.getUserByEmail(email);
            const emailToken = generateEmailToken(email, 10 * 60)
            await sendChangePasswordEmail(req,email,emailToken);
            res.send(`Se envio un enlace a su correo, <a href="/">Volver a la pagina de login</a>`);
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static failLogin = (req,res)=>{
        res.render("loginView",{error:"No se pudo iniciar sesion para el usuario"});
    };

    static failSignup = (req,res)=>{
        res.render("signupView",{error:"No se pudo registrar al usuario"});
    };

    static resetPassword = async(req,res)=>{
        try {
            const token = req.query.token;
            const {newPassword} = req.body;
            const validEmail = verifyEmailToken(token);
            if(!validEmail){
                return res.send(`El enlace ya no es valido, genera un nuevo <a href="/forgot-password">enlace</a>`);
            }
            const user = await usersService.getUserByEmail(validEmail);
            if(!user){
                return res.send(`Esta operacion no es valida`);
            }
            if(inValidPassword(newPassword,user)){
                return res.render("resetPassView", {error:"contraseña invalida", token});
            }
            const userData = {
                ...user,
                password: createHash(newPassword)
            };
            await usersService.updateUser(user._id, userData);
            res.render("login",{message:"Contraseña actualizada"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

}