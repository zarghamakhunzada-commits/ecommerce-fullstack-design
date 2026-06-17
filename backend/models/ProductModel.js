import mongoose from 'mongoose';

// 🔥 MazaCart Updated Product Schema (Week 2 Requirements ke Mutabiq)
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true },
    // 🔥 Week 2 Task #2 ke mutabiq 'stock' field add kar diya gaya hai
    stock: { type: Number, required: true, default: 10 }, 
  },
  {
    timestamps: true, // Yeh automatic createdAt aur updatedAt track karega
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;