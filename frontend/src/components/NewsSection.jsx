import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Newspaper } from 'lucide-react';

const NewsSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/articles');
        setArticles(res.data.data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return null;

  return (
    <section className="py-32 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-gray-200 dark:border-gray-800 pb-6">
          <h2 className="text-5xl font-heading font-black text-[var(--color-forest-canopy)] dark:text-white flex items-center gap-4">
            <Newspaper className="text-emerald-500 w-12 h-12" /> Latest Global Intel
          </h2>
          <Link to="/articles" className="text-emerald-500 font-bold hover:text-emerald-600 text-lg uppercase tracking-widest transition">Read Directory &rarr;</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article, idx) => (
            <motion.div 
              key={article.id || article._id}
              className="bg-[var(--color-warm-cream)] dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group border border-transparent dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-800"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="h-64 overflow-hidden relative">
                 <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="absolute top-6 left-6 bg-white/95 dark:bg-black/80 backdrop-blur-md px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 shadow-xl border border-white/20">
                    {article.category}
                 </div>
              </div>
              <div className="p-10 relative bg-white dark:bg-gray-800 z-10">
                <h3 className="text-2xl font-black mb-4 text-[var(--color-forest-canopy)] dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-8 leading-relaxed font-medium">{article.content}</p>
                
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6 mt-4 flex justify-between items-center text-xs font-black text-gray-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-600">{article.author.charAt(0)}</div> {article.author}</span>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
