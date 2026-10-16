"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Pan speed (CSS px/sec). Duration is derived from this so every card scrolls
// at the same visual speed — longer pages just take proportionally longer.
const PAN_SPEED = 70;
const PAUSE = 1.2; // seconds held at top and bottom

// A page only pans if it overflows the frame by at least this fraction of the
// frame height. Anything shorter (landscape/square screenshots) is shown
// "cover" instead, so any image looks right with no per-image config.
const MIN_SCROLL_OVERFLOW = 0.2;

// Neutral wallpaper when a card has no `bg` (or it fails to load), so adding a
// project with just a screenshot still looks intentional.
const FALLBACK_BG = "linear-gradient(135deg, #1e293b, #0f172a)";

const ScrollingPreview = ({
  src,
  alt,
  bg,
}: {
  src: string;
  alt: string;
  bg?: string;
}) => {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(viewportRef, { margin: "100px" });
  const [scrollPx, setScrollPx] = useState(0);
  const [bgReady, setBgReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    const compute = () => {
      const vp = viewportRef.current;
      if (cancelled || !vp || !img.naturalWidth) return;
      const ratio = img.naturalHeight / img.naturalWidth;
      const displayedHeight = vp.clientWidth * ratio;
      const overflow = displayedHeight - vp.clientHeight;
      setScrollPx(overflow > vp.clientHeight * MIN_SCROLL_OVERFLOW ? overflow : 0);
    };
    img.onload = compute;
    img.src = src;
    if (img.complete) compute();
    window.addEventListener("resize", compute);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", compute);
    };
  }, [src]);

  // Preload the wallpaper so a missing/404 file falls back to the gradient
  useEffect(() => {
    if (!bg) {
      setBgReady(false);
      return;
    }
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => !cancelled && setBgReady(true);
    img.onerror = () => !cancelled && setBgReady(false);
    img.src = bg;
    return () => {
      cancelled = true;
    };
  }, [bg]);

  const scrolls = scrollPx > 0;
  const animate = !reduceMotion && scrolls && isInView;

  const pan = scrollPx / PAN_SPEED;
  const total = pan * 2 + PAUSE * 2;
  const times = [
    0,
    pan / total,
    (pan + PAUSE) / total,
    (pan * 2 + PAUSE) / total,
    1,
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0"
      role="img"
      aria-label={alt}
    >
      {/* wallpaper background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#0f172a",
          backgroundImage: bgReady && bg ? `url("${bg}")` : FALLBACK_BG,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* floating screenshot panel */}
      <div
        ref={viewportRef}
        className="sp-shot"
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          top: 20,
          bottom: 0,
          overflow: "hidden",
          borderRadius: 10,
          boxShadow:
            "0 24px 50px -12px rgba(8,20,55,0.55), 0 8px 18px -8px rgba(8,20,55,0.45)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        {scrolls ? (
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              willChange: "transform",
            }}
            animate={
              animate
                ? {
                    y: [0, -scrollPx, -scrollPx, 0, 0],
                  }
                : { y: 0 }
            }
            transition={
              animate
                ? { duration: total, ease: "easeInOut", repeat: Infinity, times }
                : undefined
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="w-full h-auto block select-none pointer-events-none"
              loading="lazy"
              draggable={false}
            />
          </motion.div>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${src}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ScrollingPreview;
