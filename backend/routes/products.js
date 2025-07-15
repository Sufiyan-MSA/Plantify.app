const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getAll, add, update, remove, toggleFeatured, getFeatured } = require('../controllers/productController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/', getAll);
router.post('/', upload.single('image'), add);
router.put('/:id', upload.single('image'), update);
router.delete('/:id', remove);
router.get('/featured', getFeatured);
router.patch('/:id/featured', toggleFeatured);

module.exports = router; 