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
        catRef.current.style.transform = `translate3d(${catPos.current.x - 18}px, ${catPos.current.y - 18}px, 0)`;
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
      {/* 1. Hacker Target Crosshair Cursor */}
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

      {/* 2. Cyber Chasing Cat */}
      <div
        ref={catRef}
        className="fixed top-0 left-0 w-9 h-9 pointer-events-none z-[9998] transition-transform duration-[0.03s] ease-out select-none"
      >
        <div 
          className="relative flex items-center justify-center w-full h-full"
          style={{ transform: `scaleX(${catDirection === 'left' ? -1 : 1})` }}
        >
          {/* Cyan tech alert on Hover state */}
          {isHovered && catState !== 'sleeping' && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] font-mono text-[8px] font-black px-1.5 py-0.5 rounded leading-none animate-bounce shadow-[0_0_8px_rgba(0,240,255,0.4)]">
              ALERT
            </div>
          )}

          {/* Sleep telemetry metric bubbles */}
          {catState === 'sleeping' && (
            <div className="absolute -top-3.5 -right-2 font-mono text-[7px] text-[#00F0FF]/50 animate-pulse font-bold tracking-widest">
              SLP_0x0f
            </div>
          )}

          {/* Cyber Cat State Vector Frames */}
          {catState === 'idle' && (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="filter drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
              {/* Ears */}
              <path d="M9 13L4 4L13 9" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M27 13L32 4L23 9" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Head */}
              <path d="M9 13C6 15.5 6 20.5 10 21.5C14 22.5 22 22.5 26 21.5C30 20.5 30 15.5 27 13Z" fill="#0A0E1C" stroke="#00F0FF" strokeWidth="1.5" />
              {/* Cyber Visor Eye */}
              <rect x="11" y="14" width="14" height="2.5" rx="1.25" fill="#EF4444" className="animate-pulse" />
              {/* Neck collar segment */}
              <path d="M12 21.5L18 23.5L24 21.5" stroke="#1E40AF" strokeWidth="1.5" />
              {/* Body */}
              <path d="M11 21.5C8.5 26.5 9.5 32 13 33C14 33 22 33 23 33C26.5 32 27.5 26.5 25 21.5Z" fill="#0A0E1C" stroke="#00F0FF" strokeWidth="1.5" />
              {/* Segmented Cyber Tail */}
              <path d="M23 30C26 30 28.5 28 29.5 24" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
              <circle cx="29.5" cy="24" r="1.5" fill="#EF4444" />
            </svg>
          )}

          {catState === 'running' && (
            runFrame === 0 ? (
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="filter drop-shadow-[0_0_8px_rgba(0,240,255,0.45)]">
                {/* Ears */}
                <path d="M11 12L7 4L15 8" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M25 12L29 4L21 8" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Head */}
                <path d="M11 12C8 14.5 8 19.5 12 20.5C16 21.5 20 21.5 24 20.5C28 19.5 28 14.5 25 12Z" fill="#0A0E1C" stroke="#00F0FF" strokeWidth="1.5" />
                <rect x="13" y="14.5" width="10" height="2.5" rx="1.25" fill="#EF4444" />
                {/* Body stretched */}
                <path d="M13 18.5C7.5 18.5 3 22.5 3 26.5C3 29.5 9 29.5 13 26.5" stroke="#00F0FF" strokeWidth="1.5" fill="#0A0E1C" />
                {/* Stretched legs */}
                <line x1="5.5" y1="27" x2="1" y2="33" stroke="#00F0FF" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="11.5" y1="27" x2="8" y2="34" stroke="#00F0FF" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="13" y1="24" x2="17" y2="31" stroke="#1E40AF" strokeWidth="2.2" strokeLinecap="round" />
                {/* Tail trail */}
                <path d="M3 18C1.5 14.5 1 14.5 1 14.5" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="filter drop-shadow-[0_0_8px_rgba(0,240,255,0.45)]">
                {/* Ears */}
                <path d="M11 12L7 4L15 8" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M25 12L29 4L21 8" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Head */}
                <path d="M11 12C8 14.5 8 19.5 12 20.5C16 21.5 20 21.5 24 20.5C28 19.5 28 14.5 25 12Z" fill="#0A0E1C" stroke="#00F0FF" strokeWidth="1.5" />
                <rect x="13" y="14.5" width="10" height="2.5" rx="1.25" fill="#EF4444" />
                {/* Body compact */}
                <path d="M13 18.5C7.5 18.5 3 22.5 3 26.5C3 29.5 9 29.5 13 26.5" stroke="#00F0FF" strokeWidth="1.5" fill="#0A0E1C" />
                {/* Legs tucked */}
                <line x1="5.5" y1="27" x2="7" y2="33" stroke="#00F0FF" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="11.5" y1="27" x2="13" y2="34" stroke="#00F0FF" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="13" y1="24" x2="15" y2="30" stroke="#1E40AF" strokeWidth="2.2" strokeLinecap="round" />
                {/* Tail curved */}
                <path d="M3 18C2.5 16.5 2.5 12.5 3.5 10.5" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )
          )}

          {catState === 'sleeping' && (
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="filter drop-shadow-[0_0_4px_rgba(0,0,0,0.6)]">
              {/* Curled sleeping shell */}
              <circle cx="18" cy="20" r="10" stroke="#4B5563" strokeWidth="1.5" fill="#0A0E1C" />
              <circle cx="18" cy="20" r="4.5" stroke="#1E40AF" strokeWidth="1.2" className="animate-pulse" />
              {/* Ears flattened */}
              <path d="M12 15L14 11L17 14" stroke="#4B5563" strokeWidth="1.5" />
              <path d="M24 15L22 11L19 14" stroke="#4B5563" strokeWidth="1.5" />
              {/* Offline visor indicator */}
              <rect x="13" y="18" width="10" height="1" fill="#4B5563" />
              <path d="M27 20C27 24 23 28 18 28" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}
