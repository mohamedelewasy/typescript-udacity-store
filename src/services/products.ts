import { Request as Req, Response as Res, NextFunction as Next } from "express";
import AsyncHandler from "express-async-handler";
import Products from "../models/products";
import ApiError from "../errors/apiError";

// @desc:   get list of products
// @route:  [GET] /products?category
export const getProducts = AsyncHandler(async (req: Req, res: Res) => {
  const { category } = req.query;
  let products;
  if (!category) products = await Products.index();
  else products = await Products.index_category(category as string);
  res.status(200).json({ products });
});

// @desc:   get a single product
// @route:  [GET] /products/:productId
export const getProduct = AsyncHandler(
  async (req: Req, res: Res, next: Next) => {
    const { productId } = req.params;
    const product = await Products.show(+productId);
    if (!product)
      return next(new ApiError(`can't find product with id:${productId}`, 400));
    res.status(200).json({ product });
  }
);

// @desc:   create product
// @route:  [POST] /products/
// @access: token-required
export const createProduct = AsyncHandler(async (req: Req, res: Res) => {
  const { name, price, category } = req.body;
  const product = await Products.create({ name, price, category });
  res.status(201).json({ product });
});

// @desc:   most popular products
// @route:  [GET] /products/most-popular
export const mostPopular = AsyncHandler(async (req: Req, res: Res) => {
  const products = await Products.mostPopular();
  res.status(200).json({ products });
});
