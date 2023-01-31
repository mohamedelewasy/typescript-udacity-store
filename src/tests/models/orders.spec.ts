import Orders from "../../models/orders";
import db from "../../config/db";
import Users from "../../models/users";

describe("test orders model", () => {
  beforeAll(async () => {
    await Users.create({
      first_name: "mo",
      last_name: "mo",
      username: "mo",
      password: "pass",
    });
  });
  it("create order with userId=1", async () => {
    const order = await Orders.create(1);
    expect(order).toEqual({ id: 1, user_id: 1, status: "active" });
  });
  it("get order with id=1", async () => {
    const order = await Orders.show(1);
    expect(order).toEqual({ id: 1, user_id: 1, status: "active" });
  });
  it("update order status", async () => {
    const order = await Orders.update(1, "complete");
    expect(order).toEqual({ id: 1, user_id: 1, status: "complete" });
  });
  it("current order for user id=1", async () => {
    const order = await Orders.currentOrder(1);
    expect(order).toBeUndefined();
  });
  it("complete orders for user id=1", async () => {
    const orders = await Orders.completeOrder(1);
    expect(orders.length).toBe(1);
    expect(orders[0]).toEqual({ id: 1, user_id: 1, status: "complete" });
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
