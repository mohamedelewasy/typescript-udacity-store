import db from "../config/db";

export interface User {
  readonly id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

export default abstract class Users {
  // @desc: show all users
  static async index(): Promise<User[]> {
    const conn = await db.connect();
    const sql = "SELECT (id,first_name,last_name,username) FROM users";
    const res = await conn.query(sql);
    conn.release();
    return res.rows;
  }

  // @desc: show single user by id
  static async show(userId: number): Promise<User> {
    const conn = await db.connect();
    const sql = "SELECT * FROM users WHERE id=$1;";
    const res = await conn.query(sql, [userId]);
    conn.release();
    return res.rows[0];
  }

  // @desc: show single user by username
  static async show_username(username: string): Promise<User> {
    const conn = await db.connect();
    const sql =
      "SELECT id,username,password FROM users WHERE username=$1 LIMIT 1;";
    const res = await conn.query(sql, [username]);
    conn.release();
    return res.rows[0];
  }

  // @desc: create user
  static async create(payload: User): Promise<User> {
    const conn = await db.connect();
    const sql =
      "INSERT INTO users (first_name,last_name,username,password) VALUES($1,$2,$3,$4) RETURNING *;";
    const res = await conn.query(sql, [
      payload.first_name,
      payload.last_name,
      payload.username,
      payload.password,
    ]);
    conn.release();
    return res.rows[0];
  }
}
