
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Trophy, Scroll, Phone, CheckCircle, ArrowRight, Upload, CreditCard, Building } from 'lucide-react';
import { EventDetails } from '../types';

interface EventModalProps {
  event: EventDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Participant {
    name: string;
    usn: string;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  const [view, setView] = useState<'details' | 'register' | 'success'>('details');
  
  // Dynamic Form State
  const [teamName, setTeamName] = useState('');
  const [college, setCollege] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [utr, setUtr] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [file, setFile] = useState<File | null>(null);

  // Initialize participants based on team size
  useEffect(() => {
    if (event) {
        // Create initial empty slots for the maximum members allowed
        const initialParticipants = Array(event.maxMembers).fill({ name: '', usn: '' });
        setParticipants(initialParticipants);
        setTeamName('');
        setCollege('');
        setPhone('');
        setEmail('');
        setUtr('');
        setFile(null);
    }
  }, [event]);

  if (!event) return null;

  const handleParticipantChange = (index: number, field: keyof Participant, value: string) => {
      const updated = [...participants];
      updated[index] = { ...updated[index], [field]: value };
      setParticipants(updated);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0]);
      }
  };

  const handleRegister = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate API call
      console.log({
          event: event.title,
          teamName,
          participants,
          college,
          phone,
          email,
          utr,
          file
      });
      
      setTimeout(() => {
          setView('success');
      }, 1000);
  };

  const resetAndClose = () => {
      onClose();
      setTimeout(() => {
          setView('details');
      }, 500);
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
                <AnimatePresence mode="wait">
                    {view === 'details' && (
                        <motion.div 
                            key="details"
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
                                    <button 
                                        onClick={() => setView('register')}
                                        className="w-full px-6 py-4 bg-gold-600 text-black font-bold font-display uppercase tracking-widest hover:bg-gold-500 transition-colors rounded-sm shadow-[0_0_15px_#D4A32C] flex items-center justify-center gap-2"
                                    >
                                        Proceed to Register <ArrowRight className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {view === 'register' && (
                        <motion.div
                            key="register"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-4 md:p-8"
                        >
                            <h3 className="text-gold-500 font-display text-3xl mb-6 text-center border-b border-gold-900 pb-4">
                                {event.maxMembers > 1 ? 'Squad Registration' : 'Warrior Registration'}
                            </h3>
                            
                            <form onSubmit={handleRegister} className="space-y-6 max-w-4xl mx-auto">
                                
                                {/* Core Team Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/5 rounded-lg border border-gold-900/30">
                                     <div className="md:col-span-2">
                                        <label className="block text-gold-400 font-serif mb-2 text-sm uppercase tracking-wide">
                                            {event.maxMembers > 1 ? "Team Name" : "Participant Name / Alias"}
                                        </label>
                                        <input 
                                            required
                                            type="text" 
                                            className="w-full bg-black/50 border border-gold-800 rounded p-3 text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
                                            placeholder="Enter Name"
                                            value={teamName}
                                            onChange={e => setTeamName(e.target.value)}
                                        />
                                     </div>

                                    <div>
                                        <label className="block text-gold-200 font-sans mb-2 text-xs uppercase">College Name</label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                            <input 
                                                required
                                                type="text" 
                                                className="w-full bg-black/50 border border-gold-800 rounded p-3 pl-10 text-white focus:border-gold-400 focus:outline-none"
                                                placeholder="SIT, Tumkur"
                                                value={college}
                                                onChange={e => setCollege(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gold-200 font-sans mb-2 text-xs uppercase">Primary Contact</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                            <input 
                                                required
                                                type="tel" 
                                                className="w-full bg-black/50 border border-gold-800 rounded p-3 pl-10 text-white focus:border-gold-400 focus:outline-none"
                                                placeholder="98765..."
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-gold-200 font-sans mb-2 text-xs uppercase">Email Address</label>
                                        <input 
                                            required
                                            type="email" 
                                            className="w-full bg-black/50 border border-gold-800 rounded p-3 text-white focus:border-gold-400 focus:outline-none"
                                            placeholder="team@example.com"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Participant Details Loop - Improved Visibility */}
                                <div className="space-y-4">
                                    <h4 className="text-gold-400 font-serif text-lg border-b border-gold-900/50 pb-2 mt-4 flex items-center gap-2">
                                        <User className="w-5 h-5"/> {event.maxMembers > 1 ? "Squad Members" : "Participant Details"}
                                    </h4>
                                    
                                    {participants.map((p, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row gap-4 bg-[#1a0505] p-4 rounded border border-gold-900/50 items-start md:items-end">
                                            <div className="w-full md:w-12 text-gold-500 font-display text-2xl opacity-50 text-center md:text-left">
                                                {String(idx + 1).padStart(2, '0')}
                                            </div>
                                            <div className="flex-grow w-full">
                                                <label className="block text-gray-400 text-[10px] mb-1 uppercase tracking-widest">Full Name</label>
                                                <input 
                                                    required
                                                    type="text" 
                                                    className="w-full bg-black/80 border border-gold-800/50 rounded p-2 text-white focus:border-gold-500 focus:outline-none"
                                                    placeholder="Participant Name"
                                                    value={p.name}
                                                    onChange={e => handleParticipantChange(idx, 'name', e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full md:w-1/3">
                                                <label className="block text-gray-400 text-[10px] mb-1 uppercase tracking-widest">USN / ID</label>
                                                <input 
                                                    required
                                                    type="text" 
                                                    className="w-full bg-black/80 border border-gold-800/50 rounded p-2 text-white focus:border-gold-500 focus:outline-none"
                                                    placeholder="1SI..."
                                                    value={p.usn}
                                                    onChange={e => handleParticipantChange(idx, 'usn', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Payment Details */}
                                <div className="bg-gold-900/10 p-6 rounded border border-gold-700/50 mt-8">
                                    <h4 className="text-gold-400 font-serif text-lg mb-4 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5"/> Payment Verification
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gold-200 font-sans mb-2 text-xs uppercase">UTR / Transaction ID</label>
                                            <input 
                                                required
                                                type="text" 
                                                className="w-full bg-black/50 border border-gold-800 rounded p-3 text-white focus:border-gold-400 focus:outline-none"
                                                placeholder="Transaction ID"
                                                value={utr}
                                                onChange={e => setUtr(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gold-200 font-sans mb-2 text-xs uppercase">Upload Screenshot</label>
                                            <div className="relative">
                                                <input 
                                                    required
                                                    type="file" 
                                                    accept="image/*,application/pdf"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    id="payment-upload"
                                                />
                                                <label 
                                                    htmlFor="payment-upload"
                                                    className={`flex items-center justify-center gap-2 w-full p-3 border border-dashed rounded cursor-pointer transition-colors ${file ? 'border-green-500 text-green-400 bg-green-900/10' : 'border-gold-800 text-gray-400 hover:border-gold-500 hover:text-gold-200 bg-black/50'}`}
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    <span className="truncate text-sm">{file ? file.name : "Choose File (Image/PDF)"}</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 sticky bottom-0 bg-[#0f0404] py-4 border-t border-gold-900/50 z-10">
                                    <button 
                                        type="button"
                                        onClick={() => setView('details')}
                                        className="flex-1 px-6 py-3 border border-gold-700 text-gold-400 font-bold font-sans uppercase tracking-widest hover:bg-gold-900/20 transition-colors rounded-sm"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gold-600 text-black font-bold font-display uppercase tracking-widest hover:bg-gold-500 transition-colors rounded-sm shadow-[0_0_15px_#D4A32C]"
                                    >
                                        Submit Registration
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {view === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-8 flex flex-col items-center justify-center h-full text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                                className="w-24 h-24 bg-green-900/20 rounded-full flex items-center justify-center mb-6 border-2 border-green-500"
                            >
                                <CheckCircle className="w-12 h-12 text-green-500" />
                            </motion.div>
                            <h3 className="text-4xl font-display text-gold-400 mb-4">Allegiance Sworn!</h3>
                            <p className="text-gray-300 font-sans text-lg mb-8 max-w-md">
                                Your registration for <span className="text-white font-bold">{event.title}</span> has been sealed in the royal archives. <br/><br/>
                                Our scribes will verify your payment and send a decree to your email shortly.
                            </p>
                            
                             <button 
                                onClick={resetAndClose}
                                className="px-8 py-3 bg-transparent border border-gold-500 text-gold-400 font-bold font-sans uppercase tracking-widest hover:bg-gold-900/20 transition-colors rounded-sm"
                            >
                                Return to Kingdom
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
