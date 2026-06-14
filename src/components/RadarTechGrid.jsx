import React, { useState } from 'react';

// Custom inline SVG icons for security & dev tools
const ToolLogos = {
  nmap: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 12 L19 5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  metasploit: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="currentColor" fillOpacity="0.05" />
      <path d="M12 6l-6 3.5V13c0 3.7 2.5 7.2 6 8 3.5-.8 6-4.3 6-8V9.5L12 6z" />
      <path d="M9 10h6M9 13h6M12 10v6" strokeWidth="2" />
    </svg>
  ),
  burpsuite: (
    <svg className="w-6 h-6 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" strokeDasharray="2 2" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" fillOpacity="0.1" />
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
    </svg>
  ),
  hydra: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M8 8l2 2m4 0l2-2m-6 8h4m-5-3h6" strokeWidth="2" />
      <circle cx="9" cy="11" r="1" fill="currentColor" />
      <circle cx="15" cy="11" r="1" fill="currentColor" />
    </svg>
  ),
  wireshark: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 17s3-5 10-5 10 5 10 5" />
      <path d="M12 12V3c1.5 2.5 4.5 4 4.5 4S13.5 8.5 12 12z" fill="currentColor" />
      <path d="M2 20h20" strokeWidth="2" />
    </svg>
  ),
  splunk: (
    <svg className="w-6 h-6 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="1 1" />
      <path d="M7 8l4 4-4 4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13" y1="16" x2="17" y2="16" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  sentinel: (
    <svg className="w-6 h-6 text-[#1E40AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" fillOpacity="0.1" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  snort: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="6" width="16" height="12" rx="3" />
      <circle cx="9" cy="11" r="1.5" fill="currentColor" />
      <circle cx="15" cy="11" r="1.5" fill="currentColor" />
      <path d="M10 14h4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  python: (
    <svg className="w-6 h-6 text-[#1E40AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2H9a4 4 0 00-4 4v2a2 2 0 002 2h3V9h4v2a4 4 0 004-4V5a3 3 0 00-3-3h-4z" />
      <path d="M12 22h3a4 4 0 004-4v-2a2 2 0 00-2-2h-3v1h-4v-2a4 4 0 00-4 4v2a3 3 0 003 3h4z" />
    </svg>
  ),
  react: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(30 12 12)" />
      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(90 12 12)" />
      <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  firebase: (
    <svg className="w-6 h-6 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17.5L12 2l4 7" />
      <path d="M12 14.5l6.5-6.5L21 17.5c.5.5-.2 1.5-.9 1.1L12 14.5z" fill="currentColor" fillOpacity="0.1" />
      <path d="M3.2 18.2l7.7-14.8c.2-.5 1-.5 1.2 0l2 3.8" />
    </svg>
  ),
  docker: (
    <svg className="w-6 h-6 text-[#1E40AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="10" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="9" y="10" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="13" y="10" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="9" y="6" width="3" height="3" rx="0.5" fill="currentColor" />
      <path d="M2 14c4 0 4 3 10 3s6-3 10-3v2c-4 0-4 2-10 2s-6-2-10-2v-2z" />
    </svg>
  )
};

const skills = [
  { id: 'nmap', name: 'Nmap', category: 'vapt', desc: 'Network mapper for security auditing & vulnerability assessment' },
  { id: 'metasploit', name: 'Metasploit', category: 'vapt', desc: 'Offensive exploitation framework for penetration testing' },
  { id: 'burpsuite', name: 'Burp Suite', category: 'vapt', desc: 'Web vulnerability scanner and proxy tool for application security audits' },
  { id: 'hydra', name: 'Hydra', category: 'vapt', desc: 'Parallelized network login cracker for credential strength verification' },
  { id: 'wireshark', name: 'Wireshark', category: 'both', desc: 'Packet analyzer for network threat analysis & log audits' },
  { id: 'splunk', name: 'Splunk SIEM', category: 'soc', desc: 'Log aggregation & brute-force correlation playbook design' },
  { id: 'sentinel', name: 'Azure Sentinel', category: 'soc', desc: 'Cloud-native SIEM for enterprise anomaly threat detection' },
  { id: 'snort', name: 'Snort IDS', category: 'soc', desc: 'Open-source intrusion detection system for real-time traffic analysis' },
  { id: 'python', name: 'Python', category: 'dev', desc: 'Security automation scripting & physiological ML model code' },
  { id: 'react', name: 'React', category: 'dev', desc: 'Secure front-end design, JWT integration, and role-based views' },
  { id: 'firebase', name: 'Firebase', category: 'dev', desc: 'Cloud database, strict security rules, and user MFA auth' },
  { id: 'docker', name: 'Docker', category: 'dev', desc: 'Containerization platform used for sandbox environments and secure service isolation' }
];

export default function RadarTechGrid() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Node Grid Map */}
      <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 relative">
        {skills.map((skill) => {
          const isCurrent = hoveredSkill?.id === skill.id;
          const isRelated = hoveredSkill && (
            hoveredSkill.id === skill.id || 
            hoveredSkill.category === skill.category || 
            skill.category === 'both' || 
            hoveredSkill.category === 'both'
          );

          return (
            <div
              key={skill.id}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`relative glass-card p-5 flex flex-col justify-between border cursor-pointer select-none transition-all duration-500 overflow-hidden h-32 ${
                isCurrent 
                  ? 'border-[#00F0FF]/30 bg-white/[0.03] shadow-[0_15px_30px_-5px_rgba(0,240,255,0.05)] scale-[1.02]' 
                  : isRelated 
                    ? 'border-[#1E40AF]/30 bg-white/[0.015] scale-[1.01]' 
                    : 'border-white/5 bg-black/20 opacity-55 scale-[0.98]'
              }`}
            >
              {/* Radar Ping rings on hover */}
              {isCurrent && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <span className="w-16 h-16 rounded-full border border-[#00F0FF]/15 animate-ping absolute"></span>
                </div>
              )}

              {/* Status Header */}
              <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-neutral-500">
                <span>RADAR_TAG</span>
                {ToolLogos[skill.id] || null}
              </div>

              {/* Name */}
              <h3 className="font-sans font-bold text-sm tracking-tight text-white mt-3">
                {skill.name}
              </h3>

              {/* Secure Footnotes */}
              <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 border-t border-white/5 pt-2 mt-2">
                <span>OPERATIONAL</span>
                <span className={isRelated ? 'text-[#00F0FF]' : 'text-neutral-500'}>
                  {skill.category.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Readout Sidebar */}
      <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/5 flex flex-col justify-between h-72 bg-black/20 relative overflow-hidden">
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-neutral-400 border-b border-white/5 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"></span>
            <span>Capability Analysis</span>
          </div>

          {hoveredSkill ? (
            <div className="space-y-3 font-sans">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{hoveredSkill.name}</h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-medium">{hoveredSkill.desc}</p>
              <div className="text-[10px] text-[#00F0FF] font-mono">
                <span>&gt; STATUS: OK</span>
              </div>
            </div>
          ) : (
            <div className="font-sans text-xs text-neutral-400 space-y-2.5 font-medium">
              <p className="animate-pulse font-mono text-[10px] text-neutral-500">&gt; Query pending...</p>
              <p className="text-[11px] text-neutral-500 leading-relaxed">Hover over any capability node on the left radar map to analyze system usage, classifications, and audit logs.</p>
            </div>
          )}
        </div>

        <div className="font-mono text-[8px] text-neutral-500 border-t border-white/5 pt-3">
          <span>PORT: 443 // AUTH_OK</span>
        </div>
      </div>
    </div>
  );
}
