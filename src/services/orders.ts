import { Request as Req, Response as Res, NextFunction as Next } from "express";
import AsyncHandler from "express-async-handler";
import Orders from "../models/orders";
import ApiError from "../errors/apiError";

// @desc:   get current active order
// @route:  [GET] /orders/active
// @access: token-required
export const getActiveOrder = AsyncHandler(async (req: Req, res: Res) => {
  const userId = req.body.user;
  let order = await Orders.currentOrder(userId);
  if (!order) order = await Orders.create(userId);
  res.status(200).json({ order });
});

// @desc:   get completed orders
// @route:  [GET] /orders/complete
// @access: token-required
export const getCompleteOrders = AsyncHandler(
  async (req: Req, res: Res, next: Next) => {
    const userId = req.body.user;
    const orders = await Orders.completeOrder(userId);
    if (orders.length == 0)
      return next(new ApiError("can't find completed orders", 400));
    res.status(200).json({ orders });
  }
);

// @desc:   add product to cart
// @route:  [POST] /orders/
// @access: token-required
export const addProduct = AsyncHandler(
  async (req: Req, res: Res, next: Next) => {
    const { product_id, quantity, user } = req.body;
    let order = await Orders.currentOrder(user);
    if (!order) order = await Orders.create(user);
    const order_prod = await Orders.addProduct({
      order_id: <number>order.id,
      product_id,
      quantity,
    });
    if (!order_prod)
      return next(
        new ApiError(`can't find product with id:${product_id}`, 400)
      );
    res.status(200).json(order_prod);
  }
);

// @desc:   get products in cart
// @route:  [GET] /orders/
// @access: token-required
export const getCartProducts = AsyncHandler(
  async (req: Req, res: Res, next: Next) => {
    const { user } = req.body;
    const order = await Orders.currentOrder(user);
    if (!order) return next(new ApiError("empty cart", 400));
    const products = await Orders.getCartProducts(order.id as number);
    res.status(200).json({ products });
  }
);
