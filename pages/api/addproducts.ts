import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/product";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({
        name: req.body[i].name,
        desc: req.body[i].desc,
        price: req.body[i].price,
        qty: req.body[i].qty,
        img: req.body[i].img,
      });
      await p.save();
    }
    res.status(200).json({ success: "success" })

  }else{
    res.status(400).json({ error: "error" })
  }
}