import express from "express";
import { getUser, getUsers, login, register } from "../services/users";
import protect from "../middlewares/auth";
import { getUserVal, loginVal, registerVal } from "../validators/users";

const router = express.Router();
router.route("/register").post(registerVal, register);
router.route("/login").post(loginVal, login);
router.route("/").get(protect, getUsers);
router.route("/:userId").get(protect, getUserVal, getUser);

export default router;
