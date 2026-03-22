import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Activity, Thermometer, Waves } from 'lucide-react';

const EarthVitals = () => {
    const [vitals, setVitals] = useState({
        co2: null,
        temp: null,
        arctic: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEarthData = async () => {
            try {
                // Fetching from official scientific aggregates (Global-Warming.org API)
                const [co2Res, tempRes, arcticRes] = await Promise.all([
                    axios.get('https://global-warming.org/api/co2-api'),
                    axios.get('https://global-warming.org/api/temperature-api'),
                    axios.get('https://global-warming.org/api/arctic-api')
                ]);

                // Extract latest data points
                const latestCO2 = co2Res.data.co2[co2Res.data.co2.length - 1];
                const latestTemp = tempRes.data.result[tempRes.data.result.length - 1];
                
                // Arctic Data is an object with YYYYMM keys
                const arcticDataObj = arcticRes.data.arcticData.data;
                const arcticKeys = Object.keys(arcticDataObj).sort();
                const latestArctic = arcticDataObj[arcticKeys[arcticKeys.length - 1]];

                setVitals({
                    co2: latestCO2,
                    temp: latestTemp,
                    arctic: latestArctic
                });
            } catch (err) {
                console.error("Error fetching scientific data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEarthData();
    }, []);

    const metrics = [
        {
            title: "Atmospheric CO₂",
            value: vitals.co2 ? `${vitals.co2.cycle} ppm` : '...',
            description: "Carbon dioxide levels are higher than at any point in at least the past 800,000 years.",
            icon: <Activity className="w-10 h-10 text-[var(--color-terracotta)]" />,
            trend: "+ Rapid Increase",
            trendColor: "text-red-500"
        },
        {
            title: "Global Temperature",
            value: vitals.temp ? `+${vitals.temp.station}°C` : '...',
            description: "Earth's global average surface temperature anomaly compared to the long-term average.",
            icon: <Thermometer className="w-10 h-10 text-orange-500" />,
            trend: "Warming Trend",
            trendColor: "text-red-500"
        },
        {
            title: "Arctic Sea Ice",
            value: vitals.arctic ? `${vitals.arctic.value}M km²` : '...',
            description: "The minimum extent of Arctic sea ice drops significantly by 12.6% per decade.",
            icon: <Waves className="w-10 h-10 text-blue-500" />,
            trend: "- Severe Decline",
            trendColor: "text-blue-500"
        }
    ];

    return (
        <section className="py-32 bg-[var(--color-earth-sand)] dark:bg-[var(--color-deep-ocean)] transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-terracotta)] opacity-5 rounded-full filter blur-[100px] transform translate-x-1/2 -translate-y-1/4"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-6xl md:text-7xl font-black font-heading tracking-tight mb-6 dark:text-gray-100">Live Earth Vitals</h2>
                    <p className="text-xl md:text-2xl font-serif italic text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Scientific, real-time data feeding directly from global observatory aggregates. This is the heartbeat of our planet right now.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {metrics.map((metric, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className="earth-panel p-10 rounded-[2.5rem] flex flex-col justify-between group transform hover:-translate-y-2 transition-transform duration-500"
                        >
                            <div className="mb-12 flex justify-between items-start">
                                <div className="p-4 rounded-2xl bg-white dark:bg-black/30 shadow-inner">
                                    {metric.icon}
                                </div>
                                <span className={`text-xs font-black uppercase tracking-widest ${metric.trendColor} bg-white dark:bg-black/40 px-3 py-1.5 rounded-full shadow-sm`}>
                                    {metric.trend}
                                </span>
                            </div>
                            
                            <div>
                                {loading ? (
                                    <div className="h-16 w-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg mb-4"></div>
                                ) : (
                                    <h3 className="text-5xl md:text-6xl font-black font-mono tracking-tighter mb-4 text-[var(--color-deep-ocean)] dark:text-white">
                                        {metric.value}
                                    </h3>
                                )}
                                <h4 className="text-2xl font-bold font-heading mb-4 dark:text-gray-200">{metric.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                    {metric.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EarthVitals;
