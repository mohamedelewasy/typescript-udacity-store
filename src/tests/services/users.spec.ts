import supertest from "supertest";
import app from "../../app";
import { User } from "../../models/users";
import db from "../../config/db";

const request = supertest(app);

describe("test user endpoints", () => {
  it("register a new user", async () => {
    const user = await request.post("/api/users/register").send({
      first_name: "user1",
      last_name: "user1",
      password: "password",
      username: "user1",
      passwordConfirm: "password",
    } as User);
    expect(user.statusCode).toBe(201);
    expect(user.body.token).toBeDefined();
  });

  it("login with wrong user", async () => {
    const user = await request
      .post("/api/users/login")
      .send({ username: "admin", password: "user" });
    expect(user.statusCode).toBe(401);
    expect(user.body.error.msg).toBe("incorrect username or password");
  });

  it("login with valid user", async () => {
    const user = await request
      .post("/api/users/login")
      .send({ username: "user1", password: "password" });
    expect(user.statusCode).toBe(200);
    expect(user.body.token).toBeDefined();
  });

  describe("get users", () => {
    let token: string;
    beforeAll(async () => {
      const user = await request
        .post("/api/users/login")
        .send({ username: "user1", password: "password" });
      token = user.body.token;
    });
    it("get user with id=1", async () => {
      const user = await request
        .get("/api/users/1")
        .set("Authorization", `Bearer ${token}`);
      expect(user.statusCode).toBe(200);
      expect(user.body.user.id).toBe(1);
      expect(user.body.user.first_name).toBeDefined();
      expect(user.body.user.last_name).toBeDefined();
      expect(user.body.user.username).toBeDefined();
      expect(user.body.user.password).not.toBeDefined();
    });

    it("get all users", async () => {
      const user = await request
        .get("/api/users/")
        .set("Authorization", `Bearer ${token}`);
      expect(user.statusCode).toBe(200);
      expect((user.body.users as User[]).length).toBe(1);
      expect((user.body.users as User[])[0].password).not.toBeDefined();
    });
  });
  afterAll(async () => {
    const conn = await db.connect();
    const sql =
      "DELETE FROM order_product; ALTER SEQUENCE order_product_id_seq RESTART WITH 1;" +
      "DELETE FROM products; ALTER SEQUENCE products_id_seq RESTART WITH 1;" +
      "DELETE FROM orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1;" +
      "DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1;";
    await conn.query(sql);
    conn.release();
  });
});
