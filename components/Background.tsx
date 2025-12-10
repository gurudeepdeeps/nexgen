import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Particle System (Golden Ash / Embers)
    const particles: { x: number; y: number; size: number; speed: number; opacity: number; sway: number }[] = [];
    const particleCount = 200; // Increased count for better visibility

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1, // Larger particles
        speed: Math.random() * 1.5 + 0.5, // Faster
        opacity: Math.random() * 0.8 + 0.2, // More visible
        sway: Math.random() * 0.05 - 0.025,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Particles
      particles.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01) * 1 + p.sway; // More sway

        // Reset if out of bounds
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        // Golden/Fire color with glow
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#D4A32C";
        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`; 
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden bg-[#1a0505]">
      
      {/* Base Layer: Rich Royal Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b0a0a] via-[#1a0505] to-[#120303]" />

      {/* Texture Layer: Ancient Stone/Grunge (Removes the pitch black feel) */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay" 
           style={{ 
               backgroundImage: `url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop")`, 
               backgroundSize: 'cover',
               backgroundPosition: 'center'
           }} 
      />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-color-dodge" 
           style={{ 
               backgroundImage: `url("https://www.transparenttextures.com/patterns/black-scales.png")`, 
               backgroundSize: '120px'
           }} 
      />

      {/* Giant Rotating Chakra/Mandala in Background (Slow Cinematic Movement) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vmax] h-[120vmax] opacity-[0.06] animate-spin-slow mix-blend-screen">
         <div className="w-full h-full border-[80px] border-dashed border-gold-600 rounded-full" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vmax] h-[90vmax] opacity-[0.08] animate-spin-reverse-slow mix-blend-screen">
         <div className="w-full h-full border-[40px] border-dotted border-gold-400 rounded-full" />
      </div>

      {/* Canvas for Falling Ash/Snow */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-0 w-[50vw] h-[50vw] bg-gold-600/10 rounded-full blur-[100px] mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-0 w-[50vw] h-[50vw] bg-red-900/10 rounded-full blur-[100px] mix-blend-screen" />
    </div>
  );
};

export default Background;