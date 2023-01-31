import express from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  mostPopular,
} from "../services/products";
import protect from "../middlewares/auth";
import { createProductVal, getProductVal } from "../validators/products";

const router = express.Router();
router
  .route("/")
  .get(getProducts)
  .post(protect, createProductVal, createProduct);
router.route("/mostpopular").get(mostPopular);
router.route("/:productId").get(getProductVal, getProduct);

export default router;
