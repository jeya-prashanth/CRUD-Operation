import express from 'express';
import multer from 'multer';
import { signup, login } from '../controllers/adminController.js';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin-signup
router.post('/signup', signup);
// Admin-login
router.post('/login', express.json(), express.urlencoded({ extended: true }), login);

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Product CRUD operations
router.post('/product', protect, upload.single('image'), createProduct);
router.get('/products', protect, getProducts);
router.get('/product/:id', protect, getProductById);
router.put('/product/:id', protect, upload.single('image'), updateProduct);
router.delete('/product/:id', protect, deleteProduct);

export default router;
