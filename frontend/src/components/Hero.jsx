import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [co2, setCo2] = useState(421);

  useEffect(() => {
    const interval = setInterval(() => {
      setCo2(prev => +(prev + 0.0001).toFixed(4));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[var(--color-forest-canopy)] pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/deepforest/1920/1080" 
          alt="Forest landscape" 
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest-canopy)] to-transparent opacity-90"></div>
      </div>
      
      {/* Floating orbs */}
      <motion.div animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30 hidden md:block" />
      <motion.div animate={{ y: [0, 40, 0], x: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 10 }} className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400 rounded-full mix-blend-screen filter blur-[100px] opacity-20 hidden md:block" />

      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.7 }}
           className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 text-sm font-bold tracking-widest uppercase shadow-xl"
        >
          <Globe className="w-5 h-5 text-emerald-500" />
          Global Mission
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl font-black font-heading leading-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          Our Planet Is In Crisis. <br />
          <span className="text-gradient drop-shadow-2xl">It's Time to Act.</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 text-gray-200 font-light max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Join a global community taking immediate action. Track your footprint, complete daily challenges, and earn real impact points.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link to="/calculator" className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-[var(--color-forest-canopy)] px-10 py-5 rounded-full font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 text-lg">
            Calculate Impact <ArrowRight className="w-6 h-6" />
          </Link>
          <Link to="/pledge" className="glass-panel text-white px-10 py-5 rounded-full font-bold transition-all transform hover:scale-105 hover:bg-white/20 text-lg">
            Take a Pledge
          </Link>
        </motion.div>

        <motion.div 
          className="mt-20 glass-panel px-10 py-6 rounded-3xl flex flex-col items-center border border-white/20 shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-500 font-bold mb-2">Global CO₂ Levels (PPM)</p>
          <p className="text-6xl font-mono font-black text-white tracking-widest drop-shadow-lg">
            {co2.toFixed(4)}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
