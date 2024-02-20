import { Router } from "express";
import { cartsService, productsService } from "../index.js";
import { generateProduct } from "../mocks/mock.js";
import { logger } from "../helpers/logger.js";
import { UsersController } from "../controllers/usersController.js";
import { checkRole } from "../middlewares/checkRoles.js";

const router = Router();

router.get("/", async (req, res) => {
    if (req.user) {
      const userEmail = req.user.email;
      const userRole = req.user.role;
      const { limit = 5, page = 1 } = req.query;
      const query = {
        // category: desktop
        // stock: 13
      };
      const options = {
        limit,
        page,
        sort: { price: 1 },
        lean: true
      };
  
      const result = await productsService.getProductsPaginate(query, options);
  
      const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  
      const dataProducts = {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
          ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}`
          : null,
        nextLink: result.hasNextPage
          ? baseUrl.includes("page")
            ? baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`)
            : baseUrl.concat(`?page=${result.nextPage}`)
          : null,
        userEmail: userEmail,
        userRole: userRole,
      };
  
      res.render("home", dataProducts);
    } else {
      res.redirect("/login");
    }
  });

router.get("/carts/:id", async (req, res) => {
    try {
      if (!req.user?.email) {
        return res.redirect("/login");
      }
  
      const cartId = req.params.id;
      const cart = await cartsService.getCartById(cartId);
      if (!cart) {
        return res.json({ message: 'Carrito no encontrado' });
      }
      const userEmail = req.session.email;
      res.render("carts", { cart, userEmail });
    } catch (error) {
      res.json({ error: error.message });
    }
  });

router.get("/signup",(req,res)=>{
    res.render("signupView");
});

router.get("/login",(req,res)=>{
    res.render("loginView");
});

router.get("/profile",(req,res)=>{
    if(req.user?.email){
        const userEmail = req.user.email;
        res.render("profileView",{userEmail});
    } else {
        res.redirect("/login");
    }
});

router.get("/mockingproducts", (req,res)=>{
    try {
      const products = []
      for (let i=0; i < 100; i++) {
        const newProduct = generateProduct(); 
        products.push(newProduct);
    }
      res.json({status:"success", data:products});
    } catch (error) {
      res.json({ error: "Ha ocurrido un error" });
    }
});

router.get("/admin", checkRole(["admin"]), UsersController.showAdminUsersPage);

router.get("/forgot-password", (req,res)=>{
  res.render("forgotPassView");
});

router.get("/reset-password", (req,res)=>{
  const token = req.query.token;
  res.render("resetPassView",{token});
});

router.get("/loggertest", async (req,res)=>{
    logger.fatal("log fatal");
    logger.error("log error");
    logger.warning("log warning");
    logger.info("log info");
    logger.http("log http");
    logger.debug("log debug");
    res.send("test logger");
});
export {router as viewsRouter}