import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Info, ShieldAlert, Terminal as TerminalIcon, Sparkles } from "lucide-react";
import { Mermaid } from "./mermaid";

export { Mermaid };

export const Callout = ({
  children,
  type = "info",
  title,
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "danger" | "success" | "cyber";
  title?: string;
}) => {
  const styles = {
    info: {
      border: "border-sky-500/30",
      bg: "bg-sky-950/20",
      iconColor: "text-sky-400",
      Icon: Info,
      title: title || "NOTE",
    },
    warning: {
      border: "border-amber-500/30",
      bg: "bg-amber-950/20",
      iconColor: "text-amber-400",
      Icon: AlertTriangle,
      title: title || "WARNING",
    },
    danger: {
      border: "border-rose-500/30",
      bg: "bg-rose-950/20",
      iconColor: "text-rose-400",
      Icon: ShieldAlert,
      title: title || "CRITICAL ALERT",
    },
    success: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/20",
      iconColor: "text-emerald-400",
      Icon: CheckCircle2,
      title: title || "VERIFIED",
    },
    cyber: {
      border: "border-cyan-500/40",
      bg: "bg-cyan-950/25",
      iconColor: "text-cyan-400",
      Icon: Sparkles,
      title: title || "SECURITY INSIGHT",
    },
  }[type];

  const { Icon } = styles;

  return (
    <div className={cn("my-6 rounded-xl border p-4 backdrop-blur-sm", styles.border, styles.bg)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("w-5 h-5 shrink-0", styles.iconColor)} />
        <span className={cn("text-xs font-mono font-bold tracking-wider uppercase", styles.iconColor)}>
          {styles.title}
        </span>
      </div>
      <div className="text-sm text-foreground/90 leading-relaxed font-sans pl-7">
        {children}
      </div>
    </div>
  );
};

export const Terminal = ({
  title = "bash - telemetry",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="my-6 rounded-xl border border-border/60 bg-[#090d16] overflow-hidden shadow-xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-border/40">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>{title}</span>
        </div>
        <div className="w-10" />
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto text-emerald-400/90">
        {children}
      </div>
    </div>
  );
};

export const StatGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">{children}</div>;
};

export const StatCard = ({
  label,
  value,
  description,
  trend,
}: {
  label: string;
  value: string;
  description?: string;
  trend?: string;
}) => {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className="text-2xl font-bold font-mono text-foreground flex items-baseline gap-2">
        <span>{value}</span>
        {trend && <span className="text-xs text-emerald-400 font-normal">{trend}</span>}
      </div>
      {description && <div className="text-xs text-muted-foreground mt-1">{description}</div>}
    </div>
  );
};

export const ArchitectureBox = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="my-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-5 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border/50">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <h4 className="font-mono text-sm font-semibold tracking-wide text-cyan-300 uppercase">
          {title}
        </h4>
      </div>
      <div className="text-sm font-sans">{children}</div>
    </div>
  );
};
