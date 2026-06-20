import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import AdminDashboard from './pages/AdminDashboard'; // 🔥 1. Admin Dashboard Import kiya
import ProtectedRoute from './context/ProtectedRoute'; // 🔥 2. Protected Route Guard Import kiya
import { useCart } from './context/CartContext'; 
import { useAuth } from './context/AuthContext'; 

export default function App() {
  const { cartCount } = useCart(); 
  const { user, logout } = useAuth(); 

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        
        {/* Responsive Navbar */}
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 md:px-8 shadow-xs">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-slate-900">
              Maza<span className="text-blue-600">Cart</span>
            </Link>

            {/* Links (Desktop) */}
            <div className="hidden md:flex space-x-8 items-center font-semibold text-sm">
              <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/products" className="text-slate-600 hover:text-blue-600 transition-colors">Shop All</Link>
              
              {/* Week 3 Task #3: Admin verification check for Navbar link */}
              {user?.isAdmin && (
                <Link to="/admin" className="text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                  ⚙️ Admin Panel
                </Link>
              )}
            </div>

            {/* Right Side: Auth Actions & Cart Icon */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 text-sm font-semibold">
                {user ? (
                  <>
                    <span className="text-slate-600">Hi, <span className="text-slate-900 font-bold">{user.name}</span></span>
                    <button 
                      onClick={logout} 
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl transition-colors text-xs"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-colors text-xs tracking-wide">
                    Sign In
                  </Link>
                )}
              </div>

              {/* Cart Icon */}
              <Link to="/cart" className="relative p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                <span className="text-xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mini Links for Mobile View */}
          <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-100 md:hidden text-xs font-bold">
            <div className="flex space-x-4">
              <Link to="/" className="text-slate-600 hover:text-blue-600">Home</Link>
              <Link to="/products" className="text-slate-600 hover:text-blue-600">Shop All</Link>
              {user?.isAdmin && <Link to="/admin" className="text-red-600">Admin</Link>}
            </div>
            <div>
              {user ? (
                <button onClick={logout} className="text-red-500 underline">Logout</button>
              ) : (
                <Link to="/login" className="text-blue-600">Sign In</Link>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content Pages */}
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* 🔥 Week 3 Task #3: Fully Protected Admin Dashboard Route Guard */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

      </div>
    </Router>
  );
}