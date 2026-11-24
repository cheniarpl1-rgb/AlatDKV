// app/layout.tsx - Layout AlatDKV - Tema Feminim Pastel
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
          background: "#FFF5F7", // Latar belakang putih pink pastel yang lembut
          color: "#4A3B5C", // Warna teks utama ungu gelap lembut yang ramah di mata
          fontFamily: "system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        {/* ============ BACKGROUND BOLA-BOLA PASTEL BLUR! ============ */}
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
              top: -80,
              left: -60,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,182,193,0.4), transparent 70%)", // Soft Pink Pastel
              filter: "blur(50px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 200,
              right: -80,
              width: 360,
              height: 360,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(221,160,221,0.4), transparent 70%)", // Lavender Pastel
              filter: "blur(50px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -100,
              left: "30%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,218,185,0.4), transparent 70%)", // Peach Pastel
              filter: "blur(50px)",
            }}
          />
        </div>

        {/* ============ NAVBAR KACA PASTEL! ============ */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(255, 245, 247, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(219, 112, 147, 0.2)",
            boxShadow: "0 10px 30px rgba(219,112,147,0.08)",
          }}
        >
          <div
            style={{
              height: 3,
              background:
                "linear-gradient(90deg,#FFB6C1,#DDA0DD,#FFDAB9,#98FB98)",
            }}
          />
          <nav
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "12px 16px",
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* LOGO! */}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "linear-gradient(135deg,#FFB6C1,#DDA0DD,#FFDAB9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  boxShadow: "0 8px 20px rgba(221,160,221,0.4)",
                  border: "1px solid rgba(255,255,255,0.8)",
                }}
              >
                🌸
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: 20,
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
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#9370DB",
                    letterSpacing: 1,
                  }}
                >
                  LAB DKV • PASTEL EDITION
                </span>
              </span>
            </Link>

            {/* MENU! */}
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginLeft: "auto",
                alignItems: "center",
              }}
            >
              <Link
                href="/"
                style={{
                  color: "#5B4B6E",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 13,
                  padding: "9px 14px",
                  borderRadius: 999,
                  background: "rgba(221,160,221,0.15)",
                  border: "1px solid rgba(221,160,221,0.3)",
                }}
              >
                🏠 Beranda
              </Link>
              <Link
                href="/alat"
                style={{
                  color: "#5B4B6E",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 13,
                  padding: "9px 14px",
                  borderRadius: 999,
                  background: "rgba(221,160,221,0.15)",
                  border: "1px solid rgba(221,160,221,0.3)",
                }}
              >
                🎬 Alat
              </Link>
              <Link
                href="/ajukan"
                style={{
                  color: "#5B4B6E",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 13,
                  padding: "9px 14px",
                  borderRadius: 999,
                  background: "rgba(221,160,221,0.15)",
                  border: "1px solid rgba(221,160,221,0.3)",
                }}
              >
                📝 Ajukan
              </Link>
              <Link
                href="/cek"
                style={{
                  color: "#5B4B6E",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 13,
                  padding: "9px 14px",
                  borderRadius: 999,
                  background: "rgba(221,160,221,0.15)",
                  border: "1px solid rgba(221,160,221,0.3)",
                }}
              >
                🔍 Cek Status
              </Link>
              <Link
                href="/admin"
                style={{
                  background: "linear-gradient(90deg,#FFB6C1,#DDA0DD)",
                  color: "#4A3B5C",
                  padding: "9px 16px",
                  borderRadius: 999,
                  fontWeight: 900,
                  textDecoration: "none",
                  fontSize: 13,
                  boxShadow: "0 8px 20px rgba(255,182,193,0.4)",
                  border: "1px solid rgba(255,255,255,0.6)",
                }}
              >
                🛠 Admin →
              </Link>
            </div>
          </nav>
        </header>

        {/* ============ ISI HALAMAN ============ */}
        <main
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "18px 16px 40px",
          }}
        >
          {children}
        </main>

        {/* ============ FOOTER PASTEL ============ */}
        <footer
          style={{
            background: "linear-gradient(180deg,#FFE4E1,#FFF0F5)",
            borderTop: "1px solid rgba(221,160,221,0.3)",
            marginTop: 20,
            color: "#5B4B6E",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "28px 16px 16px",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            <p style={{ margin: 0, fontWeight: 700 }}>
              AlatDKV • Lab Desain Komunikasi Visual • Edisi Feminim Pastel ✨
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
