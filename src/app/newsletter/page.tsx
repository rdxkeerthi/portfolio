"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, CheckCircle2, ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Frequency = "weekly" | "zeroday" | "monthly";

const SAMPLE_ISSUES = [
  {
    issue: "ISSUE #042",
    date: "Aug 12, 2026",
    title: "Deep Teardown: Ransomware Memory Forensics with Volatility 3",
    summary: "Extracting hidden PE payloads, unhooking API hooks, and parsing process memory dumps from active infection vectors.",
    category: "Malware Analysis",
    readTime: "7 min read",
  },
  {
    issue: "ISSUE #041",
    date: "Aug 04, 2026",
    title: "Splunk Correlation Pipeline for AWS CloudTrail Anomaly Detection",
    summary: "Building high-fidelity SPL queries to detect suspicious IAM role assumption and cross-account privilege escalation.",
    category: "SIEM & SOC",
    readTime: "9 min read",
  },
  {
    issue: "ISSUE #040",
    date: "Jul 27, 2026",
    title: "Engineering Zero-False-Positive YARA Rules for Obfuscated PowerShell",
    summary: "Pattern matching techniques against layered string encoding, byte sequences, and AST syntax trees.",
    category: "Threat Detection",
    readTime: "6 min read",
  },
  {
    issue: "ISSUE #039",
    date: "Jul 18, 2026",
    title: "Zero Trust IAM Policy Hardening & Automated GuardDuty Remediation",
    summary: "Setting up serverless Lambda triggers to isolate compromised EC2 instances within seconds of alert firing.",
    category: "Cloud Security",
    readTime: "8 min read",
  },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Malware Analysis",
    "SIEM & SOC Rules",
    "Cloud Security",
  ]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid security operational email address.");
      return;
    }
    setErrorMsg("");
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden pt-28 pb-24 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-40 left-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px]" />
        
        {/* Subtle Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            KEERTHIVASAN M // DISPATCH INTEL
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Cybersecurity &amp; Threat Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Advisories</span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
            Hands-on malware reverse-engineering, production SIEM correlation rules, and zero-day threat notifications curated for security engineers &amp; threat analysts.
          </p>
        </motion.div>

        {/* Subscription Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="relative rounded-3xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-10 shadow-2xl shadow-cyan-950/40">
            {/* Glowing top line */}
            <div className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center mx-auto mb-6 text-cyan-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                    Subscription Verified! 🚀
                  </h3>
                  <p className="text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    We&apos;ve added <span className="text-cyan-400 font-mono font-semibold">{email}</span> to Keerthivasan M&apos;s Security Intelligence Network. Check your inbox for the welcome threat payload brief.
                  </p>
                  <Button
                    onClick={() => {
                      setStatus("idle");
                      setEmail("");
                    }}
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/50 hover:text-white"
                  >
                    Subscribe another email address
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Email Field */}
                  <div>
                    <label className="block font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
                      OPERATIONAL SECURITY EMAIL
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="analyst@cyberdefense.sec"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder:text-slate-500 transition-all font-mono text-sm"
                        required
                      />
                    </div>
                    {errorMsg && (
                      <p className="mt-2 text-xs font-mono text-rose-400">{errorMsg}</p>
                    )}
                  </div>

                  {/* Frequency Options */}
                  <div>
                    <label className="block font-mono text-xs text-slate-400 uppercase tracking-widest mb-3">
                      DISPATCH FREQUENCY
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "weekly", label: "Weekly Threat Brief", desc: "Every Tuesday 08:00 UTC" },
                        { id: "zeroday", label: "Instant Zero-Day Alerts", desc: "Critical CVE advisories only" },
                        { id: "monthly", label: "Monthly Executive Brief", desc: "Comprehensive summary" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFrequency(item.id as Frequency)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            frequency === item.id
                              ? "border-cyan-400 bg-cyan-950/30 text-white shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                              : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <div className="font-semibold text-xs text-cyan-300 font-mono mb-1">{item.label}</div>
                          <div className="text-[11px] text-slate-400">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Topic Checkboxes */}
                  <div>
                    <label className="block font-mono text-xs text-slate-400 uppercase tracking-widest mb-3">
                      SELECT INTELLIGENCE DOMAINS
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        "Malware Analysis",
                        "SIEM & SOC Rules",
                        "Cloud Security",
                        "Threat Intelligence",
                        "Reverse Engineering",
                        "Vulnerability Advisories",
                      ].map((topic) => {
                        const active = selectedTopics.includes(topic);
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => toggleTopic(topic)}
                            className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                              active
                                ? "bg-cyan-500/20 border border-cyan-400/60 text-cyan-200"
                                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-cyan-400" : "bg-slate-600"}`} />
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono tracking-wider text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full" />
                        REGISTERING SUBSCRIBER...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        SUBSCRIBE TO THREAT DISPATCHES
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-cyan-400" />
                      100% Encrypted &amp; Zero Spam
                    </span>
                    <span>Unsubscribe with 1-click anytime</span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Telemetry Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24"
        >
          <div className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 text-center backdrop-blur-md">
            <div className="font-display text-3xl font-extrabold text-cyan-400 mb-1">1,250+</div>
            <div className="text-slate-400 text-xs font-mono">SECURITY ENGINEERS SUBSCRIBED</div>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 text-center backdrop-blur-md">
            <div className="font-display text-3xl font-extrabold text-emerald-400 mb-1">42</div>
            <div className="text-slate-400 text-xs font-mono">THREAT ADVISORIES PUBLISHED</div>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 text-center backdrop-blur-md">
            <div className="font-display text-3xl font-extrabold text-purple-400 mb-1">99.8%</div>
            <div className="text-slate-400 text-xs font-mono">HIGH-FIDELITY DELIVERABILITY</div>
          </div>
        </motion.div>

        {/* Sample Issue Archive Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-20"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <div>
              <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-1">ARCHIVED DISPATCHES</div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Recent Intel Advisories</h2>
            </div>
            <span className="text-xs font-mono text-slate-400 mt-2 sm:mt-0">Preview what subscribers receive</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SAMPLE_ISSUES.map((issue) => (
              <div
                key={issue.issue}
                className="p-6 rounded-2xl border border-slate-800/70 bg-slate-900/30 hover:border-cyan-500/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                    <span className="text-cyan-400 font-bold">{issue.issue}</span>
                    <span>{issue.date}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                    {issue.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {issue.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
                  <Badge variant="outline" className="border-cyan-500/20 text-cyan-300 bg-cyan-950/20 text-[11px] font-mono">
                    {issue.category}
                  </Badge>
                  <span className="text-xs font-mono text-slate-500">{issue.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
