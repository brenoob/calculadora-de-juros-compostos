import { ImageResponse } from "next/og";

export const alt = "Calculadora de Juros Compostos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 96px",
        background: "linear-gradient(135deg, #0b1220 0%, #1e293b 100%)",
        color: "#f1f5f9",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
        <div
          style={{
            display: "flex",
            width: 48,
            height: 84,
            background: "#0369a1",
            borderRadius: 12,
          }}
        />
        <div
          style={{
            display: "flex",
            width: 48,
            height: 126,
            background: "#0ea5e9",
            borderRadius: 12,
          }}
        />
        <div
          style={{
            display: "flex",
            width: 48,
            height: 168,
            background: "#34d399",
            borderRadius: 12,
          }}
        />
      </div>
      <h1
        style={{
          fontSize: 76,
          fontWeight: 700,
          margin: "44px 0 18px",
          lineHeight: 1.05,
          letterSpacing: -2,
        }}
      >
        Calculadora de <span style={{ color: "#34d399" }}>Juros Compostos</span>
      </h1>
      <p style={{ fontSize: 34, color: "#94a3b8", margin: 0 }}>
        Depósito inicial · aportes mensais · taxa anual
      </p>
    </div>,
    { ...size },
  );
}
