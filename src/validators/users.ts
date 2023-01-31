import { param, body } from "express-validator";
import validator from "../middlewares/validator";

export const getUserVal = [
  param("userId")
    .notEmpty()
    .withMessage("productId param is required")
    .isInt()
    .withMessage("invalid productId format"),
  validator,
];

export const loginVal = [
  body("username").notEmpty().withMessage("username is required"),
  body("password").notEmpty().withMessage("password is required"),
  validator,
];

export const registerVal = [
  body("first_name").notEmpty().withMessage("firs_name is required"),
  body("last_name").notEmpty().withMessage("last_name is required"),
  body("username").notEmpty().withMessage("username is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .custom((val, { req }) => {
      if (val === req.body.passwordConfirm) return Promise.resolve();
      return Promise.reject(
        new Error("passwordConfirm not as the same as password")
      );
    }),
  validator,
];