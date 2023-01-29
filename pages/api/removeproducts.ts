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
      let p = await Product.findByIdAndRemove(req.body[i]._id);
    }
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "Bad request" });
  }
}
