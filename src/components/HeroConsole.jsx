import React from 'react';
import DecryptText from './DecryptText';

export default function HeroConsole() {
  return (
    <div className="min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center px-6 sm:px-12 md:px-24 py-16 relative z-10">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Bio Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Status Badge */}
          <div className="inline-flex font-mono text-xs text-[#00F0FF] bg-[#00F0FF]/5 border border-[#00F0FF]/20 px-3.5 py-1.5 rounded-full uppercase tracking-widest select-none">
            <span className="mr-2 flex h-2 w-2 items-center justify-center relative mt-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00F0FF]"></span>
            </span>
            PORTFOLIO // STUDENT
          </div>

          {/* Decrypted Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight text-white leading-none">
            <DecryptText text="KEERTHIVASAN M" speed={30} />
            <span className="block text-xl sm:text-2xl md:text-3xl mt-3 text-neutral-400 font-mono font-medium">
              <DecryptText text="Securing Perimeters. Hunting Threats." speed={20} delay={400} />
            </span>
          </h1>

          {/* Subhead */}
          <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-mono tracking-wide max-w-2xl border-l-2 border-[#00F0FF] pl-4 py-1.5">
            Malware Analysis | SOC Operations | Cloud Security
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-[#1E40AF]/25 hover:bg-[#00F0FF] text-white hover:text-black font-mono text-xs uppercase font-extrabold tracking-widest border border-[#1E40AF]/40 hover:border-[#00F0FF] rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.05)] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] text-center cursor-pointer"
            >
              [ View Projects ]
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white font-mono text-xs uppercase font-extrabold tracking-widest border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 text-center cursor-pointer"
            >
              // Contact Me
            </a>
          </div>
        </div>

        {/* Right Column: Premium Shaded Profile Photo */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative glass-panel p-4 rounded-3xl border border-white/10 max-w-[420px] w-full bg-black/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] hover:border-[#00F0FF]/25 hover:shadow-[0_0_40px_rgba(0,240,255,0.08)] transition-all duration-500 group overflow-hidden">
            
            {/* Shaded mesh corner glow */}
            <div className="absolute -right-20 -top-20 w-44 h-44 bg-[#00F0FF]/5 group-hover:bg-[#00F0FF]/10 rounded-full blur-3xl transition-all duration-500"></div>

            {/* Profile Image Wrapper */}
            <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-white/5">
              <img 
                src="/medp.jpeg" 
                alt="Keerthivasan M" 
                className="w-full h-auto object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 select-none scale-[1.01] group-hover:scale-100"
              />
            </div>

            {/* Identity HUD Tag */}
            <div className="mt-4 flex justify-between items-center font-mono text-[10px] text-neutral-500 px-1 border-t border-white/5 pt-3">
              <span className="text-neutral-400 font-bold">CLASS OF 2027</span>
              <span className="text-[#00F0FF] uppercase tracking-wider">B.E. CYBER SECURITY</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
