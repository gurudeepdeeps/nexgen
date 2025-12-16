
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download, ChevronRight, Calendar } from 'lucide-react';

// Declare global to access the gtag function defined in App.tsx or index.html
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const Hero: React.FC<{ onChangeView: (view: string) => void }> = ({ onChangeView }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const ringsX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const ringsY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth - 0.5;
    const y = clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    // Set Date to Dec 24, 2025
    const targetDate = new Date('2025-12-24T09:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadBrochure = async () => {
      setIsDownloading(true);

      const fileName = 'BROCHURE.pdf';
      const pdfUrl = '/BROCHURE.pdf';

      // Track download event
      if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'file_download', {
              file_name: fileName,
              file_extension: 'pdf',
              link_url: pdfUrl
          });
      }

      try {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } finally {
        setIsDownloading(false);
      }
  };

  return (
    <div 
        className="w-full overflow-hidden perspective-1000 relative z-20"
        onMouseMove={handleMouseMove}
    >
        {/* --- LIGHTING & AMBIANCE LAYERS --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Subtle Golden Spotlight behind Title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-gold-600/5 rounded-full blur-[100px]" />
        </div>

        {/* Full Screen Hero Section */}
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-transparent overflow-hidden pt-20 pb-8 md:pt-32 md:pb-0">
        
        {/* 3D Rotating Rings Background with Parallax */}
        <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] md:w-[900px] md:h-[900px] rounded-full border border-gold-900/10 pointer-events-none"
            animate={{ rotate: 360 }}
            style={{ 
                x: ringsX, 
                y: ringsY,
                perspective: 1000 
            }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
            <div className="absolute inset-0 rounded-full border-t-[3px] border-gold-500/20 transform rotate-45" />
            <div className="absolute inset-20 rounded-full border-b-[3px] border-red-900/30 transform -rotate-45" />
            <div className="absolute inset-40 rounded-full border-l-[3px] border-gold-300/10 transform rotate-12" />
        </motion.div>

        {/* Main Content */}
        <motion.div 
            className="relative z-30 text-center px-4 w-full max-w-7xl flex flex-col items-center justify-center"
        >
             {/* --- HEADER SECTION: COLLEGE & DEPT --- */}
             <motion.div
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2, duration: 0.8 }}
                 className="w-full max-w-6xl mx-auto mb-4 relative z-10"
             >
                {/* Bordered Royal Badge Container */}
                <div className="relative border border-gold-600/40 bg-black/60 backdrop-blur-md rounded-xl p-4 md:px-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] mx-auto w-full max-w-[95%] md:max-w-full">
                    
                    {/* Decorative Corner Accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold-500 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold-500 rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold-500 rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold-500 rounded-br-lg" />

                    {/* Logo Area */}
                    <div className="relative shrink-0 mb-1 md:mb-0">
                         <div className="absolute inset-0 bg-white/10 blur-xl rounded-full" />
                         <img 
                            src={new URL('../SIT-Tumkur-Logo.png', import.meta.url).href} 
                            alt="SIT Logo" 
                            className="relative w-12 h-12 md:w-20 md:h-20 object-contain"
                         />
                    </div>

                    {/* Text Area - Centered Items */}
                    <div className="text-center flex flex-col items-center justify-center w-full">
                        <h3 className="text-white font-serif text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold tracking-wider mb-1 leading-tight text-shadow-strong md:whitespace-nowrap px-2">
                            SIDDAGANGA INSTITUTE OF TECHNOLOGY
                        </h3>
                        {/* Divider */}
                        <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-1 opacity-60" />
                        <h4 className="text-gold-400 font-display text-xs sm:text-sm md:text-lg tracking-[0.2em] uppercase font-bold text-center px-1">
                            Organized by Dept. of MCA
                        </h4>
                    </div>
                </div>

                {/* Presented By Section - Below the Box */}
                <div className="text-center mt-4 md:mt-6">
                    <p className="text-gold-200/60 font-serif text-[10px] md:text-xs tracking-[0.25em] uppercase mb-1">
                        In Association With Students Coding Club
                    </p>
                    <h5 className="text-gold-500 font-display text-lg md:text-2xl tracking-[0.2em] uppercase text-shadow-gold flex flex-col md:flex-row items-center justify-center gap-2">
                        PIEDPIPERS <span className="text-[10px] md:text-xs text-gold-600 tracking-widest font-sans opacity-80 md:mt-1">Presents</span>
                    </h5>
                </div>
             </motion.div>

            {/* --- EVENT TITLE SECTION --- */}
            <div className="relative py-0 perspective-1000 group cursor-default w-full mt-0">
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.5 }}
                    className="relative z-10 text-5xl md:text-[8rem] lg:text-[10rem] leading-none font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffecb3] via-[#d4a32c] to-[#5c4005] drop-shadow-2xl"
                    style={{
                        textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 50px rgba(212, 163, 44, 0.3)',
                        WebkitTextStroke: '1px rgba(138, 110, 40, 0.5)'
                    }}
                >
                    ZERONE 3.0
                </motion.h1>
            </div>

            {/* Subtitle */}
            <div className="flex items-center justify-center gap-3 md:gap-6 mb-2 md:mb-3">
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-gold-500 text-lg md:text-2xl hidden md:block">✦</motion.div>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-2xl md:text-6xl font-serif text-white tracking-[0.3em] uppercase"
                    style={{ textShadow: '0 0 20px rgba(212, 163, 44, 0.6)' }}
                >
                    YUGA
                </motion.h2>
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-gold-500 text-lg md:text-2xl hidden md:block">✦</motion.div>
            </div>
            
            <p className="text-gold-200/60 font-sans tracking-[0.3em] text-xs md:text-lg mb-6 md:mb-8 uppercase px-6 py-1">
                The Age of Digital Empire
            </p>

            {/* Date & Countdown Container */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8 md:mb-12">
                {/* Date Display */}
                <div className="flex items-center gap-4 bg-black/80 border border-gold-600 px-6 py-3 rounded-lg backdrop-blur-md shadow-[0_0_20px_rgba(212,163,44,0.15)] scale-90 md:scale-100">
                    <Calendar className="text-gold-400 w-6 h-6" />
                    <span className="text-gold-100 font-serif text-2xl tracking-widest border-r border-gold-600/50 pr-4 mr-1">DEC 24</span>
                    <span className="text-gold-400 font-sans text-xl">2025</span>
                </div>

                {/* Countdown */}
                <div className="flex gap-4 font-serif text-gold-300 scale-90 md:scale-100">
                    {[
                        { label: 'Days', val: timeLeft.days },
                        { label: 'Hours', val: timeLeft.hours },
                        { label: 'Min', val: timeLeft.minutes },
                        { label: 'Sec', val: timeLeft.seconds }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div className="relative group">
                                <span className="text-xl md:text-3xl font-bold border border-gold-800 bg-black/80 px-3 py-2 rounded backdrop-blur-md min-w-[60px] inline-block text-center shadow-[0_0_15px_rgba(212,163,44,0.2)] border-b-2 border-b-gold-600">
                                    {String(item.val).padStart(2, '0')}
                                </span>
                            </div>
                            <span className="text-[10px] mt-1 uppercase tracking-widest text-gold-500 font-sans font-bold">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-4xl relative z-40 pb-8 md:pb-16">
                
                {/* Enter Arena Button */}
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,163,44,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onChangeView('events')}
                    className="relative group w-full md:w-64 h-14 md:h-16 bg-black/40 border border-gold-500 rounded flex items-center justify-center overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(212,163,44,0.1)]"
                >
                    <div className="absolute inset-0 bg-gold-600/10 group-hover:bg-gold-600/20 transition-colors" />
                    <div className="absolute inset-1 border border-gold-500/30 rounded-sm" />
                    <span className="relative z-10 flex items-center justify-center gap-3 text-gold-100 font-serif font-bold tracking-[0.15em] uppercase text-sm md:text-base">
                        ENTER THE YUGA <ChevronRight className="w-5 h-5 text-gold-400 group-hover:translate-x-1 transition-transform" />
                    </span>
                </motion.button>
                
                {/* Download Brochure Button */}
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,163,44,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadBrochure}
                    disabled={isDownloading}
                    className="relative group w-full md:w-64 h-14 md:h-16 bg-black/40 border border-gold-500 rounded flex items-center justify-center overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(212,163,44,0.1)]"
                >
                     <div className="absolute inset-0 bg-gold-600/10 group-hover:bg-gold-600/20 transition-colors" />
                    <div className="absolute inset-1 border border-gold-500/30 rounded-sm" />
                    <span className="relative z-10 flex items-center justify-center gap-3 text-gold-100 font-sans font-bold tracking-[0.15em] uppercase text-sm md:text-base">
                        <Download className={`w-5 h-5 text-gold-400 ${isDownloading ? 'animate-bounce' : ''}`} /> 
                        {isDownloading ? 'DOWNLOADING...' : 'DOWNLOAD BROCHURE'}
                    </span>
                </motion.button>

            </div>
        </motion.div>
        
        </div>
    </div>
  );
};
