// app/layout.tsx - Layout AlatDKV - JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!

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
          background: "#120826",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        {/* ============ BACKGROUND BOLA-BOLA WARNA BLUR! 👈 BARU! ============ */}
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
                "radial-gradient(circle, rgba(236,72,153,0.35), transparent 70%)",
              filter: "blur(40px)",
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
                "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)",
              filter: "blur(40px)",
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
                "radial-gradient(circle, rgba(245,158,11,0.25), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "60%",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(34,211,238,0.25), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        {/* ============ NAVBAR KACA + NEMPEL DI ATAS! 👈 UPGRADE TOTAL! ============ */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(18,8,38,0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* Garis gradasi di atas navbar! */}
          <div
            style={{
              height: 3,
              background:
                "linear-gradient(90deg,#F59E0B,#EC4899,#8B5CF6,#22D3EE,#10B981)",
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
                  background: "linear-gradient(135deg,#F59E0B,#EC4899,#8B5CF6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  boxShadow: "0 8px 24px rgba(236,72,153,0.5)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                🎬
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
                      "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)",
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
                    color: "#C4B5FD",
                    letterSpacing: 1,
                  }}
                >
                  LAB DKV • PINJAM ALAT
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
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 13,
                  padding: "9px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                🏠 Beranda
              </Link>
              <Link
                href="/alat"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 13,
                  padding: "9px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                🎬 Alat
              </Link>
              <Link
                href="/ajukan"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 13,
                  padding: "9px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                📝 Ajukan
              </Link>
              <Link
                href="/cek"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 13,
                  padding: "9px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                🔍 Cek Status
              </Link>
              <Link
                href="/admin"
                style={{
                  background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                  color: "white",
                  padding: "9px 16px",
                  borderRadius: 999,
                  fontWeight: 900,
                  textDecoration: "none",
                  fontSize: 13,
                  boxShadow: "0 8px 24px rgba(236,72,153,0.45)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                🛠 Admin →
              </Link>
            </div>
          </nav>

          {/* Ticker kecil di bawah navbar! Biar kayak website berita! */}
          <div
            style={{
              background: "linear-gradient(90deg,#1E103A,#3B0764)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                maxWidth: 1100,
                margin: "0 auto",
                padding: "7px 16px",
                display: "flex",
                gap: 16,
                fontSize: 11,
                fontWeight: 700,
                color: "#DDD6FE",
                whiteSpace: "nowrap",
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              <span>⚡ Ajukan 30 Detik!</span>
              <span>📦 Stok Realtime!</span>
              <span>📷 Kamera • 💡 Lampu • 🎙 Mic • ✏️ Tablet</span>
              <span>🎯 Maks 2 Aktif / Orang</span>
              <span>📅 Maks 3 Hari Pinjam</span>
              <span>🚫 Bukan Sabtu / Minggu</span>
            </div>
          </div>
        </header>

        {/* ============ ISI HALAMAN! ============ */}
        <main
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "18px 16px 40px",
          }}
        >
          {children}
        </main>

        {/* ============ FOOTER 3 KOLOM! 👈 UPGRADE TOTAL! ============ */}
        <footer
          style={{
            background: "linear-gradient(180deg,#1E103A,#120826)",
            borderTop: "1px solid #4C1D95",
            marginTop: 10,
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "28px 16px 16px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
            }}
          >
            {/* Kolom 1: Logo + Deskripsi */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background:
                      "linear-gradient(135deg,#F59E0B,#EC4899,#8B5CF6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  🎬
                </span>
                <b
                  style={{
                    fontSize: 18,
                    background: "linear-gradient(90deg,#FDE68A,#F472B6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AlatDKV
                </b>
              </div>
              <p
                style={{
                  color: "#C4B5FD",
                  fontSize: 13,
                  lineHeight: 1.6,
                  margin: "10px 0 0",
                }}
              >
                Aplikasi Peminjaman Alat Laboratorium DKV. Pinjam kamera, lampu,
                mikrofon, tablet — tanpa antre, tanpa kertas!
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginTop: 12,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    background: "#14532D",
                    color: "#BBF7D0",
                    fontSize: 11,
                    fontWeight: 900,
                    padding: "5px 10px",
                    borderRadius: 999,
                  }}
                >
                  ✅ RLS AKTIF
                </span>
                <span
                  style={{
                    background: "#1E3A8A",
                    color: "#BFDBFE",
                    fontSize: 11,
                    fontWeight: 900,
                    padding: "5px 10px",
                    borderRadius: 999,
                  }}
                >
                  🛡 DATA AMAN
                </span>
                <span
                  style={{
                    background: "#7C2D12",
                    color: "#FED7AA",
                    fontSize: 11,
                    fontWeight: 900,
                    padding: "5px 10px",
                    borderRadius: 999,
                  }}
                >
                  ⚡ REALTIME
                </span>
              </div>
            </div>

            {/* Kolom 2: Menu Cepat */}
            <div>
              <b style={{ color: "white", fontSize: 14 }}>Menu Cepat 🚀</b>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <Link
                  href="/"
                  style={{
                    color: "#C4B5FD",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  🏠 Beranda
                </Link>
                <Link
                  href="/alat"
                  style={{
                    color: "#C4B5FD",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  🎬 Daftar Alat
                </Link>
                <Link
                  href="/ajukan"
                  style={{
                    color: "#C4B5FD",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  📝 Ajukan Peminjaman
                </Link>
                <Link
                  href="/cek"
                  style={{
                    color: "#C4B5FD",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  🔍 Cek Status
                </Link>
                <Link
                  href="/admin"
                  style={{
                    color: "#C4B5FD",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  🛠 Admin
                </Link>
              </div>
            </div>

            {/* Kolom 3: Kategori */}
            <div>
              <b style={{ color: "white", fontSize: 14 }}>Kategori Alat 🎬</b>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <Link
                  href="/alat?kategori=kamera"
                  style={{
                    color: "#C4B5FD",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  📷 Kamera
                </Link>
                <Link
                  href="/alat?kategori=pencahayaan"
                  style={{
                    color: "#C4B5FD",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  💡 Pencahayaan
                </Link>
                <Link
                  href="/alat?kategori=audio"
                  style={{
                    color: "#C4B5FD",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  🎙 Audio
                </Link>
                <Link
                  href="/alat?kategori=tablet"
                  style={{
                    color: "#C4B5FD",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  ✏️ Tablet
                </Link>
                <Link
                  href="/alat?kategori=aksesoris"
                  style={{
                    color: "#C4B5FD",
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  🎒 Aksesoris
                </Link>
              </div>
            </div>

            {/* Kolom 4: Aturan */}
            <div>
              <b style={{ color: "white", fontSize: 14 }}>Aturan Pinjam 🎯</b>
              <div
                style={{
                  color: "#C4B5FD",
                  fontSize: 13,
                  lineHeight: 1.8,
                  marginTop: 12,
                }}
              >
                • Jumlah 1-5 unit
                <br />
                • Maks 2 aktif / orang
                <br />
                • Pinjam maks 3 hari
                <br />
                • Maks 14 hari ke depan
                <br />• Bukan Sabtu / Minggu
              </div>
              <Link
                href="/ajukan"
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontWeight: 900,
                  textDecoration: "none",
                  fontSize: 13,
                }}
              >
                Ajukan Sekarang →
              </Link>
            </div>
          </div>

          {/* Baris bawah footer */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              padding: "14px 16px",
              textAlign: "center",
              color: "#A78BFA",
              fontSize: 12,
            }}
          >
            AlatDKV • Lab Desain Komunikasi Visual • Pinjam Alat Tanpa Ribet! 🎬
            • Dibuat untuk Final Project Pekan 6 — Junior Web Developer
          </div>
        </footer>
      </body>
    </html>
  );
}
