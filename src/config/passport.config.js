import passport from "passport";
import localStrategy from "passport-local";
import { createHash, inValidPassword } from "../utils.js";
import { usersModel } from "../dao/mongo/models/usersModel.js";
import {config} from "./config.js";
import GithubStrategy from "passport-github2";


export const initializePassport = ()=>{
   
    passport.use('signupLocalStrategy', new localStrategy(
        {
          passReqToCallback: true,
          usernameField: 'email',
        },
        async (req, username, password, done) => {
          const { first_name, email } = req.body;
          if (!first_name || !email || !password) {
            return done(null, false, { message: 'Todos los campos son obligatorios' });
          }
          try {
            const existingUser = await usersModel.findOne({ email });
            if (existingUser) {
              return done(null, false, { message: 'Este correo electrónico ya está registrado' });
            }
            let role = 'user';
            if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
              role = 'admin';
            }
            const newUser = {
              first_name,
              email,
              password: createHash(password),
              role,
            };
            const userCreated = await usersModel.create(newUser);
            return done(null, userCreated);
          } catch (error) {
            return done(error);
          }
        }
      ));
      

      passport.use("loginLocalStrategy", new localStrategy(
        {
          usernameField: "email",
        },
        async (username, password, done) => {
          try {
            const user = await usersModel.findOne({ email: username });
            if (!user) {
              return done(null, false, { message: "Usuario no encontrado" });
            }
            if (!inValidPassword(password, user)) {
              return done(null, false, { message: "Contraseña incorrecta" });
            }
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        }
      ));
      

    passport.use("signupGithubStrategy", new GithubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackURL: `https://coderhouse-xf5n.onrender.com/api/sessions${config.github.callbackUrl}`
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