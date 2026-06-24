import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form Fields States
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [desc, setDesc] = useState('');

  // 1. Fetch all products on load
  const fetchProducts = async () => {
    try {
      // ✅ Fixed duplicated route string structure
      const { data } = await axios.get('https://mazacart-backend.vercel.app/api/products');
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Submit Handle (Create or Update Product)
  const submitHandler = async (e) => {
    e.preventDefault();
    loading(true);
    setMessage('');

    const productData = { 
      name, 
      price: Number(price), 
      image, 
      category, 
      stock: Number(stock), 
      desc 
    };

    try {
      if (isEditing) {
        // ✅ Fixed template literal and single quote syntax
        await axios.put(`https://mazacart-backend.vercel.app/api/products/${currentProductId}`, productData);
        setMessage('Product updated successfully!');
      } else {
        // ✅ Fixed operational route string
        await axios.post('https://mazacart-backend.vercel.app/api/products', productData);
        setMessage('New Product created successfully!');
      }
      
      resetForm();
      fetchProducts();
    } catch (err) {
      setMessage('Error processing operational route.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Edit Handler
  const editHandler = (product) => {
    setIsEditing(true);
    setCurrentProductId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
    setStock(product.stock !== undefined ? product.stock : (product.countInStock || 0));
    setDesc(product.desc || product.description || '');
  };

  // 4. Delete Handler
  const deleteHandler = async (id) => {
    if (window.confirm('Are you absolutely sure you want to delete this product from the master database?')) {
      try {
        // ✅ Fixed absolute delete string syntax
        await axios.delete(`https://mazacart-backend.vercel.app/api/products/${id}`);
        setMessage('Product deleted from active list.');
        fetchProducts();
      } catch (err) {
        setMessage('Failed to delete product.');
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProductId('');
    setName('');
    setPrice('');
    setImage('');
    setCategory('');
    setStock('');
    setDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">⚙️ Master Admin Control Panel</h1>
          <p className="text-sm text-slate-500 mt-1">Manage live catalog inventory database stream</p>
        </div>
      </div>

      {message && (
        <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-700 font-medium px-4 py-3 rounded-xl text-sm">
          💡 {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs h-fit">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            {isEditing ? '✏️ Edit Existing Product' : '➕ Add Premium Product'}
          </h2>
          
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Product Title</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm focus:outline-hidden focus:border-slate-900" placeholder="e.g. Saffiano Leather Wallet" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Price ($)</label>
                <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm focus:outline-hidden focus:border-slate-900" placeholder="99" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Stock Count</label>
                <input type="number" required value={stock} onChange={(e) => setStock(e.target.value)} className="mt-1 w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm focus:outline-hidden focus:border-slate-900" placeholder="15" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Image Source URL</label>
              <input type="text" required value={image} onChange={(e) => setImage(e.target.value)} className="mt-1 w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm focus:outline-hidden focus:border-slate-900" placeholder="https://unsplash.com/..." />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Category Classification</label>
              <input type="text" required value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm focus:outline-hidden focus:border-slate-900" placeholder="Accessories" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Product Specifications</label>
              <textarea rows="3" required value={desc} onChange={(e) => setDesc(e.target.value)} className="mt-1 w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm focus:outline-hidden focus:border-slate-900" placeholder="Provide raw premium item description details..."></textarea>
            </div>

            <div className="flex space-x-2 pt-2">
              <button type="submit" disabled={loading} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl transition text-sm">
                {loading ? 'Processing...' : isEditing ? 'Update Item' : 'Save Product'}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl transition text-sm">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">📦 Active Product Stock Catalog ({products.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500 font-bold uppercase">
                  <th className="px-6 py-3">Preview</th>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3 text-center">System Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {products.map((product) => {
                  const itemStock = product.stock !== undefined ? product.stock : (product.countInStock || 0);
                  return (
                    <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-3">
                        <img src={product.image} alt="" className="w-10 h-10 object-cover rounded-lg border border-slate-100" />
                      </td>
                      <td className="px-6 py-3 max-w-[180px] truncate text-slate-900 font-semibold">{product.name}</td>
                      <td className="px-6 py-3 text-slate-600">${product.price}</td>
                      <td className="px-6 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-md font-bold ${itemStock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                          {itemStock} left
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center space-x-2">
                        <button onClick={() => editHandler(product)} className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg transition-colors">
                          Edit
                        </button>
                        <button onClick={() => deleteHandler(product._id)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}