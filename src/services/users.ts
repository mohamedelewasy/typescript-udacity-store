import { Request as Req, Response as Res, NextFunction as Next } from "express";
import AsyncHandler from "express-async-handler";
import Users from "../models/users";
import { comparePassword, cryptPassword } from "../utilities/crypt";
import ApiError from "../errors/apiError";
import { tokenizer } from "../utilities/token";

// @desc:   get list of users
// @route:  [GET] /users/
// @access: token-required
export const getUsers = AsyncHandler(async (req: Req, res: Res) => {
  const users = await Users.index();
  res.status(200).json({ users });
});

// @desc:   get single user by user id
// @route:  [GET] /users/:userId
// @access: token-required
export const getUser = AsyncHandler(async (req: Req, res: Res, next: Next) => {
  const { userId } = req.params;
  const user = await Users.show(+userId);
  if (!user)
    return next(new ApiError(`can't find user with id:${userId}`, 400));
  res.status(200).json({
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
    },
  });
});

// @desc:   register
// @route:  [POST] /users/register
export const register = AsyncHandler(async (req: Req, res: Res) => {
  const { first_name, last_name, username, password } = req.body;
  const hashed = cryptPassword(password);
  const user = await Users.create({
    first_name,
    last_name,
    username,
    password: hashed,
  });
  const token = tokenizer({ id: user.id });
  res.status(201).json({ token });
});

// @desc:   login
// @route:  [POST] /users/login
export const login = AsyncHandler(async (req: Req, res: Res, next: Next) => {
  const { username, password } = req.body;
  const user = await Users.show_username(username);
  if (!user) return next(new ApiError("incorrect username or password", 401));
  if (!comparePassword(password, user.password))
    return next(new ApiError("incorrect username or password", 401));
  const token = tokenizer({ id: user.id });
  res.status(200).json({ token });
});
