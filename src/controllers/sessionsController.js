import { config } from "../config/config.js";
import { transporter } from "../config/gmail.js";
import { emailTemplate } from "../config/gmail.js";
import { twilioClient } from "../config/twilio.js";

export class SessionsController {
    
    static logout = (req,res) => {
        try {
            req.session.destroy(err=>{
                if(err) return res.render("profileView",{error:"No se pudo cerrar la sesion"});
                res.redirect("/");
            })
        } catch (error) {
            res.render("signupView",{error:"No se pudo registrar el usuario"});
        }
    }

    static sendMail = async (req,res) => {
        try {
            const result = await transporter.sendMail({
                from:config.gmail.account,
                to:"(Mail a enviar)",
                subject:"Tu registro ha sido exitoso",
                html: emailTemplate("Proyecto"),
            });
            console.log(result);
            res.json({status:"success", message:"correo enviado"});
        } catch (error) {
            console.log(error);
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
            console.log(result);
            res.json({status:"success", message:"Envio de mensaje exitoso"});
        } catch (error) {
            console.log(error);
            res.json({status:"error", message:"Hubo un error al enviar el mensaje de texto"})
        }
    }
}