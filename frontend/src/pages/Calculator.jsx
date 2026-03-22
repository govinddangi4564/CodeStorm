import React from 'react';
import CarbonCalculator from '../components/CarbonCalculator';

const Calculator = () => {
  return (
    <div className="bg-[var(--color-earth-sand)] dark:bg-[var(--color-deep-ocean)] min-h-screen transition-colors duration-700 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-fixed bg-blend-overlay bg-white/95 dark:bg-black/80">
      <div className="container mx-auto px-4 pt-32 pb-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-heading font-black mb-6 text-[var(--color-forest-canopy)] dark:text-white drop-shadow-lg">What is Your Impact?</h1>
          <p className="text-xl text-[var(--color-sage)] dark:text-gray-300 font-medium bg-white/50 dark:bg-black/50 backdrop-blur-md p-6 rounded-3xl inline-block shadow-lg border border-white/20 dark:border-white/10">
             Understanding your carbon footprint is the first step towards reducing it. Use our calculator to see where you stand.
          </p>
        </div>
        
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/50 dark:border-gray-700 overflow-hidden">
             <CarbonCalculator />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
