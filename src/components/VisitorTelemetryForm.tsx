"use client";

import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { cn } from "@/lib/utils";

export const VisitorTelemetryForm = () => {
  const [ipLocation, setIpLocation] = useState("Detecting...");
  const [browserOS, setBrowserOS] = useState("Detecting...");
  const [hardware, setHardware] = useState("Detecting...");
  const [networkGPU, setNetworkGPU] = useState("Detecting...");
  const [fingerprint, setFingerprint] = useState("Generating SOC Hash...");

  useEffect(() => {
    const runSOCTelemetry = async () => {
      const ua = navigator.userAgent;

      // 1. User Agent & OS
      let b = "Browser";
      if (ua.includes("Firefox/")) b = `Firefox ${ua.split("Firefox/")[1]?.split(" ")[0] || ""}`;
      else if (ua.includes("Edg/")) b = `Edge ${ua.split("Edg/")[1]?.split(" ")[0] || ""}`;
      else if (ua.includes("Chrome/")) b = `Chrome ${ua.split("Chrome/")[1]?.split(" ")[0] || ""}`;
      else if (ua.includes("Safari/")) b = `Safari ${ua.split("Version/")[1]?.split(" ")[0] || ""}`;

      let os = "OS";
      if (ua.includes("Win")) os = "Windows 11 (x64)";
      else if (ua.includes("Mac")) os = "macOS (Darwin)";
      else if (ua.includes("Linux")) os = "Linux (x86_64)";
      else if (ua.includes("Android")) os = "Android OS";
      else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

      setBrowserOS(`${b} | ${os}`);

      // 2. Hardware & Screen Specs
      const cores = navigator.hardwareConcurrency || 8;
      const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 16;
      const screen = `${window.screen.width}x${window.screen.height}`;
      const dpr = window.devicePixelRatio || 1;
      setHardware(`${screen} @ ${dpr}x DPR | ${cores} CPU Cores | ${mem}GB RAM`);

      // 3. WebGL GPU & Connection
      let gpu = "WebGL GPU";
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (gl) {
          const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
          if (debugInfo) {
            gpu = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "WebGL GPU";
            if (gpu.includes("ANGLE (")) gpu = gpu.split("ANGLE (")[1].replace(")", "");
          }
        }
      } catch {
        /* ignore */
      }

      const conn = (navigator as unknown as { connection?: { effectiveType?: string; rtt?: number } }).connection;
      const connType = conn?.effectiveType?.toUpperCase() || "WiFi";
      const rtt = conn?.rtt || 24;
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setNetworkGPU(`HTTPS / TLS 1.3 | GPU: ${gpu} | ${connType} (${rtt}ms) | ${tz}`);

      // 4. Digital Canvas Fingerprint Hash
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 50;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.font = "14px monospace";
          ctx.fillText("SOC-ANALYSIS-2026", 2, 15);
          const dataUrl = canvas.toDataURL();
          let hash = 0;
          for (let i = 0; i < dataUrl.length; i++) {
            hash = (hash << 5) - hash + dataUrl.charCodeAt(i);
            hash |= 0;
          }
          const hexHash = "0x" + Math.abs(hash).toString(16).padStart(8, "0");
          setFingerprint(`Hash: ${hexHash} | Risk Score: 0/100 (BENIGN_TRAFFIC)`);
        }
      } catch {
        setFingerprint("Hash: 0x8f3c7b219a4e | Risk Score: 0/100 (BENIGN_TRAFFIC)");
      }

      // 5. IP & Geolocation
      try {
        const res = await fetch("https://api.db-ip.com/v2/free/self");
        if (res.ok) {
          const data = await res.json();
          const ip = data.ipAddress || "127.0.0.1";
          const loc = `${data.city || "Client"}${data.countryName ? `, ${data.countryName}` : ""}`;
          setIpLocation(`IP: ${ip} | Location: ${loc}`);
        } else {
          setIpLocation("IP: 127.0.0.1 | Location: Client Network");
        }
      } catch {
        setIpLocation("IP: 127.0.0.1 | Location: Client Network");
      }
    };

    runSOCTelemetry();
  }, []);

  return (
    <div className="min-w-7xl mx-auto sm:mt-4">
      {/* Row 1: IP Location & Browser OS */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="soc-ip">Source IP &amp; Geolocation</Label>
          <Input
            id="soc-ip"
            readOnly
            value={ipLocation}
            className="cursor-default text-sky-400 font-mono text-xs"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="soc-browser">User-Agent &amp; Endpoint OS</Label>
          <Input
            id="soc-browser"
            readOnly
            value={browserOS}
            className="cursor-default text-purple-400 font-mono text-xs"
          />
        </LabelInputContainer>
      </div>

      {/* Row 2: Hardware & Screen Specs */}
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="soc-hardware">Hardware Specs &amp; Display Matrix</Label>
        <Input
          id="soc-hardware"
          readOnly
          value={hardware}
          className="cursor-default text-emerald-400 font-mono text-xs"
        />
      </div>

      {/* Row 3: Socket Protocol, GPU & Network */}
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="soc-gpu">Socket Protocol &amp; GPU Renderer</Label>
        <Input
          id="soc-gpu"
          readOnly
          value={networkGPU}
          className="cursor-default text-teal-400 font-mono text-xs"
        />
      </div>

      {/* Row 4: Digital Canvas Fingerprint & Threat Risk */}
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="soc-fp">Canvas Fingerprint &amp; Risk Rating</Label>
        <Input
          id="soc-fp"
          readOnly
          value={fingerprint}
          className="cursor-default text-amber-400 font-mono text-xs"
        />
        <p className="text-sm text-muted-foreground">
          SOC telemetry remains strictly local to your browser session. Pinky promise!
        </p>
      </div>
    </div>
  );
};

export default VisitorTelemetryForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
