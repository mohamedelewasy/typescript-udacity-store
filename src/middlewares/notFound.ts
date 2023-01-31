import { Request as Req, Response as Res, NextFunction as Next } from "express";
import ApiError from "../errors/apiError";

const notFound = (req: Req, res: Res, next: Next) => {
  return next(new ApiError("page not found", 404));
};

export default notFound;
