import React from 'react';
import { Leaf, Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/90 dark:bg-black text-gray-300 py-20 border-t border-gray-800 transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 text-3xl font-black font-heading text-white mb-6 group">
              <Leaf className="text-emerald-500 w-8 h-8 group-hover:rotate-12 transition-transform" />
              ClimateAct
            </Link>
            <p className="text-gray-400 mb-10 max-w-md leading-relaxed font-medium">
              A global initiative to track, understand, and reduce our collective carbon footprint. Every small action ripples into massive change.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">
                <Github size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-sm flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Platform</h4>
            <ul className="space-y-5 text-sm font-bold text-gray-400">
              <li><Link to="/calculator" className="hover:text-emerald-400 hover:pl-2 transition-all block">Carbon Calculator</Link></li>
              <li><Link to="/pledge" className="hover:text-emerald-400 hover:pl-2 transition-all block">Community Pledges</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 hover:pl-2 transition-all block">XP Dashboard</Link></li>
              <li><Link to="/articles" className="hover:text-emerald-400 hover:pl-2 transition-all block">Climate Intel</Link></li>
            </ul>
          </div>
          
          <div>
             <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-sm flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Legal & Connect</h4>
            <ul className="space-y-5 text-sm font-bold text-gray-400">
              <li><a href="#" className="hover:text-blue-400 hover:pl-2 transition-all block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 hover:pl-2 transition-all block">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 hover:pl-2 transition-all block">Contact HQ</a></li>
              <li><a href="#" className="hover:text-blue-400 hover:pl-2 transition-all block">Data Sources</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center text-xs font-black text-gray-600 tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} CLIMATEACT INITIATIVE. ALL RIGHTS RESERVED.</p>
          <p className="mt-6 md:mt-0 flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-full">BUILT FOR EARTH <Leaf size={14} className="text-emerald-500"/></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
