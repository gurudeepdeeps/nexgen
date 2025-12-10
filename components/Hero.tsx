import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, ChevronRight, Trophy, Sword, Star, Crown, Calendar } from 'lucide-react';

const Hero: React.FC<{ onChangeView: (view: string) => void }> = ({ onChangeView }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    // Set Date to May 25, 2025
    const targetDate = new Date('2025-05-25T09:00:00').getTime();
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

  const handleDownloadBrochure = (e: React.MouseEvent) => {
      e.preventDefault();
      const link = document.createElement("a");
      link.href = "data:text/plain;charset=utf-8," + encodeURIComponent("ZERONE 3.0 Brochure Content Simulation...");
      link.download = "zerone_brochure.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Brochure download started!");
  };

  return (
    <div className="w-full overflow-hidden perspective-1000">
        {/* Full Screen Hero Section */}
        <div className="relative min-h-screen w-full flex items-center justify-center bg-transparent pt-24 pb-10 overflow-hidden">
        
        {/* 3D Rotating Rings Background (Replaces Sword) */}
        <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-gold-900/10 pointer-events-none"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            style={{ perspective: 1000 }}
        >
            <div className="absolute inset-0 rounded-full border-t-[3px] border-gold-500/20 transform rotate-45" />
            <div className="absolute inset-20 rounded-full border-b-[3px] border-red-900/30 transform -rotate-45" />
            <div className="absolute inset-40 rounded-full border-l-[3px] border-gold-300/10 transform rotate-12" />
        </motion.div>

        {/* Main Content */}
        <motion.div 
            style={{ y: titleY, opacity }}
            className="relative z-10 text-center px-4 w-full max-w-6xl flex flex-col items-center mt-8"
        >
            
            {/* Top Organization Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 flex flex-col items-center justify-center gap-4"
            >
                <div className="flex items-center gap-4">
                     <img 
                        src="https://img.collegepravesh.com/2018/10/SIT-Tumkur-Logo.png" 
                        alt="SIT Logo" 
                        className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    />
                    <div className="text-left">
                        <h3 className="text-gray-300 font-serif text-sm md:text-lg tracking-wider">
                            SIDDAGANGA INSTITUTE OF TECHNOLOGY
                        </h3>
                         <p className="text-gold-500/80 font-sans text-xs uppercase tracking-[0.2em] font-bold">
                            Organized by Dept. of MCA
                        </p>
                    </div>
                </div>
            </motion.div>

             {/* Presented By */}
             <motion.div
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 0.3, duration: 0.8 }}
                 className="mb-2"
             >
                <span className="text-gold-400 font-display text-lg md:text-2xl tracking-[0.3em] uppercase border-b border-gold-800 pb-1">
                    Presented by Pied Pipers
                </span>
             </motion.div>

            {/* EPIC MAIN TITLE */}
            <div className="relative py-4 md:py-8 perspective-1000 group cursor-default w-full">
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.5 }}
                    className="relative z-10 text-6xl md:text-[9rem] leading-none font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffecb3] via-[#d4a32c] to-[#5c4005] drop-shadow-2xl"
                    style={{
                        textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 50px rgba(212, 163, 44, 0.3)',
                        WebkitTextStroke: '2px rgba(138, 110, 40, 0.3)'
                    }}
                >
                    ZERONE 3.0
                </motion.h1>
            </div>

            {/* Subtitle */}
            <div className="flex items-center justify-center gap-6 mb-8">
                <motion.div animate={{ x: [-5, 0, -5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-gold-500 text-2xl hidden md:block">✦</motion.div>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-3xl md:text-6xl font-serif text-white tracking-[0.2em] uppercase"
                    style={{ textShadow: '0 0 20px rgba(212, 163, 44, 0.6)' }}
                >
                    YUGA
                </motion.h2>
                <motion.div animate={{ x: [5, 0, 5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-gold-500 text-2xl hidden md:block">✦</motion.div>
            </div>
            
            <p className="text-gold-200/60 font-sans tracking-[0.5em] text-xs md:text-lg mb-8 uppercase">The Age of Digital Empires</p>

            {/* Date Display */}
            <div className="flex items-center gap-3 bg-gold-900/30 border border-gold-600/50 px-6 py-3 rounded-full mb-10 backdrop-blur-md">
                 <Calendar className="text-gold-400 w-5 h-5" />
                 <span className="text-gold-100 font-serif text-lg tracking-widest border-r border-gold-600/50 pr-4 mr-1">MAY 25 & 26</span>
                 <span className="text-gold-400 font-sans text-sm">2025</span>
            </div>

            {/* Countdown */}
            <div className="flex justify-center flex-wrap gap-4 md:gap-8 mb-10 font-serif text-gold-300">
            {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Min', val: timeLeft.minutes },
                { label: 'Sec', val: timeLeft.seconds }
            ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                    <div className="relative group">
                        <span className="text-xl md:text-4xl font-bold border border-gold-800 bg-black/60 px-3 py-2 md:px-4 md:py-3 rounded backdrop-blur-md min-w-[60px] md:min-w-[70px] inline-block text-center shadow-[0_0_15px_rgba(212,163,44,0.3)] border-b-4 border-b-gold-600">
                            {String(item.val).padStart(2, '0')}
                        </span>
                    </div>
                    <span className="text-[10px] mt-2 uppercase tracking-widest text-gold-600 font-sans">{item.label}</span>
                </div>
            ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,163,44,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onChangeView('events')}
                    className="relative px-12 py-4 bg-[#1a0505] border border-gold-600 text-gold-100 font-bold font-serif tracking-widest text-lg group overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        ENTER THE ARENA <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
                </motion.button>
                
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownloadBrochure}
                    className="px-8 py-4 text-gray-400 font-sans tracking-widest text-sm flex items-center gap-2 hover:text-gold-300 transition-colors uppercase border-b border-transparent hover:border-gold-500"
                >
                    <Download className="w-4 h-4" />
                    Get Decree (Brochure)
                </motion.button>
            </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
             <div className="w-6 h-10 border-2 border-gold-500 rounded-full flex justify-center p-2 bg-black/50 backdrop-blur">
                 <div className="w-1 h-2 bg-gold-500 rounded-full animate-bounce" />
             </div>
        </motion.div>
        </div>

        {/* Scrollable Content Section 1: Highlights */}
        <div className="relative z-10 bg-[#0a0202] py-20 px-6 border-t border-gold-900/50">
             <div className="max-w-6xl mx-auto">
                 <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-5xl font-display text-gold-400 mb-4">THE REALM HIGHLIGHTS</h2>
                     <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-600 to-transparent mx-auto" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <FeatureCard icon={<Trophy className="w-8 h-8 text-gold-400" />} title="Epic Prize Pool" desc="Compete for glory and riches. Over ₹50,000 worth of treasures await the victors." />
                     <FeatureCard icon={<Sword className="w-8 h-8 text-gold-400" />} title="8 Legendary Events" desc="From coding battles to treasure hunts, prove your mettle across diverse domains." />
                     <FeatureCard icon={<Star className="w-8 h-8 text-gold-400" />} title="Cultural Saga" desc="Experience the fusion of technology and tradition. A grand feast for the eyes and mind." />
                 </div>
             </div>
        </div>

        {/* Scrollable Content Section 2: The Arena */}
        <div className="relative z-10 bg-[#050101] py-24 px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-lg overflow-hidden border border-gold-800/50 shadow-2xl"
                    >
                         <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop" alt="The Arena" className="w-full h-auto opacity-70 hover:opacity-100 transition-opacity duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </motion.div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                     <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                     >
                         <div className="flex items-center gap-2 mb-4 text-gold-500">
                             <Crown className="w-6 h-6" />
                             <span className="font-serif tracking-widest uppercase">The Legacy</span>
                         </div>
                         <h2 className="text-4xl md:text-5xl font-display text-white mb-6 leading-tight">WHERE LEGENDS <br/><span className="text-gold-500">ARE FORGED</span></h2>
                         <p className="text-gray-400 font-sans text-lg leading-relaxed mb-6">
                             Zerone has been the testing ground for the brightest minds of the region for over a decade. In 2025, we return bigger, bolder, and louder. The YUGA edition brings forth challenges that will test not just your coding skills, but your strategy, creativity, and endurance.
                         </p>
                         <button onClick={() => onChangeView('about')} className="text-gold-400 hover:text-white font-serif uppercase tracking-widest border-b border-gold-500 pb-1 flex items-center gap-2 group">
                             Read the full saga <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                         </button>
                     </motion.div>
                </div>
            </div>
        </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
    <motion.div 
       whileHover={{ y: -10 }}
       className="bg-[#150505] p-8 rounded border border-gold-900/30 hover:border-gold-500/50 transition-all text-center group"
    >
        <div className="w-16 h-16 bg-gold-900/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-500/20 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-serif text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
            {desc}
        </p>
    </motion.div>
);

export default Hero;