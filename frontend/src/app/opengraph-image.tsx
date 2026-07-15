import { ImageResponse } from "next/og";

export const alt = "KORIX — Des sites internet conçus pour développer votre activité";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", color: "white", background: "radial-gradient(circle at 78% 72%, #075bff 0, #061638 24%, #020306 58%)", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", fontSize: 42, fontWeight: 800, letterSpacing: 4 }}>KOR<span style={{ color: "#2e75ff" }}>I</span>X</div>
      <div style={{ display: "flex", maxWidth: 960, flexDirection: "column" }}>
        <div style={{ display: "flex", color: "#4b83ff", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>CRÉATION DE SITES INTERNET</div>
        <div style={{ display: "flex", fontSize: 68, lineHeight: 1.08, fontWeight: 750 }}>Des sites internet conçus pour développer votre activité.</div>
      </div>
    </div>,
    size,
  );
}
