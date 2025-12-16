
import React from 'react';
import { motion } from 'framer-motion';
import { GENERAL_RULES } from '../constants';
import { Scroll, ShieldAlert } from 'lucide-react';

const Rules: React.FC = () => {
  return (
    <div className="relative pt-20 pb-20 px-6 min-h-screen bg-[#050101]">
         {/* Background Texture */}
         <div className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ 
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")', 
                backgroundSize: 'auto' 
            }} 
        />
        
        <div className="max-w-4xl mx-auto relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-6xl font-display text-gold-500 mb-4 text-shadow-gold">THE ROYAL CODE</h2>
                <p className="text-gray-400 font-serif tracking-widest uppercase">General Rules & Regulations</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#0f0404] border border-gold-900 rounded-xl p-8 md:p-12 shadow-[0_0_40px_rgba(212,163,44,0.1)] relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-gold-700 rounded-tl-xl opacity-50" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-gold-700 rounded-br-xl opacity-50" />
                
                <div className="flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-gold-900/30 rounded-full flex items-center justify-center border border-gold-600">
                        <Scroll className="w-8 h-8 text-gold-400" />
                    </div>
                </div>

                <ul className="space-y-6">
                    {GENERAL_RULES.map((rule, idx) => (
                        <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-4 group"
                        >
                            <div className="shrink-0 mt-1">
                                <ShieldAlert className="w-5 h-5 text-gold-600 group-hover:text-gold-400 transition-colors" />
                            </div>
                            <p className="text-gray-300 font-serif text-lg leading-relaxed group-hover:text-white transition-colors">
                                {rule}
                            </p>
                        </motion.li>
                    ))}
                </ul>

                <div className="mt-12 pt-8 border-t border-gold-900/50 text-center">
                    <p className="text-gold-500/60 font-sans uppercase tracking-widest text-sm">
                        Department of MCA, SIT
                    </p>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

export default Rules;
