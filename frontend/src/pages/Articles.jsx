import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Science', 'Policy', 'Solutions', 'News'];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const url = category === 'All' 
          ? 'http://localhost:5000/api/articles' 
          : `http://localhost:5000/api/articles?category=${category}`;
        const res = await axios.get(url);
        setArticles(res.data.data);
      } catch (err) {
        console.error("Error fetching articles", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [category]);

  const filteredArticles = articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-[var(--color-earth-sand)] dark:bg-[var(--color-deep-ocean)] min-h-screen py-12 transition-colors duration-700">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-5xl font-heading font-black mb-4 text-[var(--color-forest-canopy)] dark:text-white drop-shadow-sm">Climate Insights</h1>
          <p className="text-xl text-[var(--color-sage)] dark:text-gray-400 font-medium">Stay informed with the latest research, policies, and solutions.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={cat} 
                onClick={() => setCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-md ${
                  category === cat ? 'bg-[var(--color-forest-canopy)] dark:bg-emerald-500 text-white shadow-lg scale-105' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 rounded-full bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-700 outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium" 
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 w-6 h-6" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading articles...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <motion.div 
                key={article._id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 h-full flex flex-col group cursor-pointer border border-transparent hover:border-emerald-500/20"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -10 }}
                transition={{ delay: idx * 0.1, duration: 0.4, type: "spring", stiffness: 100 }}
              >
                <div className="h-48 overflow-hidden bg-gray-200 relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  {article.image && <img src={article.image} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />}
                </div>
                <div className="p-6 flex-grow flex flex-col bg-white dark:bg-gray-800 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-black text-[var(--color-terracotta)] uppercase tracking-widest">{article.category}</span>
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full">{article.views} views</span>
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-[var(--color-forest-canopy)] dark:text-white group-hover:text-emerald-500 transition-colors">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed font-medium">{article.content}</p>
                  
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center mt-auto text-xs text-gray-500 dark:text-gray-400">
                    <div className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">{article.author}</div>
                    <div className="font-mono font-bold">{new Date(article.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredArticles.length === 0 && (
              <div className="col-span-full text-center py-24 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl font-bold uppercase tracking-widest text-lg">
                No articles found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
