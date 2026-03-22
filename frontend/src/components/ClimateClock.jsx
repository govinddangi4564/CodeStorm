import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';

const ClimateClock = () => {
  // Official Climate Clock target for 1.5°C threshold at current emission rates
  // Approx projection: July 22, 2029 (adjusting to a realistic unix timestamp)
  const targetDate = new Date('2029-07-22T12:00:00Z').getTime();

  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25)),
          days: Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-24 bg-[var(--color-earth-sand)] dark:bg-[var(--color-deep-ocean)] relative overflow-hidden transition-colors duration-700">
      {/* Floating Organic Orbs for extreme softness */}
      <motion.div 
         animate={{ x: [0, 50, 0], y: [0, -50, 0] }} 
         transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }} 
         className="absolute top-0 left-10 w-96 h-96 bg-red-500/10 rounded-full filter blur-[100px] pointer-events-none" 
      />
      <motion.div 
         animate={{ x: [0, -50, 0], y: [0, 50, 0] }} 
         transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }} 
         className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-orange-500/10 rounded-full filter blur-[120px] pointer-events-none" 
      />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl p-10 md:p-16 rounded-[3rem] border border-white/40 dark:border-white/5 shadow-soft-glow w-full max-w-5xl text-center relative overflow-hidden"
        >
          {/* Inner pulsating ring */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.3, 0.1] }} 
            transition={{ repeat: Infinity, duration: 3 }} 
            className="absolute inset-0 border-[10px] border-red-500/20 rounded-[3rem] pointer-events-none"
          />

          <div className="inline-flex items-center gap-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-6 py-2 rounded-full font-bold uppercase tracking-[0.2em] mb-8 text-sm">
            <AlertTriangle size={20} className="animate-pulse" />
            1.5°C Climate Deadline
          </div>

          <h2 className="text-4xl md:text-5xl font-black font-heading text-[var(--color-forest-canopy)] dark:text-white mb-12 drop-shadow-sm">
            Time left to drastically limit emissions
          </h2>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-mono">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="bg-red-500 text-white w-24 h-28 md:w-32 md:h-36 rounded-3xl flex items-center justify-center text-5xl md:text-7xl font-black shadow-2xl relative overflow-hidden border border-red-400">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                  <span className="relative z-10 drop-shadow-md">{value.toString().padStart(2, '0')}</span>
                </div>
                <span className="mt-4 text-sm md:text-base font-bold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
                  {unit}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            This is the scientific consensus deadline. Once breached, the effects of global warming become exponentially more dangerous. We must race to zero.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ClimateClock;
