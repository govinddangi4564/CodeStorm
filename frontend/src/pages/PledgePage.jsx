import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import PledgeForm from '../components/PledgeForm';
import { Globe } from 'lucide-react';

const PledgePage = () => {
  const [pledges, setPledges] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPledges = async () => {
      try {
          const res = await axios.get('http://localhost:5000/api/pledge/all');
          setPledges(res.data.data);
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchPledges();
  }, []);

  return (
      <div className="bg-[var(--color-earth-sand)] dark:bg-[var(--color-deep-ocean)] min-h-screen pt-32 pb-20 transition-colors duration-700">
          <div className="container mx-auto px-6 max-w-7xl">
              <div className="mb-20">
                  <PledgeForm onPledgeAdded={fetchPledges} />
              </div>

              <div className="mt-32">
                  <div className="text-center mb-16">
                      <h2 className="text-5xl font-black font-heading text-[var(--color-forest-canopy)] dark:text-white mb-4 flex items-center justify-center gap-3 drop-shadow-sm">
                          <Globe className="text-emerald-500 w-12 h-12" /> Global Community Wall
                      </h2>
                      <p className="text-xl text-[var(--color-sage)] dark:text-gray-400 max-w-2xl mx-auto font-medium">See the commitments made by real people around the world joining the fight against climate change. Find your inspiration below.</p>
                  </div>

                  {loading ? (
                      <div className="flex justify-center py-32 animate-pulse text-3xl font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest">Gathering Pledges...</div>
                  ) : (
                      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                          {pledges.map((p, idx) => (
                              <motion.div 
                                  key={p.id || p._id} 
                                  className="bg-white dark:bg-gray-800 pt-10 pb-8 px-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 break-inside-avoid relative overflow-hidden group transform hover:-translate-y-2 transition-all duration-300"
                                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: (idx % 10) * 0.1 }}
                              >
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-[0.03] dark:opacity-10 rounded-bl-[100px] transform group-hover:scale-150 transition-transform duration-700"></div>
                                  
                                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${p.name}&backgroundColor=10b981`} alt="avatar" className="w-12 h-12 rounded-full absolute top-6 left-8 shadow-md" />
                                  
                                  <div className="ml-16 mb-6">
                                    <h3 className="text-2xl font-black dark:text-gray-100">{p.name}</h3>
                                    <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest">{new Date(p.createdAt).toLocaleDateString()}</p>
                                  </div>
                                  
                                  <p className="text-xl italic font-serif text-gray-800 dark:text-gray-300 mb-8 border-l-4 border-emerald-400 pl-5 leading-relaxed bg-gray-50 dark:bg-gray-900/50 py-3 pr-3 rounded-r-xl">
                                      "{p.message || 'I stand with the earth and pledge to reduce my footprint.'}"
                                  </p>

                                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                      {p.pledgeItems?.map((item, i) => (
                                          <span key={i} className="text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full uppercase tracking-wider">{item}</span>
                                      ))}
                                  </div>
                              </motion.div>
                          ))}
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
};

export default PledgePage;
