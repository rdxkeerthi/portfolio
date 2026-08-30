import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
// Spline has no thesvg entry — keep the Three.js mark as its stand-in.
import { SiThreedotjs } from "react-icons/si";
const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});
const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  chakra: brand("Chakra UI", "chakra-ui-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  prisma: brand("Prisma", "prisma-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  reactQuery: brand("React Query", "react-query-mono.svg"),
  shadcn: brand("shadcn/ui", "shadcn-ui-mono.svg"),
  // Not in the thesvg registry — keep the existing custom logo.
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: brand("Firebase", "firebase-mono.svg"),
  sockerio: brand("Socket.io", "socketdotio-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  vue: brand("Vue.js", "vuedotjs-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  sanity: brand("Sanity", "sanity-mono.svg"),
  // Not in the thesvg registry — keep the Three.js stand-in.
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: brand("GSAP", "gsap-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  trpc: brand("tRPC", "trpc-mono.svg"),
  drizzle: brand("Drizzle ORM", "drizzle-mono.svg"),
  hono: brand("Hono", "hono-mono.svg"),
  redis: brand("Redis / BullMQ", "redis-mono.svg"),
  cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
  // React Native reuses the React mark.
  reactNative: brand("React Native", "react-mono.svg"),
  betterAuth: brand("Better Auth", "better-auth-mono.svg"),
  // Not in the thesvg registry — keep the text marks.
  zustand: {
    title: "Zustand",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Zu</span>,
  },
  partykit: {
    title: "PartyKit",
    bg: "black",
    fg: "white",
    icon: <span className="text-base">🎈</span>,
  },
  hocuspocus: {
    title: "Hocuspocus",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Hp</span>,
  },
  // React Flow ships under the xyflow brand.
  reactFlow: brand("React Flow", "xyflow-mono.svg"),
  codemirror: brand("CodeMirror", "codemirror-mono.svg"),
  // "Satori / sharp" — uses the sharp mark.
  satori: brand("Satori / sharp", "sharp-mono.svg"),
  turborepo: brand("Turborepo", "turborepo-mono.svg"),
  // Vercel AI SDK uses the Vercel mark.
  aiSDK: brand("Vercel AI SDK", "vercel-mono.svg"),
  anthropic: brand("Anthropic Claude", "anthropic-mono.svg"),
  mistral: brand("Mistral AI", "mistral-ai-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  nextIntl: {
    title: "next-intl",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">i18n</span>,
  },
  // Not in the thesvg registry — keep the text marks.
  expo: {
    title: "Expo",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Expo</span>,
  },
  mcp: {
    title: "MCP",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">MCP</span>,
  },
  go: {
    title: "Go",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Go</span>,
  },
  linux: brand("Linux", "linux-mono.svg"),
  aws: brand("AWS", "cloudflare-mono.svg"),
  splunk: brand("Splunk", "splunk-mono.svg"),
  wireshark: brand("Wireshark", "wireshark-mono.svg"),
  sentinel: brand("Microsoft Sentinel", "sentinel-mono.svg"),
  yara: {
    title: "YARA",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">YARA</span>,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "malware-analysis",
    category: "Cybersecurity & Forensics",
    title: "Automated Malware Analysis Platform",
    src: "/assets/projects-screenshots/storekit/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.linux,
        PROJECT_SKILLS.docker,
        PROJECT_SKILLS.yara,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.linux,
        PROJECT_SKILLS.docker,
        PROJECT_SKILLS.aws,
      ],
    },
    live: "https://github.com/rdxkeerthi/Automated-Malware-Triage",
    github: "https://github.com/rdxkeerthi/Automated-Malware-Triage",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Automated static &amp; dynamic malware triage pipeline cutting initial triage time by 80%.
          </TypographyP>
          <TypographyP className="font-mono ">
            Engineered an automated static and dynamic triage pipeline for state-level law enforcement incident response teams. Automates malicious C2 infrastructure and IOC extraction from submitted APKs and PE executables, featuring automated YARA rule synthesis and automated PDF report generation.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Dynamic Sandbox Triage</TypographyH3>
          <p className="font-mono mb-2">
            Isolated Cuckoo container execution sandboxes monitoring API hooks, registry mutations, and network socket connections to identify zero-day behavior patterns.
          </p>

          <TypographyH3 className="my-4 mt-8">Automated IOC &amp; YARA Rule Synthesis</TypographyH3>
          <p className="font-mono mb-2">
            Automatically parses unpacked binary strings and network payload streams to formulate cryptographically signed YARA rules for immediate SIEM ingestion.
          </p>
        </div>
      );
    },
  },
  {
    id: "post-quantum-tls",
    category: "Post-Quantum Cryptography & Security",
    title: "Post-Quantum TLS Readiness & Downgrade Attack Simulator",
    src: "/assets/projects-screenshots/codingducks/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.go,
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.linux,
        PROJECT_SKILLS.wireshark,
      ],
      backend: [
        PROJECT_SKILLS.go,
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.docker,
        PROJECT_SKILLS.linux,
      ],
    },
    live: "https://github.com/rdxkeerthi/Post-Quantum-TLS-Simulator",
    github: "https://github.com/rdxkeerthi/Post-Quantum-TLS-Simulator",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Hybrid Post-Quantum Cryptography (Kyber / Dilithium) &amp; TLS Downgrade Attack Defense.
          </TypographyP>
          <TypographyP className="font-mono ">
            Engineered a cryptographic TLS proxy and attack simulator evaluating hybrid post-quantum key exchange mechanisms (Kyber768 + ECDHE) against active cipher suite downgrade vectors, measuring performance overhead and packet fragmentation impact across cloud networks.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Post-Quantum Key Exchange Proxy</TypographyH3>
          <p className="font-mono mb-2">
            Implemented a high-performance Go TLS proxy intercepting handshake records to enforce post-quantum hybrid key encapsulation algorithms.
          </p>

          <TypographyH3 className="my-4 mt-8">Downgrade Attack Simulation Engine</TypographyH3>
          <p className="font-mono mb-2">
            Simulates man-in-the-middle cipher suite manipulation to audit server compliance against RFC 9180 and legacy fallback vulnerabilities.
          </p>
        </div>
      );
    },
  },
  {
    id: "cloud-ddos-mitigation",
    category: "Cloud Infrastructure Defense",
    title: "Cloud DDoS Mitigation System",
    src: "/assets/projects-screenshots/gumbalup/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.linux,
        PROJECT_SKILLS.aws,
        PROJECT_SKILLS.splunk,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.linux,
        PROJECT_SKILLS.aws,
        PROJECT_SKILLS.docker,
      ],
    },
    live: "https://github.com/rdxkeerthi/Cloud-DDoS-Mitigation",
    github: "https://github.com/rdxkeerthi/Cloud-DDoS-Mitigation",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Edge Proxy Rate-Limiting &amp; Automated Threat Traffic Mitigation.
          </TypographyP>
          <TypographyP className="font-mono ">
            Designed a high-throughput threat mitigation engine operating at Nginx proxy layers. Combines rate-limiting heuristics, sliding window anomaly detection, and automated BGP null-routing to mitigate layer 7 DDoS floods targeting campus web infrastructures serving 50,000+ daily HTTP requests.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Edge Rate Limiting &amp; WAF Rules</TypographyH3>
          <p className="font-mono mb-2">
            Configured dynamic Nginx rate-limiting zones with IP reputation scoring to automatically block high-frequency HTTP GET/POST flooding.
          </p>

          <TypographyH3 className="my-4 mt-8">SIEM Integration &amp; Log Analysis</TypographyH3>
          <p className="font-mono mb-2">
            Integrated Splunk telemetry alerts with automated Bash firewall scripts for real-time threat IP blacklisting.
          </p>
        </div>
      );
    },
  },
  {
    id: "biometric-ml-stress",
    category: "AI & Biometric Security",
    title: "Biometric ML Threat Detection & Authentication",
    src: "/assets/projects-screenshots/kanbi/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.linux,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.docker,
        PROJECT_SKILLS.linux,
      ],
    },
    live: "https://github.com/rdxkeerthi/Biometric-Threat-Detection",
    github: "https://github.com/rdxkeerthi/Biometric-Threat-Detection",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Computer Vision Facial Micro-Expression &amp; Pulse Estimation for High-Security Controls.
          </TypographyP>
          <TypographyP className="font-mono ">
            Developed a real-time computer vision framework using MediaPipe &amp; OpenCV estimating micro-expressions, head pose vectors, and photoplethysmography (rPPG) pulse signatures to detect physiological stress indicators during high-security authentication workflows.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Real-time Facial Landmark Estimation</TypographyH3>
          <p className="font-mono mb-2">
            Tracks 468 3D facial mesh coordinates at 60 FPS to calculate micro-blink frequencies and gaze deflection angles.
          </p>

          <TypographyH3 className="my-4 mt-8">Machine Learning Stress Classification</TypographyH3>
          <p className="font-mono mb-2">
            Trains Scikit-Learn Random Forest classifiers on facial action unit features to score anomalous user stress levels during multi-factor authentication.
          </p>
        </div>
      );
    },
  },
];
export default projects;
