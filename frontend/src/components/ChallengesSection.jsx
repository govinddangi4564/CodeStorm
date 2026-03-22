import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Star, CheckCircle, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultChallenges = [
  { id: 1, title: 'Meatless Monday', description: 'Eat plant-based meals all day.', xp_reward: 50, icon: 'Leaf' },
  { id: 2, title: 'Zero Waste Trip', description: 'Bring reusable bags and containers shopping.', xp_reward: 30, icon: 'Star' },
  { id: 3, title: 'Energy Saver', description: 'Turn off all standby electronics overnight.', xp_reward: 20, icon: 'CheckCircle' }
];

const ChallengesSection = () => {
  const { user, updateUserXP } = useContext(AuthContext);
  const [challenges, setChallenges] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);

  useEffect(() => {
    // Attempt to fetch from DB, fallback to default
    axios.get('http://localhost:5000/api/challenges')
      .then(res => {
        if(res.data.data.length > 0) setChallenges(res.data.data);
        else setChallenges(defaultChallenges);
      })
      .catch(() => setChallenges(defaultChallenges));
  }, []);

  const handleComplete = async (id) => {
    if (!user) {
      alert("Please login to earn XP!");
      return;
    }
    if (completedIds.includes(id)) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:5000/api/challenges/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCompletedIds([...completedIds, id]);
      
      // Update global gamification React context instantly
      if (res.data && res.data.totalXp !== undefined) {
         updateUserXP(res.data.totalXp);
      }
    } catch (error) {
      console.error(error);
      // Fallback update incase backend was already updated or 404
      setCompletedIds([...completedIds, id]);
    }
  };

  return (
    <section className="py-24 bg-[var(--color-earth-sand)] dark:bg-[var(--color-deep-ocean)] border-t border-[var(--color-sage)]/20 transition-colors duration-700">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-heading font-black text-[var(--color-forest-canopy)] dark:text-white mb-4 drop-shadow-sm">Daily Eco Habit Tracker</h2>
          <p className="text-xl text-[var(--color-sage)] dark:text-gray-400 max-w-2xl mx-auto font-medium">Complete daily missions to earn XP, level up your Earth Defender status, and trigger a real-world impact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
          {challenges.map((c, idx) => {
            const isDone = completedIds.includes(c.id || c._id);
            return (
              <motion.div 
                key={c.id || c._id}
                className={`p-10 rounded-[2.5rem] border transition-all duration-700 transform hover:-translate-y-3 ${isDone ? 'bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/40 dark:to-emerald-800/40 border-emerald-300 dark:border-emerald-700 shadow-2xl shadow-emerald-500/10' : 'bg-white/80 dark:bg-black/40 backdrop-blur-xl border-white/40 dark:border-white/10 shadow-xl hover:shadow-2xl hover:border-[var(--color-terracotta)] dark:hover:border-[var(--color-terracotta)]'}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-5 rounded-2xl shadow-inner ${isDone ? 'bg-emerald-500 text-white' : 'bg-[var(--color-sage)]/20 dark:bg-white/10 text-[var(--color-forest-canopy)] dark:text-gray-300'}`}>
                    {c.icon === 'Leaf' ? <Leaf size={32} /> : <Star size={32} />}
                  </div>
                  <div className="bg-[var(--color-terracotta)]/10 dark:bg-[var(--color-terracotta)]/20 text-[var(--color-terracotta)] dark:text-[var(--color-terracotta)] font-black px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-sm uppercase tracking-widest border border-[var(--color-terracotta)]/30">
                    <Star size={16} /> {c.xp_reward} XP
                  </div>
                </div>
                
                <h3 className={`text-2xl font-black mb-4 ${isDone ? 'text-emerald-900 dark:text-emerald-300' : 'text-[var(--color-forest-canopy)] dark:text-white'}`}>{c.title}</h3>
                <p className="text-[var(--color-sage)] dark:text-gray-400 mb-10 leading-relaxed font-medium">{c.description}</p>
                
                <button 
                  onClick={() => handleComplete(c.id || c._id)}
                  disabled={isDone}
                  className={`w-full py-4 rounded-xl font-bold transition-all text-lg flex justify-center items-center gap-3 uppercase tracking-widest ${isDone ? 'bg-emerald-500 text-white cursor-not-allowed opacity-90' : 'bg-[var(--color-forest-canopy)] dark:bg-white dark:text-black text-white hover:bg-[var(--color-terracotta)] shadow-xl hover:shadow-2xl'}`}
                >
                  {isDone ? <><CheckCircle size={20}/> Completed</> : 'Commit'}
                </button>
              </motion.div>
            )
          })}
        </div>
        
        {!user && (
          <div className="text-center mt-12 bg-white p-6 max-w-xl mx-auto rounded-full shadow-lg border border-gray-100">
            <Link to="/login" className="text-emerald-500 text-lg font-bold hover:text-emerald-600 transition">Log in to save your XP progress &rarr;</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChallengesSection;
