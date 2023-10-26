import { Router } from "express";
import { usersModel } from "../models/usersModel.js";
import passport from "passport";
import { config } from "../config/config.js";

const router = Router();

router.post("/signup", passport.authenticate("signupLocalStrategy", {
  failureRedirect: "/signup"
}), async (req, res) => {
  res.redirect("/login");
});


router.post("/login", passport.authenticate("loginLocalStrategy",{
  failureRedirect:"/login"
}) , async(req,res)=>{
  res.redirect("/");
});
  

  router.get("/signup-github", passport.authenticate("signupGithubStrategy"));

  router.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy",{
    failureRedirect:"/signup"
  }), (req,res)=>{
    res.redirect("/profile");
  });  


  /* router.get("/fail-signup",(req,res)=>{
    res.render("signupView",{error:"No se pudo registrar el usuario"});
});


  router.get("/fail-login",(req,res)=>{
    res.render("loginView",{error:"No se pudo iniciar sesion para este usuario"});
}); */


router.get("/logout", async(req,res)=>{
    try {
        req.session.destroy(err=>{
            if(err) return res.render("profileView",{error:"No se pudo cerrar la sesion"});
            res.redirect("/");
        })
    } catch (error) {
        res.render("signupView",{error:"No se pudo registrar el usuario"});
    }
});

export {router as sessionsRouter};