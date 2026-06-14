import React, { useState } from 'react';

// Inline custom SVG logos for the security capabilities
const ToolLogos = {
  detection_engineering: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.05" />
      <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  threat_hunting: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  ),
  incident_response: (
    <svg className="w-6 h-6 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="currentColor" fillOpacity="0.05" />
      <line x1="12" y1="9" x2="12" y2="13" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  risk_assessment: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3v18h18" />
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18.7" cy="8" r="1" fill="currentColor" />
    </svg>
  ),
  elk: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 2a10 10 0 0 0-7.1 17.1l1-1A8.5 8.5 0 1 1 12 19v3a10 10 0 0 0 0-20z" fill="#00BFB3"/>
      <path d="M12 6.5a5.5 5.5 0 0 0-3.9 9.4l1-1A4 4 0 1 1 12 16.5v2a5.5 5.5 0 0 0 0-11z" fill="#FEB628"/>
      <path d="M12 11a1 1 0 1 0 0 2v1a2 2 0 1 1 0-4v1z" fill="#1E88E5"/>
    </svg>
  ),
  splunk: (
    <svg className="w-6 h-6 text-[#F92672]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.8 6.2v11.6L12 12 4.8 6.2zm8.4 10.4h6v-2h-6v2z" />
    </svg>
  ),
  burp: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="#FF6600" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="#FF6600" strokeWidth="1.5" />
      <path d="M12 2v22M2 12h20" stroke="#FF6600" strokeWidth="1.2" strokeDasharray="2 2" />
      <rect x="10.5" y="10.5" width="3" height="3" fill="#FF6600" />
    </svg>
  ),
  nmap: (
    <svg className="w-6 h-6 text-[#00FF00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M12 2v22M2 12h20" strokeDasharray="3 3" />
    </svg>
  ),
  cuckoo: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2h12v4l-4 4 4 4v4H6v-4l4-4-4-4V2z" fill="currentColor" fillOpacity="0.05" />
      <line x1="8" y1="5" x2="16" y2="5" strokeWidth="2" />
      <line x1="8" y1="19" x2="16" y2="19" strokeWidth="2" />
    </svg>
  ),
  android_sdk: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path d="M6 18c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-5H6v5z" fill="#3DDC84"/>
      <path d="M8 12h8a8 8 0 0 0-8-8 8 8 0 0 0-8 8" fill="#3DDC84"/>
      <line x1="6" y1="5" x2="4.5" y2="2.5" stroke="#3DDC84" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="5" x2="19.5" y2="2.5" stroke="#3DDC84" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="9.5" r="1" fill="#FFFFFF"/>
      <circle cx="14" cy="9.5" r="1" fill="#FFFFFF"/>
    </svg>
  ),
  aws_cloud: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path d="M18.7 16.5c-2.4 1.8-6.1 2.8-9.2 2.8-4.3 0-8.2-1.8-10.7-4.8-.3-.4 0-.8.4-.6 3 1.4 6.8 2.2 10.3 2.2 3.1 0 6.9-.7 9.5-2.1.5-.2.8.2.7.5z" fill="#FF9900" />
      <path d="M19.9 14.8c-.3-.4-1.3-.2-1.7-.1-.3.1-.3.3 0 .5.6.4 1.6.3 1.9-.1.2-.2 0-.3-.2-.3z" fill="#FF9900" />
    </svg>
  ),
  code_dev: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path d="M11.9 2C8.3 2 7.7 2.3 7 3c-.7.8-.8 1.9-.8 3.5V8h5.7V8.5H6c-1.5 0-2.3.8-2.9 1.5-.7.8-.8 2-.8 3.6 0 1.6.1 2.7.8 3.5.7.8 1.6 1.4 3 1.4h2v-2.7c0-1.6.7-3.1 1.9-4.1 1.2-1 2.7-1.5 4.3-1.5H20V8c0-1.6-.1-2.7-.8-3.5-.7-.8-1.3-1.5-2.9-1.5c-1.6 0-3.6-1-4.4-1z" fill="#3776AB" />
      <path d="M12.1 22c3.6 0 4.2-.3 4.9-1 .7-.8.8-1.9.8-3.5V16h-5.7v-.5H18c1.5 0 2.3-.8 2.9-1.5.7-.8.8-2 .8-3.6 0-1.6-.1-2.7-.8-3.5-.7-.8-1.6-1.4-3-1.4h-2v2.7c0 1.6-.7 3.1-1.9 4.1-1.2 1-2.7 1.5-4.3 1.5H4V16c0 1.6.1 2.7.8 3.5.7.8 1.3 1.5 2.9 1.5c1.6 0 3.6 1 4.4 1z" fill="#FFE873" />
      <circle cx="9" cy="5" r="0.6" fill="#ffffff" />
      <circle cx="15" cy="19" r="0.6" fill="#111" />
    </svg>
  )
};

const skills = [
  { id: 'detection_engineering', name: 'Detection Engineering', category: 'domains', desc: 'Designing, tuning, and validating detection rules across SIEM, endpoint logs, and cloud telemetry databases.' },
  { id: 'threat_hunting', name: 'Threat Hunting', category: 'domains', desc: 'Proactively searching for Indicators of Compromise (IoCs) and identifying Advanced Persistent Threat (APT) vectors.' },
  { id: 'incident_response', name: 'Incident Response (IR)', category: 'domains', desc: 'Analyzing security alerts, scoping intrusions, isolating payloads, and drafting mitigation playbooks.' },
  { id: 'risk_assessment', name: 'Risk Assessment', category: 'domains', desc: 'Identifying network vulnerabilities, assessing risk matrices, and conducting threat modeling procedures.' },
  { id: 'elk', name: 'ELK Stack', category: 'tools', desc: 'Elasticsearch, Logstash, and Kibana setup for custom syslog parsing and security event monitoring.' },
  { id: 'splunk', name: 'Splunk SIEM', category: 'tools', desc: 'Configuring enterprise dashboards, alert correlation logic, and ingesting high-volume application telemetry.' },
  { id: 'burp', name: 'Burp Suite', category: 'tools', desc: 'Intercepting web traffic proxies and auditing application pathways for OWASP Top 10 vulnerabilities.' },
  { id: 'nmap', name: 'Nmap & Wireshark', category: 'tools', desc: 'Subnet mapping, TCP/IP protocol debugging, packet-capture investigation, and network security auditing.' },
  { id: 'cuckoo', name: 'Cuckoo Sandbox', category: 'tools', desc: 'Deploying secure virtual sandboxes to execute malware samples, analyze registry changes, and trace C2 servers.' },
  { id: 'android_sdk', name: 'Android SDK', category: 'tools', desc: 'Reverse engineering mobile application packages (APKs), auditing permission logs, and inspecting runtime configs.' },
  { id: 'aws_cloud', name: 'AWS Cloud Security', category: 'cloud', desc: 'Securing cloud infrastructures utilizing AWS IAM boundary controls, VPC isolation, and network segmentation.' },
  { id: 'code_dev', name: 'Python, Bash & Rust', category: 'code', desc: 'Developing security automation tools, log parsers, system utilities, and malicious infrastructure extractor scripts.' }
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
            skill.category === 'domains' ||
            hoveredSkill.category === 'domains'
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
                <span>TECH_NODES</span>
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
            <span>Arsenal Telemetry</span>
          </div>

          {hoveredSkill ? (
            <div className="space-y-3 font-sans">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{hoveredSkill.name}</h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-medium">{hoveredSkill.desc}</p>
              <div className="text-[10px] text-[#00F0FF] font-mono">
                <span>&gt; CLASSIFICATION: {hoveredSkill.category.toUpperCase()}</span>
              </div>
            </div>
          ) : (
            <div className="font-sans text-xs text-neutral-400 space-y-2.5 font-medium">
              <p className="animate-pulse font-mono text-[10px] text-neutral-500">&gt; Awaiting node query...</p>
              <p className="text-[11px] text-neutral-500 leading-relaxed">Hover over any capability node in the active radar map to analyze system details, certifications, and threat modeling parameters.</p>
            </div>
          )}
        </div>

        <div className="font-mono text-[8px] text-neutral-500 border-t border-white/5 pt-3">
          <span>HOST: SEC_OPERATIONS // CLEARANCE_L3</span>
        </div>
      </div>
    </div>
  );
}
