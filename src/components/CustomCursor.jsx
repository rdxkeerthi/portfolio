import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Soft spring config for physics delay
  const springConfig = { damping: 25, stiffness: 280, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch screens and narrow viewports
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || window.innerWidth < 768) {
      return;
    }

    setIsVisible(true);
    document.body.classList.add('custom-cursor-enabled');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 12); // Offset to center 24px width
      mouseY.set(e.clientY - 12);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.closest('.glass-panel') ||
        target.closest('.glass-card') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.5 : 1,
          color: isHovered ? '#00F0FF' : '#ffffff',
          rotate: isHovered ? [0, -5, 5, 0] : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        className="flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Ears */}
          <path d="M4 10 L2 3 L8 6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 10 L22 3 L16 6" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Face outline */}
          <path d="M4 10 C2 13.5 2 17.5 5 20 C8 22.5 16 22.5 19 20 C22 17.5 22 13.5 20 10 C18 9 6 9 4 10 Z" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Eyes */}
          <circle cx="8" cy="14" r="1.2" fill="currentColor"/>
          <circle cx="16" cy="14" r="1.2" fill="currentColor"/>
          {/* Nose/mouth */}
          <path d="M12 16.5 L11.5 17.5 L12.5 17.5 Z" fill="currentColor"/>
          {/* Whiskers */}
          <line x1="2" y1="17" x2="6" y2="17.5" stroke="currentColor" strokeWidth="1"/>
          <line x1="22" y1="17" x2="18" y2="17.5" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}
