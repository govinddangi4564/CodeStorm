import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Leaf, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-sm py-4' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-heading group">
          <Leaf className="w-8 h-8 text-emerald-500 group-hover:rotate-12 transition-transform" />
          <span className={`${scrolled ? 'text-gray-900 dark:text-white' : 'text-white dark:text-gray-100'}`}>ClimateAct</span>
        </Link>
        
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center space-x-8 bg-black/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
            {['Home', 'Articles', 'Calculator', 'Pledge', 'Rewards'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              return (
                <Link 
                  key={item} 
                  to={path} 
                  className={`text-sm font-bold uppercase tracking-wider transition ${isActive ? 'text-emerald-500 border-b-2 border-emerald-500' : scrolled ? 'text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400' : 'text-gray-200 hover:text-white dark:text-gray-300 dark:hover:text-white'}`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`p-2 rounded-full transition ${scrolled ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : 'hover:bg-white/20 dark:hover:bg-black/20'}`}
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className={`${scrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white dark:text-gray-200'}`} />}
          </button>
          
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-[var(--color-forest-canopy)] px-4 py-2 rounded-full font-bold shadow-lg shadow-green-500/30 transition transform hover:-translate-y-1">
                <span>⭐ {user.xp || 0} XP | {user.name}</span>
              </Link>
              <button onClick={logout} className={`font-bold transition ${scrolled ? 'text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300' : 'text-red-300 hover:text-red-100 dark:text-red-400 dark:hover:text-red-200'}`}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-emerald-500 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition transform hover:-translate-y-1">Login</Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
