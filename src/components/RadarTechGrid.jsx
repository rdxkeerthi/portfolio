import React, { useState } from 'react';

const skills = [
  { id: 'nmap', name: 'Nmap', category: 'vapt', desc: 'Network mapper for security auditing & vulnerability assessment' },
  { id: 'metasploit', name: 'Metasploit', category: 'vapt', desc: 'Offensive exploitation framework for penetration testing' },
  { id: 'wireshark', name: 'Wireshark', category: 'both', desc: 'Packet analyzer for network threat analysis & log audits' },
  { id: 'splunk', name: 'Splunk SIEM', category: 'soc', desc: 'Log aggregation & brute-force correlation playbook design' },
  { id: 'sentinel', name: 'Azure Sentinel', category: 'soc', desc: 'Cloud-native SIEM for enterprise anomaly threat detection' },
  { id: 'python', name: 'Python', category: 'dev', desc: 'Security automation scripting & physiological ML model code' },
  { id: 'react', name: 'React', category: 'dev', desc: 'Secure front-end design, JWT integration, and role-based views' },
  { id: 'firebase', name: 'Firebase', category: 'dev', desc: 'Cloud database, strict security rules, and user MFA auth' }
];

export default function RadarTechGrid() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Node Grid Map */}
      <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4 relative">
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
              className={`relative glass-card p-6 border rounded-2xl cursor-pointer select-none transition-all duration-500 overflow-hidden flex flex-col justify-between h-32 ${
                isCurrent 
                  ? 'border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)] bg-black/80' 
                  : isRelated 
                    ? 'border-[#1E40AF] shadow-[0_0_15px_rgba(30,64,175,0.15)] bg-black/40' 
                    : 'border-white/5 bg-black/20 opacity-40 scale-[0.98]'
              }`}
            >
              {/* Radar Ping rings on hover */}
              {isCurrent && (
                <>
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <span className="w-16 h-16 rounded-full border border-[#00F0FF]/35 animate-ping absolute"></span>
                    <span className="w-24 h-24 rounded-full border border-[#00F0FF]/20 animate-ping absolute [animation-delay:0.3s]"></span>
                  </div>
                </>
              )}

              {/* Status Header */}
              <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-neutral-500">
                <span>[ ACTIVE_RADAR ]</span>
                <span className={isRelated ? 'text-[#00F0FF]' : 'text-neutral-600'}>
                  {skill.category.toUpperCase()}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-mono font-bold text-base tracking-tight text-white mt-2">
                {skill.name}
              </h3>

              {/* Secure Footnotes */}
              <div className="flex justify-between items-center text-[8px] font-mono text-neutral-600 border-t border-white/5 pt-2 mt-2">
                <span>AUTH_GRANTED</span>
                <span>SEC_L2</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Readout Sidebar */}
      <div className="lg:col-span-4 glass-card border border-white/10 p-6 rounded-2xl flex flex-col justify-between h-72 bg-[#0B0F19]/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 text-[8px] font-mono text-neutral-600 tracking-wider uppercase select-none">
          Console V4.9
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-400 border-b border-white/5 pb-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span>SIEM // TOOL_DETAILS</span>
          </div>

          {hoveredSkill ? (
            <div className="space-y-3 font-mono">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{hoveredSkill.name}</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">{hoveredSkill.desc}</p>
              <div className="text-[10px] text-[#00F0FF] pt-2">
                <span>&gt; STATUS: OPERATIONAL</span>
              </div>
            </div>
          ) : (
            <div className="font-mono text-xs text-neutral-500 space-y-2.5">
              <p className="animate-pulse">&gt; Awaiting node activation...</p>
              <p className="text-[10px] text-neutral-600 leading-relaxed">Hover over any capability node on the left radar map to analyze system usage, classifications, and audit logs.</p>
            </div>
          )}
        </div>

        <div className="font-mono text-[9px] text-neutral-600 border-t border-white/5 pt-3">
          <span>PORT_STATUS // CONNECTED</span>
        </div>
      </div>
    </div>
  );
}
