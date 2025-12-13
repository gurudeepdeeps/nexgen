
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Compass } from 'lucide-react';

interface NotFoundProps {
    onGoHome: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onGoHome }) => {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black overflow-hidden text-center px-4">
        
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2a0a0a_0%,_#000000_70%)] opacity-80" />
        <div className="absolute inset-0 opacity-20" 
            style={{ 
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-scales.png")', 
                backgroundSize: '100px' 
            }} 
        />

        {/* Animated 404 Text */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10"
        >
            <h1 className="text-[8rem] md:text-[15rem] leading-none font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-black drop-shadow-[0_0_10px_rgba(212,163,44,0.2)]"
                style={{ WebkitTextStroke: '2px rgba(212, 163, 44, 0.3)' }}
            >
                404
            </h1>
            
            {/* Cracked effect overlay (CSS shapes) */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-black rotate-12 opacity-50"></div>
            <div className="absolute top-1/3 right-0 w-full h-0.5 bg-black -rotate-12 opacity-50"></div>
        </motion.div>

        {/* Message */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 max-w-lg mx-auto mt-[-20px] md:mt-[-40px]"
        >
            <div className="flex justify-center mb-6">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-gold-600 opacity-60"
                 >
                    <Compass className="w-16 h-16" />
                 </motion.div>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-display text-gold-500 mb-4 tracking-widest">
                THE SCROLL IS LOST
            </h2>
            <p className="text-gray-400 font-serif text-sm md:text-lg mb-8 leading-relaxed">
                You have ventured into the Void, a realm unknown to the Empire. 
                Turn back, warrior, before the darkness consumes you.
            </p>

            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,163,44,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onGoHome}
                className="group relative px-8 py-4 bg-transparent border border-gold-500 rounded flex items-center justify-center gap-3 mx-auto overflow-hidden transition-colors hover:bg-gold-900/20"
            >
                 <div className="absolute inset-0 bg-gold-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                 <Home className="w-5 h-5 text-gold-400 group-hover:text-gold-200" />
                 <span className="text-gold-400 font-sans font-bold tracking-[0.2em] uppercase group-hover:text-gold-200">
                     Return to Kingdom
                 </span>
            </motion.button>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-gray-600 rounded-full opacity-20"
                    style={{
                        width: Math.random() * 4 + 1,
                        height: Math.random() * 4 + 1,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{ y: [0, -100], opacity: [0, 0.5, 0] }}
                    transition={{ duration: Math.random() * 5 + 5, repeat: Infinity }}
                />
            ))}
        </div>

    </div>
  );
};

export default NotFound;
