import mongoose, { model, models } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    desc:  String,
    price: Number,
    qty: { type: Number},
    img: String,
    // slug: {type: String, unique: true}
  },
  { timestamps: true }
);
// mongoose.models = {}

const Product = models?.Product || model("Product", ProductSchema);

export default Product;
// export default mongoose.model("Product", ProductSchema);
