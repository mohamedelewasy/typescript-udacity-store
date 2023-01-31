import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
export const cryptPassword = (password: string) => {
  return bcrypt.hashSync(
    password + process.env.PAPER,
    +(<string>process.env.SALT)
  );
};

export const comparePassword = (password: string, encrypted: string) => {
  return bcrypt.compareSync(password + process.env.PAPER, encrypted);
};
