import React from 'react';

const projects = [
  {
    id: 1,
    title: 'Detection of Stress in IT Employees using Machine Learning Technique',
    category: 'Research & ML-Ops',
    shortDesc: 'A predictive machine learning classifier evaluating user behavioral indicators, keystroke dynamics, and network telemetry to preempt insider threat vulnerabilities.',
    type: 'Behavioral Threat Analytics',
    scope: 'Physiological Telemetry',
    mitre: 'T1185 (Man-in-the-Browser)',
    metric: '92% Detection Accuracy',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'JSON logs'],
    pdfLink: '#'
  },
  {
    id: 2,
    title: 'Enterprise SOC Investigation & SSH Brute-Force Detection',
    category: 'Threat Hunting & IR',
    shortDesc: 'Custom log aggregation playbooks configured in Splunk SIEM correlating syslogs, firewalls, and active directory telemetry to isolate brute-force access vectors.',
    type: 'Threat Classification',
    scope: 'CVSS: 7.5 (High Severity)',
    mitre: 'T1110 (Brute Force Access)',
    metric: '78% Containment Speedup',
    tech: ['Splunk SIEM', 'Linux Hardening', 'Bash', 'IP Tables'],
    pdfLink: '#'
  },
  {
    id: 3,
    title: 'Secure Web Platform for Paccha Universal Shipping Line',
    category: 'Secure SDLC',
    shortDesc: 'Hardened web applications audit mitigating vulnerabilities in routing, user session variables, authorization parameters, and backend injection vectors.',
    type: 'OWASP Top 10 Mitigation',
    scope: 'CVSS: 9.8 (Critical)',
    mitre: 'T1190 (Exploit Public App)',
    metric: 'Zero-Exploit Pen-Test Audit',
    tech: ['React', 'Node.js', 'PostgreSQL', 'JWT Auth'],
    pdfLink: '#'
  },
  {
    id: 4,
    title: 'Automated Vulnerability Scan & Network Hardening Audit',
    category: 'VAPT & Audit',
    shortDesc: 'A scheduled network vulnerability scanning scanner configured with OpenVAS and custom bash scripts to generate threat advisories and evaluate subnet exposures.',
    type: 'Security Auditing',
    scope: 'CVSS: 8.8 (High Severity)',
    mitre: 'T1595 (Active Scanning)',
    metric: '99% Compliance Score',
    tech: ['OpenVAS', 'Nessus', 'Bash', 'Cron Jobs'],
    pdfLink: '#'
  }
];

function ProjectCard({ project }) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 hover:border-[#00F0FF]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden group h-full bg-black/20 hover:scale-[1.01]">
      
      {/* Subtle radial ambient glow on card hover */}
      <div className="absolute -right-12 -top-12 w-28 h-28 bg-[#1E40AF]/5 group-hover:bg-[#00F0FF]/10 rounded-full blur-2xl transition-colors duration-500 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Header row */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
            <span className="font-mono text-[9px] font-bold text-[#00F0FF] bg-[#00F0FF]/5 border border-[#00F0FF]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {project.category}
            </span>
            <div className="text-neutral-500 group-hover:text-[#00F0FF] transition-colors duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold tracking-tight text-white mb-3 leading-snug h-14 overflow-hidden">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-neutral-400 text-[11px] leading-relaxed mb-6 font-sans h-20 overflow-hidden font-medium">
            {project.shortDesc}
          </p>

          {/* Metadata Table */}
          <div className="border-t border-white/5 pt-3">
            <table className="w-full text-left font-mono text-[9px] border-collapse">
              <tbody>
                <tr className="border-b border-white/[0.03]">
                  <td className="py-2 text-neutral-500 font-bold uppercase tracking-wider text-[8px]">Task Vector</td>
                  <td className="py-2 text-right text-neutral-300 font-sans font-medium">{project.type}</td>
                </tr>
                <tr className="border-b border-white/[0.03]">
                  <td className="py-2 text-neutral-500 font-bold uppercase tracking-wider text-[8px]">Severity Scope</td>
                  <td className="py-2 text-right text-neutral-300 font-sans font-medium">{project.scope}</td>
                </tr>
                <tr className="border-b border-white/[0.03]">
                  <td className="py-2 text-neutral-500 font-bold uppercase tracking-wider text-[8px]">MITRE Mapping</td>
                  <td className="py-2 text-right text-[#00F0FF]">{project.mitre}</td>
                </tr>
                <tr>
                  <td className="py-2 text-neutral-500 font-bold uppercase tracking-wider text-[8px]">Metric</td>
                  <td className="py-2 text-right font-bold text-white">{project.metric}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1 mb-6 h-10 overflow-hidden">
            {project.tech.map((t) => (
              <span key={t} className="bg-white/5 border border-white/10 text-neutral-300 font-mono text-[8px] font-bold px-2 py-0.5 rounded-md uppercase">
                {t}
              </span>
            ))}
          </div>

          {/* Premium button */}
          <a
            href={project.pdfLink}
            onClick={(e) => {
              e.preventDefault();
              alert('Downloading secure project report (PDF)...');
            }}
            className="w-full bg-[#1E40AF]/15 hover:bg-[#00F0FF] text-white hover:text-black font-mono text-[9px] uppercase font-extrabold tracking-widest border border-[#1E40AF]/30 hover:border-[#00F0FF] py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Security Report
          </a>
        </div>
      </div>
    </div>
  );
}

export default function EncryptedProjectCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch w-full">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
