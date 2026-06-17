import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './productRoutes.js'; // 🔥 1. Nayi Product Routes file ko import kiya

// Configuration Load
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Body parser taake POST/PUT requests ka data read ho sake

// MongoDB Connection Logic
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Safely: ${conn.connection.host} 🔌`);
  } catch (error) {
    console.error("❌ Database Connection Failure:", error.message);
  }
};

// Database connect trigger
connectDB();

// Base Test Route
app.get('/', (req, res) => {
  res.send('MazaCart Backend Server is Running Successfully! 🚀');
});

// ==========================================
// 🔥 PRODUCT CRUD MIDDLEWARE INTEGRATION
// ==========================================
// Ab get, post, put, delete saare routing requests automatic productRoutes handle karega
app.use('/api/products', productRoutes); 

// Port Execution
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});