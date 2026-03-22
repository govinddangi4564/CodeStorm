import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, MapPin, CloudRain, Sun, Cloud, Snowflake, Wind } from 'lucide-react';

const LiveWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('London');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

  // Dynamic Backgrounds based on WMO Weather codes
  const getTheme = (code) => {
    if(code === 0) return { bg: 'from-blue-400 to-yellow-300', icon: <Sun size={48} className="text-yellow-400"/>, text: 'Clear Sky' };
    if(code > 0 && code <= 3) return { bg: 'from-gray-400 to-blue-300', icon: <Cloud size={48} className="text-gray-200"/>, text: 'Partly Cloudy' };
    if(code >= 51 && code <= 67) return { bg: 'from-blue-800 to-gray-600', icon: <CloudRain size={48} className="text-blue-300"/>, text: 'Rain' };
    if(code >= 71 && code <= 77) return { bg: 'from-gray-300 to-blue-200', icon: <Snowflake size={48} className="text-white"/>, text: 'Snow' };
    return { bg: 'from-gray-700 to-gray-900', icon: <Wind size={48} className="text-gray-400"/>, text: 'Overcast / Storm' };
  };

  const fetchWeather = async (lat, lon, locationName) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`);
      
      setWeather({
        current: res.data.current,
        theme: getTheme(res.data.current.weather_code)
      });
      setCity(locationName);

      const daily = res.data.daily;
      const forecastData = [];
      for(let i=1; i<=5; i++){
         forecastData.push({
           date: new Date(daily.time[i]).toLocaleDateString('en-US', { weekday: 'short' }),
           max: Math.round(daily.temperature_2m_max[i]),
           min: Math.round(daily.temperature_2m_min[i]),
           theme: getTheme(daily.weather_code[i])
         });
      }
      setForecast(forecastData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async (e) => {
    e.preventDefault();
    if(!searchInput) return;
    try {
      const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}&count=5`);
      if(res.data.results && res.data.results.length > 0) {
        // Sort by population to find the exact intended major city (e.g., Indore vs Indhur village)
        const bestMatch = res.data.results.sort((a,b) => (b.population || 0) - (a.population || 0))[0];
        const { latitude, longitude, name, country } = bestMatch;
        fetchWeather(latitude, longitude, `${name}, ${country}`);
      } else {
        alert("City not found");
      }
    } catch (err) { console.error(err); }
  };

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude, "Your Location");
        },
        (error) => alert('Geolocation failed or denied. Allow location to use this feature.')
      );
    }
  };

  useEffect(() => {
    fetchWeather(51.5085, -0.1257, 'London, United Kingdom');
  }, []);

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
           <h2 className="text-5xl font-heading font-black dark:text-white mb-4 text-[var(--color-forest-canopy)]">Global Weather Interface</h2>
           <p className="text-gray-500 text-lg">Dynamic UI responding to real-time open climate data.</p>
        </div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className={`max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 bg-gradient-to-br ${weather?.theme?.bg || 'from-gray-200 to-gray-300'}`}
        >
          <div className="p-8 md:p-12 backdrop-blur-md bg-black/30 text-white min-h-[450px]">
            {/* Top Bar: Search & Location */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
              <button 
                onClick={getLocationWeather}
                className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-4 rounded-full font-bold transition backdrop-blur-md w-full md:w-auto shadow-lg"
              >
                <MapPin size={20} /> Current Location
              </button>
              
              <form onSubmit={searchCity} className="flex flex-1 w-full max-w-md relative">
                <input 
                  type="text" 
                  placeholder="Search any city..." 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-white/20 backdrop-blur-md outline-none border border-white/30 rounded-full py-4 px-6 text-white placeholder-white/70 shadow-inner text-lg font-medium"
                />
                <button type="submit" className="absolute right-2 top-2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition shadow-lg">
                  <Search size={24} />
                </button>
              </form>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-48 animate-pulse text-2xl font-black">Fetching Atmosperic Data...</div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row items-center justify-between xl:px-8 mb-12 gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-4xl md:text-6xl font-black drop-shadow-2xl mb-2">{city}</h3>
                    <p className="text-xl md:text-2xl font-bold tracking-widest uppercase opacity-90 drop-shadow-md">{weather?.theme?.text}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="filter drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] transform scale-125">
                      {weather?.theme?.icon}
                    </div>
                    <div className="text-7xl md:text-9xl font-mono font-black tracking-tighter drop-shadow-2xl">
                      {weather?.current?.temperature_2m}°
                    </div>
                  </div>
                </div>

                {/* 5-Day Forecast Widget */}
                <div className="bg-black/20 rounded-3xl p-6 border border-white/20 shadow-2xl backdrop-blur-xl">
                  <h4 className="text-sm uppercase tracking-[0.2em] font-bold mb-6 opacity-90 flex items-center justify-between">
                    <span>5-Day Climate Forecast</span>
                    <span className="flex gap-4">
                      <span>💧 {weather?.current?.relative_humidity_2m}%</span>
                      <span>💨 {weather?.current?.wind_speed_10m}km/h</span>
                    </span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {forecast.map((day, idx) => (
                      <div key={idx} className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 text-center flex flex-col items-center transition cursor-pointer border border-white/5 hover:border-white/20 shadow-lg">
                        <p className="font-bold mb-3 uppercase text-sm tracking-wider">{day.date}</p>
                        <div className="mb-4 transform scale-110 drop-shadow-lg">{day.theme.icon}</div>
                        <div className="text-2xl font-black">{day.max}°</div>
                        <div className="text-sm opacity-70 font-bold">{day.min}°</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveWeather;
