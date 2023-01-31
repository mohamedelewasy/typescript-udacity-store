import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
export const tokenizer = (payload: object) => {
  return jwt.sign(payload, <string>process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const verifier = (token: string) => {
  const t = token.split(" ")[1];
  return jwt.verify(t, <string>process.env.JWT_SECRET);
};
