import { param, body } from "express-validator";
import validator from "../middlewares/validator";

export const getProductVal = [
  param("productId")
    .notEmpty()
    .withMessage("productId param is required")
    .isInt()
    .withMessage("invalid productId format"),
  validator,
];

export const createProductVal = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("name must be between 3 and 32 characters"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat({ min: 0.01 })
    .withMessage("invalid price format"),
  body("category")
    .notEmpty()
    .withMessage("category is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("category must be between 3 and 32 characters"),
  validator,
];
