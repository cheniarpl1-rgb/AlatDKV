// app/layout.tsx - FULL 1 FILE AJA, NGGAK ADA IMPORT Navbar LAGI, JADI NGGAK ERROR
"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname() || "/";

  const menus = [
    { href: "/", label: "● Beranda", pastel: "#FDE68A", aktif: "#FBBF24" },
    { href: "/alat", label: "📷 Alat", pastel: "#DDD6FE", aktif: "#A78BFA" },
    {
      href: "/ajukan",
      label: "📝 Ajukan",
      pastel: "#FBCFE8",
      aktif: "#F472B6",
    },
    {
      href: "/cek",
      label: "🔍 Cek Status",
      pastel: "#BAE6FD",
      aktif: "#38BDF8",
    },
    { href: "/admin", label: "• Admin", pastel: "#BBF7D0", aktif: "#4ADE80" },
    {
      href: "/ajukan",
      label: "Pinjam Alat →",
      pastel: "#FED7AA",
      aktif: "#FB923C",
    },
  ];

  function isAktif(href: string) {
    if (href === "/") return path === "/";
    return path.startsWith(href);
  }

  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily:
            "ui-rounded, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <style>{`
          .marquee-top{overflow:hidden;white-space:nowrap}
          .marquee-top-inner{display:inline-block;animation:jalan 24s linear infinite}
          @keyframes jalan{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        `}</style>

        {/* MARQUEE HITAM - TEMA ASLI, CUMA 1 */}
        <div
          className="marquee-top"
          style={{
            background: "#1E293B",
            padding: "9px 0",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            className="marquee-top-inner"
            style={{
              color: "white",
              fontSize: 12.5,
              fontWeight: 800,
              letterSpacing: ".5px",
            }}
          >
            <span style={{ paddingRight: 40 }}>
              ✏️ TABLET &nbsp; 🎯 MAKS 2 AKTIF / ORANG &nbsp; 🗓️ MAKS 3 HARI
              PINJAM &nbsp; 🚫 BUKAN SABTU / MINGGU &nbsp; ✨ AJUKAN 30 DETIK!
              &nbsp; 📷 STOK REALTIME! &nbsp; 📷 KAMERA &nbsp; 💡 LAMPU &nbsp;
              🎙️ MIC &nbsp; ✏️ TABLET &nbsp; 🎯 MAKS 2 AKTIF / ORANG &nbsp; 🗓️
              MAKS 3 HARI PINJAM &nbsp; 🚫 BUKAN SABTU / MINGGU &nbsp; ✨ AJUKAN
              30 DETIK! &nbsp; 📷 STOK REALTIME! &nbsp; 📷 KAMERA &nbsp; 💡
              LAMPU &nbsp; 🎙️ MIC &nbsp; ✏️ TABLET &nbsp;
            </span>
            <span style={{ paddingRight: 40 }}>
              ✏️ TABLET &nbsp; 🎯 MAKS 2 AKTIF / ORANG &nbsp; 🗓️ MAKS 3 HARI
              PINJAM &nbsp; 🚫 BUKAN SABTU / MINGGU &nbsp; ✨ AJUKAN 30 DETIK!
              &nbsp; 📷 STOK REALTIME! &nbsp; 📷 KAMERA &nbsp; 💡 LAMPU &nbsp;
              🎙️ MIC &nbsp; ✏️ TABLET &nbsp; 🎯 MAKS 2 AKTIF / ORANG &nbsp; 🗓️
              MAKS 3 HARI PINJAM &nbsp; 🚫 BUKAN SABTU / MINGGU &nbsp; ✨ AJUKAN
              30 DETIK! &nbsp; 📷 STOK REALTIME! &nbsp; 📷 KAMERA &nbsp; 💡
              LAMPU &nbsp; 🎙️ MIC &nbsp; ✏️ TABLET &nbsp;
            </span>
          </div>
        </div>

        {/* NAVBAR OVAL PUTIH - TEMA ASLI, PILL PASTEL WARNA-WARNI + AKTIF */}
        <div
          style={{ maxWidth: 1120, margin: "14px auto 0", padding: "0 16px" }}
        >
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              background: "white",
              borderRadius: 999,
              padding: "10px 10px 10px 24px",
              boxShadow: "0 14px 30px rgba(15,23,42,.12)",
              border: "2px solid white",
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  letterSpacing: "-1px",
                  color: "#1E293B",
                }}
              >
                <span style={{ color: "#EA580C" }}>Alat</span>
                <span style={{ color: "#16A34A" }}>DKV</span>
                <span style={{ color: "#EA580C" }}>.</span>
              </span>
            </Link>
            <nav
              style={{
                display: "flex",
                gap: 6,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {menus.map((m) => {
                const aktif = isAktif(m.href);
                return (
                  <Link
                    key={m.label}
                    href={m.href}
                    style={{
                      background: aktif ? m.aktif : m.pastel,
                      color: "#1E293B",
                      padding: "9px 16px",
                      borderRadius: 999,
                      fontWeight: aktif ? 900 : 800,
                      fontSize: 13,
                      textDecoration: "none",
                      border: aktif
                        ? "2px solid #1E293B"
                        : "1.5px solid rgba(255,255,255,.6)",
                      boxShadow: aktif
                        ? "0 8px 16px rgba(0,0,0,.16)"
                        : "0 6px 12px rgba(0,0,0,.06)",
                      transform: aktif ? "scale(1.05)" : "scale(1)",
                      transition: "all .2s ease",
                      display: "inline-block",
                    }}
                  >
                    {m.label} {aktif ? "✓" : ""}
                  </Link>
                );
              })}
            </nav>
          </header>
        </div>

        <main style={{ paddingTop: 16 }}>{children}</main>

        <footer
          style={{
            textAlign: "center",
            padding: "24px 16px 30px",
            color: "#64748B",
            fontSize: 12.5,
            fontWeight: 600,
          }}
        >
          © 2026 AlatDKV • Lab DKV • Pinjam Alat, Gak Pake Ribet ✨
        </footer>
      </body>
    </html>
  );
}
