import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Spark {
  id: number;
  x: number;
  y: number;
}

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

const SparkCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create spark at mouse position
      const newSpark: Spark = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      
      setSparks(prev => [...prev.slice(-12), newSpark]); // Keep only last 12 sparks
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    const handleMouseClick = (e: MouseEvent) => {
      const clickEffect: ClickEffect = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setClickEffects(prev => [...prev, clickEffect]);
      
      // Remove click effect after animation
      setTimeout(() => {
        setClickEffects(prev => prev.filter(effect => effect.id !== clickEffect.id));
      }, 1000);
    };

    const handleHoverState = () => {
      const hoverElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select');
      const isOverHoverElement = Array.from(hoverElements).some(el => 
        el.matches(':hover')
      );
      setIsHovering(isOverHoverElement);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleHoverState);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleHoverState);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleMouseClick);
    };
  }, []);

  // Clean up old sparks
  useEffect(() => {
    const interval = setInterval(() => {
      setSparks(prev => prev.filter(spark => Date.now() - spark.id < 600));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <div className="w-5 h-5 relative">
          <motion.div 
            className="absolute inset-0 bg-gold-400 rounded-full opacity-80 blur-sm"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gold-300 rounded-full"
            animate={{
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="absolute inset-1 bg-gold-200 rounded-full" />
        </div>
      </motion.div>

      {/* Spark effects */}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="fixed pointer-events-none z-40"
            initial={{
              x: spark.x,
              y: spark.y,
              scale: 0,
              opacity: 1,
              rotate: 0
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [1, 0.8, 0],
              rotate: [0, 180, 360],
              x: spark.x + (Math.random() - 0.5) * 40,
              y: spark.y + (Math.random() - 0.5) * 40
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <div className="w-2 h-2 relative">
              <motion.div 
                className="w-full h-full bg-gold-400 rotate-45 transform"
                animate={{
                  rotate: [45, 225, 405]
                }}
                transition={{
                  duration: 0.6,
                  ease: "linear"
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-gold-300 rounded-full opacity-60"
                animate={{
                  scale: [1, 0.5, 1]
                }}
                transition={{
                  duration: 0.3,
                  repeat: 2,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click effects */}
      <AnimatePresence>
        {clickEffects.map((effect) => (
          <motion.div
            key={effect.id}
            className="fixed pointer-events-none z-45"
            initial={{
              x: effect.x - 20,
              y: effect.y - 20,
              scale: 0,
              opacity: 1
            }}
            animate={{
              scale: [0, 2, 3],
              opacity: [1, 0.5, 0],
              rotate: [0, 180]
            }}
            exit={{
              opacity: 0,
              scale: 4
            }}
            transition={{
              duration: 1,
              ease: "easeOut"
            }}
          >
            <div className="w-10 h-10 border-2 border-gold-400 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Trail effect */}
      <motion.div
        className="fixed pointer-events-none z-30"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.8
        }}
      >
        <motion.div 
          className="w-4 h-4 bg-gold-200/30 rounded-full blur-md"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Secondary trail */}
      <motion.div
        className="fixed pointer-events-none z-25"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 1
        }}
      >
        <motion.div 
          className="w-3 h-3 bg-gold-100/20 rounded-full blur-sm"
          animate={{
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </>
  );
};

export default SparkCursor;
