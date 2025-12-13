
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Phone, Award, Shield, Terminal, Palette, Camera, Compass, Briefcase, Brain, Gamepad2, Mic } from 'lucide-react';
import { EVENTS, FACULTY_COORDINATORS, STUDENT_COORDINATORS } from '../constants';
import { EventCategory } from '../types';

const Contact: React.FC = () => {
    
  // Function to get a deterministic random image based on index/name
  const getAvatar = (seed: string) => {
      const hash = seed.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
      const gender = hash % 2 === 0 ? 'men' : 'women';
      const id = hash % 50; 
      return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
  };

  const getEventIcon = (category: EventCategory) => {
      switch(category) {
          case EventCategory.CODING: return <Terminal className="w-5 h-5" />;
          case EventCategory.DESIGN: return <Palette className="w-5 h-5" />;
          case EventCategory.PHOTOGRAPHY: return <Camera className="w-5 h-5" />;
          case EventCategory.TREASURE_HUNT: return <Compass className="w-5 h-5" />;
          case EventCategory.MANAGEMENT: return <Briefcase className="w-5 h-5" />;
          case EventCategory.QUIZ: return <Brain className="w-5 h-5" />;
          case EventCategory.GAMING: return <Gamepad2 className="w-5 h-5" />;
          case EventCategory.SPEAKING: return <Mic className="w-5 h-5" />;
          default: return <Award className="w-5 h-5" />;
      }
  };

  return (
    <div id="contact" className="relative pt-20 pb-12 px-6 min-h-screen overflow-hidden">
        {/* Improved Background - Lighter feeling while keeping dark theme */}
        <div className="absolute inset-0 bg-[#0a0505] z-0" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1a0f0f] to-black opacity-80" />
        
        {/* Golden ambient glow for "light good" feeling */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Texture */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0" 
            style={{ 
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")', 
                backgroundSize: 'auto' 
            }} 
        />

        <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-display text-gold-500 mb-6 text-shadow-gold">THE COUNCIL</h2>
                <p className="text-gray-400 font-serif tracking-[0.2em] uppercase">Keepers of the Code</p>
            </motion.div>

            {/* Event Specific Coordinators */}
            <div className="mb-24">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-gold-800/50 flex-grow" />
                    <h3 className="text-xl md:text-2xl font-serif text-gold-100 uppercase tracking-widest text-center px-4 py-2 rounded bg-black/40 border border-gold-900/30 backdrop-blur-sm">Battalion Commanders</h3>
                    <div className="h-px bg-gold-800/50 flex-grow" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {EVENTS.map((event, idx) => (
                        <TiltCard key={event.id} index={idx}>
                             {/* Card Header with Image Background Hint */}
                            <div className="relative h-24 overflow-hidden border-b border-gold-900/30">
                                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 transform group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0404] to-transparent" />
                                <div className="absolute bottom-3 left-4 flex items-center gap-2 z-10">
                                     <div className="p-1.5 bg-gold-600/20 rounded-full border border-gold-500/50 text-gold-400">
                                        {getEventIcon(event.category)}
                                     </div>
                                     <h4 className="font-display text-gold-100 text-lg tracking-wide text-shadow-sm">{event.title}</h4>
                                </div>
                            </div>
                            
                            {/* Coordinators List */}
                            <div className="p-5 space-y-4 bg-[#0f0404]/80 backdrop-blur-md">
                                {event.coordinators.map((coord, cIdx) => (
                                    <div key={cIdx} className="flex items-center justify-between group/coord border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            {/* Avatar */}
                                            <div className="w-10 h-10 rounded-full border border-gold-800/50 overflow-hidden shrink-0 shadow-sm group-hover/coord:border-gold-500 transition-colors">
                                                <img 
                                                    src={getAvatar(coord.name)} 
                                                    alt={coord.name} 
                                                    className="w-full h-full object-cover opacity-90 group-hover/coord:opacity-100 transition-opacity"
                                                />
                                            </div>
                                            
                                            <div className="flex-grow min-w-0">
                                                <p className="text-gray-200 font-serif text-sm truncate group-hover/coord:text-gold-300 transition-colors">{coord.name}</p>
                                                <a 
                                                    href={`tel:${coord.phone}`} 
                                                    className="flex items-center gap-1 text-gray-500 hover:text-gold-400 transition-colors text-[10px] font-mono mt-0.5"
                                                >
                                                    <Phone className="w-3 h-3" />
                                                    {coord.phone}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Event Icon/Logo Beside Name (Empty Space) */}
                                        <div className="opacity-20 group-hover/coord:opacity-60 transition-opacity text-gold-500 transform rotate-12">
                                            {getEventIcon(event.category)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>

            {/* General Coordinators Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                
                {/* Student Coordinators */}
                <TiltCard className="h-full">
                    <div className="bg-[#1a0505]/60 p-8 h-full backdrop-blur-sm relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Shield className="w-32 h-32" />
                        </div>
                        <h3 className="text-xl font-display text-gold-400 mb-8 flex items-center gap-3 border-b border-gold-900/50 pb-4 relative z-10">
                            <Shield className="w-6 h-6" /> Student Coordinators
                        </h3>
                        <div className="space-y-6 relative z-10">
                            {STUDENT_COORDINATORS.map((student, idx) => (
                                <div key={idx} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full border-2 border-gold-600/50 overflow-hidden shrink-0 shadow-[0_0_10px_rgba(212,163,44,0.2)]">
                                            <img 
                                                src={getAvatar(student.name)} 
                                                alt={student.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-xl font-serif text-white group-hover:text-gold-300 transition-colors">{student.name}</div>
                                            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">General Secretary</div>
                                        </div>
                                    </div>
                                    <a href={`tel:${student.phone}`} className="w-10 h-10 rounded-full bg-gold-900/20 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-black transition-all hover:scale-110">
                                        <Phone className="w-5 h-5" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </TiltCard>

                {/* Faculty Coordinators */}
                <TiltCard className="h-full">
                    <div className="bg-[#1a0505]/60 p-8 h-full backdrop-blur-sm relative overflow-hidden flex flex-col">
                         <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Award className="w-32 h-32" />
                        </div>
                        <h3 className="text-xl font-display text-gold-400 mb-8 flex items-center gap-3 border-b border-gold-900/50 pb-4 relative z-10">
                            <Award className="w-6 h-6" /> ROYAL ADVISORS (FACULTY)
                        </h3>
                        <div className="space-y-6 relative z-10">
                            {FACULTY_COORDINATORS.map((faculty, idx) => (
                                <div key={idx} className="flex items-center gap-4 group">
                                    <div className="w-16 h-16 rounded-full border-2 border-gold-800/50 overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all shadow-[0_0_10px_rgba(212,163,44,0.1)]">
                                        <img 
                                            src={getAvatar(faculty.name)} 
                                            alt={faculty.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-xl font-serif text-white">{faculty.name}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Faculty Coordinator</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TiltCard>
            </div>

            {/* Map - With Tilt and Enhanced Style */}
            <TiltCard className="w-full h-96 mb-12">
                 <div className="w-full h-full rounded-lg overflow-hidden border border-gold-800/50 shadow-2xl relative group bg-black/50">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15529.74235335198!2d77.1272223!3d13.3072222!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb02c6c6e76d9f9%3A0x7d206f4705574522!2sBirla%20Auditorium!5e0!3m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(1.2)' }} 
                        allowFullScreen 
                        loading="lazy" 
                        title="SIT Map - Birla Auditorium"
                        className="group-hover:filter-none transition-all duration-700 opacity-80 group-hover:opacity-100"
                    ></iframe>
                    <div className="absolute top-4 left-4 bg-black/80 p-3 rounded border border-gold-500 backdrop-blur-md shadow-lg transform group-hover:scale-105 transition-transform">
                        <div className="flex items-center gap-2 text-gold-400 font-bold font-sans">
                            <MapPin className="w-4 h-4 animate-bounce" /> BIRLA AUDITORIUM, SIT
                        </div>
                    </div>
                    {/* Map Decorative Overlay */}
                    <div className="absolute inset-0 border-[4px] border-gold-900/20 pointer-events-none rounded-lg" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold-500 rounded-br-lg opacity-50 pointer-events-none" />
                </div>
            </TiltCard>

            {/* Footer */}
            <div className="border-t border-gold-900/30 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; 2025 ZERONE 3.0. Forged in Code.</p>
            </div>
        </div>
    </div>
  );
};

// Reusable Tilt Card Component
const TiltCard: React.FC<{ children: React.ReactNode, className?: string, index?: number }> = ({ children, className = "", index = 0 }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
    
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
            className={`perspective-1000 ${className}`}
        >
            <motion.div 
                className="relative h-full w-full rounded-lg overflow-hidden group shadow-lg transition-shadow hover:shadow-[0_0_30px_rgba(212,163,44,0.15)] border border-gold-900/40 hover:border-gold-500/50 bg-[#0f0404]"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Dynamic Shine Effect */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                    style={{ 
                        background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)` 
                    }}
                />
                
                <div style={{ transform: "translateZ(10px)" }} className="h-full">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Contact;
