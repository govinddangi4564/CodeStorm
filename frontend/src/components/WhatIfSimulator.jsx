import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Trees, Factory, Car, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const scenarios = [
  { 
      id: 1, 
      title: "Global Reforestation", 
      description: "What if humanity plants 1 trillion trees across all available degraded lands?", 
      icon: <Trees size={32} className="text-emerald-500"/>, 
      tempDecrease: 0.2, 
      co2Decrease: 205, // gigatons
      metric: "Gigatons CO₂ removed",
      years: [ {year: 2025, temp: 1.5}, {year: 2030, temp: 1.45}, {year: 2040, temp: 1.35}, {year: 2050, temp: 1.3} ]
  },
  { 
      id: 2, 
      title: "100% EV Adoption", 
      description: "What if every combustion engine is replaced by electric vehicles by 2035?", 
      icon: <Car size={32} className="text-blue-500"/>, 
      tempDecrease: 0.15, 
      co2Decrease: 120,
      metric: "Gigatons CO₂ mitigated",
      years: [ {year: 2025, temp: 1.5}, {year: 2030, temp: 1.48}, {year: 2040, temp: 1.4}, {year: 2050, temp: 1.35} ]
  },
  { 
      id: 3, 
      title: "Total Renewable Shift", 
      description: "What if all global industry shifts completely to Solar, Wind, and Hydro energy?", 
      icon: <Factory size={32} className="text-yellow-500"/>, 
      tempDecrease: 0.4, 
      co2Decrease: 350,
      metric: "Gigatons CO₂ mitigated",
      years: [ {year: 2025, temp: 1.5}, {year: 2030, temp: 1.35}, {year: 2040, temp: 1.2}, {year: 2050, temp: 1.1} ]
  }
];

const baselineData = [ {year: 2025, temp: 1.5}, {year: 2030, temp: 1.6}, {year: 2040, temp: 1.8}, {year: 2050, temp: 2.1} ];

const WhatIfSimulator = () => {
    const [activeScenario, setActiveScenario] = useState(scenarios[0]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [resultsVisible, setResultsVisible] = useState(false);

    const handleSimulation = (scenario) => {
        setActiveScenario(scenario);
        setResultsVisible(false);
        setIsSimulating(true);
        
        setTimeout(() => {
            setIsSimulating(false);
            setResultsVisible(true);
        }, 1500);
    };

    // Combine baseline with active scenario for the chart
    const chartData = baselineData.map((data, index) => ({
        year: data.year,
        "Business As Usual": data.temp,
        [activeScenario.title]: activeScenario.years[index].temp
    }));

    return (
        <section className="py-32 bg-[var(--color-earth-sand)] dark:bg-[var(--color-deep-ocean)] transition-colors duration-700 relative overflow-hidden">
             {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-500 opacity-[0.03] dark:opacity-10 rounded-full filter blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-20">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/50 dark:bg-black/40 p-4 rounded-full shadow-lg border border-white/20 dark:border-white/10 backdrop-blur-md">
                            <Lightbulb size={40} className="text-yellow-500 animate-pulse" />
                        </div>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black font-heading text-[var(--color-forest-canopy)] dark:text-white mb-6">"What If" Scenario Engine</h2>
                    <p className="text-xl text-[var(--color-sage)] dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        Experiment with global tipping points. Select a hypothetical master-action below and our engine will simulate the resultant impact on Earth's trajectory by 2050.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Selectors */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {scenarios.map((s, idx) => (
                            <motion.button 
                                key={s.id}
                                onClick={() => handleSimulation(s)}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className={`flex items-start text-left gap-6 p-8 rounded-3xl transition-all duration-300 border backdrop-blur-md ${activeScenario.id === s.id ? 'bg-white dark:bg-gray-800 border-emerald-400 dark:border-emerald-600 shadow-2xl scale-[1.02] ring-4 ring-emerald-500/20' : 'bg-white/40 dark:bg-black/30 border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-gray-800/80 shadow-lg'}`}
                            >
                                <div className="p-4 bg-gray-50 dark:bg-black/50 rounded-2xl shadow-inner">
                                    {s.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-[var(--color-forest-canopy)] dark:text-white mb-2">{s.title}</h3>
                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{s.description}</p>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Simulation Visualizer */}
                    <div className="lg:col-span-7">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white/50 dark:border-gray-700 h-full flex flex-col justify-center relative overflow-hidden">
                            {isSimulating ? (
                                <div className="flex flex-col items-center justify-center h-full space-y-8 absolute inset-0 bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg z-20">
                                    <div className="relative">
                                        <div className="w-24 h-24 border-8 border-gray-200 dark:border-gray-700 rounded-full"></div>
                                        <div className="w-24 h-24 border-8 border-emerald-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                                        <Lightbulb className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={32} />
                                    </div>
                                    <h3 className="text-3xl font-black font-mono text-[var(--color-deep-ocean)] dark:text-white uppercase tracking-widest animate-pulse">Running Neural Models...</h3>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Processing 2050 climatic impacts</p>
                                </div>
                            ) : null}

                            <AnimatePresence>
                                {(resultsVisible || !isSimulating) && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full flex flex-col"
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <CheckCircle className="text-emerald-500 w-8 h-8" />
                                            <h3 className="text-3xl font-black text-[var(--color-forest-canopy)] dark:text-white">Simulation Results: <span className="text-emerald-600 dark:text-emerald-400">{activeScenario.title}</span></h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6 mb-10">
                                            <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-6 text-center">
                                                <p className="text-xs font-black uppercase tracking-widest text-red-500 dark:text-red-400 mb-2">Warming Avoided</p>
                                                <p className="text-5xl font-mono font-black text-red-600 drop-shadow-sm">-{activeScenario.tempDecrease}°C</p>
                                            </div>
                                            <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-6 text-center">
                                                <p className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">{activeScenario.metric}</p>
                                                <p className="text-5xl font-mono font-black text-emerald-600 drop-shadow-sm">-{activeScenario.co2Decrease}</p>
                                            </div>
                                        </div>

                                        <div className="w-full h-[350px] mt-6 flex flex-col justify-end">
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 text-center">Projected Global Temperature Horizon (2025 - 2050)</h4>
                                            <div className="w-full h-[280px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                                                        <XAxis dataKey="year" tick={{ fontWeight: 'bold', fill: '#8F9A83' }} />
                                                        <YAxis tick={{ fontWeight: 'bold', fill: '#8F9A83' }} domain={[1.0, 2.5]} />
                                                        <Tooltip 
                                                            contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '15px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                                                            itemStyle={{ fontWeight: '900' }}
                                                        />
                                                        <Line type="monotone" dataKey="Business As Usual" stroke="#ef4444" strokeWidth={4} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                                                        <Line type="monotone" dataKey={activeScenario.title} stroke="#10b981" strokeWidth={4} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatIfSimulator;
