
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring config for the main cursor
  const mainSpringConfig = { damping: 25, stiffness: 700 }; 
  const cursorXSpring = useSpring(cursorX, mainSpringConfig);
  const cursorYSpring = useSpring(cursorY, mainSpringConfig);

  // Follower config
  const followerSpringConfig = { damping: 40, stiffness: 300, mass: 0.8 };
  const followerXSpring = useSpring(cursorX, followerSpringConfig);
  const followerYSpring = useSpring(cursorY, followerSpringConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [sparks, setSparks] = useState<{id: number, x: number, y: number, angle: number}[]>([]);
  
  useEffect(() => {
    let lastSparkTime = 0;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add sparks on move (throttled)
      const now = Date.now();
      if (now - lastSparkTime > 50) { 
        const sparkId = now;
        const angle = Math.random() * 360;
        setSparks(prev => [...prev.slice(-15), { id: sparkId, x: e.clientX, y: e.clientY, angle }]);
        lastSparkTime = now;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a');
        setIsHovering(!!isInteractive);
    }

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Cleanup sparks timer
    const interval = setInterval(() => {
        setSparks(prev => prev.slice(1)); // Slowly remove old sparks
    }, 100);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(interval);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference overflow-hidden">
      
      {/* Sparks Trail */}
      <AnimatePresence>
        {sparks.map((spark) => (
            <motion.div
                key={spark.id}
                initial={{ opacity: 1, scale: 1, x: spark.x, y: spark.y }}
                animate={{ 
                    opacity: 0, 
                    scale: 0, 
                    x: spark.x + Math.cos(spark.angle) * 20, 
                    y: spark.y + Math.sin(spark.angle) * 20 
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute w-1 h-1 bg-gold-300 rounded-full shadow-[0_0_5px_#fff]"
            />
        ))}
      </AnimatePresence>

      {/* Follower Ring (The Trail) */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
            x: followerXSpring,
            y: followerYSpring,
            translateX: '-50%',
            translateY: '-50%'
        }}
      >
         <motion.div 
            animate={{ 
                scale: isHovering ? 1.5 : 1,
                opacity: isClicking ? 0.5 : 0.6,
                borderColor: isHovering ? '#D4A32C' : 'rgba(212, 163, 44, 0.5)'
            }}
            className="w-12 h-12 border border-gold-400 rounded-full opacity-60 transition-colors duration-300"
         />
      </motion.div>

      {/* Main Cursor Dot */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
          <motion.div 
            animate={{ 
                scale: isClicking ? 0.5 : isHovering ? 0.8 : 1,
            }}
            className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#D4A32C]"
          />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
