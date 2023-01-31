import { Request as Req, Response as Res, NextFunction as Next } from "express";
import AsyncHandler from "express-async-handler";
import { verifier } from "../utilities/token";
import ApiError from "../errors/apiError";

const protect = AsyncHandler(async (req: Req, res: Res, next: Next) => {
  const token = req.headers.authorization;
  if (!token) return next(new ApiError("unauthenticated", 401));
  try {
    const user = <{ id: number }>verifier(<string>token);
    req.body.user = user.id;
  } catch (error) {
    return next(new ApiError("expired token", 401));
  }
  next();
});

export default protect;
