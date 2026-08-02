import { ImageResponse } from "next/og";
import { site } from "@/content/data";

/** Required by `output: "export"`: metadata routes must opt in to being static. */
export const dynamic = "force-static";

export const alt = `${site.name} · ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse supports flexbox only (no CSS grid), so this layout is all flex.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#120a14",
          backgroundImage:
            "radial-gradient(ellipse 50% 50% at 30% 0%, rgba(255,143,191,0.26), transparent 70%), radial-gradient(ellipse 45% 45% at 75% 5%, rgba(196,132,252,0.20), transparent 72%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 34, height: 2, backgroundColor: "#ffb3d9" }} />
          <div
            style={{
              fontSize: 22,
              color: "#ffb3d9",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {site.title}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              color: "#fdf2f8",
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 30,
              color: "#d0bcca",
              lineHeight: 1.4,
              maxWidth: 940,
            }}
          >
            Securing the software supply chain: merged contributions to Harbor, the
            CNCF-graduated container registry.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 22,
            color: "#a992a5",
            borderTop: "1px solid #3a2440",
            paddingTop: 26,
          }}
        >
          <span>github.com/{site.githubHandle}</span>
          <span style={{ color: "#3a2440" }}>|</span>
          <span>Cosign · SBOM · Kubernetes · SPIFFE/SPIRE</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
