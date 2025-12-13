
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const sponsorsList = [
    { name: "TechTitan Industries", tier: "Title Sponsor", color: "from-gold-300 to-gold-600" },
    { name: "CodeForge Systems", tier: "Platinum Partner", color: "from-gray-300 to-gray-500" },
    { name: "PixelPerfect Studios", tier: "Creative Partner", color: "from-orange-400 to-red-600" },
    { name: "CyberGuard Solutions", tier: "Security Partner", color: "from-blue-400 to-indigo-600" }
];

const Sponsors: React.FC = () => {
  return (
    <div id="sponsors" className="relative py-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-20"
            >
                <h2 className="text-4xl md:text-7xl font-display text-gold-500 mb-6 text-shadow-strong">OUR ALLIES</h2>
                <p className="text-gray-400 font-serif tracking-widest uppercase">The Pillars of the Empire</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {sponsorsList.map((sponsor, idx) => (
                    <SponsorCard key={idx} sponsor={sponsor} index={idx} />
                ))}
            </div>
        </div>
    </div>
  );
};

const SponsorCard: React.FC<{ sponsor: typeof sponsorsList[0], index: number }> = ({ sponsor, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
    
    // Glow movement
    const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d" 
            }}
            className="perspective-1000 relative h-64 w-full cursor-pointer"
        >
             <motion.div 
                className="relative w-full h-full bg-[#1a0505] rounded-xl border border-gold-900/30 flex flex-col items-center justify-center overflow-hidden shadow-xl group"
                style={{ transformStyle: "preserve-3d" }}
             >
                {/* Dynamic Mouse Glow Background */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ 
                        background: `radial-gradient(circle at center, rgba(212, 163, 44, 0.15), transparent 70%)` 
                    }}
                />
                
                {/* Floating Content */}
                <motion.div 
                    style={{ transform: "translateZ(30px)" }}
                    className="flex flex-col items-center justify-center"
                >
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${sponsor.color} mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center border border-white/10`}>
                        <span className="text-3xl font-bold text-black font-display mix-blend-overlay">{sponsor.name.charAt(0)}</span>
                    </div>
                    
                    <h3 className="text-2xl font-display text-white mb-2 tracking-wide group-hover:text-gold-200 transition-colors">{sponsor.name}</h3>
                    <span className="text-gold-500/80 font-sans tracking-[0.2em] text-xs uppercase border border-gold-900/50 px-4 py-1.5 rounded-sm bg-black/40">
                        {sponsor.tier}
                    </span>
                </motion.div>

                {/* Corner Decors */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-900/50 group-hover:border-gold-500 transition-colors rounded-tl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-900/50 group-hover:border-gold-500 transition-colors rounded-br-lg" />
            </motion.div>
        </motion.div>
    );
};

export default Sponsors;
