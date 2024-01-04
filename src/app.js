import express from "express";
import { connectDB } from "./config/dbConnection.js";
import { __dirname } from "./utils.js";
import { cartsRouter } from "./routes/cartsRoutes.js";
import { productsRouter } from "./routes/productsRoutes.js";
import { viewsRouter } from "./routes/viewsRoutes.js";
import path from "path";
import {engine} from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo"
import { sessionsRouter } from "./routes/sessionsRoutes.js";
import { config } from "./config/config.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import { contactsRouter } from "./routes/contactsRoutes.js";
import { logger } from "./helpers/logger.js";
import { swaggerSpecs } from './config/swaggerConfig.js';
import swaggerUI from "swagger-ui-express";

const port = 8080;
const app = express();

app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.listen(port,()=>logger.info(`Server listening on port ${port}`));

connectDB();

app.use(session({
    store: MongoStore.create({ 
        mongoUrl: config.mongo.url,
        ttl: 60
    }),
    secret: config.server.secretSession,
    resave: true,
    saveUninitialized: true
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('.hbs', engine({extname: '.hbs',
defaultLayout: 'main',
runtimeOptions: {
    allowProtoPropertiesByDefault: true
}}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

app.use(viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/docs", swaggerUI.serve , swaggerUI.setup(swaggerSpecs));

