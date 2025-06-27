import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// Public-Get all products
router.get('/products', getProducts);
// Public-Get product by ID
router.get('/product/:id', getProductById);

export default router;
