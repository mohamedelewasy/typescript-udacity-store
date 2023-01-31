import db from "../config/db";
import { Product } from "./products";

export interface Order {
  readonly id?: number;
  user_id: number;
  status: string;
}
export interface OrdProd {
  readonly id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
}

export default abstract class Orders {
  // @desc: get order
  static async show(orderId: number): Promise<Order> {
    const conn = await db.connect();
    const sql = "SELECT * FROM orders WHERE id=$1";
    const order = await conn.query(sql, [orderId]);
    conn.release();
    return order.rows[0];
  }

  // @desc: create order
  static async create(userId: number): Promise<Order> {
    const conn = await db.connect();
    const sql =
      "INSERT INTO orders(user_id, status) VALUES($1,'active') RETURNING *";
    const order = await conn.query(sql, [userId]);
    conn.release();
    return order.rows[0];
  }

  // @desc: update order status by orderId
  static async update(orderId: number, status: string): Promise<Order> {
    const conn = await db.connect();
    const sql = "UPDATE orders SET status=$2 WHERE id=$1 RETURNING *";
    const order = await conn.query(sql, [orderId, status]);
    conn.release();
    return order.rows[0];
  }

  // @desc: get active order by user id
  static async currentOrder(userId: number): Promise<Order> {
    const conn = await db.connect();
    const sql = "SELECT * from orders WHERE user_id=$1 AND status='active'";
    const order = await conn.query(sql, [userId]);
    conn.release();
    return order.rows[0];
  }

  // @desc: get complete order by user id
  static async completeOrder(userId: number): Promise<Order[]> {
    const conn = await db.connect();
    const sql = "SELECT * from orders WHERE user_id=$1 AND status='complete'";
    const order = await conn.query(sql, [userId]);
    conn.release();
    return order.rows;
  }

  // @desc: add product to active order
  static async addProduct(payload: OrdProd): Promise<OrdProd> {
    const conn = await db.connect();
    const sql =
      "INSERT INTO order_product (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *";
    const product = await conn.query(sql, [
      payload.order_id,
      payload.product_id,
      payload.quantity,
    ]);
    conn.release();
    return product.rows[0];
  }

  // @desc: get cart product by order id
  static async getCartProducts(
    orderId: number
  ): Promise<(Product & { quantity: number })[]> {
    const conn = await db.connect();
    const sql =
      "SELECT products.id,name,price,category,order_product.quantity FROM products " +
      "INNER JOIN order_product ON products.id=order_product.product_id " +
      "WHERE order_product.order_id=$1";
    const products = await conn.query(sql, [orderId]);
    conn.release();
    return products.rows;
  }
}
