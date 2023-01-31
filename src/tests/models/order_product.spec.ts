import Orders from "../../models/orders";
import db from "../../config/db";
import Users from "../../models/users";
import Products from "../../models/products";

describe("test order_product model", () => {
  beforeAll(async () => {
    await Users.create({
      first_name: "user",
      last_name: "user",
      username: "user",
      password: "user",
    });
    await Orders.create(1);
    await Products.create({ name: "prod", price: 1, category: "cat" });
  });

  it("add product to cart", async () => {
    const product = await Orders.addProduct({
      order_id: 1,
      product_id: 1,
      quantity: 20,
    });
    expect(product).toEqual({
      id: 1,
      product_id: 1,
      order_id: 1,
      quantity: 20,
    });
  });

  it("get cart in order=1", async () => {
    const products = await Orders.getCartProducts(1);
    expect(products.length).toBe(1);
    expect(products[0]).toEqual({
      id: 1,
      name: "prod",
      price: 1,
      category: "cat",
      quantity: 20,
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
