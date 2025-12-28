
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <div id="about" className="relative py-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Decorative Background Symbol */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <div className="text-[20rem] font-display text-gold-500 rotate-12">Z</div>
        </div>
        
        {/* Floating Parallax Elements */}
        <motion.div 
            animate={{ y: [0, -20, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 w-24 h-24 border border-gold-900/40 rounded-full opacity-20 hidden md:block" 
        />
        <motion.div 
            animate={{ y: [0, 30, 0] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 left-10 w-32 h-32 border border-red-900/40 rotate-45 opacity-20 hidden md:block" 
        />

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative z-10"
        >
            <span className="text-gold-600 font-serif uppercase tracking-[0.3em] text-sm block mb-4">Hello...</span>
            <h2 className="text-4xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-700 mb-8 drop-shadow-lg">
                Namaskara
            </h2>
            
            <div className="relative max-w-4xl mx-auto p-1">
                {/* Border effect */}
                <div className="absolute inset-0 border-2 border-gold-900/30 rounded-lg transform rotate-1"></div>
                <div className="absolute inset-0 border-2 border-gold-900/30 rounded-lg transform -rotate-1"></div>
                
                <div className="bg-[#0f0404]/80 backdrop-blur-sm p-8 md:p-12 rounded-lg border border-gold-500/20 shadow-2xl relative text-left md:text-center">
                    <p className="text-xl md:text-2xl font-serif text-gold-100 leading-relaxed mb-6">
                        "We extend a warm welcome to all participants and students from various institutes joining us."
                    </p>
                    <p className="text-gray-400 font-sans text-lg leading-relaxed text-justify mb-6">
                        Organized by the <strong>Department of MCA</strong> in association with <strong>Students Club</strong>, 
                        SJB Institute of Technology presents <strong>NEXGEN : The next generation of talent</strong>.
                    </p>
                    <p className="text-gray-400 font-sans text-lg leading-relaxed text-justify">
                        On <strong>15th January 2026</strong>, the gates open. 
                        Step into our realm, showcase your excellence, and be part of this majestic celebration of technology and innovation.
                    </p>
                </div>
            </div>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative z-10">
            <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-[#1a0505] to-black p-8 rounded border-l-4 border-gold-500"
            >
                <h3 className="text-2xl font-display text-gold-400 mb-4">OUR SAMSTHANA</h3>
                <p className="text-gray-400 font-sans">
                    SJB Institute of Technology.<br/>
                    An Autonomous Institution, Affiliated to VTU, Belagavi. Approved by AICTE, New Delhi.
                    Accredited by NAAC with A++ Grade.
                </p>
            </motion.div>
             <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-bl from-[#1a0505] to-black p-8 rounded border-r-4 border-gold-500 text-right"
            >
                <h3 className="text-2xl font-display text-gold-400 mb-4">SANGAMA</h3>
                <p className="text-gray-400 font-sans">
                    Department of MCA<br/>
                    In Association with Students Club.
                </p>
            </motion.div>
        </div>

        {/* Dignitaries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-12 relative z-10">
                {[
                { title: 'Director', name: 'Dr. Puttaraju', role: 'Academic Director - SJBIT' },
                { title: 'HOD', name: 'Dr. Nagamani.S', role: 'Head of Department, MCA' },
                { title: 'Principal', name: 'K.V. Mahendra Prashanth', role: 'Principal SJB Institute of Technology, Bengaluru' }
            ].map((dignitary, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    className="p-8 border border-gold-900/30 bg-gradient-to-b from-[#1a0505] to-black rounded-sm hover:border-gold-500/50 transition-all group relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gold-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="text-gold-500 font-display text-xl mb-2 tracking-widest uppercase">{dignitary.title}</div>
                    <div className="text-white font-serif text-xl mb-1">{dignitary.name}</div>
                    <div className="text-gray-500 text-sm font-sans">{dignitary.role}</div>
                </motion.div>
            ))}
        </div>
    </div>
  );
};

export default About;
