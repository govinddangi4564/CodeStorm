import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Droplets, TreePine, ArrowRight, Activity } from 'lucide-react';

const biomes = [
    {
        id: 'amazon',
        title: "The Amazon Rainforest",
        subtitle: "Lungs of the Earth",
        icon: <TreePine size={32} className="text-emerald-400" />,
        image: "https://picsum.photos/seed/amazon/1600/900",
        threat: "Deforestation",
        status: "Tipping Point",
        impact15: "Retains majority of structural integrity functioning as a vital carbon sink.",
        impact20: "Massive dieback. Transitions to a dry savanna, releasing billions of tons of CO₂.",
        color: "from-emerald-900/90"
    },
    {
        id: 'coral',
        title: "Coral Reefs",
        subtitle: "Ocean Nurseries",
        icon: <Droplets size={32} className="text-blue-400" />,
        image: "https://picsum.photos/seed/coral/1600/900",
        threat: "Acidification",
        status: "Critical Danger",
        impact15: "70% to 90% of coral reefs face severe degradation and bleaching.",
        impact20: "99% of all tropical coral reefs are projected to be permanently wiped out.",
        color: "from-blue-900/90"
    },
    {
        id: 'arctic',
        title: "Arctic Ice",
        subtitle: "The Thermostat",
        icon: <AlertTriangle size={32} className="text-gray-200" />,
        image: "https://picsum.photos/seed/glacier/1600/900",
        threat: "Permafrost Thaw",
        status: "Accelerating Melt",
        impact15: "Arctic summers will be completely ice-free once per century.",
        impact20: "Arctic summers will be completely ice-free at least once every ten years.",
        color: "from-slate-900/90"
    }
];

const EndangeredBiomes = () => {
    const [active, setActive] = useState(biomes[0]);

    return (
        <section className="py-0 bg-black text-white relative h-screen min-h-[800px] flex overflow-hidden">
            {/* Background Image Transition */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={active.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${active.color} to-black/80 via-black/60`}></div>
                </motion.div>
            </AnimatePresence>

            <div className="container mx-auto px-8 relative z-10 flex flex-col md:flex-row items-center justify-between h-full">
                
                {/* Left Content Area */}
                <div className="w-full md:w-1/2 flex flex-col justify-center h-full pt-20 md:pt-0">
                    <motion.div 
                        key={`content-${active.id}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
                                {active.icon}
                            </div>
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--color-terracotta)] drop-shadow-md">{active.subtitle}</h4>
                                <p className="text-gray-300 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mt-1"><Activity size={12}/> {active.status}</p>
                            </div>
                        </div>

                        <h2 className="text-6xl md:text-8xl font-black font-heading mb-8 leading-none drop-shadow-2xl">{active.title}</h2>
                        
                        <div className="space-y-8 bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl max-w-xl">
                            <div>
                                <h3 className="text-white font-black uppercase tracking-[0.2em] mb-4 text-sm flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span> At 1.5°C Warming
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed font-medium">{active.impact15}</p>
                            </div>
                            
                            <div className="pt-8 border-t border-white/10">
                                <h3 className="text-white font-black uppercase tracking-[0.2em] mb-4 text-sm flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> At 2.0°C Warming
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed font-medium">{active.impact20}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Selector Menu */}
                <div className="w-full md:w-1/3 flex flex-row md:flex-col gap-4 mt-10 md:mt-0 justify-end h-auto md:h-full py-10 overflow-x-auto">
                    {biomes.map((biome) => (
                        <button 
                            key={biome.id}
                            onClick={() => setActive(biome)}
                            className={`min-w-[280px] md:min-w-0 flex flex-col items-start text-left p-8 rounded-3xl transition-all duration-500 backdrop-blur-md border ${active.id === biome.id ? 'bg-white/20 border-white/50 shadow-2xl scale-[1.02]' : 'bg-transparent border-white/10 hover:bg-white/10'}`}
                        >
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-300 mb-3">{biome.threat}</span>
                            <span className="text-3xl font-heading font-bold text-white mb-2">{biome.title}</span>
                            {active.id === biome.id && <ArrowRight className="text-white mt-4 opacity-70" />}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EndangeredBiomes;
