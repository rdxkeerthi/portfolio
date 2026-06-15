import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [touchActive, setTouchActive] = useState(false);
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
  const hasMoved = useRef(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    setIsVisible(true);

    if (!isTouch) {
      document.body.classList.add('custom-cursor-enabled');
    }

    // Initialize cat to center of screen
    catPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e) => {
      hasMoved.current = true;
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Instantly position the hacker cursor via CSS transforms for zero lag
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
      }
    };

    const handleTouchStart = (e) => {
      hasMoved.current = true;
      setTouchActive(true);
      if (e.touches && e.touches[0]) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        mousePos.current = { x, y };
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
        }
      }
    };

    const handleTouchMove = (e) => {
      hasMoved.current = true;
      setTouchActive(true);
      if (e.touches && e.touches[0]) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        mousePos.current = { x, y };
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
        }
      }
    };

    const handleTouchEnd = () => {
      setTouchActive(false);
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
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    // Oneko-style cat physics loop
    const updateLoop = () => {
      if (!hasMoved.current) {
        animationFrameId.current = requestAnimationFrame(updateLoop);
        return;
      }

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
        catRef.current.style.transform = `translate3d(${catPos.current.x - 18}px, ${catPos.current.y - 18}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(updateLoop);
    };

    animationFrameId.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      document.body.classList.remove('custom-cursor-enabled');
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Hacker Target Crosshair Cursor */}
      <div
        ref={cursorRef}
        style={{
          opacity: isTouchDevice ? (touchActive ? 1 : 0) : 1,
          transition: isTouchDevice ? 'opacity 0.2s ease' : undefined,
        }}
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] flex items-center justify-center text-[#00F0FF]"
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

      {/* 2. Real Chasing Cat */}
      <div
        ref={catRef}
        className="fixed top-0 left-0 w-9 h-9 pointer-events-none z-[9998] transition-transform duration-[0.03s] ease-out select-none"
      >
        <div 
          className="relative flex items-center justify-center w-full h-full"
          style={{ transform: `scaleX(${catDirection === 'left' ? -1 : 1})` }}
        >
          {/* Cyber Alert label on hover */}
          {isHovered && catState !== 'sleeping' && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] font-mono text-[7px] font-black px-1.5 py-0.5 rounded leading-none animate-bounce shadow-[0_0_8px_rgba(0,240,255,0.4)]">
              ALERT
            </div>
          )}

          {/* Sleep indicator */}
          {catState === 'sleeping' && (
            <div className="absolute -top-3.5 -right-2 font-mono text-[7px] text-[#00F0FF]/50 animate-pulse font-bold tracking-widest">
              Zzz
            </div>
          )}

          {/* Real Cat SVGs */}
          {catState === 'idle' && (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]">
              {/* Tail */}
              <path d="M26 31C28 31 30 29 30.5 25C30.5 21 28 21 27 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Body */}
              <path d="M12 21C10 24 10 32 13 33C15 33 22 33 24 33C26 31 26.5 25 25 21" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
              {/* Paws */}
              <path d="M13 33 L14 34 L15 34" stroke="currentColor" strokeWidth="1.2" />
              <path d="M22 33 L23 34 L24 34" stroke="currentColor" strokeWidth="1.2" />
              {/* Head */}
              <path d="M11 13C8 16 8 20 12 21C16 22 20 22 24 21C28 20 28 16 25 13Z" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
              {/* Ears */}
              <path d="M12 13 L8 5 L15 10" stroke="currentColor" strokeWidth="1.5" fill="#050811" strokeLinejoin="round" />
              <path d="M24 13 L28 5 L21 10" stroke="currentColor" strokeWidth="1.5" fill="#050811" strokeLinejoin="round" />
              {/* Whiskers */}
              <line x1="5" y1="17" x2="10" y2="17.5" stroke="currentColor" strokeWidth="0.8" />
              <line x1="5" y1="19" x2="10" y2="18.5" stroke="currentColor" strokeWidth="0.8" />
              <line x1="31" y1="17" x2="26" y2="17.5" stroke="currentColor" strokeWidth="0.8" />
              <line x1="31" y1="19" x2="26" y2="18.5" stroke="currentColor" strokeWidth="0.8" />
              {/* Eyes */}
              <circle cx="15" cy="15.5" r="1" fill="#00F0FF" />
              <circle cx="21" cy="15.5" r="1" fill="#00F0FF" />
              {/* Nose */}
              <path d="M18 17.5 L17.5 18.5 L18.5 18.5 Z" fill="#EF4444" />
            </svg>
          )}

          {catState === 'running' && (
            runFrame === 0 ? (
              <svg width="42" height="36" viewBox="0 0 42 36" fill="none" className="text-white filter drop-shadow-[0_0_6px_rgba(0,240,255,0.2)]">
                {/* Tail */}
                <path d="M5 18C2 14 1 12 1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Body */}
                <path d="M15 17C9 17 4 21 4 25C4 28 10 28 15 25" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
                {/* Legs extended */}
                <line x1="13" y1="24" x2="17" y2="31" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="15" y1="24" x2="19" y2="30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="6" y1="25" x2="2" y2="31" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="8" y1="25" x2="4" y2="30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                {/* Head */}
                <path d="M12 11C9 13.5 9 17.5 13 18.5C17 19.5 21 19.5 25 18.5C29 17.5 29 13.5 26 11Z" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
                {/* Ears */}
                <path d="M13 11 L10 4 L16 8" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
                <path d="M23 11 L26 4 L20 8" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
                {/* Eyes */}
                <circle cx="17" cy="14" r="1.1" fill="#00F0FF" />
                <circle cx="21" cy="14" r="1.1" fill="#00F0FF" />
              </svg>
            ) : (
              <svg width="42" height="36" viewBox="0 0 42 36" fill="none" className="text-white filter drop-shadow-[0_0_6px_rgba(0,240,255,0.2)]">
                {/* Tail */}
                <path d="M5 18C4 16 4 12 5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Body */}
                <path d="M15 17C9 17 4 21 4 25C4 28 10 28 15 25" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
                {/* Legs retracted */}
                <line x1="13" y1="24" x2="11" y2="30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="15" y1="24" x2="13" y2="29" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="6" y1="25" x2="8" y2="30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="8" y1="25" x2="10" y2="29" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                {/* Head */}
                <path d="M12 11C9 13.5 9 17.5 13 18.5C17 19.5 21 19.5 25 18.5C29 17.5 29 13.5 26 11Z" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
                {/* Ears */}
                <path d="M13 11 L10 4 L16 8" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
                <path d="M23 11 L26 4 L20 8" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
                {/* Eyes */}
                <circle cx="17" cy="14" r="1.1" fill="#00F0FF" />
                <circle cx="21" cy="14" r="1.1" fill="#00F0FF" />
              </svg>
            )
          )}

          {catState === 'sleeping' && (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-neutral-400 filter drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]">
              {/* Sleeping Curled Body */}
              <path d="M18 10 C10 10 8 16 8 20 C8 25 12 29 18 29 C24 29 28 25 28 20 C28 16 26 10 18 10 Z" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
              {/* Tail wrapped */}
              <path d="M26 22 C26 26 22 28 18 28 C14 28 10 26 10 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              {/* Sleeping Ears */}
              <path d="M11 13 L13 8 L16 11" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
              <path d="M25 13 L23 8 L20 11" stroke="currentColor" strokeWidth="1.5" fill="#050811" />
              {/* Sleep eyes */}
              <path d="M13 16 C14 17 15 17 16 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <path d="M20 16 C21 17 22 17 23 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}
