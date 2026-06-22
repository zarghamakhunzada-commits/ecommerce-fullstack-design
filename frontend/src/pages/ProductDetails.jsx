import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; 
import { useCart } from '../context/CartContext'; 

export default function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // 🔥 URL Fixed: Ek line mein merge kar diya
        const { data } = await axios.get(`https://mazacart-backend.vercel.app/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Product details lane mein masla hua:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
        <p className="text-slate-500 font-medium text-sm">Fetching Product Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found!</h2>
        <p className="text-slate-500 mb-6 text-center">Bhaya, yeh product database mein maujood nahi hai.</p>
        <Link to="/" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition">
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 mb-8 transition gap-2">
        ← Back to Collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
        <div className="bg-slate-50 rounded-2xl overflow-hidden h-[450px]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight leading-none">
              {product.name}
            </h1>
            <p className="text-2xl font-black text-slate-900 mt-4">${product.price}.00</p>
            
            <div className="border-t border-slate-100 my-6"></div>
            
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {product.desc}
            </p>
          </div>

          <div className="mt-8 gap-4 flex flex-col sm:flex-row">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-6 rounded-xl transition text-sm tracking-wide shadow-sm active:scale-95"
            >
              Add to Cart 🛒
            </button>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3.5 px-6 rounded-xl transition text-sm tracking-wide">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}