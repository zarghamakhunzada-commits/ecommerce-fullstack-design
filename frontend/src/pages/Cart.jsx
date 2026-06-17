import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // 1. Cart Context engine link kiya

export default function Cart() {
  // 2. Context se dynamic states aur remove function nikala
  const { cartItems, removeFromCart, cartTotal } = useCart();

  // 3. Fallback Screen: Agar cart bilkul khali ho
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4">
        <div className="text-6xl mb-4">🛍️</div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Your shopping bag is empty!</h2>
        <p className="text-slate-500 text-sm mt-1 mb-6 text-center">Looks like you haven't added any luxury items to your collection yet.</p>
        <Link 
          to="/products" 
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md tracking-wide text-sm"
        >
          Explore Legacy Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 border-b border-slate-200 pb-4 tracking-tight">Your Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 4. Dynamic Cart Items Card List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            /* 🔥 ID issue update: key mein item.id ki jagah item._id use kiya */
            <div key={item._id} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 relative group transition hover:border-slate-300">
              
              {/* Product Thumbnail */}
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-slate-100 flex-shrink-0 border border-slate-100" />
              
              {/* Meta details */}
              <div className="flex-grow">
                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <h3 className="font-bold text-slate-800 text-base mt-1">{item.name}</h3>
                <p className="font-extrabold text-slate-900 mt-1">${item.price}.00</p>
              </div>
              
              {/* Control Action Elements */}
              <div className="flex sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-2">
                <div className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                  Qty: {item.quantity}
                </div>
                
                {/* 🔥 ID issue update: removeFromCart mein item.id ki jagah item._id pass kiya */}
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition cursor-pointer"
                >
                  Remove Item
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* 5. Live Summary Dynamic Bill Invoice */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Order Summary</h2>
          
          <div className="space-y-3 text-sm text-slate-600 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-800">${cartTotal}.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-extrabold tracking-wide uppercase text-xs bg-green-50 px-2 py-0.5 rounded">Free</span>
            </div>
            
            <hr className="border-slate-200 my-2" />
            
            <div className="flex justify-between text-base font-black text-slate-900 pt-1">
              <span>Total Bill</span>
              <span className="text-xl text-blue-600">${cartTotal}.00</span>
            </div>
          </div>
          
          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition shadow-md tracking-wide text-sm cursor-pointer">
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}