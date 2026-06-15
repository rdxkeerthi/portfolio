import React from 'react';

const projects = [
  {
    id: 1,
    title: 'Automated Malware Analysis Platform',
    category: 'VAPT & Malware Forensics',
    shortDesc: 'My major project where I set up a sandboxed environment to execute suspicious binaries. I combined Cuckoo Sandbox with Android emulator pipelines. Python scripts spin up the AVD, pull APKs via ADB, and monitor network requests to catch malicious command-and-control (C2) servers. It\'s a bit of a resource hog, but it automates what used to take me hours.',
    type: 'Interactive Sandbox',
    scope: 'Binary & APK Auditing',
    mitre: 'T1204.002 (Malicious File)',
    metric: '80% Faster Threat Triage',
    tech: ['Python', 'Cuckoo Sandbox', 'ADB', 'Docker', 'Wireshark', 'SQLite'],
    pdfLink: '#',
    githubLink: 'https://github.com/rdxkeerthi/Automated-Malware-Analysis-Platform',
    devLog: [
      'Cuckoo agent.py responsive on port 8000',
      'AVD system image boot time exceeded 120s; patched wait_for_boot.sh',
      'Captured 14 telemetry events pointing to known C2 subdomains'
    ]
  },
  {
    id: 2,
    title: 'Post-Quantum TLS Readiness & Downgrade Attack Simulator',
    category: 'Cryptographic Security',
    shortDesc: 'A testbed to see what happens when legacy clients try to downgrade PQ-TLS connections. I built custom TLS proxies in Go to simulate adversary-in-the-middle attacks. I wanted to see if I could force clients using Kyber/ML-KEM to fallback to classic RSA or ECC, and analyzed the packet telemetry in Wireshark to confirm handshake failures.',
    type: 'MitM Proxy & Telemetry',
    scope: 'Cryptographic Audits',
    mitre: 'T1557 (Adversary-in-the-Middle)',
    metric: 'Handshake Downgrade Flagged',
    tech: ['Go', 'OpenSSL 3.0', 'Wireshark', 'Bash', 'TLS/SSL'],
    pdfLink: '#',
    githubLink: 'https://github.com/rdxkeerthi/Post-Quantum-TLS',
    devLog: [
      'Intercepting PQ-client ClientHello...',
      'Injecting malformed key_shares payload',
      'Client downgraded connection to TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384'
    ]
  },
  {
    id: 3,
    title: 'Cloud DDoS Detection and Mitigation System',
    category: 'Cloud Infrastructure',
    shortDesc: 'I got tired of high AWS bills during testing, so I built a self-defense system. I wrote Python lambda scripts that scan CloudWatch log streams for volumetric anomalies, then dynamically update AWS Security Group rules and NACLs via Boto3 to rate-limit or block offending source IPs. Tested it using hping3 from a VPS.',
    type: 'Automated Rate-Limiting',
    scope: 'VPC Network Hardening',
    mitre: 'T1498 (Network Service DDoS)',
    metric: 'Blocked in <12 seconds',
    tech: ['AWS Lambda', 'Python', 'AWS CloudWatch', 'Boto3', 'hping3'],
    pdfLink: '#',
    githubLink: 'https://github.com/rdxkeerthi/Cloud-DDoS-Mitigation',
    devLog: [
      'Volumetric threshold tripped: 15,200 req/min from subnet 198.51.100.0/24',
      'Triggering NACL ingress rule #99 (DENY)',
      'MITIGATED: CPU utilization recovered to 14%'
    ]
  },
  {
    id: 4,
    title: 'Biometric Stress Detection using MediaPipe & ML',
    category: 'Research & ML-Ops',
    shortDesc: 'A college project analyzing biometric stress indicators. I used MediaPipe to extract 468 facial landmark coordinates in real-time from webcam feeds, calculated blink rates and mouth/eyebrow tension ratios, and fed the data into a Scikit-Learn Random Forest model. I had to write custom filters in OpenCV to normalize varying room lighting.',
    type: 'Biometric ML Analytics',
    scope: 'Local Webcam Telemetry',
    mitre: 'Insider Threat Analytics',
    metric: '92% Classification Accuracy',
    tech: ['Python', 'MediaPipe', 'OpenCV', 'Scikit-Learn', 'NumPy'],
    pdfLink: '#',
    githubLink: 'https://github.com/rdxkeerthi/Stress-Detection-ML',
    devLog: [
      'OPENCV: Normalized histogram channels to reduce glare',
      'MODEL: Random Forest classifier loaded; shape=(None, 468)',
      'INFO: Average blink rate: 8.5/min (baseline: 15) -> Stress index high'
    ]
  }
];

function ProjectCard({ project }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`git clone ${project.githubLink}.git`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 hover:border-[#00F0FF]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden group h-full bg-black/20 hover:scale-[1.01]">
      
      {/* Corner HUD accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00F0FF]/30 group-hover:border-[#00F0FF]/80 group-hover:w-4 group-hover:h-4 transition-all duration-300 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00F0FF]/30 group-hover:border-[#00F0FF]/80 group-hover:w-4 group-hover:h-4 transition-all duration-300 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00F0FF]/30 group-hover:border-[#00F0FF]/80 group-hover:w-4 group-hover:h-4 transition-all duration-300 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00F0FF]/30 group-hover:border-[#00F0FF]/80 group-hover:w-4 group-hover:h-4 transition-all duration-300 pointer-events-none"></div>

      {/* Interactive scanner line animation on card hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none z-20"></div>

      {/* Subtle radial ambient glow on card hover */}
      <div className="absolute -right-12 -top-12 w-28 h-28 bg-[#1E40AF]/5 group-hover:bg-[#00F0FF]/10 rounded-full blur-2xl transition-colors duration-500 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Header row */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
            <span className="font-mono text-[10px] sm:text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/5 border border-[#00F0FF]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {project.category}
            </span>
            <div className="text-neutral-500 group-hover:text-[#00F0FF] transition-colors duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white mb-3 leading-snug">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-neutral-400 text-[13px] sm:text-sm leading-relaxed mb-6 font-sans font-medium">
            {project.shortDesc}
          </p>

          {/* Repository Command Block */}
          <div 
            onClick={handleCopy}
            className="mt-2 mb-6 font-mono text-xs text-[#00F0FF] bg-black/40 border border-white/5 p-2.5 rounded-lg flex items-center justify-between group/repo hover:border-[#00F0FF]/30 transition-all cursor-pointer select-none"
            title="Click to copy clone command"
          >
            <span className="truncate pr-2 font-mono">git clone {project.githubLink}.git</span>
            <div className="shrink-0 flex items-center gap-1.5 min-w-[50px] justify-end">
              {copied ? (
                <span className="text-[10px] text-green-400 font-bold tracking-wider uppercase animate-pulse">Copied!</span>
              ) : (
                <svg className="w-3.5 h-3.5 text-neutral-500 group-hover/repo:text-[#00F0FF] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </div>
          </div>

          {/* Metadata Table */}
          <div className="border-t border-white/5 pt-3">
            <table className="w-full text-left font-mono text-[11px] sm:text-xs border-collapse">
              <tbody>
                <tr className="border-b border-white/[0.03]">
                  <td className="py-2 text-neutral-500 font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">Task Vector</td>
                  <td className="py-2 text-right text-neutral-300 font-sans font-medium">{project.type}</td>
                </tr>
                <tr className="border-b border-white/[0.03]">
                  <td className="py-2 text-neutral-500 font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">Severity Scope</td>
                  <td className="py-2 text-right text-neutral-300 font-sans font-medium">{project.scope}</td>
                </tr>
                <tr className="border-b border-white/[0.03]">
                  <td className="py-2 text-neutral-500 font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">MITRE Mapping</td>
                  <td className="py-2 text-right text-[#00F0FF]">{project.mitre}</td>
                </tr>
                <tr>
                  <td className="py-2 text-neutral-500 font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">Metric</td>
                  <td className="py-2 text-right font-bold text-white">{project.metric}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="bg-white/5 border border-white/10 text-neutral-300 font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md uppercase">
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons (Report & Source Code) */}
          <div className="flex gap-3">
            <a
              href={project.pdfLink}
              onClick={(e) => {
                e.preventDefault();
                alert('Downloading secure project report (PDF)...');
              }}
              className="flex-1 bg-[#1E40AF]/15 hover:bg-[#00F0FF] text-white hover:text-black font-mono text-xs uppercase font-extrabold tracking-widest border border-[#1E40AF]/30 hover:border-[#00F0FF] py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Report
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase font-extrabold tracking-widest border border-white/10 hover:border-[#00F0FF]/30 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              Source
            </a>
          </div>

          {/* Live Dev Log Console */}
          <div className="mt-5 font-mono text-[10px] sm:text-xs bg-black/60 border border-white/5 rounded-xl p-3.5 shadow-inner">
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/60"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-500/60"></span>
                <span className="w-2 h-2 rounded-full bg-green-500/60"></span>
                <span className="text-neutral-500 font-bold ml-1.5 uppercase tracking-wider text-[8px] sm:text-[9px]">Dev Log Console</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-[#00F0FF]/60 text-[8px] sm:text-[9px] uppercase tracking-wider">Active Stream</span>
              </div>
            </div>
            <div className="space-y-1 text-neutral-300 leading-normal max-h-24 overflow-y-auto pr-1">
              {project.devLog.map((log, idx) => (
                <div key={idx} className="flex gap-1.5">
                  <span className="text-[#00F0FF] shrink-0 font-bold select-none">&gt;</span>
                  <span className="break-all whitespace-pre-wrap">{log}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function EncryptedProjectCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
