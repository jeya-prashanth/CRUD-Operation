import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);
    console.log('HEADERS:', req.headers);

    const { name, description, price, quantity } = req.body;
    const createdBy = req.adminId; 

    if (!name || !description || !price || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const priceNum = Number(price);
    const quantityNum = Number(quantity);
    if (isNaN(priceNum) || isNaN(quantityNum)) {
      return res.status(400).json({ message: 'Price and quantity must be numbers' });
    }

    const image = req.file.path; 

    const product = new Product({
      name,
      description,
      price: priceNum,
      image,
      quantity: quantityNum,
      createdBy
    });
    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    console.error('Error in createProduct:', err);
    res.status(500).json({ message: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'firstname lastname email');
    res.status(200).json(products);
  } catch (err) {
    console.error('Error in getProducts:', err);
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'firstname lastname email');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image, quantity } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.name = name;
    product.description = description;
    product.price = price;
    if (image !== undefined && image !== null) {
        product.image = image;
    } else {
        console.log('Image field is missing or null from req.body');
    }
    product.quantity = quantity;
    await product.save();
    res.status(200).json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
