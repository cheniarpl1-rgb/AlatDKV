// app/layout.tsx - AlatDKV - Full Feminim Pastel & Modern
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          background:
            "linear-gradient(135deg, #FFF0F5 0%, #F5EEF8 50%, #EBF5FB 100%)", // Gradasi Pastel Lembut (Pink, Lavender, Mint)
          color: "#4A3B5C",
          fontFamily: "system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        {/* ============ BLUR BACKGROUND ORBS ============ */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -100,
              left: -100,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,182,193,0.5), transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "40%",
              right: -100,
              width: 450,
              height: 450,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(221,160,221,0.45), transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -100,
              left: "20%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(175,238,238,0.4), transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* ============ NAVBAR MODERN PASTEL GLASS ============ */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(255, 250, 252, 0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(221, 160, 221, 0.3)",
            boxShadow: "0 10px 30px rgba(221,160,221,0.15)",
          }}
        >
          <div
            style={{
              height: 4,
              background:
                "linear-gradient(90deg,#FFB6C1,#DDA0DD,#FFDAB9,#AFEEEE,#98FB98)",
            }}
          />
          <nav
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "14px 20px",
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: "linear-gradient(135deg,#FFB6C1,#DDA0DD,#FFDAB9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  boxShadow: "0 8px 25px rgba(221,160,221,0.5)",
                  border: "2px solid rgba(255,255,255,0.9)",
                }}
              >
                🌸
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1.1,
                }}
              >
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: 22,
                    background:
                      "linear-gradient(90deg,#DB7093,#9370DB,#8A2BE2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AlatDKV
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#9370DB",
                    letterSpacing: 1.2,
                  }}
                >
                  PASTEL EDITION ✨
                </span>
              </span>
            </Link>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginLeft: "auto",
                alignItems: "center",
              }}
            >
              {[
                ["🏠 Beranda", "/"],
                ["🎬 Alat", "/alat"],
                ["📝 Ajukan", "/ajukan"],
                ["🔍 Cek Status", "/cek"],
              ].map(([teks, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    color: "#5B4B6E",
                    textDecoration: "none",
                    fontWeight: 800,
                    fontSize: 13,
                    padding: "10px 18px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(221,160,221,0.4)",
                    boxShadow: "0 4px 15px rgba(221,160,221,0.1)",
                    transition: "all 0.2s",
                  }}
                >
                  {teks}
                </Link>
              ))}
              <Link
                href="/admin"
                style={{
                  background: "linear-gradient(90deg,#FFB6C1,#DDA0DD)",
                  color: "#4A3B5C",
                  padding: "10px 20px",
                  borderRadius: 999,
                  fontWeight: 900,
                  textDecoration: "none",
                  fontSize: 13,
                  boxShadow: "0 8px 25px rgba(255,182,193,0.5)",
                  border: "2px solid rgba(255,255,255,0.8)",
                }}
              >
                🛠 Admin →
              </Link>
            </div>
          </nav>
        </header>

        {/* ============ MAIN CONTENT ============ */}
        <main
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "24px 20px 50px",
          }}
        >
          {children}
        </main>

        {/* ============ FOOTER PASTEL ============ */}
        <footer
          style={{
            background: "rgba(255, 240, 245, 0.9)",
            borderTop: "1px solid rgba(221,160,221,0.3)",
            padding: "24px 20px",
            textAlign: "center",
            color: "#705888",
            fontSize: 13,
            fontWeight: 700,
            marginTop: 30,
          }}
        >
          AlatDKV • Lab Desain Komunikasi Visual • Edisi Feminim Pastel 🌸
        </footer>
      </body>
    </html>
  );
}
