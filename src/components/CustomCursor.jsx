import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [catState, setCatState] = useState('idle'); // 'idle' | 'running' | 'sleeping'
  const [catDirection, setCatDirection] = useState('right'); // 'left' | 'right'
  const [runFrame, setRunFrame] = useState(0); // 0 or 1 leg frame
  const [isHovered, setIsHovered] = useState(false);

  // References for position tracking
  const mousePos = useRef({ x: -100, y: -100 });
  const catPos = useRef({ x: 100, y: 100 });
  const cursorRef = useRef(null);
  const catRef = useRef(null);

  // Ref tracking animation state variables
  const animationFrameId = useRef(null);
  const idleTimer = useRef(0);
  const frameCounter = useRef(0);

  useEffect(() => {
    // Disable on mobile/touch interfaces
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || window.innerWidth < 768) {
      return;
    }

    setIsVisible(true);
    document.body.classList.add('custom-cursor-enabled');

    // Initialize cat to center of screen
    catPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Instantly position the hacker cursor via CSS transforms for zero lag
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
      }
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

    // Oneko-style cat physics loop
    const updateLoop = () => {
      const dx = mousePos.current.x - catPos.current.x;
      const dy = mousePos.current.y - catPos.current.y;
      const dist = Math.hypot(dx, dy);

      // Distance threshold: if cat is far from target cursor, it runs towards it
      if (dist > 36) {
        const speed = 4.2; // Pixels per frame
        const angle = Math.atan2(dy, dx);
        
        catPos.current.x += Math.cos(angle) * speed;
        catPos.current.y += Math.sin(angle) * speed;

        setCatState('running');
        setCatDirection(dx > 0 ? 'right' : 'left');

        // Alternate running frame every 6 frames
        frameCounter.current++;
        if (frameCounter.current % 6 === 0) {
          setRunFrame((prev) => (prev === 0 ? 1 : 0));
        }

        idleTimer.current = 0;
      } else {
        // Cat arrived near cursor
        if (idleTimer.current < 280) {
          setCatState('idle');
          idleTimer.current++;
        } else {
          // Sleeps after ~5 seconds of inactivity
          setCatState('sleeping');
        }
      }

      // Reposition cat container
      if (catRef.current) {
        catRef.current.style.transform = `translate3d(${catPos.current.x - 16}px, ${catPos.current.y - 12}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(updateLoop);
    };

    animationFrameId.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-enabled');
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Hacker Crosshair Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] transition-transform duration-[0.01s] ease-out flex items-center justify-center text-[#00F0FF]"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-all duration-300 ${isHovered ? 'scale-125 rotate-[90deg] text-[#EF4444]' : 'scale-100 rotate-0'}`}
        >
          <circle cx="12" cy="12" r="7" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
        </svg>
      </div>

      {/* 2. Oneko Chasing Cat */}
      <div
        ref={catRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] transition-transform duration-[0.03s] ease-out select-none"
      >
        <div 
          className="relative flex items-center justify-center w-full h-full"
          style={{ transform: `scaleX(${catDirection === 'left' ? -1 : 1})` }}
        >
          {/* Exclamation point on Hover state */}
          {isHovered && catState !== 'sleeping' && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] font-mono text-[9px] font-black px-1 py-0.5 rounded leading-none animate-bounce">
              !
            </div>
          )}

          {/* Zzz particle sleep clouds */}
          {catState === 'sleeping' && (
            <div className="absolute -top-3 -right-2 font-mono text-[8px] text-[#00F0FF]/60 animate-pulse font-bold tracking-widest">
              Zzz
            </div>
          )}

          {/* Cat State Rendering */}
          {catState === 'idle' && (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white filter drop-shadow-[0_0_4px_rgba(255,255,255,0.1)]">
              {/* Ears */}
              <path d="M8 12 L5 5 L12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M24 12 L27 5 L20 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {/* Head */}
              <path d="M8 12 C6 14 6 18 10 19 C14 20 18 20 22 19 C26 18 26 14 24 12 Z" stroke="currentColor" strokeWidth="2" fill="#050811" />
              <ellipse cx="12" cy="15" rx="1" ry="1.5" fill="#00F0FF" />
              <ellipse cx="20" cy="15" rx="1" ry="1.5" fill="#00F0FF" />
              {/* Nose */}
              <path d="M16 16.5 L15.5 17.5 L16.5 17.5 Z" fill="#EF4444" />
              {/* Body */}
              <path d="M10 19 C8 24 9 29 12 30 C13 30 19 30 20 30 C23 29 24 24 22 19 Z" stroke="currentColor" strokeWidth="2" fill="#050811" />
              {/* Tail wiggles slightly */}
              <path d="M21 28 C23 29 25 28 27 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}

          {catState === 'running' && (
            runFrame === 0 ? (
              <svg width="36" height="32" viewBox="0 0 36 32" fill="none" className="text-white filter drop-shadow-[0_0_4px_rgba(0,240,255,0.15)]">
                {/* Ears */}
                <path d="M12 10 L10 4 L16 8" stroke="currentColor" strokeWidth="2" />
                <path d="M24 10 L26 4 L20 8" stroke="currentColor" strokeWidth="2" />
                {/* Head facing forward */}
                <path d="M12 10 C10 12 10 16 14 17 C18 18 22 18 26 17 C30 16 30 12 28 10 Z" stroke="currentColor" strokeWidth="2" fill="#050811" />
                <circle cx="17" cy="13" r="1" fill="#00F0FF" />
                <circle cx="23" cy="13" r="1" fill="#00F0FF" />
                {/* Body running stretched */}
                <path d="M14 15 C8 15 4 19 4 23 C4 26 10 26 14 23" stroke="currentColor" strokeWidth="2" fill="#050811" />
                {/* Legs extended forward/backward */}
                <line x1="6" y1="23" x2="2" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="23" x2="9" y2="29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="20" x2="18" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                {/* Tail straight up */}
                <path d="M4 16 C2 12 1 12 1 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="36" height="32" viewBox="0 0 36 32" fill="none" className="text-white filter drop-shadow-[0_0_4px_rgba(0,240,255,0.15)]">
                {/* Ears */}
                <path d="M12 10 L10 4 L16 8" stroke="currentColor" strokeWidth="2" />
                <path d="M24 10 L26 4 L20 8" stroke="currentColor" strokeWidth="2" />
                {/* Head */}
                <path d="M12 10 C10 12 10 16 14 17 C18 18 22 18 26 17 C30 16 30 12 28 10 Z" stroke="currentColor" strokeWidth="2" fill="#050811" />
                <circle cx="17" cy="13" r="1" fill="#00F0FF" />
                <circle cx="23" cy="13" r="1" fill="#00F0FF" />
                {/* Body running compact */}
                <path d="M14 15 C8 15 4 19 4 23 C4 26 10 26 14 23" stroke="currentColor" strokeWidth="2" fill="#050811" />
                {/* Legs tucked */}
                <line x1="6" y1="23" x2="8" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="23" x2="14" y2="29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="14" y1="20" x2="16" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                {/* Tail curved */}
                <path d="M4 16 C3 14 3 10 4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )
          )}

          {catState === 'sleeping' && (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-neutral-500 filter drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]">
              {/* Sleeping curled body */}
              <circle cx="16" cy="18" r="9" stroke="currentColor" strokeWidth="2" fill="#050811" />
              {/* Ears flattened */}
              <path d="M10 13 L12 9 L15 12" stroke="currentColor" strokeWidth="2" />
              <path d="M22 13 L20 9 L17 12" stroke="currentColor" strokeWidth="2" />
              {/* Closed eye curves */}
              <path d="M11 17 C12 18 13 18 14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M18 17 C19 18 20 18 21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              {/* Curled tail */}
              <path d="M25 18 C25 22 21 26 16 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}
