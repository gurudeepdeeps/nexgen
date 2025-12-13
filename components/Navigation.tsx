
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavProps {
  activeView: string;
  onChangeView: (view: string) => void;
}

const Navigation: React.FC<NavProps> = ({ activeView, onChangeView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'events', label: 'Events' },
    { id: 'rules', label: 'Rules' },
    { id: 'roadmap', label: 'Timeline' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onChangeView(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Sticky Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-gold-900/50 hidden md:block shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Left Side: Brand & College Identity */}
            <div 
              className="flex items-center gap-4 cursor-pointer group select-none min-w-[300px]" 
              onClick={() => handleNavClick('home')}
            >
                <div className="flex flex-col justify-center">
                    <span 
                      className="text-2xl font-display text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 tracking-widest drop-shadow-[0_2px_5px_rgba(212,163,44,0.5)] group-hover:text-gold-300 transition-colors leading-none mt-0.5"
                    >
                        ZERONE
                    </span>
                </div>
            </div>

            {/* Right Side: Links */}
            <div className="flex items-center space-x-6">
                {links.map((link) => (
                <motion.button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    whileHover={{ scale: 1.1, textShadow: "0 0 10px #D4A32C" }}
                    whileTap={{ scale: 0.95, y: 2 }}
                    className={`relative px-4 py-2 text-xs lg:text-sm font-serif tracking-[0.2em] transition-all duration-200 rounded-md group overflow-hidden ${activeView === link.id ? 'text-gold-400' : 'text-gray-300 hover:text-gold-100'}`}
                >
                    <span className="relative z-10">{link.label.toUpperCase()}</span>
                    
                    {/* Background Glow Pill on Hover */}
                    <motion.div 
                        className="absolute inset-0 bg-gold-900/30 rounded-md z-0"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                    />
                    
                    {/* Active Indicator Underline */}
                    {activeView === link.id && (
                        <motion.div 
                            layoutId="nav-underline"
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-500 shadow-[0_0_10px_#D4A32C]" 
                        />
                    )}
                </motion.button>
                ))}
            </div>
        </div>
      </nav>

      {/* Mobile Sticky Header Bar */}
      <div className="fixed top-0 left-0 w-full z-50 md:hidden flex items-center justify-between px-4 py-3 bg-black/95 backdrop-blur-xl border-b border-gold-900/40 shadow-lg">
          {/* Mobile Brand */}
          <div className="flex items-center gap-3" onClick={() => handleNavClick('home')}>
              <img 
                src="https://img.collegepravesh.com/2018/10/SIT-Tumkur-Logo.png" 
                alt="SIT Logo" 
                className="w-9 h-9 object-contain bg-white/95 p-0.5 rounded-full shadow-[0_0_10px_rgba(212,163,44,0.3)]"
              />
              <div className="flex flex-col">
                  <span className="text-[10px] text-gold-400 uppercase tracking-widest leading-tight font-bold">SIT Tumkur</span>
                  <span className="text-gold-500 font-display text-lg tracking-[0.15em] leading-none">ZERONE</span>
              </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gold-400 hover:text-gold-200 focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center space-y-6 md:hidden backdrop-blur-xl"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 border-[20px] border-[#1a0505] pointer-events-none" />
            
            {/* Links */}
            {links.map((link, idx) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleNavClick(link.id)}
                whileTap={{ scale: 0.9 }}
                className={`text-3xl font-display tracking-widest ${activeView === link.id ? 'text-gold-400 scale-110' : 'text-white'}`}
              >
                {link.label.toUpperCase()}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
