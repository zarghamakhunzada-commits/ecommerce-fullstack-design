import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords match nahi kar rahe, bhaya!');
    }

    setLoading(true);
    try {
      // ✅ Fixed URL syntax and endpoints
      const { data } = await axios.post('https://mazacart-backend.vercel.app/api/users/register', { name, email, password });
      login(data); 
      setLoading(false);
      navigate('/'); 
    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xs border border-slate-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
          <p className="mt-2 text-center text-sm text-slate-500">Join MazaCart Premium Collection</p>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl font-medium">
            ⚠️ {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={submitHandler}>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm focus:outline-hidden focus:border-slate-900 transition-colors"
              placeholder="Zargham Khan"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm focus:outline-hidden focus:border-slate-900 transition-colors"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm focus:outline-hidden focus:border-slate-900 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm focus:outline-hidden focus:border-slate-900 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition text-sm tracking-wide disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-slate-900 font-bold hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}