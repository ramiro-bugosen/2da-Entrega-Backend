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
 
const port = 8080;
const app = express();

app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.listen(port,()=>console.log(`Server listening on port ${port}`));

app.use(session({
    store:MongoStore.create({
        ttl:60,
        mongoUrl:"mongodb+srv://RamiroBugosen:gBI1RKFzBHLU19DF@coderhousecluster.sl1alid.mongodb.net/ecommerce?retryWrites=true&w=majority"
    }),
    secret:"secretCoder",
    resave:true,
    saveUninitialized:true
}));

connectDB();

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

