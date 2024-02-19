import passport from "passport";
import localStrategy from "passport-local";
import { createHash, inValidPassword } from "../utils.js";
import { usersModel } from "../dao/mongo/models/usersModel.js";
import {config} from "./config.js";
import GithubStrategy from "passport-github2";
import { usersService } from "../index.js";

export const initializePassport = ()=>{
   
  passport.use("signupLocalStrategy", new localStrategy(
    {
        passReqToCallback:true,
        usernameField:"email",
    },
    async (req,username,password,done)=>{
        const {first_name,last_name,age} = req.body;
        try {
            const user = await usersService.getUserByEmail(username);
            if(user){
                return done(null,false);
            }
            const newUser = {
                first_name,
                last_name,
                age,
                email:username,
                password:createHash(password),
            };
            const userCreated = await usersService.createUser(newUser);
            return done(null,userCreated);
        } catch (error) {
            return done(error);
        }
    }
));

passport.use("loginLocalStrategy", new localStrategy(
    {
        usernameField:"email",
    },
    async (username,password,done)=>{
        try {
            const user = await usersService.getUserByEmail(username);
            if(!user){
                return done(null,false);
            }
            if(!inValidPassword(password,user)){
                return done(null,false);
            }
            user.last_connection = new Date();
            await usersService.updateUser(user._id, user);
            return done(null,user);
        } catch (error) {
            return done(error);
        }
    }
));
      

    passport.use("signupGithubStrategy", new GithubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`
        },
        async(accessToken,refreshToken,profile,done)=>{
            try {
                const user = await usersModel.findOne({email:profile.username});
                if(user){
                    return done(null,user);
                }
                const newUser = {
                    first_name:profile._json.name,
                    email:profile.username,
                    password:createHash(profile.id)
                };
                console.log(newUser);
                const userCreated = await usersModel.create(newUser);
                return done(null,userCreated);
            } catch (error) {
                return done(error)
            }
        }
    ));


    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });

    passport.deserializeUser(async(id,done)=>{
        const user = await usersModel.findById(id);
        done(null,user);
    });
};