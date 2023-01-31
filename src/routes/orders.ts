import express from "express";
import {
  addProduct,
  getActiveOrder,
  getCartProducts,
  getCompleteOrders,
} from "../services/orders";
import protect from "../middlewares/auth";
import { addProductVal } from "../validators/orders";

const router = express.Router();
router
  .route("/")
  .all(protect)
  .post(addProductVal, addProduct)
  .get(getCartProducts);
router.route("/active").get(protect, getActiveOrder);
router.route("/complete").get(protect, getCompleteOrders);

export default router;
