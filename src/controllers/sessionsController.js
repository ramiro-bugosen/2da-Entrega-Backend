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
}