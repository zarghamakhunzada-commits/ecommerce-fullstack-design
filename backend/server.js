import userRoutes from './userRoutes.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './productRoutes.js'; 

// Configuration Load
dotenv.config();

const app = express();

// Middlewares
// 🔥 CORS Fixed: Live frontend domain ko access allow kar diya hai
app.use(cors({
  origin: ["https://mazacart-frontend.vercel.app", "http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

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
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);

// Port Execution
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});