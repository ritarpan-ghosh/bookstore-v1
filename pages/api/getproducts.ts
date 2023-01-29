import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/product";

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  await connectDb();
  let p = await Product.find();
  res.status(200).json({ p });
}
