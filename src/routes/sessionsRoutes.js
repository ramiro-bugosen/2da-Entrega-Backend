import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";
import { SessionsController } from "../controllers/sessionsController.js";

const router = Router();

router.post("/signup", passport.authenticate("signupLocalStrategy", {
  failureRedirect:"/api/sessions/fail-signup"
}), async (req, res) => {
  res.redirect("/login");
});


router.post("/login", passport.authenticate("loginLocalStrategy",{
  failureRedirect:"/api/sessions/fail-login"
}) , async(req,res)=>{
  res.redirect("/");
});
  

router.get("/signup-github", passport.authenticate("signupGithubStrategy"));

router.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy",{
    failureRedirect:"/signup"
  }), (req,res)=>{
    res.redirect("/profile");
  });  

router.get("/fail-signup", SessionsController.failSignup);

router.get("/fail-login", SessionsController.failLogin);

router.get("/logout", SessionsController.logout);

router.post("/send-mail", SessionsController.sendMail);

router.post("/send-sms", SessionsController.sendSMS);

router.post("/forgot-password", SessionsController.forgotPassword);

router.post("/reset-password", SessionsController.resetPassword);

export {router as sessionsRouter};