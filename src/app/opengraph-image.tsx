import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "VLMaxxing through FrameMogging — training-free anti-recomputation for video VLMs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const bg = "#050507";
  const fg = "#ededed";
  const muted = "#a1a1aa";
  const border = "#27272a";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: `radial-gradient(circle at 85% 0%, rgba(94,234,212,0.08), transparent 55%), ${bg}`,
          color: fg,
          padding: "72px 80px",
          fontFamily:
            "ui-sans-serif, -apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              border: `1px solid ${border}`,
              borderRadius: 999,
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: muted,
            }}
          >
            <span style={{ color: fg }}>VLMaxxing</span>
            <span style={{ marginLeft: 12, color: muted }}>through FrameMogging</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 100,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -2,
              color: fg,
              maxWidth: 1040,
            }}
          >
            Stop paying twice to see the same pixels.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 32,
              lineHeight: 1.35,
              color: muted,
              maxWidth: 1040,
            }}
          >
            Training-free anti-recomputation for video VLMs.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
