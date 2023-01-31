import { body } from "express-validator";
import validator from "../middlewares/validator";

export const addProductVal = [
  body("product_id")
    .notEmpty()
    .withMessage("product_id is required")
    .isInt()
    .withMessage("product_id must be a number"),
  body("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isInt()
    .withMessage("quantity must be a number"),
  validator,
];
