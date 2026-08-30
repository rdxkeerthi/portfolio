"use client";

import * as React from "react";

const ENDPOINT = "https://keerthivasan.dev/api/collect";
const KEY = "portfolio:site";

const isLocal = (h: string) =>
  h === "localhost" ||
  h === "127.0.0.1" ||
  h === "keerthivasan.dev" ||
  h.endsWith(".keerthivasan.dev");

// records the deployment hostname once per browser, so I know where builds run.
export default function Analytics() {
  return null;
}
