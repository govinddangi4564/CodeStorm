import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import API_URL from '../config/api';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertCircle, CheckCircle, Leaf } from 'lucide-react';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

const CarbonCalculator = () => {
    const { user, updateUserXP } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        transport: 10,
        energy: 50,
        diet: 5,
        shopping: 100
    });
    const [result, setResult] = useState(null);
    const [saved, setSaved] = useState(false);

    const data = [
      { name: 'Transport', value: formData.transport * 0.5 },
      { name: 'Energy', value: formData.energy * 0.3 },
      { name: 'Diet', value: formData.diet * 2 },
      { name: 'Shopping', value: formData.shopping * 1 }
    ];

    const totalCO2 = data.reduce((acc, curr) => acc + curr.value, 0).toFixed(1);

    const handleSlider = (e) => {
        setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
        setSaved(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if(!user) return alert("Log in to save!");
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_URL}/api/footprint/calculate`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResult(res.data.data.total_kg_co2);
            setSaved(true);
            
            // Sync new Gamification state instantly
            if (res.data.newXp !== undefined && res.data.newXp !== null) {
               updateUserXP(res.data.newXp);
            }
        } catch (err) {
            console.error(err);
            alert("Calculation error");
        }
    };

    return (
        <section className="py-24 bg-[var(--color-earth-sand)] dark:bg-[var(--color-deep-ocean)] min-h-screen transition-colors duration-700">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-black font-heading text-[var(--color-forest-canopy)] dark:text-white mb-6 drop-shadow-sm">Interactive Carbon Tracker</h2>
                    <p className="text-xl text-[var(--color-sage)] dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">Adjust the sliders below to calculate your estimated daily carbon footprint dynamically in real-time.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center object-contain">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="bg-gray-50 dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="space-y-10 relative z-10">
                            <div>
                                <div className="flex justify-between font-bold mb-3 dark:text-gray-200 uppercase tracking-widest text-sm text-emerald-600 dark:text-emerald-400">
                                    <label>🚗 Daily Commute (km)</label>
                                    <span className="bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-full">{formData.transport} km</span>
                                </div>
                                <motion.input whileHover={{ scale: 1.03 }} type="range" name="transport" min="0" max="100" value={formData.transport} onChange={handleSlider} className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                            </div>
                            
                            <div>
                                <div className="flex justify-between font-bold mb-3 dark:text-gray-200 uppercase tracking-widest text-sm text-yellow-600 dark:text-yellow-400">
                                    <label>💡 Home Energy (kWh)</label>
                                    <span className="bg-yellow-100 dark:bg-yellow-900/50 px-3 py-1 rounded-full">{formData.energy} kWh</span>
                                </div>
                                <motion.input whileHover={{ scale: 1.03 }} type="range" name="energy" min="0" max="200" value={formData.energy} onChange={handleSlider} className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500" />
                            </div>

                            <div>
                                <div className="flex justify-between font-bold mb-3 dark:text-gray-200 uppercase tracking-widest text-sm text-blue-600 dark:text-blue-400">
                                    <label>🥩 Meat/Dairy (portions)</label>
                                    <span className="bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full">{formData.diet} portions</span>
                                </div>
                                <motion.input whileHover={{ scale: 1.03 }} type="range" name="diet" min="0" max="15" value={formData.diet} onChange={handleSlider} className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                            </div>

                            <div>
                                <div className="flex justify-between font-bold mb-3 dark:text-gray-200 uppercase tracking-widest text-sm text-red-600 dark:text-red-400">
                                    <label>🛍️ Shopping/Goods ($)</label>
                                    <span className="bg-red-100 dark:bg-red-900/50 px-3 py-1 rounded-full">${formData.shopping}</span>
                                </div>
                                <motion.input whileHover={{ scale: 1.03 }} type="range" name="shopping" min="0" max="500" value={formData.shopping} onChange={handleSlider} className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500" />
                            </div>
                        </div>

                        <div className="mt-12 relative z-10">
                            <motion.button 
                                whileHover={saved ? {} : { scale: 1.02, y: -2 }}
                                whileTap={saved ? {} : { scale: 0.98 }}
                                onClick={handleSave} 
                                disabled={saved} 
                                className={`w-full py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-white text-lg ${saved ? 'bg-emerald-500 cursor-not-allowed opacity-90' : 'bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white shadow-xl hover:shadow-2xl'}`}
                            >
                                {saved ? <><CheckCircle size={24}/> Logged to Dashboard</> : <><Leaf size={24}/> Save Calculation</>}
                            </motion.button>
                            {!user && <p className="text-center text-sm text-red-500 mt-4 flex items-center justify-center gap-1 font-bold bg-red-50 dark:bg-red-900/20 py-2 rounded-lg"><AlertCircle size={16}/> You must be logged in to save progress.</p>}
                        </div>
                    </motion.div>

                    <motion.div 
                      key={totalCO2} 
                      initial={{ scale: 0.95, opacity: 0, x: 50 }} 
                      whileInView={{ scale: 1, opacity: 1, x: 0 }} 
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden h-[550px] flex flex-col items-center justify-center"
                    >
                        <h3 className="text-3xl font-black mb-2 dark:text-white">Estimated Impact</h3>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-6">Real-Time Visualizer</p>
                        
                        <div className="w-full h-72 relative mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={data} innerRadius={90} outerRadius={120} paddingAngle={5} dataKey="value" stroke="none">
                                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}/>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-5xl font-black font-mono text-gray-800 dark:text-gray-100">{totalCO2}</span>
                                <span className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">kg CO₂</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                            {data.map((entry, idx) => (
                                <div key={entry.name} className="flex items-center gap-2 text-sm font-black uppercase text-gray-600 dark:text-gray-300">
                                    <span className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: COLORS[idx] }}></span>
                                    {entry.name}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CarbonCalculator;
