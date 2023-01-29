import mongoose, { model, models } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    email:  String,
    phnumber: Number,
    address: String,
    state: String,
    district: String,
    pincode: Number,
    // slug: {type: String, unique: true}
  },
  { timestamps: true }
);

const Product = models?.Product || model("Product", ProductSchema);

export default Product;