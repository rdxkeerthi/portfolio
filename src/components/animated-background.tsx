"use client";

import { HTMLKeyboard } from "@/components/html-keyboard";
import { usePerfProfile } from "@/hooks/use-perf-profile";

const AnimatedBackground = () => {
  const { ready, disable3D } = usePerfProfile();
  if (!ready || disable3D) return null;
  return <HTMLKeyboard />;
};

export default AnimatedBackground;
