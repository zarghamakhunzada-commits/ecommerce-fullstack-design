import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { useCart } from './context/CartContext'; // 1. Context Hook Import kiya

export default function App() {
  const { cartCount } = useCart(); // 2. Dynamic quantity access ki

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        
        {/* Responsive Navbar */}
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 md:px-8 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-blue-600">
              Maza<span className="text-slate-900">Cart</span>
            </Link>

            {/* Links (Desktop) */}
            <div className="hidden md:flex space-x-8 font-medium">
              <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/products" className="text-slate-600 hover:text-blue-600 transition-colors">Shop All</Link>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                <span className="text-xl">🛒</span>
                
                {/* 3. Badge count ab dynamic ho gaya aur sirf tab dikhega jab cart mein items honge */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mini Links for Mobile View */}
          <div className="flex justify-center space-x-6 pt-2 mt-2 border-t border-slate-100 md:hidden text-sm font-semibold">
            <Link to="/" className="text-slate-600 hover:text-blue-600">Home</Link>
            <Link to="/products" className="text-slate-600 hover:text-blue-600">Shop All</Link>
          </div>
        </nav>

        {/* Main Content Pages */}
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}