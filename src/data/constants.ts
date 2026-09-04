// thoda zada ts ho gya idhar
export enum SkillNames {
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  VUE = "vue",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  PRETTIER = "prettier",
  NPM = "npm",
  FIREBASE = "firebase",
  WORDPRESS = "wordpress",
  LINUX = "linux",
  DOCKER = "docker",
  NGINX = "nginx",
  AWS = "aws",
  GCP = "gcp",
  VIM = "vim",
  VERCEL = "vercel",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "Python",
    shortDescription: "The most versatile scripting language in cybersecurity, used to automate repetitive SOC tasks, write custom exploits, and parse log files.",
    color: "#3776ab",
    icon: "https://api.iconify.design/logos:python.svg",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "Bash",
    shortDescription: "Crucial for rapid command-line operations, OS-level automation, and stringing together multiple security tools in Linux environments.",
    color: "#4eaa25",
    icon: "https://api.iconify.design/logos:bash.svg",
  },
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "SonarQube",
    shortDescription: "An essential tool for continuous inspection of code quality, catching bugs and vulnerabilities via static analysis (SAST) before deployment.",
    color: "#4e9bcd",
    icon: "https://api.iconify.design/logos:sonarqube.svg",
  },
  [SkillNames.CSS]: {
    id: 4,
    name: "css",
    label: "JFrog",
    shortDescription: "Vital for securing the software supply chain by managing, tracking, and scanning artifacts and dependencies for vulnerabilities.",
    color: "#40be46",
    icon: "https://api.iconify.design/logos:jfrog.svg",
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "Burp Suite",
    shortDescription: "The industry standard platform for hands-on, manual web application security testing and proxying traffic.",
    color: "#ff6600",
    icon: "https://api.iconify.design/simple-icons:burpsuite.svg",
  },
  [SkillNames.VUE]: {
    id: 6,
    name: "vue",
    label: "OWASP ZAP",
    shortDescription: "A powerful, open-source dynamic application security testing (DAST) scanner for identifying vulnerabilities in web applications.",
    color: "#005a9c",
    icon: "https://api.iconify.design/simple-icons:owasp.svg",
  },
  [SkillNames.NEXTJS]: {
    id: 7,
    name: "nextjs",
    label: "Rapid7",
    shortDescription: "A comprehensive suite (often utilizing Nexpose or InsightVM) for automated vulnerability scanning, risk prioritization, and remediation tracking.",
    color: "#ea5d0b",
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/rapid7.svg",
  },
  [SkillNames.TAILWIND]: {
    id: 8,
    name: "tailwind",
    label: "Nessus",
    shortDescription: "A widely deployed vulnerability scanner used to identify misconfigurations, unpatched software, and default passwords across networks.",
    color: "#00bfff",
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/tenable.svg",
  },
  [SkillNames.NODEJS]: {
    id: 9,
    name: "nodejs",
    label: "Nmap",
    shortDescription: "The foundational utility for network discovery, port scanning, and identifying exposed services across target environments.",
    color: "#2563eb",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjEyIiBmaWxsPSIjMWEzYTZlIi8+PHRleHQgeD0iNTAiIHk9IjM4IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzM4YmRmOCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm1hcDwvdGV4dD48Y2lyY2xlIGN4PSIzMCIgY3k9IjYyIiByPSI0IiBmaWxsPSIjMzhmMTMzIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1NSIgcj0iNiIgZmlsbD0iIzM4ZjEzMyIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iNjIiIHI9IjQiIGZpbGw9IiMzOGYxMzMiLz48bGluZSB4MT0iMzAiIHkxPSI2MiIgeDI9IjUwIiB5Mj0iNTUiIHN0cm9rZT0iIzM4ZjEzMyIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48bGluZSB4MT0iNTAiIHkxPSI1NSIgeDI9IjcwIiB5Mj0iNjIiIHN0cm9rZT0iIzM4ZjEzMyIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48bGluZSB4MT0iMTUiIHkxPSI2OCIgeDI9IjMwIiB5Mj0iNjIiIHN0cm9rZT0iIzM4ZjEzMyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSIzIDIiLz48bGluZSB4MT0iNzAiIHkxPSI2MiIgeDI9Ijg1IiB5Mj0iNjgiIHN0cm9rZT0iIzM4ZjEzMyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSIzIDIiLz48L3N2Zz4=",
  },
  [SkillNames.EXPRESS]: {
    id: 10,
    name: "express",
    label: "Cuckoo Sandbox",
    shortDescription: "An advanced, automated malware analysis system used to safely execute suspicious files and monitor their behavior in isolated environments.",
    color: "#38bdf8",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjEyIiBmaWxsPSIjMGQyYTNlIi8+PGVsbGlwc2UgY3g9IjUwIiBjeT0iNzIiIHJ4PSIyMiIgcnk9IjgiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMyIvPjxwYXRoIGQ9Ik01MCAxMiBDMzkgMTIgMzAgMjAgMzAgMzIgQzMwIDQwIDM0IDQ2IDQwIDUwIEwzOCA2OCBDNDQ2OCA0OTY4IDUwIDY4IEw1MCA2OCA1MCA2OCBMNTQ2OCA1NjY4IDYwIDY4IEw1OCA1MCBDNTY0NiA3MCAzNiA2OCA0MCAzMiBDNzAgMjAgNjEgMTIgNTAgMTIiIGZpbGw9IiM1YWQ4ZmYiLz48Y2lyY2xlIGN4PSI0MyIgY3k9IjMwIiByPSI0IiBmaWxsPSIjMDAwIi8+PGNpcmNsZSBjeD0iNTciIGN5PSIzMCIgcj0iNCIgZmlsbD0iIzAwMCIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iMjkiIHI9IjEuNSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjU4IiBjeT0iMjkiIHI9IjEuNSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00NiA0MiBRNTAgNDcgNTQgNDIiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMzUgMjUgUTMyIDE4IDM4IDE2IiBzdHJva2U9IiM1YWQ4ZmYiIHN0cm9rZS13aWR0aD0iMi41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNjUgMjUgUTY4IDE4IDYyIDE2IiBzdHJva2U9IiM1YWQ4ZmYiIHN0cm9rZS13aWR0aD0iMi41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNDAgNTAgUTMwIDQ4IDI1IDU1IiBzdHJva2U9IiM1YWQ4ZmYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTYwIDUwIFE3MCA0OCA3NSA1NSIgc3Ryb2tlPSIjNWFkOGZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==",
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "Wireshark",
    shortDescription: "The premier network protocol analyzer, indispensable for deep packet inspection, troubleshooting, and identifying malicious network traffic.",
    color: "#167ec0",
    icon: "https://api.iconify.design/simple-icons:wireshark.svg",
  },
  [SkillNames.MONGODB]: {
    id: 12,
    name: "mongodb",
    label: "ELK Stack",
    shortDescription: "A highly customizable open-source log management and analytics architecture frequently used for custom SOC dashboards.",
    color: "#005571",
    icon: "https://api.iconify.design/logos:elasticsearch.svg",
  },
  [SkillNames.GIT]: {
    id: 13,
    name: "git",
    label: "Git",
    shortDescription: "The code's personal bodyguard for distributed version control, branch management, and security auditing.",
    color: "#f1502f",
    icon: "https://api.iconify.design/logos:git-icon.svg",
  },
  [SkillNames.GITHUB]: {
    id: 14,
    name: "github",
    label: "GitHub",
    shortDescription: "Code repository hosting, CI/CD GitHub Actions security scanning, and automated vulnerability checks.",
    color: "#ffffff",
    icon: "https://api.iconify.design/logos:github-icon.svg",
  },
  [SkillNames.PRETTIER]: {
    id: 15,
    name: "prettier",
    label: "Jira",
    shortDescription: "The central ticketing and workflow engine utilized by SOC teams to track vulnerability remediation, assign tasks, and manage incident response.",
    color: "#0052cc",
    icon: "https://api.iconify.design/logos:jira.svg",
  },
  [SkillNames.NPM]: {
    id: 16,
    name: "npm",
    label: "Android SDK",
    shortDescription: "A necessary framework for reverse engineering, debugging, and performing dynamic security assessments on mobile applications.",
    color: "#3ddc84",
    icon: "https://api.iconify.design/logos:android-icon.svg",
  },
  [SkillNames.FIREBASE]: {
    id: 17,
    name: "firebase",
    label: "Firebase",
    shortDescription: "Your app's ultimate wingman, with realtime database rules and authentication security.",
    color: "#ffca28",
    icon: "https://api.iconify.design/logos:firebase.svg",
  },
  [SkillNames.WORDPRESS]: {
    id: 18,
    name: "wordpress",
    label: "Wazuh",
    shortDescription: "An open-source security platform specializing in threat detection, integrity monitoring, and incident response.",
    color: "#00a4e4",
    icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/wazuh.svg",
  },
  [SkillNames.LINUX]: {
    id: 19,
    name: "linux",
    label: "Linux",
    shortDescription: "The fundamental operating system for cybersecurity professionals, hosting the vast majority of security tools, servers, and target environments.",
    color: "#fcc624",
    icon: "https://api.iconify.design/logos:linux-tux.svg",
  },
  [SkillNames.DOCKER]: {
    id: 20,
    name: "docker",
    label: "Docker",
    shortDescription: "Essential for deploying secure containerized applications and building isolated environments for security testing.",
    color: "#2496ed",
    icon: "https://api.iconify.design/logos:docker-icon.svg",
  },
  [SkillNames.NGINX]: {
    id: 21,
    name: "nginx",
    label: "Splunk",
    shortDescription: "A powerhouse for ingesting massive amounts of machine data, creating custom detection rules, and visualizing security events.",
    color: "#ff0078",
    icon: "https://api.iconify.design/simple-icons:splunk.svg",
  },
  [SkillNames.AWS]: {
    id: 22,
    name: "aws",
    label: "AWS CloudWatch",
    shortDescription: "A critical monitoring and management service used to collect logs, track metrics, and trigger security alerts within AWS environments.",
    color: "#ff9900",
    icon: "https://api.iconify.design/logos:aws-cloudwatch.svg",
  },
  [SkillNames.GCP]: {
    id: 25,
    name: "gcp",
    label: "AWS IAM",
    shortDescription: "The core service for securely controlling access to AWS resources and enforcing the principle of least privilege.",
    color: "#e11d48",
    icon: "https://api.iconify.design/logos:aws-iam.svg",
  },
  [SkillNames.VIM]: {
    id: 23,
    name: "vim",
    label: "Microsoft Sentinel",
    shortDescription: "A cloud-native SIEM and SOAR platform used for intelligent security analytics and threat intelligence across an enterprise.",
    color: "#0078d4",
    icon: "https://api.iconify.design/logos:microsoft-azure.svg",
  },
  [SkillNames.VERCEL]: {
    id: 24,
    name: "vercel",
    label: "Rust",
    shortDescription: "Memory-safe systems programming language used for building ultra-fast, secure cryptographic proxies and low-level malware analysis tooling.",
    color: "#f74c00",
    icon: "https://api.iconify.design/logos:rust.svg",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  period: string;
  roleType: string;
  category: string;
  location: string;
  title: string;
  company: string;
  logo: string;
  description: string[];
  skills: SkillNames[];
  metrics?: { label: string; value: string }[];
  accentColor?: string;
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "2024-05",
    endDate: "2024-07",
    period: "May 2024 – Jul 2024",
    roleType: "Law Enforcement / IR",
    category: "Malware Forensics & Threat Intel",
    location: "Chennai, India",
    accentColor: "#38bdf8",
    logo: "/assets/experience/ccw.png",
    title: "Cyber Security Intern (Malware Analysis)",
    company: "Tamil Nadu Cyber Crime Wing",
    description: [
      "Built an automated static & dynamic triage pipeline cutting initial triage time by 80% (hours to minutes).",
      "Automated malicious C2 infrastructure and IOC extraction from submitted APKs and executables.",
      "Contributed to a 40% backlog reduction for state-level law enforcement incident response teams.",
      "Presented technical forensics reports to Senior Cyber Crime Wing officers."
    ],
    skills: [
      SkillNames.LINUX,
      SkillNames.DOCKER,
      SkillNames.JS,
      SkillNames.EXPRESS,
    ],
    metrics: [
      { label: "Triage Speedup", value: "80%" },
      { label: "IR Backlog Cut", value: "40%" },
      { label: "Target Scope", value: "State LEA" },
    ],
  },
  {
    id: 2,
    startDate: "2023-08",
    endDate: "2024-04",
    period: "Aug 2023 – Apr 2024",
    roleType: "Application Security",
    category: "Cloud Security & DevSecOps",
    location: "Chennai, India",
    accentColor: "#34d399",
    logo: "/assets/experience/saveetha.png",
    title: "Security Lead",
    company: "High-Traffic Web Platform, SEC",
    description: [
      "Architected security controls for a high-traffic web platform serving 6,000+ active users and 50,000+ daily HTTP requests.",
      "Implemented OWASP Top 10 mitigations, Web Application Firewall (WAF) rate limiting, and CSRF protection.",
      "Executed pre-deployment penetration testing and audited access logs with zero security breaches during peak load."
    ],
    skills: [
      SkillNames.REACT,
      SkillNames.LINUX,
      SkillNames.GCP,
      SkillNames.DOCKER,
    ],
    metrics: [
      { label: "Active Users", value: "6,000+" },
      { label: "Daily Requests", value: "50,000+" },
      { label: "Security Breaches", value: "0" },
    ],
  },
  {
    id: 3,
    startDate: "2023-05",
    endDate: "2023-07",
    period: "May 2023 – Jul 2023",
    roleType: "Security Operations",
    category: "SIEM & SOC Operations",
    location: "Chennai, India",
    accentColor: "#818cf8",
    logo: "/assets/experience/zybeak-fav.png",
    title: "SOC Analyst Intern",
    company: "Zybeak Technologies",
    description: [
      "Monitored high-volume security telemetry across 10M+ syslog events in Splunk SIEM and ELK Stack.",
      "Tuned Sigma detection and correlation rules, reducing alert false positives by 30%.",
      "Wrote custom Python and Bash log parsers for automated threat alert grouping and IP enrichment."
    ],
    skills: [
      SkillNames.NGINX,
      SkillNames.MONGODB,
      SkillNames.JS,
      SkillNames.TS,
    ],
    metrics: [
      { label: "Syslog Events", value: "10M+" },
      { label: "False Positive Cut", value: "30%" },
      { label: "Detection Engine", value: "Sigma Rules" },
    ],
  },
  {
    id: 4,
    startDate: "2021-08",
    endDate: "2025-05",
    period: "2021 – 2025",
    roleType: "Academics & Research",
    category: "Undergraduate Degree",
    location: "Chennai, India",
    accentColor: "#f59e0b",
    logo: "/assets/experience/saveetha.png",
    title: "B.E. in Cyber Security",
    company: "Saveetha Engineering College",
    description: [
      "Rigorous engineering coursework covering Cryptography, Cloud Security, System Hardening, and Network Forensics.",
      "Published research work on Post-Quantum Cryptography & ML Biometrics.",
      "Active leadership in campus security workshops and hands-on CTF competitions."
    ],
    skills: [
      SkillNames.LINUX,
      SkillNames.POSTGRES,
      SkillNames.NODEJS,
      SkillNames.GIT,
    ],
    metrics: [
      { label: "Degree", value: "B.E. Cyber Sec" },
      { label: "Research", value: "PQC & ML" },
      { label: "Activities", value: "CTF & Labs" },
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};

