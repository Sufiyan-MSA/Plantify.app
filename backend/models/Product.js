const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, // URL or file path
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  numberOfReviews: { type: Number, default: 0 },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', ProductSchema); 