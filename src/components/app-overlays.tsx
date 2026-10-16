"use client";

import { usePathname } from "next/navigation";
import Particles from "@/components/Particles";
import RemoteCursors from "@/components/realtime/remote-cursors";
import EasterEggs from "@/components/easter-eggs";
import MotionNudge from "@/components/motion-nudge";
import DomainNotice from "@/components/domain-notice";
import Analytics from "@/components/analytics";
import { usePerfProfile } from "@/hooks/use-perf-profile";

export default function AppOverlays() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { particleCount, maxDpr } = usePerfProfile();

  return (
    <>
      {particleCount > 0 && (
        <Particles
          className="fixed inset-0 -z-10 animate-fade-in"
          quantity={particleCount}
          maxDpr={maxDpr}
        />
      )}
      {isHome && <RemoteCursors />}
      <EasterEggs />
      {isHome && <MotionNudge />}
      <DomainNotice />
      <Analytics />
    </>
  );
}
