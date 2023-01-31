import db from "../config/db";

export interface Product {
  readonly id?: number;
  name: string;
  price: number;
  category: string;
}

export default abstract class Products {
  // @desc: show all products
  static async index(): Promise<Product[]> {
    const conn = await db.connect();
    const sql = "SELECT * FROM products";
    const res = await conn.query(sql);
    conn.release();
    return res.rows;
  }

  // @desc: show products by category
  static async index_category(category: string): Promise<Product[]> {
    const conn = await db.connect();
    const sql = `SELECT * FROM products WHERE category LIKE '${category}%'`;
    const res = await conn.query(sql);
    conn.release();
    return res.rows;
  }

  // @desc: show single product by id
  static async show(productId: number): Promise<Product> {
    const conn = await db.connect();
    const sql = "SELECT * FROM products WHERE id=$1";
    const res = await conn.query(sql, [productId]);
    conn.release();
    return res.rows[0];
  }

  // @desc: create a single product
  static async create(payload: Product): Promise<Product> {
    const conn = await db.connect();
    const sql =
      "INSERT INTO products (name,price,category) VALUES($1,$2,$3) RETURNING *";
    const res = await conn.query(sql, [
      payload.name,
      payload.price,
      payload.category,
    ]);
    conn.release();
    return res.rows[0];
  }

  // @desc: get top 5 products
  static async mostPopular(): Promise<(Product & { sold_number: number })[]> {
    const conn = await db.connect();
    const sql =
      "SELECT products.id,products.name,products.price,products.category" +
      ",SUM(order_product.quantity)::INTEGER AS sold_number from products " +
      "INNER JOIN order_product " +
      "ON order_product.product_id=products.id " +
      "GROUP BY products.id " +
      "ORDER BY SUM(order_product.quantity) DESC " +
      "LIMIT 5";
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }
}
