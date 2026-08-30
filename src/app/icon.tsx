import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#080c14",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          border: "1.5px solid #06b6d4",
          boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)",
          color: "#38bdf8",
          fontWeight: 900,
          fontFamily: "monospace",
        }}
      >
        K
      </div>
    ),
    {
      ...size,
    }
  );
}
