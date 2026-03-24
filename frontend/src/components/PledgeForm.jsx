import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle2, Globe } from 'lucide-react';
import API_URL from '../config/api';

const pledgeOptions = [
  "Use reusable bags and bottles",
  "Reduce meat consumption",
  "Use public transport or carpool",
  "Switch to renewable energy where possible",
  "Minimize energy usage and turn off lights"
];

const PledgeForm = ({ onPledgeAdded }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedItems, setSelectedItems] = useState([]);
  const [pledgeCount, setPledgeCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch total pledge count
    axios.get(`${API_URL}/api/pledge/all`)
      .then(res => setPledgeCount(res.data.count))
      .catch(err => console.log(err));
  }, []);

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert("Please select at least one pledge item.");
      return;
    }
    
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/pledge`, {
        ...formData,
        pledgeItems: selectedItems
      });
      setSubmitted(true);
      setPledgeCount(prev => prev + 1);
      if (onPledgeAdded) {
          onPledgeAdded(); // Trigger immediate UI update on Pledge Wall
      }
    } catch (err) {
      alert("Error submitting pledge");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/90 dark:bg-black/80 backdrop-blur-xl p-12 rounded-[2.5rem] shadow-2xl text-center max-w-2xl mx-auto border border-emerald-500/20"
      >
        <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto mb-6 drop-shadow-lg" />
        <h3 className="text-4xl font-heading font-black text-[var(--color-forest-canopy)] dark:text-white mb-4">You have joined the movement!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">Your commitment to the planet has been recorded. Scroll up to see it live on the Global Wall.</p>
        <div className="bg-[var(--color-earth-sand)] dark:bg-gray-900 py-6 px-10 rounded-2xl inline-block border border-black/5 dark:border-white/10 shadow-inner">
          <p className="text-xl font-bold text-gray-500 uppercase tracking-widest mb-1">Total Earth Defenders</p>
          <div className="flex items-center justify-center gap-3">
             <Globe className="text-emerald-500 w-8 h-8 animate-spin-slow" />
             <p className="text-6xl font-mono font-black text-emerald-600">{pledgeCount}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-10 md:p-14 rounded-[3rem] shadow-2xl max-w-3xl mx-auto border-t-[8px] border-[var(--color-terracotta)] dark:border-[var(--color-terracotta)] relative overflow-hidden transition-colors duration-700">
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 dark:bg-yellow-500/5 rounded-full filter blur-[80px] pointer-events-none"></div>
      
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-black text-[var(--color-forest-canopy)] dark:text-white mb-4">Make Your Climate Pledge</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium tracking-wide">Join <span className="font-black text-emerald-600 dark:text-emerald-400">{pledgeCount}</span> others who have already committed to protecting our home.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3 uppercase tracking-wider text-xs">Full Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-[var(--color-terracotta)] outline-none transition-all dark:text-white" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3 uppercase tracking-wider text-xs">Email Address</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-[var(--color-terracotta)] outline-none transition-all dark:text-white" placeholder="john@example.com" />
          </div>
        </div>

        <div>
           <label className="block text-gray-700 dark:text-gray-300 font-bold mb-3 uppercase tracking-wider text-xs">A Message to the World</label>
           <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:bg-white dark:focus:bg-black focus:ring-2 focus:ring-[var(--color-terracotta)] outline-none transition-all dark:text-white" rows="3" placeholder="I pledge this because..."></textarea>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
          <label className="block text-[var(--color-forest-canopy)] dark:text-white font-black text-xl mb-4">I pledge to:</label>
          <div className="space-y-4">
            {pledgeOptions.map((item, idx) => (
              <label key={idx} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md">
                <input type="checkbox" checked={selectedItems.includes(item)} onChange={() => toggleItem(item)} className="w-6 h-6 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500 bg-gray-100" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[var(--color-forest-canopy)] dark:bg-white dark:text-[var(--color-forest-canopy)] text-white font-black uppercase tracking-widest py-5 rounded-xl hover:bg-[var(--color-terracotta)] dark:hover:bg-[var(--color-terracotta)] dark:hover:text-white transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-3">
          {loading ? 'Committing...' : <><Globe size={24} /> Submit My Pledge</>}
        </button>
      </form>
    </div>
  );
};

export default PledgeForm;
