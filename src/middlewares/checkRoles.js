import { logger } from "../helpers/logger.js";

export const checkRole = (roles)=>{
    return (req,res,next)=>{
        logger.info(req.user);
        if(!roles.includes(req.user.role)){
            res.json({status:"error", message:"No tienes permisos suficientes"});
        } else {
            next();
        }
    }
};

export const isAuth = (req,res,next)=>{
    if(!req.user){
        return res.json({status:"error", message:"Debes estar autenticado"});
    }
    next();
};