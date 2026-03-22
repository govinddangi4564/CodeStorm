import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { TreePine, Droplet, Turtle, HeartHandshake, CheckCircle } from 'lucide-react';
import axios from 'axios';

const rewardsData = [
  {
    id: 1,
    title: "Plant 1 Tree in the Amazon",
    description: "Partner with OneTreePlanted to reforest degraded areas in South America.",
    cost: 500,
    icon: TreePine,
    color: "emerald"
  },
  {
    id: 2,
    title: "Remove 10kg Ocean Plastic",
    description: "Fund ocean cleanup crews to extract microplastics and heavy debris from the Pacific vortex.",
    cost: 1200,
    icon: Droplet,
    color: "blue"
  },
  {
    id: 3,
    title: "Sponsor a Wildlife Sanctuary",
    description: "Provide one week of food and care for endangered wildlife rescue operations.",
    cost: 2500,
    icon: HeartHandshake,
    color: "terracotta"
  },
  {
    id: 4,
    title: "Adopt a Sea Turtle",
    description: "Receive a virtual certificate of adoption and track your turtle's migration.",
    cost: 5000,
    icon: Turtle,
    color: "teal"
  }
];

const EcoRewards = () => {
  const { user, updateUserXP } = useContext(AuthContext);
  const [purchasing, setPurchasing] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!user) {
    return (
      <div className="py-32 text-center text-white bg-[var(--color-forest-canopy)]">
        <h2 className="text-4xl font-black">Please log in to access the Rewards Marketplace.</h2>
      </div>
    );
  }

  const handlePurchase = async (reward) => {
    if (user.xp < reward.cost) return alert("Not enough XP!");
    
    setPurchasing(reward.id);
    
    // Simulate API delay for dramatic effect
    setTimeout(() => {
        const newXp = user.xp - reward.cost;
        // In a real app we'd call the backend here to deduct XP
        // For now, update global context state
        updateUserXP(newXp);
        
        setPurchasing(null);
        setSuccess(reward.id);
        
        setTimeout(() => setSuccess(null), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-earth-sand)] dark:bg-[var(--color-deep-ocean)] pt-32 pb-24 transition-colors duration-700">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-5xl md:text-7xl font-black font-heading text-[var(--color-forest-canopy)] dark:text-white mb-4">Eco Rewards</h1>
                    <p className="text-xl text-[var(--color-sage)] font-medium max-w-2xl">Use your hard-earned XP to fund real-world climate action. When you level up, the planet levels up.</p>
                </motion.div>
            </div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
               className="bg-white dark:bg-gray-800 px-8 py-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center min-w-[200px]"
            >
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Available Balance</span>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-500">{user.xp} XP</span>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 object-contain">
          {rewardsData.map((reward, idx) => {
             const Icon = reward.icon;
             const canAfford = user.xp >= reward.cost;
             const isPurchasing = purchasing === reward.id;
             const isSuccess = success === reward.id;

             return (
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 key={reward.id}
                 className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
               >
                 {/* Blurred color backing */}
                 <div className={`absolute -right-10 -top-10 w-48 h-48 bg-${reward.color}-500/10 rounded-full filter blur-[50px] mix-blend-multiply group-hover:scale-150 transition-transform duration-700`}></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl bg-${reward.color}-50 dark:bg-${reward.color}-900/30 text-${reward.color}-500 inline-block shadow-inner`}>
                            <Icon size={36} />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full font-bold text-gray-800 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-600">
                            {reward.cost} XP
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors">{reward.title}</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium mb-10 flex-grow">{reward.description}</p>
                 
                    <motion.button 
                      whileHover={canAfford && !isPurchasing && !isSuccess ? { scale: 1.02 } : {}}
                      whileTap={canAfford && !isPurchasing && !isSuccess ? { scale: 0.98 } : {}}
                      onClick={() => handlePurchase(reward)}
                      disabled={!canAfford || isPurchasing || isSuccess}
                      className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                          isSuccess ? 'bg-emerald-500 text-white shadow-emerald-500/50' :
                          isPurchasing ? 'bg-yellow-500 text-white animate-pulse' :
                          canAfford ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-emerald-500 dark:hover:bg-emerald-400 hover:text-white dark:hover:text-gray-900 hover:shadow-emerald-500/30' : 
                          'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none border border-transparent'
                      }`}
                    >
                      {isSuccess ? <><CheckCircle size={20}/> Impact Funded!</> : 
                       isPurchasing ? 'Processing Impact...' : 
                       canAfford ? 'Fund Impact' : 'Insufficient XP'}
                    </motion.button>
                 </div>
               </motion.div>
             )
          })}
        </div>

      </div>
    </div>
  );
};

export default EcoRewards;
