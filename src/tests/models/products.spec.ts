import Products, { Product } from "../../models/products";
import db from "../../config/db";
import Users from "../../models/users";
import Orders from "../../models/orders";

describe("test products model", () => {
  beforeAll(async () => {
    await Products.create({
      name: "prod1",
      price: 1,
      category: "cat1",
    });
  });
  it("create product {name:prod2,price:5.99,category:cat2}", async () => {
    const prod = await Products.create({
      name: "prod2",
      price: 5.99,
      category: "cat2",
    });
    expect(prod).toEqual({
      id: 2,
      name: "prod2",
      price: 5.99,
      category: "cat2",
    });
  });
  it("get list of products", async () => {
    const products = await Products.index();
    expect(products).toContain({
      id: 1,
      name: "prod1",
      price: 1,
      category: "cat1",
    });
    expect(products).toContain({
      id: 2,
      name: "prod2",
      price: 5.99,
      category: "cat2",
    });
  });
  it("get list of products by category=cat2", async () => {
    const products = await Products.index_category("cat2");
    expect((products as Product[]).length).toBe(1);
    expect((products as Product[])[0]).toEqual({
      id: 2,
      name: "prod2",
      price: 5.99,
      category: "cat2",
    });
  });
  it("get product with id=1", async () => {
    const product = await Products.show(1);
    expect(product).toEqual(jasmine.objectContaining({ id: 1 }));
  });

  describe("most 5 popular products", () => {
    beforeAll(async () => {
      await Users.create({
        first_name: "user",
        last_name: "user",
        username: "user",
        password: "password",
      });
      await Products.create({ name: "prod3", price: 3, category: "cat" });
      await Products.create({ name: "prod4", price: 3, category: "cat" });
      await Products.create({ name: "prod5", price: 3, category: "cat" });
      await Products.create({ name: "prod6", price: 3, category: "cat" });
      await Products.create({ name: "prod7", price: 3, category: "cat" });
      await Products.create({ name: "prod8", price: 3, category: "cat" });
      await Products.create({ name: "prod9", price: 3, category: "cat" });
      await Orders.create(1);
      await Orders.addProduct({ order_id: 1, product_id: 3, quantity: 3 });
      await Orders.addProduct({ order_id: 1, product_id: 4, quantity: 5 });
      await Orders.addProduct({ order_id: 1, product_id: 5, quantity: 7 });
      await Orders.addProduct({ order_id: 1, product_id: 6, quantity: 8 });
      await Orders.addProduct({ order_id: 1, product_id: 7, quantity: 10 });
      await Orders.addProduct({ order_id: 1, product_id: 8, quantity: 22 });
      await Orders.addProduct({ order_id: 1, product_id: 5, quantity: 150 });
    });

    it("top 5 products(prod5>>prod8>>prod7>>prod6>>prod4)", async () => {
      const result = await Products.mostPopular();
      expect(result).toEqual([
        jasmine.objectContaining({ id: 5, sold_number: 157 }),
        jasmine.objectContaining({ id: 8, sold_number: 22 }),
        jasmine.objectContaining({ id: 7, sold_number: 10 }),
        jasmine.objectContaining({ id: 6, sold_number: 8 }),
        jasmine.objectContaining({ id: 4, sold_number: 5 }),
      ]);
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
