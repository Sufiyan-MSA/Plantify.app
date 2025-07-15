const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Ensure admin exists on server start
async function ensureAdmin() {
  const username = 'plantify@admin';
  const password = 'plantify@access';
  let admin = await Admin.findOne({ username });
  if (!admin) {
    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ username, password: hashed });
    console.log('Default admin created');
  }
}

// Login handler
async function login(req, res) {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  // For now, just return a simple token (not used in frontend yet)
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
}

module.exports = { login, ensureAdmin }; 