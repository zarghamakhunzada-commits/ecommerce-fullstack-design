import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

export default function Home() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // 🔥 URL Fix: Line break mita kar straight line kar di hai
        const { data } = await axios.get('https://mazacart-backend.vercel.app/api/products');
        
        setProducts(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Featured products load karne mein masla hua:", error);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="space-y-12">
      
      {/* HERO BANNER SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-md">
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Big Summer Sale is Live!
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Elevate Your Everyday Style
          </h1>
          <p className="text-blue-100 text-base md:text-lg">
            Discover unmatched premium quality items at 20% flat discount today. Free delivery across the country.
          </p>
          <div className="pt-2">
            <Link to="/products" className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-xl shadow hover:bg-blue-50 transition-all transform hover:-translate-y-0.5">
              Shop Now 🛍️
            </Link>
          </div>
        </div>
        <div className="mt-8 md:mt-0 w-full max-w-xs md:max-w-sm">
          <img 
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&q=80" 
            alt="Hero Banner" 
            className="rounded-2xl shadow-2xl border-4 border-white/20 object-cover w-full h-48 md:h-64"
          />
        </div>
      </section>

      {/* FEATURED PRODUCTS GRID */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Featured Products</h2>
          <Link to="/products" className="text-blue-600 font-semibold hover:underline text-sm md:text-base">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white border border-slate-200 rounded-xl h-80 animate-pulse p-4 flex flex-col justify-between">
                <div className="bg-slate-200 h-40 rounded-lg w-full"></div>
                <div className="space-y-2 pt-4">
                  <div className="bg-slate-200 h-4 rounded w-3/4"></div>
                  <div className="bg-slate-200 h-6 rounded w-1/4"></div>
                </div>
                <div className="bg-slate-200 h-8 rounded w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                
                <div className="h-48 bg-slate-100 overflow-hidden relative">
                  <img 
                    src={product.image || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500"} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500"; 
                    }}
                  />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-semibold px-2 py-1 rounded-md shadow-xs">
                    {product.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base line-clamp-1 hover:text-blue-600">
                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h3>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">${product.price}.00</p>
                  </div>

                  <Link 
                    to={`/product/${product._id}`}
                    className="w-full text-center bg-slate-900 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}