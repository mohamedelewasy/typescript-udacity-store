import supertest from "supertest";
import app from "../../app";
import db from "../../config/db";
import { Product } from "../../models/products";
import Orders from "../../models/orders";

const request = supertest(app);

describe("test product endpoints", () => {
  let token: string;
  beforeAll(async () => {
    const user = await request.post("/api/users/register").send({
      username: "user1",
      first_name: "user",
      last_name: "user",
      password: "password",
      passwordConfirm: "password",
    });
    token = user.body.token;
  });
  it("create product", async () => {
    const product = await request
      .post("/api/products/")
      .send({ name: "product1", price: 1, category: "category1" })
      .set("Authorization", `Bearer ${token}`);
    expect(product.statusCode).toBe(201);
    expect(product.body.product).toEqual({
      id: 1,
      name: "product1",
      price: 1,
      category: "category1",
    });
  });

  describe("get products", () => {
    beforeAll(async () => {
      await request
        .post("/api/products/")
        .send({ name: "prod1", price: 1, category: "games" })
        .set("Authorization", `Bearer ${token}`);
      await request
        .post("/api/products/")
        .send({ name: "prod2", price: 1, category: "games" })
        .set("Authorization", `Bearer ${token}`);
      await request
        .post("/api/products/")
        .send({ name: "prod3", price: 1, category: "games" })
        .set("Authorization", `Bearer ${token}`);
      await request
        .post("/api/products/")
        .send({ name: "prod4", price: 1, category: "games" })
        .set("Authorization", `Bearer ${token}`);
      await request
        .post("/api/products/")
        .send({ name: "prod5", price: 1, category: "books" })
        .set("Authorization", `Bearer ${token}`);
      await request
        .post("/api/products/")
        .send({ name: "prod6", price: 1, category: "books" })
        .set("Authorization", `Bearer ${token}`);
      await request
        .post("/api/products/")
        .send({ name: "prod7", price: 1, category: "books" })
        .set("Authorization", `Bearer ${token}`);
    });
    it("get a single product", async () => {
      const product = await request.get("/api/products/1");
      expect(product.statusCode).toBe(200);
      expect(product.body.product).toEqual(jasmine.objectContaining({ id: 1 }));
    });
    it("get all products", async () => {
      const products = await request.get("/api/products");
      expect(products.statusCode).toBe(200);
      expect((products.body.products as Product[]).length).toBe(8);
    });
    it("get products with category=books", async () => {
      const products = await request.get("/api/products?category=book");
      expect(products.statusCode).toBe(200);
      expect((products.body.products as Product[]).length).toBe(3);
    });
  });

  describe("test most popular", () => {
    beforeAll(async () => {
      await Orders.create(1);
      await Orders.addProduct({ order_id: 1, product_id: 1, quantity: 10 });
      await Orders.addProduct({ order_id: 1, product_id: 2, quantity: 100 });
      await Orders.addProduct({ order_id: 1, product_id: 3, quantity: 80 });
      await Orders.addProduct({ order_id: 1, product_id: 4, quantity: 70 });
      await Orders.addProduct({ order_id: 1, product_id: 5, quantity: 60 });
      await Orders.addProduct({ order_id: 1, product_id: 6, quantity: 100 });
      await Orders.addProduct({ order_id: 1, product_id: 6, quantity: 100 });
    });

    it("top 5 products are (prod6>>prod2>>prod3>>prod4>>prod5)", async () => {
      const products = await request.get("/api/products/mostpopular");
      expect(products.statusCode).toBe(200);
      expect(products.body.products).toEqual([
        jasmine.objectContaining({ id: 6, sold_number: 200 }),
        jasmine.objectContaining({ id: 2, sold_number: 100 }),
        jasmine.objectContaining({ id: 3, sold_number: 80 }),
        jasmine.objectContaining({ id: 4, sold_number: 70 }),
        jasmine.objectContaining({ id: 5, sold_number: 60 }),
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
