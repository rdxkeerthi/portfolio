const config = {
  title: "Keerthivasan M | Cybersecurity Engineer & Threat Researcher",
  description: {
    long: "Explore the portfolio of Keerthivasan M, a cybersecurity engineer and threat researcher specializing in malware forensics, SOC operations, SIEM rules tuning, and cloud security architecture.",
    short:
      "Portfolio of Keerthivasan M specializing in malware analysis, threat detection, and cloud security architecture.",
  },
  keywords: [
    "Keerthivasan M",
    "Cybersecurity",
    "Threat Detection",
    "Malware Analysis",
    "SOC Operations",
    "SIEM",
    "Splunk",
    "YARA",
    "AWS Cloud Security",
    "Python",
    "Saveetha Engineering College",
    "Tamil Nadu Cyber Crime Wing",
  ],
  author: "Keerthivasan M.",
  email: "keerthivasanm.student@saveetha.ac.in",
  site: "https://keerthivasan.dev",

  // for github stars button
  githubUsername: "rdxkeerthi",
  githubRepo: "portfolio",

  get ogImg() {
    return this.site + "/medp.jpeg";
  },
  social: {
    twitter: "https://x.com/rdxkeerthi",
    linkedin: "https://www.linkedin.com/in/rdxkeerthi/",
    spotify: "/spotify",
    facebook: "https://www.facebook.com/rdxkeerthi/",
    github: "https://github.com/rdxkeerthi",
  },
};
export { config };
