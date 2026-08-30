"use client";

import React, { useEffect, useId, useState } from "react";

export function Mermaid({
  chart = "",
  title,
}: {
  chart?: string;
  title?: string;
}) {
  const id = useId().replace(/:/g, "_");
  const [svgContent, setSvgContent] = useState<string>("");
  const [hasError, setHasError] = useState(false);

  const cleanChart = (typeof chart === "string" ? chart : "").trim();

  useEffect(() => {
    if (!cleanChart) return;
    let isMounted = true;

    async function renderChart() {
      try {
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          themeVariables: {
            fontFamily: "Space Grotesk, Inter, monospace",
            darkMode: true,
            background: "#080d1a",
            mainBkg: "#0f172a",
            lineColor: "#38bdf8",
            primaryColor: "#0f172a",
            primaryTextColor: "#f8fafc",
            primaryBorderColor: "#06b6d4",
            secondaryColor: "#1e293b",
            secondaryTextColor: "#f8fafc",
            secondaryBorderColor: "#38bdf8",
            tertiaryColor: "#020617",
            tertiaryTextColor: "#94a3b8",
            tertiaryBorderColor: "#64748b",
            edgeLabelBackground: "#0b1329",
            nodeBorder: "#06b6d4",
            clusterBkg: "rgba(15, 23, 42, 0.6)",
            clusterBorder: "rgba(56, 189, 248, 0.4)",
            titleColor: "#38bdf8",
          },
        });

        const uniqueId = `mermaid_${id}_${Math.floor(Math.random() * 10000)}`;
        const { svg } = await mermaid.render(uniqueId, cleanChart);
        if (isMounted) {
          setSvgContent(svg);
          setHasError(false);
        }
      } catch (err) {
        console.error("Failed to render Mermaid chart:", err);
        if (isMounted) {
          setHasError(true);
        }
      }
    }

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [cleanChart, id]);

  if (!cleanChart) return null;

  if (hasError) {
    return (
      <div className="my-8 rounded-2xl border border-rose-500/30 bg-slate-950/80 p-5 shadow-xl">
        <pre className="font-mono text-xs text-rose-400 overflow-x-auto">{cleanChart}</pre>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#090e1c] to-[#040711] p-5 shadow-2xl backdrop-blur-md overflow-hidden">
      {title && (
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border/50">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h4 className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-cyan-300 uppercase">
            {title}
          </h4>
        </div>
      )}
      <div
        className="w-full flex justify-center items-center overflow-x-auto py-2 [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}
