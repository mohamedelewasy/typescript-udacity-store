import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { PG_HOST, PG_DB, PG_DB_TEST, PG_USER, PG_PASSWORD } = process.env;

const client = new Pool({
  host: PG_HOST,
  database: process.env.ENV?.trim() == "test" ? PG_DB_TEST : PG_DB,
  user: PG_USER,
  password: PG_PASSWORD,
});
export default client;
