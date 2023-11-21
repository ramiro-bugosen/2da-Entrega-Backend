import { Router } from "express";
import { usersModel } from "../dao/mongo/models/usersModel.js";
import passport from "passport";
import { config } from "../config/config.js";
import { SessionsController } from "../controllers/sessionsController.js";

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

router.get("/logout", SessionsController.logout);

export {router as sessionsRouter};