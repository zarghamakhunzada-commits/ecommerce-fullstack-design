import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // 🔥 Axios import kiya backend se rabte ke liye

export default function ProductListing() {
  const [products, setProducts] = useState([]); // Live products ke liye state
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(''); // 🔥 Search state add ki

  // Component load hote hi backend API hit karne ke liye useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://mazacart-backend.vercel.app/api/products');
/products');
        setProducts(data); // Database se aaya hua data state mein save kiya
        setLoading(false);  // Loading khatam
      } catch (error) {
        console.error("Database se data lane mein galti hui:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 Week 2 Task #5: Filtering logic for search input (Name ya Category match handler)
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesName || matchesCategory;
  });

  // Agar data abhi load ho raha ho to dynamic spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900 mb-4"></div>
        <p className="text-slate-500 font-medium text-sm animate-pulse">Loading Premium Collection...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 max-w-7xl mx-auto">
      
      {/* Header section with Search Bar integration */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">The Legacy Collection</h1>
          <p className="text-sm text-slate-500 mt-1">Discover curated items designed for the modern gentleman.</p>
        </div>

        {/* 🔥 Agency-Level Responsive Search Bar Container */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Input handle tracking
              className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-hidden focus:border-slate-900 shadow-xs transition-colors"
            />
            {/* Minimal Search Icon SVG */}
            <div className="absolute left-3.5 top-3.5 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm text-center w-full sm:w-auto whitespace-nowrap">
            {/* 🔥 Filtered items ka count dynamic show hoga */}
            <span className="text-sm text-slate-600 font-semibold">{filteredProducts.length} Products Found</span>
          </div>
        </div>
      </div>

      {/* Fallback View: Agar search results match na karein */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/60 shadow-xs max-w-xl mx-auto mt-8">
          <div className="text-5xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-slate-800">No products found</h3>
          <p className="text-slate-500 text-sm mt-1">We couldn't find anything matching "{searchQuery}". Try adjusting your keywords.</p>
        </div>
      ) : (
        /* Dynamic Grid Layout loaded from live database filters */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col group">
              
              {/* Image Wrap */}
              <div className="h-64 bg-slate-50 overflow-hidden relative">
                <img 
                  src={product.image || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500"} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500"; 
                  }}
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-md shadow-sm">
                  {product.category}
                </span>
              </div>

              {/* Content Details */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-blue-600 transition duration-200 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-slate-900 font-extrabold text-lg mb-4">${product.price}.00</p>
                
                {/* Dynamic Route Button */}
                <Link 
                  to={`/product/${product._id}`} 
                  className="mt-auto block text-center w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl transition text-sm tracking-wide"
                >
                  View Details
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}