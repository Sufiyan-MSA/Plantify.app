const Product = require('../models/Product');

// Get all products
async function getAll(req, res) {
  const products = await Product.find();
  res.json(products);
}

function parseProductFields(body) {
  // tags can be sent as tags[] (array) or tags (comma-separated string)
  let tags = [];
  if (Array.isArray(body['tags[]'])) {
    tags = body['tags[]'];
  } else if (body['tags[]']) {
    tags = [body['tags[]']];
  } else if (body.tags) {
    if (Array.isArray(body.tags)) {
      tags = body.tags;
    } else {
      tags = body.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
  }
  return {
    name: body.name,
    price: parseFloat(body.price) || 0,
    originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : undefined,
    rating: parseFloat(body.rating) || 5,
    numberOfReviews: parseInt(body.numberOfReviews) || 0,
    tags,
  };
}

// Add new product
async function add(req, res) {
  let imagePath = '';
  if (req.file) {
    imagePath = `/uploads/${req.file.filename}`;
  } else if (req.body.image && typeof req.body.image === 'string') {
    imagePath = req.body.image;
  }
  const fields = parseProductFields(req.body);
  const product = await Product.create({
    ...fields,
    image: imagePath,
  });
  res.status(201).json(product);
}

// Update product
async function update(req, res) {
  const { id } = req.params;
  let updateData = parseProductFields(req.body);
  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  } else if (req.body.image && typeof req.body.image === 'string') {
    updateData.image = req.body.image;
  } else {
    updateData.image = '';
  }
  const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
}

// Delete product
async function remove(req, res) {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
}

// Toggle featured status
async function toggleFeatured(req, res) {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  product.featured = !product.featured;
  await product.save();
  res.json(product);
}

// Get only featured products
async function getFeatured(req, res) {
  const products = await Product.find({ featured: true });
  res.json(products);
}

module.exports = { getAll, add, update, remove, toggleFeatured, getFeatured }; 