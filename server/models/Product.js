const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Add userId to associate products with specific users
    name: { type: String, required: true },
    hsn: String,
    cost: { type: Number, required: true },
    per: {type: String, require: true}
  });
  
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;