"use client";

import React, { useRef, useState } from "react";
import { EXPERIENCE, Experience, SkillNames, SKILLS } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import {
  Calendar,
  MapPin,
  Cpu,
  Layers,
} from "lucide-react";

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper
      id="experience"
      className="flex flex-col items-center justify-center min-h-screen py-24 md:py-36 px-4 sm:px-6 relative"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-10 w-[650px] h-[380px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div ref={containerRef} className="w-full max-w-4xl mx-auto">
        <SectionHeader
          id="experience"
          title="Work Experience"
          desc="Scroll down to explore each milestone layer by layer."
          className="mb-12 md:mb-16 mt-0 text-center"
        />

        {/* Stacking Card Deck Container */}
        <div className="relative flex flex-col gap-12 sm:gap-16 pb-24 md:pb-36">
          {EXPERIENCE.map((exp, index) => {
            const targetScale = 1 - (EXPERIENCE.length - index) * 0.03;
            return (
              <StackCardItem
                key={exp.id}
                experience={exp}
                index={index}
                total={EXPERIENCE.length}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

interface StackCardItemProps {
  experience: Experience;
  index: number;
  total: number;
  targetScale: number;
}

const StackCardItem = ({
  experience,
  index,
  total,
  targetScale,
}: StackCardItemProps) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ["start end", "start start"],
  });

  // Calculate sticky top offset so cards neatly stack on top of each other
  // Mobile: 4.5rem base + 16px step | Desktop: 6rem base + 24px step
  const topOffsetDesktop = `calc(5.5rem + ${index * 24}px)`;

  return (
    <div
      ref={cardContainerRef}
      className="sticky top-20 sm:top-24 md:top-28 flex items-center justify-center pointer-events-auto"
      style={{
        top: topOffsetDesktop,
        zIndex: index + 1,
      }}
    >
      <motion.div
        className="w-full origin-top"
        style={{
          scale: useTransform(scrollYProgress, [0, 1], [0.95, 1]),
        }}
      >
        <ModernStackedCard experience={experience} index={index} total={total} />
      </motion.div>
    </div>
  );
};

const ModernStackedCard = ({
  experience,
  index,
  total,
}: {
  experience: Experience;
  index: number;
  total: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const accent = experience.accentColor || "#38bdf8";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-3xl p-[1px] transition-all duration-300",
        "bg-gradient-to-b from-white/20 via-white/10 to-white/5",
        "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]"
      )}
      style={
        {
          "--card-accent": accent,
        } as React.CSSProperties
      }
    >
      {/* Interactive Cursor Spotlight Glow on Border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500 -z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${accent}90, rgba(255,255,255,0.12) 40%, transparent 80%)`,
        }}
      />

      {/* Card Inner Body - Solid High Contrast Glass to prevent see-through overlapping text */}
      <div
        className={cn(
          "relative rounded-3xl h-full p-6 sm:p-8 md:p-9 backdrop-blur-3xl transition-all duration-300 overflow-hidden",
          "bg-zinc-950/95 text-zinc-100 border border-white/10"
        )}
      >
        {/* Top Specular Accent Line */}
        <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Card Number Watermark / Indicator in top-right */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-2 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity">
          <span className="font-mono text-xs font-bold tracking-widest text-zinc-400">
            0{index + 1} / 0{total}
          </span>
        </div>

        {/* Ambient Mouse Surface Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, ${accent}12, transparent 65%)`,
          }}
        />

        {/* Main Content Layout */}
        <div className="relative z-10 flex flex-col gap-6">

          {/* Header Row: Circular Logo + Title + Organization + Tenure */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-white/10 pr-14 sm:pr-20">

            {/* Left: Logo & Details */}
            <div className="flex items-center sm:items-start gap-4 sm:gap-5 min-w-0">

              {/* Circular Logo Container */}
              <div className="relative shrink-0">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1.5 flex items-center justify-center bg-black border transition-transform duration-300 group-hover:scale-105 shadow-xl"
                  style={{
                    borderColor: `${accent}60`,
                    boxShadow: `0 0 25px -4px ${accent}40`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={experience.logo}
                    alt={experience.company}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>

              {/* Title, Category & Company */}
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: `${accent}18`,
                      borderColor: `${accent}40`,
                      color: accent,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
                    {experience.category}
                  </span>

                  <span className="text-[11px] font-medium text-zinc-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {experience.roleType}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display tracking-tight text-white group-hover:text-white transition-colors">
                  {experience.title}
                </h3>

                <div className="text-xs sm:text-sm font-medium text-zinc-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-zinc-200 font-semibold">{experience.company}</span>
                  {experience.location && (
                    <span className="inline-flex items-center gap-1 text-xs text-zinc-400 font-normal">
                      <MapPin className="w-3.5 h-3.5" />
                      {experience.location}
                    </span>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Timeline & Tenure Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>{experience.period || `${experience.startDate} - ${experience.endDate}`}</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <Layers className="w-3.5 h-3.5" style={{ color: accent }} />
              <span>Experience Layer 0{index + 1}</span>
            </div>
          </div>

          {/* Bento-style Metrics Dashboard */}
          {experience.metrics && experience.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {experience.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="flex flex-col p-3.5 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.07] hover:border-white/15"
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-medium">
                    {metric.label}
                  </span>
                  <span
                    className="text-base sm:text-lg font-bold font-display mt-0.5 tracking-tight"
                    style={{ color: accent }}
                  >
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Responsibilities & Achievements */}
          <div className="space-y-3">
            {experience.description.map((point, i) => (
              <div key={i} className="flex items-start gap-3.5 group/item">
                <div
                  className="mt-1 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border text-[10px] font-mono font-bold"
                  style={{
                    backgroundColor: `${accent}15`,
                    borderColor: `${accent}35`,
                    color: accent,
                  }}
                >
                  0{i + 1}
                </div>
                <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-300 font-sans">
                  {formatPointWithHighlights(point)}
                </p>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest font-mono text-zinc-400 font-semibold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" style={{ color: accent }} />
                Technologies &amp; Tools Used
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skillName) => {
                const skill = SKILLS[skillName as SkillNames];
                if (!skill) return null;
                return (
                  <div
                    key={skillName}
                    className="group/skill relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/20"
                    style={
                      {
                        "--skill-color": skill.color,
                      } as React.CSSProperties
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={skill.icon}
                      alt={skill.label}
                      className="w-4 h-4 object-contain opacity-90 transition-transform group-hover/skill:scale-110"
                    />
                    <span className="text-zinc-200 group-hover/skill:text-white">
                      {skill.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/**
 * Highlights key metrics and percentages (e.g. 80%, 40%, 6,000+, 10M+, 50,000+) in description text for enhanced scanability.
 */
const formatPointWithHighlights = (text: string) => {
  const parts = text.split(
    /(\b\d+(?:,\d+)*(?:\+)?%?|\b(?:OWASP Top 10|WAF|Sigma|Splunk|ELK Stack|C2|IOC|APK|Post-Quantum Cryptography|ML Biometrics)\b)/g
  );

  return parts.map((part, index) => {
    const isKeywordOrMetric =
      /^\d+(?:,\d+)*(?:\+)?%?$/.test(part) ||
      [
        "OWASP Top 10",
        "WAF",
        "Sigma",
        "Splunk",
        "ELK Stack",
        "C2",
        "IOC",
        "APK",
        "Post-Quantum Cryptography",
        "ML Biometrics",
      ].includes(part);

    if (isKeywordOrMetric) {
      return (
        <span key={index} className="font-semibold text-white">
          {part}
        </span>
      );
    }
    return part;
  });
};

export default ExperienceSection;
