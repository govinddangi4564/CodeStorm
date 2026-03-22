import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);
  
  const { login, register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoadingAction(true);

    let res;
    if (isLogin) {
      res = await login(formData.email, formData.password);
    } else {
      res = await register(formData.name, formData.email, formData.password);
    }

    if (!res.success) {
      setError(res.error);
    }
    setLoadingAction(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--color-warm-cream)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border-t-4 border-emerald-500">
        <div className="text-center mb-8">
          <Leaf className="mx-auto h-12 w-12 text-emerald-500" />
          <h2 className="mt-4 text-3xl font-heading font-extrabold text-[var(--color-forest-canopy)]">
            {isLogin ? 'Sign in to your account' : 'Create an account'}
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" placeholder="Jane Doe" />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" placeholder="jane@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" placeholder="••••••••" minLength="6" />
          </div>

          <button type="submit" disabled={loadingAction} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-[var(--color-forest-canopy)] hover:bg-gray-800 transition transform hover:-translate-y-0.5">
            {loadingAction ? 'Please wait...' : (isLogin ? 'Sign in' : 'Sign up')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-emerald-500 hover:text-green-600 font-medium transition">
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
