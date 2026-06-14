import React, { useState, useEffect } from 'react';
import DecryptText from './DecryptText';

export default function HeroConsole() {
  const [booting, setBooting] = useState(true);
  const [logs, setLogs] = useState([]);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const logLines = [
      'SYS_INIT: Booting Cyber Command Center...',
      'NET_STATUS: Tunneling via node_proxy_l2... [ SECURE ]',
      'AUTH_AGENT: Verification key loaded... [ SEC_L3 ]',
      'SYS_LOAD: Parsing threat_hunting_matrix.json...',
      'SYS_LOAD: Initializing radar grid arrays...',
      'SYSTEM STATUS: READY.'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logLines.length) {
        setLogs(prev => [...prev, logLines[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setBooting(false);
          setTimeout(() => {
            setShowMain(true);
          }, 300);
        }, 500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (booting) {
    return (
      <div className="min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center px-6 sm:px-12 md:px-24 py-16 bg-[#0B0F19]/20 relative z-10 font-mono">
        <div className="max-w-3xl w-full border border-[#00F0FF]/15 bg-black/80 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.03)] text-neutral-300 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent animate-pulse"></div>
          <div className="flex justify-between items-center text-[10px] text-neutral-500 pb-3 border-b border-white/5">
            <span>TERMINAL // ROOT_ACCESS</span>
            <span>SECURE_BOOT</span>
          </div>
          <div className="space-y-1.5 text-xs text-neutral-400">
            {logs.map((log, i) => (
              <p key={i} className={i === logs.length - 1 ? "text-[#00F0FF]" : "text-neutral-400"}>
                {log}
              </p>
            ))}
          </div>
          <div className="pt-4 flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 bg-[#00F0FF] rounded-full animate-ping"></span>
            <span className="text-[10px] text-neutral-500">Decrypting system clearance level...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-center px-6 sm:px-12 md:px-24 py-16 relative z-10 transition-opacity duration-700 ${showMain ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl">
        {/* Terminal clearance marker */}
        <div className="inline-flex mb-6 font-mono text-xs text-[#00F0FF] bg-[#00F0FF]/5 border border-[#00F0FF]/25 px-3.5 py-1.5 rounded-full uppercase tracking-widest select-none">
          <span className="mr-2 animate-pulse">[ SEC_L3 ]</span> HIGH CLEARANCE ACCESS
        </div>

        {/* Decrypted Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight text-white mb-6 leading-none">
          <DecryptText text="Keerthivasan M" speed={30} />
          <span className="block text-xl sm:text-2xl md:text-4xl mt-3 text-neutral-400 font-mono font-medium">
            <DecryptText text="Securing Perimeters. Hunting Threats." speed={20} delay={600} />
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-mono tracking-wide mb-10 max-w-2xl border-l-2 border-[#00F0FF] pl-4 py-1.5">
          Vulnerability Assessment | Penetration Testing | SOC Investigation
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-[#1E40AF]/20 hover:bg-[#00F0FF] text-white hover:text-black font-mono text-xs uppercase font-extrabold tracking-widest border border-[#1E40AF]/50 hover:border-[#00F0FF] rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(30,64,175,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] text-center cursor-pointer"
          >
            [ Initialize Access : View Projects ]
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white font-mono text-xs uppercase font-extrabold tracking-widest border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 text-center cursor-pointer"
          >
            // Contact Operator
          </a>
        </div>
      </div>
    </div>
  );
}
