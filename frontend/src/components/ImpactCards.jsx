import React from 'react';
import { motion } from 'framer-motion';

const impacts = [
  {
    title: "Rising Sea Levels",
    description: "Coastal cities face unprecedented flooding and erosion as ice sheets melt.",
    image: "https://picsum.photos/seed/oceanrise/800/600"
  },
  {
    title: "Extreme Weather",
    description: "Increased frequency and severity of hurricanes, droughts, and heatwaves.",
    image: "https://picsum.photos/seed/storm/800/600"
  },
  {
    title: "Biodiversity Loss",
    description: "Habitats are changing faster than species can adapt, leading to mass extinctions.",
    image: "https://picsum.photos/seed/animals/800/600"
  }
];

const ImpactCards = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-heading font-black text-[var(--color-forest-canopy)] mb-4">Visible Impacts</h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {impacts.map((impact, idx) => (
            <motion.div 
              key={idx}
              className="relative group rounded-3xl overflow-hidden shadow-2xl cursor-pointer h-96 border border-transparent hover:border-emerald-500/30 hover:shadow-emerald-500/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -15, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-black">
                <img src={impact.image} alt={impact.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                <h3 className="text-3xl font-black mb-3 text-white group-hover:text-emerald-400 transition-colors">{impact.title}</h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{impact.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactCards;
