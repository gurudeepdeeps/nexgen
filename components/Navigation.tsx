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
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050101]/90 backdrop-blur-md border-b border-gold-900/50 hidden md:block shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div 
              className="text-2xl font-display text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 tracking-widest cursor-pointer hover:scale-105 transition-transform" 
              onClick={() => handleNavClick('home')}
            >
                ZERONE 3.0
            </div>
            <div className="flex space-x-8">
                {links.map((link) => (
                <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-xs lg:text-sm font-serif tracking-[0.2em] transition-all duration-300 relative group py-2 ${activeView === link.id ? 'text-gold-400' : 'text-gray-400 hover:text-gold-200'}`}
                >
                    {link.label.toUpperCase()}
                    {/* Animated Underline */}
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent transform transition-transform duration-300 origin-center ${activeView === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
                    {/* Glow effect */}
                    <span className={`absolute inset-0 bg-gold-500/10 blur-md rounded-lg transition-opacity duration-300 ${activeView === link.id ? 'opacity-100' : 'opacity-0'}`} />
                </button>
                ))}
            </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-black/80 border border-gold-600 rounded-full text-gold-400 shadow-[0_0_15px_#D4A32C]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center space-y-8 md:hidden backdrop-blur-xl"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 border-[20px] border-[#1a0505] pointer-events-none" />
            
            {links.map((link, idx) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleNavClick(link.id)}
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