"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS, Skill, SkillNames } from "@/data/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSounds } from "@/components/realtime/hooks/use-sounds";
import { Section } from "@/components/animated-background-config";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

// ─── Keycap colors ────────────────────────────────────────────────────────────
const KEYCAP_BASE: Record<string, string> = {
  aws: "#6e3800", gcp: "#580012", vim: "#002e6e", nginx: "#5a0023",
  html: "#163a70", css: "#124c1a", nextjs: "#702000", tailwind: "#003e5a",
  postgres: "#063854", nodejs: "#0c2460", react: "#8a2a00", vue: "#002050",
  mongodb: "#001a26", wordpress: "#003e5c", express: "#052e40",
  firebase: "#7a5000", docker: "#0c3870", git: "#6e1408", github: "#0d0d0d",
  prettier: "#001a77", npm: "#0a4018",
  js: "#1a3f70", ts: "#174f20", linux: "#574200", vercel: "#4a1a00",
};

const KEYCAP_TOP: Record<string, string> = {
  aws: "#b05800", gcp: "#8c001e", vim: "#0052bb", nginx: "#9e0040",
  html: "#2563ab", css: "#1a7c28", nextjs: "#a03410", tailwind: "#006898",
  postgres: "#0c649e", nodejs: "#1640a0", react: "#cc4400", vue: "#003d80",
  mongodb: "#003d52", wordpress: "#0060a0", express: "#0c5870",
  firebase: "#c07800", docker: "#1660bb", git: "#c02c12", github: "#1a1a1a",
  prettier: "#0038bb", npm: "#186428",
  js: "#2563ab", ts: "#22862e", linux: "#8a6e00", vercel: "#7e2c00",
};

// ─── Row ordering: category-based ─────────────────────────────────────────────
// Row 1: Cloud/SIEM platforms
// Row 2: Network/pen-test tools
// Row 3: DevSecOps / infra
// Row 4: Languages & OS
const KEYBOARD_ROWS: SkillNames[][] = [
  [SkillNames.AWS, SkillNames.GCP, SkillNames.VIM, SkillNames.NGINX, SkillNames.HTML, SkillNames.CSS, SkillNames.NEXTJS, SkillNames.TAILWIND],
  [SkillNames.POSTGRES, SkillNames.NODEJS, SkillNames.REACT, SkillNames.VUE, SkillNames.MONGODB, SkillNames.WORDPRESS, SkillNames.EXPRESS],
  [SkillNames.FIREBASE, SkillNames.DOCKER, SkillNames.GIT, SkillNames.GITHUB, SkillNames.PRETTIER, SkillNames.NPM],
  [SkillNames.JS, SkillNames.TS, SkillNames.LINUX, SkillNames.VERCEL],
];

// Physical key bindings (row by row, left to right)
const KEY_BINDINGS: Record<string, SkillNames> = {
  "1": SkillNames.AWS, "2": SkillNames.GCP, "3": SkillNames.VIM,
  "4": SkillNames.NGINX, "5": SkillNames.HTML, "6": SkillNames.CSS,
  "7": SkillNames.NEXTJS, "8": SkillNames.TAILWIND,
  "q": SkillNames.POSTGRES, "w": SkillNames.NODEJS, "e": SkillNames.REACT,
  "r": SkillNames.VUE, "t": SkillNames.MONGODB, "y": SkillNames.WORDPRESS,
  "u": SkillNames.EXPRESS,
  "a": SkillNames.FIREBASE, "s": SkillNames.DOCKER, "d": SkillNames.GIT,
  "f": SkillNames.GITHUB, "g": SkillNames.PRETTIER, "h": SkillNames.NPM,
  "z": SkillNames.JS, "x": SkillNames.TS, "c": SkillNames.LINUX,
  "v": SkillNames.VERCEL,
};

// ─── Keycap ───────────────────────────────────────────────────────────────────
interface KeycapProps {
  skill: Skill;
  keyChar?: string;
  isActive: boolean;
  onHover: (skill: Skill) => void;
  onLeave: () => void;
  onPress: (skill: Skill) => void;
}

const Keycap = ({ skill, keyChar, isActive, onHover, onLeave, onPress }: KeycapProps) => {
  const [pressed, setPressed] = useState(false);
  const base = KEYCAP_BASE[skill.name] ?? "#111827";
  const top = KEYCAP_TOP[skill.name] ?? "#1e3a5f";
  const isDown = pressed || isActive;

  return (
    <button
      type="button"
      aria-label={skill.label}
      style={{
        pointerEvents: "auto",
        backgroundColor: base,
        boxShadow: isDown
          ? `inset 0 -1px 0 ${top}, 0 1px 0 ${base}aa, 0 2px 8px rgba(0,0,0,0.7)${isActive ? `, 0 0 16px ${top}99` : ""}`
          : `inset 0 -6px 0 rgba(0,0,0,0.45), 0 6px 0 ${base}99, 0 10px 24px rgba(0,0,0,0.8)${isActive ? `, 0 0 20px ${top}55` : ""}`,
        transform: isDown ? "translateY(5px) scale(0.955)" : "translateY(0) scale(1)",
        border: `1px solid ${isActive ? top : "rgba(255,255,255,0.07)"}`,
        outline: isActive ? `1.5px solid ${top}77` : "none",
        transition: "transform 80ms ease, box-shadow 80ms ease, border-color 80ms ease",
        cursor: "pointer",
        userSelect: "none",
        position: "relative",
        width: "60px",
        height: "60px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3px",
      }}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => { setPressed(false); onLeave(); }}
      onMouseDown={(e) => { e.preventDefault(); setPressed(true); onPress(skill); }}
      onMouseUp={() => setPressed(false)}
      onPointerDown={(e) => { e.preventDefault(); setPressed(true); onPress(skill); }}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => { setPressed(false); onLeave(); }}
      onTouchStart={(e) => { e.preventDefault(); setPressed(true); onPress(skill); }}
      onTouchEnd={() => { setPressed(false); onLeave(); }}
    >
      {/* Plastic sheen */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "12px", pointerEvents: "none",
        background: `linear-gradient(145deg, ${top}dd 0%, ${top}77 35%, ${base}cc 70%, rgba(0,0,0,0.3) 100%)`,
        opacity: isDown ? 0.7 : 1,
      }} />
      {/* Specular highlight */}
      <div style={{
        position: "absolute", top: "6px", left: "6px", width: "18px", height: "10px",
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(255,255,255,0.22) 0%, transparent 80%)",
      }} />
      {/* Physical key label */}
      {keyChar && (
        <span style={{
          position: "absolute", top: "3px", left: "5px",
          fontSize: "7px", fontFamily: "monospace", fontWeight: "bold",
          color: "rgba(255,255,255,0.3)", textShadow: "0 1px 2px rgba(0,0,0,0.7)",
          pointerEvents: "none", lineHeight: 1,
        }}>
          {keyChar.toUpperCase()}
        </span>
      )}
      {/* Icon dish */}
      <div style={{
        position: "relative", zIndex: 10, display: "flex", alignItems: "center",
        justifyContent: "center", width: "36px", height: "34px", borderRadius: "8px",
        background: "rgba(0,0,0,0.35)", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.5)",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skill.icon}
          alt={skill.label}
          width={22}
          height={22}
          style={{
            objectFit: "contain",
            filter: isActive
              ? "brightness(1.35) drop-shadow(0 0 5px rgba(255,255,255,0.45))"
              : "brightness(0.95)",
            transition: "filter 120ms",
          }}
          draggable={false}
        />
      </div>
      {/* Label */}
      <span style={{
        position: "relative", zIndex: 10, fontSize: "7px", fontWeight: 700,
        lineHeight: 1, textAlign: "center", maxWidth: "56px",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        padding: "0 2px", pointerEvents: "none",
        color: isActive ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.5)",
        textShadow: "0 1px 3px rgba(0,0,0,0.9)",
        transition: "color 120ms",
      }}>
        {skill.label}
      </span>
    </button>
  );
};

// ─── HTMLKeyboard ─────────────────────────────────────────────────────────────
export const HTMLKeyboard = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { playPressSound, playReleaseSound } = useSounds();

  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [pressedKey, setPressedKey] = useState<string>("");

  const keyboardRef = useRef<HTMLDivElement>(null);
  const activeSkillRef = useRef<Skill | null>(null);
  const sectionRef = useRef<Section>("hero");

  useEffect(() => { activeSkillRef.current = activeSkill; }, [activeSkill]);
  useEffect(() => { sectionRef.current = activeSection; }, [activeSection]);

  const isSkillsSection = activeSection === "skills";

  // ─── Physical keyboard shortcuts ──────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const key = e.key.toLowerCase();
      const skillName = KEY_BINDINGS[key];
      if (!skillName) return;
      const skill = SKILLS[skillName];
      if (!skill) return;
      setPressedKey(key);
      playPressSound();
      setActiveSkill(skill);
    };
    const onKeyUp = () => {
      setPressedKey("");
      playReleaseSound();
      setActiveSkill(null);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [playPressSound, playReleaseSound]);

  // ─── GSAP scroll transforms ────────────────────────────────────────────────
  useEffect(() => {
    const kbd = keyboardRef.current;
    if (!kbd) return;

    // GSAP fully owns ALL transforms — xPercent/yPercent replace Tailwind -translate-x/y-1/2
    gsap.set(kbd, {
      xPercent: -50, yPercent: -50,          // centering (replaces -translate-x/y-1/2)
      scale: isMobile ? 0.62 : 0.78,
      x: isMobile ? 0 : 180,          // hero: right side but not clipped
      y: isMobile ? 40 : 0,
      rotationX: 22,
      rotationY: isMobile ? 0 : -18,
      rotationZ: isMobile ? 0 : -2,
      opacity: 0,
    });
    gsap.to(kbd, { opacity: 1, duration: 1.4, ease: "power2.out", delay: 0.5 });

    const heroY = isMobile ? 40 : 0;
    const floatTween = gsap.to(kbd, {
      y: heroY + 24,
      duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
    });
    const rockTween = gsap.to(kbd, {
      rotationY: isMobile ? 4 : -8,
      duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
    });

    const resumeHero = () => { floatTween.restart(); rockTween.restart(); };
    const pauseHero = () => { floatTween.pause(); rockTween.pause(); };

    // ── Skills: centered, larger ──
    ScrollTrigger.create({
      trigger: "#skills",
      start: "top 55%",
      onEnter: () => {
        setActiveSection("skills");
        pauseHero();
        gsap.to(kbd, {
          scale: isMobile ? 0.90 : 1.04,
          x: 0, y: isMobile ? -20 : -10,
          rotationX: 14, rotationY: 0, rotationZ: 0,
          duration: 1, ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        setActiveSection("hero");
        setActiveSkill(null);
        gsap.to(kbd, {
          scale: isMobile ? 0.62 : 0.78,
          x: isMobile ? 0 : 180, y: heroY,
          rotationX: 22, rotationY: isMobile ? 0 : -18, rotationZ: isMobile ? 0 : -2,
          duration: 1, ease: "power2.out",
          onComplete: resumeHero,
        });
      },
    });

    // ── Projects: flip upside-down ──
    ScrollTrigger.create({
      trigger: "#projects",
      start: "top 70%",
      onEnter: () => {
        setActiveSection("projects");
        setActiveSkill(null);
        gsap.to(kbd, {
          scale: isMobile ? 0.58 : 0.65,
          x: 0, y: isMobile ? 80 : 60,
          rotationX: 175, rotationY: 55, rotationZ: 178,
          duration: 1.3, ease: "power3.inOut",
        });
      },
      onLeaveBack: () => {
        setActiveSection("skills");
        gsap.to(kbd, {
          scale: isMobile ? 0.90 : 1.04,
          x: 0, y: isMobile ? -20 : -10,
          rotationX: 14, rotationY: 0, rotationZ: 0,
          duration: 1, ease: "power2.out",
        });
      },
    });

    // ── Contact: slide off ──
    ScrollTrigger.create({
      trigger: "#contact",
      start: "top 30%",
      onEnter: () => {
        setActiveSection("contact");
        setActiveSkill(null);
        gsap.to(kbd, {
          scale: 0.45,
          x: isMobile ? 0 : 320,
          y: isMobile ? 200 : -240,
          rotationX: 8, rotationY: 0, rotationZ: 0,
          duration: 1.6, ease: "power3.inOut",
        });
      },
      onLeaveBack: () => {
        setActiveSection("projects");
        gsap.to(kbd, {
          scale: isMobile ? 0.58 : 0.65,
          x: 0, y: isMobile ? 80 : 60,
          rotationX: 175, rotationY: 55, rotationZ: 178,
          duration: 1, ease: "power2.out",
        });
      },
    });

    resumeHero();
    return () => {
      floatTween.kill(); rockTween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  // ─── Interaction handlers ──────────────────────────────────────────────────
  const handleHover = useCallback((skill: Skill) => {
    if (activeSkillRef.current?.name === skill.name) return;
    if (activeSkillRef.current) playReleaseSound();
    playPressSound();
    setActiveSkill(skill);
  }, [playPressSound, playReleaseSound]);

  const handleLeave = useCallback(() => {
    if (pressedKey) return; // keep active if physical key still held
    playReleaseSound();
    setActiveSkill(null);
  }, [playReleaseSound, pressedKey]);

  const handlePress = useCallback((skill: Skill) => {
    playPressSound();
    setActiveSkill(skill);
  }, [playPressSound]);

  // Reverse: skillName → keyboard char
  const skillToKey = Object.fromEntries(
    Object.entries(KEY_BINDINGS).map(([k, v]) => [v as string, k])
  );

  return (
    <div
      className="fixed inset-0 z-0"
      style={{ perspective: "1400px", perspectiveOrigin: "50% 38%", pointerEvents: "none" }}
    >
      {/* GSAP target wrapper — no Tailwind translate; GSAP owns xPercent/yPercent */}
      <div
        ref={keyboardRef}
        className="absolute top-1/2 left-1/2"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Keyboard chassis */}
        <div
          style={{
            pointerEvents: "auto",
            borderRadius: "24px",
            padding: "22px 24px 30px",
            background: "linear-gradient(160deg, #1f2138 0%, #11121e 55%, #08090f 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.07)",
              "inset 0 -3px 0 rgba(0,0,0,0.9)",
              "0 70px 140px -20px rgba(0,0,0,1)",
              "0 30px 60px -10px rgba(0,0,0,0.8)",
              "0 0 0 1px rgba(255,255,255,0.03)",
            ].join(","),
            position: "relative",
          }}
        >
          {/* Chassis bottom depth edge */}
          <div style={{
            position: "absolute", bottom: "-5px", left: "24px", right: "24px", height: "5px",
            borderRadius: "0 0 20px 20px",
            background: "linear-gradient(to bottom, #05060d, #020308)",
            boxShadow: "0 8px 24px rgba(0,0,0,1)",
          }} />

          {/* Top ambient glow strip */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "80px", height: "1px", borderRadius: "50%",
            background: "linear-gradient(to right, transparent, rgba(56,189,248,0.55), transparent)",
            boxShadow: "0 0 20px 2px rgba(56,189,248,0.22)",
          }} />

          {/* Hint text — only in skills section */}
          {isSkillsSection && (
            <p style={{
              position: "absolute", top: "-22px", left: 0, right: 0,
              textAlign: "center", fontSize: "10px", fontFamily: "monospace",
              color: "rgba(148,163,184,0.45)", pointerEvents: "none",
            }}>
              hover · click · press key to explore tools
            </p>
          )}

          {/* Key rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {KEYBOARD_ROWS.map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: "9px", justifyContent: "center" }}>
                {row.map((skillName) => {
                  const skill = SKILLS[skillName];
                  if (!skill) return null;
                  const keyChar = skillToKey[skillName];
                  const isPhysPressed = pressedKey === keyChar;
                  return (
                    <Keycap
                      key={skill.name}
                      skill={skill}
                      keyChar={keyChar}
                      isActive={activeSkill?.name === skill.name || isPhysPressed}
                      onHover={handleHover}
                      onLeave={handleLeave}
                      onPress={handlePress}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Status LEDs */}
          <div style={{ position: "absolute", bottom: "8px", right: "14px", display: "flex", gap: "6px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8", opacity: 0.7, boxShadow: "0 0 5px rgba(56,189,248,0.8)" }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", opacity: 0.5, boxShadow: "0 0 5px rgba(52,211,153,0.6)" }} />
          </div>
        </div>

        {/* Ground glow */}
        <div style={{
          position: "absolute", bottom: "-42px", left: "14%", right: "14%",
          height: "42px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 75%)",
          filter: "blur(14px)",
        }} />
      </div>

      {/* Skill HUD — skills section only */}
      <AnimatePresence>
        {isSkillsSection && activeSkill && (
          <motion.div
            key={activeSkill.name}
            initial={{ opacity: 0, y: 22, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            style={{
              position: "absolute", bottom: "24px",
              left: "50%", transform: "translateX(-50%)",
              width: "min(92vw, 520px)",
              padding: "16px 20px",
              borderRadius: "18px",
              background: "rgba(4,6,14,0.94)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(56,189,248,0.35)",
              boxShadow: "0 0 44px rgba(56,189,248,0.1), 0 24px 56px rgba(0,0,0,0.6)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSkill.icon}
                alt={activeSkill.label}
                width={28}
                height={28}
                style={{ objectFit: "contain", flexShrink: 0, filter: "drop-shadow(0 0 6px rgba(56,189,248,0.5))" }}
              />
              <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.04em", color: activeSkill.color ?? "#38bdf8" }}>
                {activeSkill.label}
              </span>
              {pressedKey && (
                <span style={{
                  marginLeft: "auto", fontSize: "9px", fontFamily: "monospace",
                  color: "rgba(56,189,248,0.6)", border: "1px solid rgba(56,189,248,0.2)",
                  borderRadius: "4px", padding: "2px 6px", textTransform: "uppercase",
                }}>
                  key: {pressedKey}
                </span>
              )}
            </div>
            <p style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(203,213,225,0.88)", lineHeight: "1.65", margin: 0 }}>
              {activeSkill.shortDescription}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HTMLKeyboard;
