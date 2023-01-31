import { validationResult } from "express-validator";
import { Request as Req, Response as Res, NextFunction as Next } from "express";

const validator = (req: Req, res: Res, next: Next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

export default validator;
