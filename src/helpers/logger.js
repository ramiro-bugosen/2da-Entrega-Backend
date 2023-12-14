import winston from "winston";
import {__dirname} from "../utils.js";
import path from "path";
import { config } from "../config/config.js";

const currentEnv = config.server.env;

const customLevels = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    }
}

const developmentLogger = winston.createLogger({
    levels: customLevels.levels,
    transports:[
        new winston.transports.Console({level:"debug"}),
    ]
});

const productionLogger = winston.createLogger({
    levels: customLevels.levels,
    transports:[
        new winston.transports.Console({level:"info"}),
        new winston.transports.File({filename:path.join(__dirname,"/logs/errors.log"), level:"error"})
    ]
});

let logger;
if(currentEnv === "development"){
    logger = developmentLogger;
} else {
    logger = productionLogger;
}

export {logger};