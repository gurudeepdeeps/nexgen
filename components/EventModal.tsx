
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Trophy, Scroll, Phone, ArrowRight } from 'lucide-react';
import { EventDetails } from '../types';

interface EventModalProps {
  event: EventDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {

  if (!event) return null;

  const resetAndClose = () => {
      onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />
          
          <motion.div
            layoutId={`card-${event.id}`}
            className="relative w-full max-w-5xl bg-[#0f0404] border border-gold-600 rounded-lg shadow-[0_0_50px_rgba(212,163,44,0.2)] overflow-hidden max-h-[95vh] flex flex-col"
            initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="h-32 md:h-48 relative flex items-center justify-center shrink-0 overflow-hidden border-b border-gold-800">
               <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="absolute inset-0 w-full h-full object-cover" 
               />
               <div className="absolute inset-0 bg-black/70" />
               <div className="relative z-10 text-center px-4">
                   <h2 className="text-2xl md:text-5xl font-display text-white text-shadow-strong uppercase tracking-wider">{event.title}</h2>
                   <p className="text-gold-300 font-serif text-sm md:text-xl mt-2">{event.subtitle}</p>
               </div>
               <button 
                onClick={resetAndClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-900 rounded-full text-white transition-colors z-20 border border-gold-900"
               >
                   <X />
               </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#050101]">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                             <div>
                                <h3 className="text-gold-500 font-display text-2xl mb-4 border-b border-gold-900 pb-2">Description</h3>
                                <p className="text-gray-300 font-sans leading-relaxed mb-6">{event.description}</p>
                                
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white/5 p-4 rounded border border-white/10">
                                        <Trophy className="text-gold-400 mb-2" />
                                        <div className="text-xs text-gray-500 uppercase">Prize Pool</div>
                                        <div className="text-xl font-bold text-white">{event.prizePool}</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded border border-white/10">
                                        <User className="text-gold-400 mb-2" />
                                        <div className="text-xs text-gray-500 uppercase">Team Size</div>
                                        <div className="text-xl font-bold text-white">{event.teamSize}</div>
                                    </div>
                                </div>

                                <h3 className="text-gold-500 font-display text-2xl mb-4 border-b border-gold-900 pb-2 flex items-center gap-2">
                                    <Scroll className="w-5 h-5" /> Rules
                                </h3>
                                <ul className="list-disc list-inside text-gray-300 font-sans space-y-2 text-sm">
                                    {event.rules.map((rule, idx) => (
                                        <li key={idx}>{rule}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col justify-between">
                                <div>
                                    <h3 className="text-gold-500 font-display text-2xl mb-4 border-b border-gold-900 pb-2">Commanders</h3>
                                    <div className="space-y-4 mb-8">
                                        {event.coordinators.map((coord, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded hover:bg-white/10 transition-colors">
                                                <span className="text-white font-serif">{coord.name}</span>
                                                <a href={`tel:${coord.phone}`} className="flex items-center gap-2 text-gold-400 hover:text-white transition-colors">
                                                    <Phone className="w-4 h-4" />
                                                    <span className="text-sm font-sans">{coord.phone}</span>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#1a0505] p-6 rounded border border-gold-900/50 text-center">
                                    <p className="text-gray-400 mb-1">Registration Fee</p>
                                    <p className="text-3xl font-serif text-white mb-6">{event.registrationFee}</p>
                                    {event.registrationUrl && (
                                        <a
                                            href={event.registrationUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full px-6 py-4 bg-gold-600 text-black font-bold font-display uppercase tracking-widest hover:bg-gold-500 transition-colors rounded-sm shadow-[0_0_15px_#D4A32C] flex items-center justify-center gap-2"
                                        >
                                            Register Now <ArrowRight className="w-5 h-5"/>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
