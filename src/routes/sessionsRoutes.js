import { Router } from "express";
import { usersModel } from "../models/usersModel.js";

const router = Router();

router.post("/signup", async (req, res) => {
    try {
      const signupForm = req.body;
      const existUser = await usersModel.findOne({ email: signupForm.email });
      if (existUser) {
        return res.render("signupView", { error: "Este usuario ya está registrado" });
      }
      let role = "user";
      if (signupForm.email === "adminCoder@coder.com" && signupForm.password === "adminCod3r123") {
        role = "admin";
      }
      const result = await usersModel.create({
        email: signupForm.email,
        password: signupForm.password,
        role: role,
      });
      res.render("loginView", { message: "Usuario registrado correctamente" });
    } catch (error) {
      res.render("signupView", { error: "No se pudo registrar el usuario" });
    }
  });
  


  router.post("/login", async (req, res) => {
    try {
      const loginForm = req.body;
      const user = await usersModel.findOne({ email: loginForm.email });
      if (!user) {
        return res.render("loginView", { error: "Este usuario no está registrado" });
      }
      if (user.password !== loginForm.password) {
        return res.render("loginView", { error: "Credenciales inválidas" });
      }
      req.session.email = user.email;
      req.session.role = user.role;
      res.redirect("/");
    } catch (error) {
      res.render("loginView", { error: "No se pudo iniciar sesión para este usuario" });
    }
  });
  
  

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