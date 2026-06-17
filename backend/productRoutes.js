import express from 'express';
import Product from './models/ProductModel.js'; // 🔥 Apne folder structure ke mutabiq path check kar lena

const router = express.Router();

// ==========================================
// 1. READ ALL: Saare products database se lane ke liye
// GET /api/products
// ==========================================
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error, products nahi mil sakay", error: error.message });
  }
});

// ==========================================
// 2. READ SINGLE: Kisi ek product ki details ID se nikalne ke liye
// GET /api/products/:id
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product database mein nahi mila" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, invalid ID format", error: error.message });
  }
});

// ==========================================
// 3. CREATE: Naya product add karne ke liye (Admin Panel Requirement)
// POST /api/products
// ==========================================
router.post('/', async (req, res) => {
  try {
    const { name, price, category, image, desc, stock } = req.body;

    // Validation check ke koi field khali na ho
    if (!name || !price || !category || !image || !desc) {
      return res.status(400).json({ message: "Bhaya, saare fields required hain" });
    }

    const newProduct = new Product({
      name,
      price,
      category,
      image,
      desc,
      stock: stock || 10 // Agar stock na bheja jaye to default 10 set hoga
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Product add karne mein masla hua", error: error.message });
  }
});

// ==========================================
// 4. UPDATE: Kisi product ka data badalne ke liye
// PUT /api/products/:id
// ==========================================
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.image = req.body.image || product.image;
      product.desc = req.body.desc || product.desc;
      product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Update ke liye product nahi mila" });
    }
  } catch (error) {
    res.status(400).json({ message: "Product update nahi ho saka", error: error.message });
  }
});

// ==========================================
// 5. DELETE: Product ko database se remove karne ke liye
// DELETE /api/products/:id
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product database se successfully delete ho gaya ✅" });
    } else {
      res.status(404).json({ message: "Delete karne ke liye product nahi mila" });
    }
  } catch (error) {
    res.status(500).json({ message: "Product delete nahi ho saka", error: error.message });
  }
});

export default router;