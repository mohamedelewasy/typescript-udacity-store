import supertest from "supertest";
import app from "../../app";
import db from "../../config/db";

const request = supertest(app);

describe("test order endpoints", () => {
  let token: string;
  beforeAll(async () => {
    // create user
    const user = await request.post("/users/register").send({
      first_name: "user",
      last_name: "user",
      username: "user",
      password: "user",
      passwordConfirm: "user",
    });
    token = user.body.token;

    // create products
    await request
      .post("/products")
      .send({ name: "prod1", price: 1, category: "cat1" })
      .set("Authorization", `Bearer ${token}`);
    await request
      .post("/products")
      .send({ name: "prod2", price: 1, category: "cat1" })
      .set("Authorization", `Bearer ${token}`);
    await request
      .post("/products")
      .send({ name: "prod3", price: 1, category: "cat1" })
      .set("Authorization", `Bearer ${token}`);
    await request
      .post("/products")
      .send({ name: "prod4", price: 1, category: "cat2" })
      .set("Authorization", `Bearer ${token}`);
    await request
      .post("/products")
      .send({ name: "prod5", price: 1, category: "cat2" })
      .set("Authorization", `Bearer ${token}`);
  });

  it("add Products to user order", async () => {
    const ord_prod = await request
      .post("/orders/")
      .send({ product_id: 1, quantity: 10 })
      .set("Authorization", `Bearer ${token}`);
    expect(ord_prod.statusCode).toBe(200);
    expect(ord_prod.body).toEqual({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 10,
    });
  });

  it("get active order", async () => {
    const order = await request
      .get("/orders/active")
      .set("Authorization", `Bearer ${token}`);
    expect(order.statusCode).toBe(200);
    expect(order.body.order).toEqual({ id: 1, user_id: 1, status: "active" });
  });

  it("get complete order", async () => {
    const order = await request
      .get("/orders/complete")
      .set("Authorization", `Bearer ${token}`);
    expect(order.statusCode).toBe(400);
    expect(order.body.error.msg).toBe("can't find completed orders");
  });

  it("get cart", async () => {
    const products = await request
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(products.statusCode).toBe(200);
    expect(products.body.products.length).toBe(1);
    expect(products.body.products[0]).toEqual(
      jasmine.objectContaining({ id: 1 })
    );
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
