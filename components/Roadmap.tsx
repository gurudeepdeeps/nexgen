
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TIMELINE } from '../constants';

const Roadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background Opacity/Color Shifts
  // Morning: 0 - 0.25
  // Noon: 0.25 - 0.6
  // Evening/Night (Moon & Stars): 0.7 - 1.0 (Starts appearing around 4:30 PM which is ~80%)
  
  const morningOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const noonOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  
  // Moon appears earlier (late afternoon/evening) and stays
  const eveningOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]); 
  
  // DEEP NIGHT / STARS / COMETS (Trigger at 4:30 PM -> ~0.75-0.8 scroll)
  const nightOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  // Celestial Objects Movement
  const sunY = useTransform(scrollYProgress, [0, 0.5], ['50%', '-20%']);
  const sunX = useTransform(scrollYProgress, [0, 0.5], ['10%', '50%']);
  
  const moonY = useTransform(scrollYProgress, [0.7, 0.9], ['50%', '15%']);
  const moonX = useTransform(scrollYProgress, [0.7, 0.9], ['90%', '50%']);

  // COMET ANIMATION
  const cometX = useTransform(scrollYProgress, [0.75, 1], ['120%', '-50%']);
  const cometY = useTransform(scrollYProgress, [0.75, 1], ['0%', '80%']);
  const cometScale = useTransform(scrollYProgress, [0.75, 1], [0.5, 1.5]);

  const perspectiveRotate = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Progress Bar should go to 100% at the end
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div id="roadmap" ref={containerRef} className="relative py-20 px-4 pb-48 overflow-hidden min-h-[250vh] perspective-2000 bg-black transition-colors duration-1000">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          
          {/* MORNING LAYER (Sun Rising) */}
          <motion.div 
            style={{ opacity: morningOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-orange-900 via-blue-900/60 to-black z-0"
          />
          <motion.div 
             style={{ opacity: morningOpacity, top: sunY, left: sunX, x: '-50%' }}
             className="absolute w-40 h-40 bg-gradient-to-r from-orange-400 to-gold-300 rounded-full blur-[40px]"
          />


          {/* NOON LAYER (High Sun) */}
          <motion.div 
            style={{ opacity: noonOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-gold-200/10 to-black z-0"
          />
           <motion.div 
             style={{ opacity: noonOpacity, top: '5%', left: '50%', x: '-50%' }}
             className="absolute w-[600px] h-[600px] bg-gold-100/20 rounded-full blur-[100px]"
          />


          {/* EVENING/MOON LAYER */}
          <motion.div 
            style={{ opacity: eveningOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-[#05010a] via-[#1a0515] to-black z-0"
          />
           {/* Moon */}
           <motion.div 
             style={{ opacity: eveningOpacity, top: moonY, left: moonX, x: '-50%' }}
             className="absolute w-32 h-32 bg-gray-200 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden z-10"
          >
              <div className="absolute top-2 left-4 w-6 h-6 bg-gray-300 rounded-full opacity-50" />
              <div className="absolute bottom-8 right-6 w-10 h-10 bg-gray-300 rounded-full opacity-30" />
          </motion.div>


          {/* DEEP NIGHT / STARS / COMETS LAYER (Active from 4:30 PM) */}
          <motion.div 
            style={{ opacity: nightOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0210] to-[#000] z-10"
          >
              {/* Dense Starfield */}
              {[...Array(50)].map((_, i) => (
                    <motion.div 
                        key={`star-${i}`}
                        className="absolute bg-white rounded-full"
                        style={{
                            width: Math.random() * 2 + 1 + 'px',
                            height: Math.random() * 2 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            opacity: Math.random() * 0.7 + 0.3
                        }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                    />
               ))}

               {/* Falling Comets Rain */}
               {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`comet-rain-${i}`}
                        className="absolute bg-gradient-to-t from-transparent via-blue-200 to-white w-[1px] h-[100px] opacity-40 rotate-45"
                        style={{ left: `${Math.random() * 100}%`, top: '-20%' }}
                        animate={{ 
                            top: ['-20%', '120%'], 
                            left: [`${Math.random() * 100}%`, `${Math.random() * 100 - 20}%`]
                        }}
                        transition={{ 
                            duration: Math.random() * 2 + 1.5,
                            repeat: Infinity, 
                            delay: Math.random() * 2, 
                            ease: "linear" 
                        }}
                    />
                ))}

              {/* THE BIG FALLING STAR (COMET) */}
              <motion.div
                 style={{ 
                     left: cometX, 
                     top: cometY, 
                     scale: cometScale 
                 }}
                 className="absolute w-4 h-4 z-20"
              >
                  {/* The Head */}
                  <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_30px_#fff,0_0_60px_#a855f7] z-20" />
                  
                  {/* The Tail */}
                  <div className="absolute top-1/2 left-1/2 w-[300px] h-[4px] bg-gradient-to-l from-transparent via-purple-500 to-white transform -translate-y-1/2 -translate-x-full origin-right rotate-[10deg] blur-[2px]" />
                  <div className="absolute top-1/2 left-1/2 w-[200px] h-[2px] bg-gradient-to-l from-transparent via-blue-400 to-white transform -translate-y-1/2 -translate-x-full origin-right rotate-[10deg]" />
              </motion.div>

          </motion.div>

      </div>

      <div className="relative z-20 max-w-6xl mx-auto transform-style-3d">
        <div className="text-center mb-32 relative">
           <motion.div
             style={{ rotateX: perspectiveRotate }}
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
           >
             <h2 className="text-5xl md:text-8xl font-display text-transparent bg-clip-text bg-gradient-to-b from-gold-300 via-gold-500 to-gold-800 mb-6 text-shadow-strong drop-shadow-2xl">
                 THE SAGA
             </h2>
             <p className="text-gold-200/60 font-serif tracking-[0.5em] text-sm md:text-lg uppercase">Journey Through the Ages</p>
           </motion.div>
        </div>

        <div className="relative">
             {/* Central Line - Glowing Beam */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gold-900/30 rounded-full" />
            <motion.div 
                style={{ height: progressHeight }}
                className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-gold-400 via-gold-100 to-purple-500 origin-top shadow-[0_0_20px_#D4A32C] rounded-full z-0" 
            />

            {TIMELINE.map((item, index) => {
                 const isLeft = index % 2 === 0;
                 const isLast = index === TIMELINE.length - 1;
                 
                 return (
                    <TimelineCard 
                        key={index} 
                        item={item} 
                        isLeft={isLeft} 
                        index={index} 
                        isLast={isLast}
                    />
                 );
            })}
        </div>
      </div>
    </div>
  );
};

const TimelineCard: React.FC<{ item: any, isLeft: boolean, index: number, isLast: boolean }> = ({ item, isLeft, index, isLast }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className={`flex items-center justify-between mb-32 w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
        >
            {/* Content Box */}
            <div className={`w-5/12 ${isLeft ? 'text-right' : 'text-left'}`}>
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`group relative bg-[#0f0404]/90 backdrop-blur-md border rounded-xl p-8 transition-all duration-300 ${isLast ? 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'border-gold-900/50 hover:border-gold-500/80'}`}
                >
                    {/* Glowing Corner Accents */}
                    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 opacity-50 group-hover:opacity-100 transition-opacity ${isLast ? 'border-purple-500' : 'border-gold-600'}`} />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-50 group-hover:opacity-100 transition-opacity ${isLast ? 'border-purple-500' : 'border-gold-600'}`} />

                    {/* 3D Floating Index */}
                    <div className={`absolute -top-8 ${isLeft ? '-left-8' : '-right-8'} font-display text-8xl -z-10 transition-colors transform group-hover:translate-z-10 ${isLast ? 'text-purple-500/10 group-hover:text-purple-500/20' : 'text-gold-500/10 group-hover:text-gold-500/20'}`}>
                        {index + 1}
                    </div>

                    <h3 className={`relative text-2xl md:text-4xl font-display mb-3 transition-colors ${isLast ? 'text-purple-200 group-hover:text-purple-100' : 'text-gold-100 group-hover:text-gold-400'}`}>{item.title}</h3>
                    <p className="relative text-gray-400 font-sans text-lg tracking-wide">{item.description}</p>
                </motion.div>
            </div>

            {/* Center Orb */}
            <div className="w-2/12 flex justify-center relative z-10">
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full blur-md opacity-50 animate-pulse ${isLast ? 'bg-purple-600' : 'bg-gold-600'}`} />
                    <div className={`relative w-4 h-4 rounded-full shadow-[0_0_20px_#D4A32C] z-20 ${isLast ? 'bg-purple-100 shadow-[0_0_20px_#a855f7]' : 'bg-gold-100'}`} />
                    <div className={`absolute w-full h-full border rounded-full animate-spin-slow ${isLast ? 'border-purple-400' : 'border-gold-400'}`} />
                </div>
            </div>

            {/* Time Box */}
            <div className={`w-5/12 ${isLeft ? 'text-left' : 'text-right'}`}>
                <span className={`text-3xl md:text-5xl font-display text-transparent bg-clip-text opacity-80 drop-shadow-lg block hover:scale-105 transition-transform origin-left ${isLast ? 'bg-gradient-to-r from-purple-500 to-blue-400' : 'bg-gradient-to-r from-gold-600 to-gold-300'}`}>
                    {item.time.split(' - ')[0]}
                </span>
            </div>
        </motion.div>
    );
}

export default Roadmap;
