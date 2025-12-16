import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Spark {
  id: number;
  x: number;
  y: number;
}

const SparkCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create spark at mouse position
      const newSpark: Spark = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      
      setSparks(prev => [...prev.slice(-8), newSpark]); // Keep only last 8 sparks
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Clean up old sparks
  useEffect(() => {
    const interval = setInterval(() => {
      setSparks(prev => prev.filter(spark => Date.now() - spark.id < 500));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <div className="w-5 h-5 relative">
          <div className="absolute inset-0 bg-gold-400 rounded-full opacity-80 blur-sm"></div>
          <div className="absolute inset-0 bg-gold-300 rounded-full"></div>
          <div className="absolute inset-1 bg-gold-200 rounded-full"></div>
        </div>
      </motion.div>

      {/* Spark effects */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="fixed pointer-events-none z-40"
          initial={{
            x: spark.x,
            y: spark.y,
            scale: 0,
            opacity: 1
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [1, 0.8, 0],
            x: spark.x + (Math.random() - 0.5) * 30,
            y: spark.y + (Math.random() - 0.5) * 30
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <div className="w-2 h-2">
            <div className="w-full h-full bg-gold-400 rotate-45 transform"></div>
            <div className="absolute inset-0 bg-gold-300 rounded-full opacity-60"></div>
          </div>
        </motion.div>
      ))}

      {/* Trail effect */}
      <motion.div
        className="fixed pointer-events-none z-30"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8
        }}
      >
        <div className="w-4 h-4 bg-gold-200/30 rounded-full blur-md"></div>
      </motion.div>
    </>
  );
};

export default SparkCursor;
