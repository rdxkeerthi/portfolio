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
  mitre_attack: (
    <svg className="w-6 h-6 text-[#FF8C00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.05" />
      <path d="M9 3v18M15 3v18" />
      <path d="M3 9h18M3 15h18" />
      <circle cx="6" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="#EF4444" stroke="none" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2" />
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
  wireshark: (
    <svg className="w-6 h-6 text-[#1A5F7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 19c3.5 0 6-1 9-5.5 2.5-3.8 4.5-9.5 5.5-11.5.3-.6.9-.5 1.1.2.6 1.8 1.9 6.8 1.4 10.8-.4 3-2.5 5-5 6H22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 19a16 16 0 0 1 12 0M9 16a12 12 0 0 1 6 0" strokeDasharray="2 2" />
    </svg>
  ),
  yara: (
    <svg className="w-6 h-6 text-[#00F0FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" fill="currentColor" fillOpacity="0.05" />
      <circle cx="12" cy="12" r="5" strokeDasharray="3 3" />
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4" strokeLinecap="round" />
      <path d="M9.5 10.5h5M9.5 13.5h3" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  ghidra: (
    <svg className="w-6 h-6 text-[#00FF66]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C7 2 3 6 3 11c0 3 1.5 5.5 4 7.5V22l4-2.5 4 2.5v-3.5c2.5-2 4-4.5 4-7.5 0-5-4-9-9-9z" fill="currentColor" fillOpacity="0.05" />
      <path d="M7 10.5c.5-1.5 2-2.5 4-2.5s3.5 1 4 2.5" strokeLinecap="round" />
      <path d="M8.5 11.5l1.5-.5M15.5 11.5l-1.5-.5" stroke="#FF0055" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 14.5l.5 1.5M14 14.5l-.5 1.5" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M12 2v3M3 11h2M19 11h2" strokeLinecap="round" />
    </svg>
  ),
  sysinternals: (
    <svg className="w-6 h-6 text-[#00BCF2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="6" strokeWidth="2" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" strokeLinecap="round" />
      <path d="M10 10h1.5v1.5H10zM12.5 10H14v1.5h-1.5zM10 12.5h1.5v1.5H10zM12.5 12.5H14v1.5h-1.5z" fill="currentColor" stroke="none" />
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
  docker: (
    <svg className="w-6 h-6" viewBox="0 0 128 128">
      <path fillRule="evenodd" clipRule="evenodd" fill="#3A4D54" d="M73.8 50.8h11.3v11.5h5.7c2.6 0 5.3-.5 7.8-1.3 1.2-.4 2.6-1 3.8-1.7-1.6-2.1-2.4-4.7-2.6-7.3-.3-3.5.4-8.1 2.8-10.8l1.2-1.4 1.4 1.1c3.6 2.9 6.5 6.8 7.1 11.4 4.3-1.3 9.3-1 13.1 1.2l1.5.9-.8 1.6c-3.2 6.2-9.9 8.2-16.4 7.8-9.8 24.3-31 35.8-56.8 35.8-13.3 0-25.5-5-32.5-16.8l-.1-.2-1-2.1c-2.4-5.2-3.1-10.9-2.6-16.6l.2-1.7h9.6V50.8h11.3V39.6h22.5V28.3h13.5v22.5z"/>
      <path fill="#00AADA" d="M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7-3.1 3.6-3.6 13.2 1.3 17.2-2.8 2.4-8.5 4.7-14.5 4.7H18.6c-.6 6.2.5 11.9 3 16.8l.8 1.5c.5.9 1.1 1.7 1.7 2.6 3 .2 5.7.3 8.2.2 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5 1.1-8.3 1.3h-.6c-1.3.1-2.7.1-4.2.1-1.6 0-3.7 0-4.9-.1 6 6.8 15.4 10.8 27.2 10.8 25 0 46.2-11.1 55.5-35.9 6.7.7 13.1-1 16-6.7-4.5-2.7-10.5-1.8-13.9-.1z"/>
      <path fill="#28B8EB" d="M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7-3.1 3.6-3.6 13.2 1.3 17.2-2.8 2.4-8.5 4.7-14.5 4.7h-68c-.3 9.5 3.2 16.7 9.5 21 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.5 1.4l-.1-.1c8.5 4.4 20.8 4.3 35-1.1 15.8-6.1 30.6-17.7 40.9-30.9-.2.1-.4.1-.5.2z"/>
      <path fill="#028BB8" d="M18.7 71.8c.4 3.3 1.4 6.4 2.9 9.3l.8 1.5c.5.9 1.1 1.7 1.7 2.6 3 .2 5.7.3 8.2.2 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.5 1.4h-.4c-1.3.1-2.7.1-4.1.1-1.6 0-3.2 0-4.9-.1 6 6.8 15.5 10.8 27.3 10.8 21.4 0 40-8.1 50.8-26H18.7v-.1z"/>
      <path fill="#019BC6" d="M23.5 71.8c1.3 5.8 4.3 10.4 8.8 13.5 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.6 1.4 8.5 4.4 20.8 4.3 34.9-1.1 8.5-3.3 16.8-8.2 24.2-14.1H23.5z"/>
    </svg>
  ),
  aws_cloud: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path d="M18.7 16.5c-2.4 1.8-6.1 2.8-9.2 2.8-4.3 0-8.2-1.8-10.7-4.8-.3-.4 0-.8.4-.6 3 1.4 6.8 2.2 10.3 2.2 3.1 0 6.9-.7 9.5-2.1.5-.2.8.2.7.5z" fill="#FF9900" />
      <path d="M19.9 14.8c-.3-.4-1.3-.2-1.7-.1-.3.1-.3.3 0 .5.6.4 1.6.3 1.9-.1.2-.2 0-.3-.2-.3z" fill="#FF9900" />
    </svg>
  ),
  kubernetes: (
    <svg className="w-6 h-6 text-[#326CE5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L3 6.5v11L12 22l9-4.5v-11L12 2z" strokeWidth="2" fill="currentColor" fillOpacity="0.05"/>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v7M12 15v7M3.5 6.75l6.5 4.25M14 13l6.5 4.25M3.5 17.25l6.5-4.25M14 11l6.5-4.25" strokeWidth="1.5" />
    </svg>
  ),
  crowdstrike: (
    <svg className="w-6 h-6 text-[#FC0000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L4 7v6c0 5.5 8 9 8 9s8-3.5 8-9V7l-8-5z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
      <path d="M7 11c1 0 2.5-1 3.5-2 .5.7 1.5 1.5 2.5 1.5s2-.8 2.5-1.5c1 1 2.5 2 3.5 2" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 11v5m-3-2l3 2 3-2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  metasploit: (
    <svg className="w-6 h-6 text-[#3F80BC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.05" strokeWidth="2" />
      <path d="M7 8v8l5-4 5 4V8l-5 4-5-4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  active_directory: (
    <svg className="w-6 h-6 text-[#0078D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="9" y="2" width="6" height="4" rx="1" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
      <rect x="2" y="10" width="6" height="4" rx="1" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
      <rect x="16" y="10" width="6" height="4" rx="1" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
      <rect x="9" y="18" width="6" height="4" rx="1" fill="currentColor" fillOpacity="0.1" strokeWidth="1.5" />
      <path d="M12 6v4M5 10v-2h14v2M12 14v4" strokeWidth="1.5" />
    </svg>
  ),
  autopsy: (
    <svg className="w-6 h-6 text-[#FFD700]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.05" strokeWidth="1.5" />
      <circle cx="14" cy="10" r="4" strokeWidth="1.5" />
      <line x1="17" y1="13" x2="20" y2="16" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 7h4M7 11h2M7 15h6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  git: (
    <svg className="w-6 h-6 text-[#F34F29]" viewBox="0 0 128 128" fill="currentColor">
      <path d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"/>
    </svg>
  ),
  linux_security: (
    <svg className="w-6 h-6 text-[#EAD41F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.05" />
      <path d="M8 9l3 3-3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="15" x2="16" y2="15" strokeWidth="2" strokeLinecap="round" />
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
  { id: 'mitre_attack', name: 'MITRE ATT&CK Mapping', category: 'domains', desc: 'Mapping attacker behaviors, profiling threat groups, and designing alert coverage to cover adversary tactics.' },
  { id: 'elk', name: 'ELK Stack', category: 'tools', desc: 'Elasticsearch, Logstash, and Kibana setup for custom syslog parsing and security event monitoring.' },
  { id: 'splunk', name: 'Splunk SIEM', category: 'tools', desc: 'Configuring enterprise dashboards, alert correlation logic, and ingesting high-volume application telemetry.' },
  { id: 'crowdstrike', name: 'CrowdStrike Falcon EDR', category: 'tools', desc: 'Managing endpoint detection, analyzing telemetry logs, hunting threats, and implementing prevention policies.' },
  { id: 'metasploit', name: 'Metasploit Framework', category: 'tools', desc: 'Developing exploits, conducting penetration tests, validating security controls, and replicating adversary behavior.' },
  { id: 'burp', name: 'Burp Suite', category: 'tools', desc: 'Intercepting web traffic proxies and auditing application pathways for OWASP Top 10 vulnerabilities.' },
  { id: 'nmap', name: 'Nmap Scanner', category: 'tools', desc: 'Port scanning, service discovery, firewall evasion checks, and network vulnerability mapping.' },
  { id: 'wireshark', name: 'Wireshark', category: 'tools', desc: 'Analyzing pcap logs, debugging network handshakes, dissecting malicious payloads, and identifying C2 traffic.' },
  { id: 'yara', name: 'YARA Rules', category: 'tools', desc: 'Writing custom detection rules to scan processes, identify malware families, and classify binaries by threat signatures.' },
  { id: 'ghidra', name: 'Ghidra Decompiler', category: 'tools', desc: 'Software reverse engineering, analyzing compiled binaries, mapping control flow graphs, and dissecting malware.' },
  { id: 'active_directory', name: 'Active Directory Security', category: 'tools', desc: 'Auditing group policies, analyzing Kerberos/NTLM authentication protocols, and hunting for privilege escalation vectors.' },
  { id: 'sysinternals', name: 'Windows Sysinternals', category: 'tools', desc: 'Deep process monitoring using Procmon, Process Explorer, and Autoruns to analyze endpoint behavior.' },
  { id: 'autopsy', name: 'Autopsy Forensics', category: 'tools', desc: 'Analyzing digital evidence, extracting artifacts from disk images, and conducting file system forensics.' },
  { id: 'cuckoo', name: 'Cuckoo Sandbox', category: 'tools', desc: 'Deploying secure virtual sandboxes to execute malware samples, analyze registry changes, and trace C2 servers.' },
  { id: 'android_sdk', name: 'Android SDK & RevEng', category: 'tools', desc: 'Reverse engineering mobile application packages (APKs), auditing permission logs, and inspecting runtime configs.' },
  { id: 'docker', name: 'Docker Sandboxing', category: 'tools', desc: 'Containerizing applications, orchestrating secure micro-services, and sandboxing malware runtimes.' },
  { id: 'aws_cloud', name: 'AWS Cloud Security', category: 'cloud', desc: 'Securing cloud infrastructures utilizing AWS IAM boundary controls, VPC isolation, and network segmentation.' },
  { id: 'kubernetes', name: 'Kubernetes & K8s Security', category: 'cloud', desc: 'Securing containerized workloads, enforcing network policies, and auditing API server configurations.' },
  { id: 'git', name: 'Git Secure Control', category: 'code', desc: 'Implementing branch security rules, checking signatures, and scanning repositories for secrets.' },
  { id: 'linux_security', name: 'Linux Security & Shell', category: 'code', desc: 'Hardening Linux kernels, configuring systemd service limits, securing pam configs, and writing secure bash scripts.' },
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
