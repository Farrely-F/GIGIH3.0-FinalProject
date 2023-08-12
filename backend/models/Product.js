// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productID: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  videoID: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
