
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 800); 
          return 100;
        }
        const increment = Math.random() * 2 + 1; // Faster loading
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-gold-500 overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-8">
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-700 drop-shadow-[0_0_15px_rgba(212,163,44,0.5)] mb-8"
          >
              ZERONE
          </motion.h1>
          
          {/* Progress Container */}
          <div className="w-full h-1 bg-gray-900 rounded overflow-hidden border border-gold-900/30 relative">
              {/* Glowing leading edge */}
              <motion.div 
                className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-gold-400 to-transparent z-20 blur-sm"
                style={{ left: `${progress}%`, translateX: '-50%' }}
              />
              
              {/* Bar */}
              <motion.div 
                className="h-full bg-gold-600 relative z-10"
                style={{ width: `${progress}%` }}
              />
          </div>

          <div className="w-full flex justify-between items-center mt-2">
            <span className="text-xs font-mono text-gold-600">{Math.round(progress).toString().padStart(2, '0')}%</span>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 font-serif tracking-[0.3em] text-gold-300/60 uppercase text-xs md:text-sm animate-pulse"
          >
              Opening the Zerone Yuga...
          </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
