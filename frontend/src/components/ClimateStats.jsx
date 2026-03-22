import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, AlertTriangle } from 'lucide-react';

const stats = [
  { icon: Thermometer, title: "Global Temp", value: "+1.1°C", desc: "Since pre-industrial times", bg: "bg-red-500/10", color: "text-red-500" },
  { icon: Droplets, title: "Sea Level", value: "+3.4mm/yr", desc: "Average annual rise", bg: "bg-blue-500/10", color: "text-blue-500" },
  { icon: Wind, title: "Emissions", value: "36.8 Gt", desc: "Global CO2 in 2022", bg: "bg-gray-500/10", color: "text-gray-700" },
  { icon: AlertTriangle, title: "Ice Loss", value: "428 Gt/yr", desc: "Antarctic & Greenland", bg: "bg-orange-500/10", color: "text-orange-500" }
];

const ClimateStats = () => {
  return (
    <section className="py-20 bg-white relative -mt-10 rounded-t-[3rem] z-20 shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-sm font-bold tracking-[0.3em] uppercase text-gray-400 mb-12">The Reality in Numbers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl shadow-gray-200/50 hover:shadow-emerald-500/20 transition-all duration-500 transform hover:-translate-y-2 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={32} />
              </div>
              <h3 className="text-lg font-bold mb-1 text-gray-500">{stat.title}</h3>
              <p className="text-4xl font-black font-mono text-gray-900 mb-2">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClimateStats;
