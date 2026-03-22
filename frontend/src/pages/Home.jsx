import React from 'react';
import Hero from '../components/Hero';
import EarthVitals from '../components/EarthVitals';
import EndangeredBiomes from '../components/EndangeredBiomes';
import WhatIfSimulator from '../components/WhatIfSimulator';
import LiveWeather from '../components/LiveWeather';
import ClimateStats from '../components/ClimateStats';
import ImpactCards from '../components/ImpactCards';
import NewsSection from '../components/NewsSection';
import PledgeForm from '../components/PledgeForm';
import ChallengesSection from '../components/ChallengesSection';
import ClimateClock from '../components/ClimateClock';

const Home = () => {
  return (
    <div className="bg-[var(--color-earth-sand)] dark:bg-[var(--color-deep-ocean)] transition-colors duration-700 relative">
      <div className="fixed inset-0 bg-organic-gradient pointer-events-none z-0"></div>
      <Hero />
      <ClimateClock />
      <EarthVitals />
      <EndangeredBiomes />
      <WhatIfSimulator />
      <LiveWeather />
      <ChallengesSection />
      <NewsSection />
      <div className="py-32 bg-gradient-to-t from-[var(--color-earth-sand)] to-white relative overflow-hidden dark:from-black dark:to-[var(--color-deep-ocean)]">
        <PledgeForm />
      </div>
    </div>
  );
};

export default Home;
