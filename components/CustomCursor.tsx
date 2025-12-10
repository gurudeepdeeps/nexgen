import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Trail state
  const [trail, setTrail] = useState<{x: number, y: number, id: number}[]>([]);
  const trailIdCounter = useRef(0);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play Sound Function - Water Droplet Effect
  const playClickSound = () => {
    if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Resume context if suspended (browser policy)
    if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Sine wave creates a liquid/round tone
    oscillator.type = 'sine'; 
    
    // Pitch envelope: Start high, drop fast (mimics a droplet)
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);

    // Volume envelope: Attack fast, decay fast
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.2);
  };

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add trail dot
      const newDot = { x: e.clientX, y: e.clientY, id: trailIdCounter.current++ };
      setTrail(prev => [...prev.slice(-20), newDot]); // Increased trail length
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a');
        setIsHovering(!!isInteractive);
    }

    const handleMouseDown = () => {
        setIsClicking(true);
        playClickSound(); // Visual + Audio feedback
    };
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      {/* Trail Dots - Enhanced Visibility */}
      {trail.map((dot, index) => (
          <motion.div 
            key={dot.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed w-2 h-2 bg-gold-400 rounded-full pointer-events-none z-[9998] shadow-[0_0_5px_#D4A32C]"
            style={{ left: dot.x, top: dot.y, x: '-50%', y: '-50%' }}
          />
      ))}

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
          {/* Main Cursor Core */}
          <motion.div 
            animate={{ 
                scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            }}
            className="relative flex items-center justify-center w-8 h-8"
          >
            {/* Click Ripple Effect */}
            <AnimatePresence>
                {isClicking && (
                    <motion.div 
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 border-2 border-gold-400 rounded-full"
                    />
                )}
            </AnimatePresence>

            {/* Inner Dot */}
            <div className="w-1.5 h-1.5 bg-gold-100 rounded-full shadow-[0_0_15px_#D4A32C]" />
            
            {/* Rotating 3D Ring 1 */}
            <div className={`absolute w-full h-full border border-gold-600/60 rounded-full animate-spin-slow transition-colors duration-300 ${isHovering ? 'border-gold-300 bg-gold-500/10' : ''}`} 
                style={{ transform: 'rotateX(60deg)' }} />
            
            {/* Rotating 3D Ring 2 */}
            <div className="absolute w-3/4 h-3/4 border border-gold-300/40 rounded-full animate-spin-reverse-slow" />

            {/* Crosshair lines for tech feel */}
            <div className={`absolute w-[150%] h-[1px] bg-gold-500/30 transition-all duration-300 ${isHovering ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-0'}`} />
            <div className={`absolute w-[1px] h-[150%] bg-gold-500/30 transition-all duration-300 ${isHovering ? 'scale-y-100 opacity-100' : 'scale-y-50 opacity-0'}`} />

          </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;