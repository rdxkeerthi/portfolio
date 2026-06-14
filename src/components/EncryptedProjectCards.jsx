import React, { useState, useEffect, useRef } from 'react';
import DecryptText from './DecryptText';

const projects = [
  {
    id: 1,
    title: 'Detection of Stress in IT Employees using Machine Learning Technique',
    category: 'Research & ML-Ops',
    shortDesc: 'A predictive machine learning classifier evaluating user behavioral indicators, keystroke dynamics, and network telemetry.',
    type: 'ML-Ops / Compliance',
    objective: 'Insider Threat Detection',
    scope: 'Physiological telemetry',
    metric: '92% Detection Accuracy',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'JSON logs'],
    pdfLink: '#'
  },
  {
    id: 2,
    title: 'Enterprise SOC Investigation & SSH Brute-Force Detection',
    category: 'Threat Hunting & Response',
    shortDesc: 'Log aggression and automated incident response playbooks configured in Splunk to flag and throttle SSH login brute-forces.',
    type: 'Threat Hunting / IR',
    objective: 'Brute-Force Mitigation',
    scope: 'Enterprise local subnets',
    metric: '78% Containment Speedup',
    tech: ['Splunk SIEM', 'Linux Hardening', 'Bash', 'IP Tables'],
    pdfLink: '#'
  },
  {
    id: 3,
    title: 'Secure Web Platform for Paccha Universal Shipping Line',
    category: 'Secure Software Dev (SSDLC)',
    shortDesc: 'Hardened enterprise logistics portal featuring robust role-based access control, multi-factor authentication, and input sanitization.',
    type: 'Secure Web Development',
    objective: 'OWASP Top 10 Mitigation',
    scope: 'Audit Passed (SQLi, XSS)',
    metric: 'RBAC & MFA Hardened',
    tech: ['React', 'Node.js', 'PostgreSQL', 'JWT Auth'],
    pdfLink: '#'
  },
  {
    id: 4,
    title: 'Automated Vulnerability Scan & Network Hardening Audit',
    category: 'VAPT & Audit',
    shortDesc: 'A scheduled network vulnerability scanner configured with OpenVAS and custom bash scripts to generate threat advisories.',
    type: 'Security Auditing',
    objective: 'Mitigate Subnet Risks',
    scope: '42 CVEs Remediated',
    metric: '99% Compliance Score',
    tech: ['OpenVAS', 'Nessus', 'Bash', 'Cron Jobs'],
    pdfLink: '#'
  }
];

function MatrixRainCanvas({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const columns = Math.floor(width / 14);
    const yPositions = Array(columns).fill(0);
    const chars = '010101XYZ#@$%&*'.split('');

    const draw = () => {
      ctx.fillStyle = 'rgba(11, 15, 25, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00F0FF';
      ctx.font = '9px monospace';

      for (let i = 0; i < yPositions.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 14;
        const y = yPositions[i];

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 12;
        }
      }
    };

    const loop = () => {
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${
        active ? 'opacity-[0.08]' : 'opacity-0'
      }`}
    />
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 hover:border-[#00F0FF]/30 hover:shadow-[0_20px_40px_rgba(0,240,255,0.1)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden group h-[525px] bg-black/30"
    >
      {/* Access Locked Overlay */}
      <div className={`absolute inset-0 bg-black/85 backdrop-blur-[2px] flex flex-col items-center justify-center border border-white/5 pointer-events-none transition-all duration-500 z-20 ${
        hovered ? 'opacity-0 scale-[1.05] pointer-events-none' : 'opacity-100 scale-100'
      }`}>
        <div className="font-mono text-xs text-[#00F0FF] animate-pulse flex flex-col items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#00F0FF]">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span className="tracking-widest text-center px-4">ACCESS_LOCKED // DECRYPT</span>
        </div>
      </div>

      {/* Laser line sweep animation */}
      <div className={`absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent pointer-events-none z-10 transition-all duration-500 ${
        hovered ? 'animate-[sweep_2.5s_infinite_linear]' : 'opacity-0 top-0'
      }`}></div>

      {/* Matrix digital rain simulation inside card */}
      <MatrixRainCanvas active={hovered} />

      {/* Backing glow */}
      <div className="absolute -right-12 -top-12 w-28 h-28 bg-[#1E40AF]/10 group-hover:bg-[#00F0FF]/15 rounded-full blur-2xl transition-colors duration-500 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Header row */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
            <span className="font-mono text-[9px] font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {project.category}
            </span>
            <div className="text-neutral-500 group-hover:text-[#00F0FF] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            </div>
          </div>

          {/* Title - decrypts on hover */}
          <h3 className="text-sm sm:text-base font-bold tracking-tight text-white mb-3 leading-snug h-16 overflow-hidden">
            {hovered ? (
              <DecryptText text={project.title} speed={25} className="text-white" />
            ) : (
              project.title
            )}
          </h3>

          {/* Description */}
          <p className="text-neutral-400 text-[11px] leading-relaxed mb-6 font-sans h-20 overflow-hidden">
            {project.shortDesc}
          </p>

          {/* Metadata Grid */}
          <div className="border-t border-white/5 pt-3">
            <table className="w-full text-left font-mono text-[10px] border-collapse">
              <tbody>
                <tr className="border-b border-white/[0.03]">
                  <td className="py-2 text-neutral-500 font-bold uppercase tracking-wider text-[8px]">Type</td>
                  <td className="py-2 text-right font-sans text-neutral-300">
                    {hovered ? <DecryptText text={project.type} speed={20} /> : project.type}
                  </td>
                </tr>
                <tr className="border-b border-white/[0.03]">
                  <td className="py-2 text-neutral-500 font-bold uppercase tracking-wider text-[8px]">Scope</td>
                  <td className="py-2 text-right font-sans text-neutral-300">
                    {hovered ? <DecryptText text={project.scope} speed={20} /> : project.scope}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-neutral-500 font-bold uppercase tracking-wider text-[8px]">Metric</td>
                  <td className="py-2 text-right font-bold text-[#00F0FF]">
                    {hovered ? <DecryptText text={project.metric} speed={20} /> : project.metric}
                  </td>
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

          {/* Glowing PDF action button */}
          <a
            href={project.pdfLink}
            onClick={(e) => {
              e.preventDefault();
              alert('Downloading secure project report (PDF)...');
            }}
            className="w-full bg-[#1E40AF]/20 hover:bg-[#00F0FF] text-white hover:text-black font-mono text-[10px] uppercase font-extrabold tracking-widest border border-[#1E40AF]/40 hover:border-[#00F0FF] py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(30,64,175,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-pulse">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch w-full">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
