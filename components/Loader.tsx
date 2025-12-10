import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Sequence: 
    // 0-2s: Build up
    // 2-3.5s: Explosion/Reveal
    // 3.5s: Done
    const timer = setTimeout(() => {
      setIsFinished(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 500); // Wait for exit animation
    }, 3500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
            {/* Background Chaos */}
            <div className="absolute inset-0 opacity-20">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-900 via-black to-black animate-pulse"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center">
                
                {/* Central Orb Assembly */}
                <div className="relative w-40 h-40 flex items-center justify-center mb-12">
                    {/* Core */}
                    <motion.div 
                        className="w-4 h-4 bg-gold-100 rounded-full shadow-[0_0_50px_#D4A32C]"
                        animate={{ scale: [1, 20, 0.5, 50], opacity: [1, 1, 1, 0] }}
                        transition={{ duration: 3.5, times: [0, 0.6, 0.8, 1] }}
                    />
                    
                    {/* Spinning Rings */}
                    <motion.div 
                        className="absolute w-full h-full border-4 border-gold-500/30 rounded-full border-t-gold-100"
                        animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                     <motion.div 
                        className="absolute w-3/4 h-3/4 border-4 border-gold-700/30 rounded-full border-b-gold-300"
                        animate={{ rotate: -360, scale: [1, 0.8, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {/* Text Build Up */}
                <div className="text-center overflow-hidden">
                    <motion.h1 
                        className="text-4xl md:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-gold-200 to-gold-600 tracking-[0.5em] font-bold"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        ZERONE
                    </motion.h1>
                    
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="h-1 bg-gold-500 mx-auto mt-4"
                    />

                    <motion.p 
                        className="text-gold-400/80 font-sans tracking-[1em] mt-4 text-sm"
                        initial={{ opacity: 0, letterSpacing: '0em' }}
                        animate={{ opacity: 1, letterSpacing: '1em' }}
                        transition={{ delay: 1.5, duration: 1.5 }}
                    >
                        INITIALIZING EMPIRE
                    </motion.p>
                </div>
            </div>
            
            {/* Warp Speed Lines */}
            <motion.div 
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                {/* Simulated stars passing by */}
            </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;