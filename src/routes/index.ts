import express from "express";
import users from "./users";
import products from "./products";
import orders from "./orders";
import notFound from "../middlewares/notFound";
import errHandler from "../middlewares/errHnadler";

const router = express.Router();

router.use("/users", users);
router.use("/products", products);
router.use("/orders", orders);
router.use(notFound);
router.use(errHandler);

export default router;
