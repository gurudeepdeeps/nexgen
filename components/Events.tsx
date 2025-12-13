
import React, { useState, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { EVENTS } from '../constants';
import { EventDetails } from '../types';
import EventModal from './EventModal';
import { ChevronRight, ChevronLeft, Search } from 'lucide-react';

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Filter Events Logic
  const filteredEvents = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return EVENTS.filter(event => 
      event.title.toLowerCase().includes(query) || 
      event.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const { current } = scrollRef;
        const scrollAmount = direction === 'left' ? -350 : 350;
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div id="events" className="relative py-20 px-0 md:px-12 max-w-[100vw] overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="text-center mb-8 md:mb-12 px-4">
         <h2 className="text-4xl md:text-6xl font-display text-gold-500 mb-4 text-shadow-gold">THE BATTLEFIELDS</h2>
         
         {/* Search Bar */}
         <div className="relative max-w-md mx-auto mb-6 group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gold-600 group-focus-within:text-gold-400" />
            </div>
            <input 
                type="text"
                placeholder="Search Arena (e.g., Coding, Gaming)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-gold-800 rounded-full py-3 pl-12 pr-4 text-gold-100 placeholder-gold-700/50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all backdrop-blur-sm"
            />
         </div>

         <p className="text-gray-400 font-serif tracking-widest uppercase hidden md:block text-sm">
            {filteredEvents.length === 0 ? "No Battlefields Found" : "Select Your Arena"}
         </p>
         
         {/* Mobile Instructions */}
         <div className="md:hidden flex items-center justify-center gap-2 text-gold-500/60 animate-pulse mt-2">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-xs font-serif tracking-widest uppercase">Swipe Left or Right</span>
            <ChevronRight className="w-4 h-4" />
         </div>
      </div>

      {/* Desktop Controls */}
      <div className="hidden md:flex justify-end gap-4 max-w-7xl mx-auto w-full mb-4 px-4">
          <button onClick={() => scroll('left')} className="p-2 border border-gold-700 rounded-full hover:bg-gold-900/50 text-gold-400 transition-colors"><ChevronLeft/></button>
          <button onClick={() => scroll('right')} className="p-2 border border-gold-700 rounded-full hover:bg-gold-900/50 text-gold-400 transition-colors"><ChevronRight/></button>
      </div>

      {/* --- DESKTOP VIEW: Horizontal 3D Carousel --- */}
      <div 
        ref={scrollRef}
        className="hidden md:flex overflow-x-auto gap-8 py-8 px-4 md:px-12 snap-x snap-mandatory hide-scrollbar pb-16 min-h-[550px]"
        style={{ scrollBehavior: 'smooth' }}
      >
        {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
                <EventCardDesktop key={event.id} event={event} index={index} onClick={() => setSelectedEvent(event)} />
            ))
        ) : (
            <div className="w-full text-center text-gray-500 py-20 font-serif italic">The archives hold no record of such a battle...</div>
        )}
        {/* Spacer for end of scroll */}
        <div className="w-1 flex-shrink-0" />
      </div>

      {/* --- MOBILE VIEW: Horizontal Swipe (Reverted from Vertical) --- */}
      <div 
        ref={mobileScrollRef}
        className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-6 px-8 pb-12 w-full hide-scrollbar scroll-smooth"
      >
          {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                 <EventCardMobile key={event.id} event={event} index={index} onClick={() => setSelectedEvent(event)} />
              ))
          ) : (
              <div className="w-full text-center text-gray-500 py-10 font-serif italic mx-auto">No realms match your query.</div>
          )}
          {/* Spacer to allow last card to be centered */}
          <div className="w-4 flex-shrink-0" />
      </div>

      <EventModal 
        event={selectedEvent} 
        isOpen={!!selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </div>
  );
};

// --- DESKTOP CARD (With 3D Parallax) ---
const EventCardDesktop: React.FC<{ event: EventDetails, index: number, onClick: () => void }> = ({ event, index, onClick }) => {
    // Parallax logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Snappier spring configuration
    const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });
    
    // Tilt
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
    
    // DEEP PARALLAX
    const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15%", "15%"]);
    const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15%", "15%"]);

    const contentX = useTransform(mouseXSpring, [-0.5, 0.5], ["8px", "-8px"]);
    const contentY = useTransform(mouseYSpring, [-0.5, 0.5], ["8px", "-8px"]);

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
            layoutId={`card-${event.id}`}
            onClick={onClick}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d" 
            }}
            className="flex-shrink-0 w-[400px] h-[500px] snap-center relative cursor-pointer group perspective-1000"
          >
             <motion.div 
                className="w-full h-full relative bg-[#0f0404] border border-gold-900/50 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-gold-500 group-hover:shadow-[0_0_40px_rgba(212,163,44,0.3)] shadow-xl"
                style={{ transformStyle: "preserve-3d" }}
             >
                {/* Background Image */}
                <motion.div 
                    className="absolute inset-[-50px] object-cover opacity-60 transition-all duration-700"
                    style={{ 
                        x: imageX, 
                        y: imageY, 
                        scale: 1.5 
                    }}
                >
                    <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-full object-cover" 
                    />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" style={{ transform: "translateZ(1px)" }} />

                <motion.div 
                    className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full pointer-events-none"
                    style={{ 
                        x: contentX,
                        y: contentY,
                        transform: "translateZ(40px)" 
                    }}
                >
                    <div className="mb-auto pt-4">
                         <div className="text-xs font-sans text-gold-400 mb-2 uppercase tracking-widest bg-black/80 w-max px-3 py-1 rounded-full border border-gold-900/50 backdrop-blur-md shadow-lg">
                            {event.category}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-display text-white mb-2 group-hover:text-gold-200 transition-colors drop-shadow-md">{event.title}</h3>
                        <p className="text-gray-300 text-sm font-serif italic mb-6 opacity-90">{event.subtitle}</p>
                        <div className="flex justify-between items-center border-t border-white/20 pt-4">
                            <div>
                                <div className="text-xs text-gold-500 uppercase tracking-wider">Prize Pool</div>
                                <div className="text-xl font-bold text-white">{event.prizePool}</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gold-600 flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
                                <ChevronRight />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
          </motion.div>
    );
};

// --- MOBILE CARD (Horizontal Swipe, Snap Center) ---
const EventCardMobile: React.FC<{ event: EventDetails, index: number, onClick: () => void }> = ({ event, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            onClick={onClick}
            className="flex-shrink-0 w-[85vw] h-[450px] snap-center relative rounded-xl overflow-hidden border border-gold-900/40 shadow-lg active:scale-95 transition-transform"
        >
             <div className="absolute inset-0 bg-[#0f0404]">
                <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-full object-cover opacity-60" 
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="text-[10px] font-sans text-gold-400 mb-2 uppercase tracking-widest bg-black/80 w-max px-2 py-1 rounded border border-gold-900/50">
                    {event.category}
                </div>
                <h3 className="text-3xl font-display text-white mb-1">{event.title}</h3>
                <p className="text-gray-300 text-sm font-serif italic mb-4">{event.subtitle}</p>
                <div className="flex justify-between items-end border-t border-white/20 pt-4">
                    <div>
                        <div className="text-[10px] text-gold-500 uppercase">Prize Pool</div>
                        <div className="text-2xl font-bold text-white">{event.prizePool}</div>
                    </div>
                    <button className="px-5 py-2 bg-gold-600/20 border border-gold-600 rounded text-gold-400 text-xs uppercase font-bold">
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default Events;
