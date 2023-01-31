import { Request as Req, Response as Res, NextFunction as Next } from "express";
import ApiError from "../errors/apiError";

type Err = {
  msg: string;
  statusCode: number;
  stack?: string;
  isOperational: boolean;
};

const handler = (err: Error, req: Req, res: Res, next: Next) => {
  const result: Err = {
    msg: err.message,
    statusCode: 500,
    isOperational: false,
  };
  if (err instanceof ApiError) {
    result.statusCode = err.statusCode;
    result.isOperational = true;
  }
  if (process.env.ENV != "prod") result.stack = err.stack;
  res.status(result.statusCode).json({ error: result });
  next();
};

export default handler;
