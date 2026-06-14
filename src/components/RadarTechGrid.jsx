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
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
      <circle cx="9" cy="9" r="2" fill="currentColor" />
      <circle cx="15" cy="15" r="2" fill="currentColor" />
      <path d="M9 11v2M15 11v2" />
    </svg>
  ),
  splunk: (
    <svg className="w-6 h-6 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 8l4 4-4 4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13" y1="16" x2="17" y2="16" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="2" y="2" width="20" height="20" rx="3" />
    </svg>
  ),
  burp: (
    <svg className="w-6 h-6 text-[#1E40AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" strokeDasharray="2 2" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" fillOpacity="0.1" />
    </svg>
  ),
  nmap: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
  cuckoo: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" fill="currentColor" fillOpacity="0.05" />
      <polyline points="7.5 10.5 12 15 16.5 10.5" strokeWidth="1.5" />
    </svg>
  ),
  android_sdk: (
    <svg className="w-6 h-6 text-[#1E40AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" strokeLinecap="round" />
      <path d="M9 5h6" />
    </svg>
  ),
  aws_cloud: (
    <svg className="w-6 h-6 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" fillOpacity="0.1" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  code_dev: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
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
