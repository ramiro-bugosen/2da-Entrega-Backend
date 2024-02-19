import nodemailer from "nodemailer";
import { config } from "./config.js";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    port:587,
    auth:{
        user:config.gmail.account,
        pass:config.gmail.password
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
})
export const emailTemplate = (user)=> 
`
    <div>
        <h1>Bienvenido ${user}!!</h1>
        <p>Mensaje de testeo</p>
        <a href="http://localhost:8080/login">Ahora inicia sesión</a>
    </div>
`;

export const accountDeletedEmail = (userName) => 
` 
<h1>

    Hola ${userName},

    Lamentamos informarte que tu cuenta ha sido eliminada debido a nuestras politicas de inactividad.
</h1>
`;