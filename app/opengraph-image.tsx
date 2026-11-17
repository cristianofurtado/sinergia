import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(135deg, #0e526c 0%, #1a4157 60%, #284b63 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fbbf24",
            marginBottom: 20,
          }}
        >
          energiaprospectar.com.br
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Energia Prospectar
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.4,
            color: "#e2e8f0",
            maxWidth: 960,
          }}
        >
          Energia por assinatura, Geração Distribuída e Mercado Livre de Energia. Economize de 12% a 26% na conta de luz sem obras.
        </div>
      </div>
    ),
    { ...size }
  );
}
