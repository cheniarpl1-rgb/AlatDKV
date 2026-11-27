// app/layout.tsx - KODE LENGKAP - Yang aktif nonjol + warnanya GANTI jadi pekat, beda dari warna aslinya

"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const aktif = (href: string) => {
    if (href === "/") return path === "/";
    return path.startsWith(href);
  };

  // warnaBiasa = warna pastel kalau nggak aktif
  // warnaAktif = warna pekat kalau lagi dibuka - BEDA dari warna aslinya + nonjol
  const gayaTombol = (href: string, warnaBiasa: string, warnaAktif: string) => {
    const isAktif = aktif(href);
    return {
      background: isAktif ? warnaAktif : warnaBiasa,
      color: isAktif ? "white" : "#1E293B",
      padding: "8px 14px",
      borderRadius: 999,
      fontWeight: 900,
      fontSize: 13,
      textDecoration: "none" as const,
      border: isAktif ? "2.5px solid #1E293B" : "2px solid transparent",
      boxShadow: isAktif ? "0 8px 18px rgba(0,0,0,.28)" : "none",
      transform: isAktif ? "scale(1.12) translateY(-2px)" : "scale(1)",
      display: "inline-block",
    };
  };

  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0, background: "transparent" }}>
        <div
          style={{
            minHeight: "100vh",
            background:
              "radial-gradient(ellipse 90% 60% at 0% 0%, rgba(251,207,232,.9) 0%, rgba(251,207,232,0) 55%), radial-gradient(ellipse 80% 60% at 100% 0%, rgba(221,214,254,.9) 0%, rgba(221,214,254,0) 55%), radial-gradient(ellipse 90% 70% at 0% 100%, rgba(253,230,138,.85) 0%, rgba(253,230,138,0) 60%), radial-gradient(ellipse 80% 70% at 100% 100%, rgba(191,219,254,.9) 0%, rgba(191,219,254,0) 60%), linear-gradient(135deg, #FBCFE8 0%, #FDE68A 22%, #FEF3C7 38%, #BFDBFE 54%, #DDD6FE 70%, #FBCFE8 86%, #FDE68A 100%)",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Marquee atas */}
          <div
            style={{
              background: "#1E293B",
              color: "white",
              padding: "8px 0",
              overflow: "hidden",
              whiteSpace: "nowrap",
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            <div
              style={{
                display: "inline-block",
                animation: "marquee 22s linear infinite",
              }}
            >
              <span style={{ paddingRight: 40 }}>
                🎯 MAKS 2 AKTIF / ORANG &nbsp;&nbsp; 🗓️ MAKS 3 HARI PINJAM
                &nbsp;&nbsp; 🚫 BUKAN SABTU / MINGGU &nbsp;&nbsp; ✨ AJUKAN 30
                DETIK! &nbsp;&nbsp; 📷 STOK REALTIME! &nbsp;&nbsp; 📷 KAMERA
                &nbsp;&nbsp; 💡 LAMPU &nbsp;&nbsp; 🎙️ MIC &nbsp;&nbsp; ✏️ TABLET
                &nbsp;&nbsp; ✏️ TABLET &nbsp;&nbsp; 🎯 MAKS 2 AKTIF / ORANG
                &nbsp;&nbsp;
              </span>
              <span style={{ paddingRight: 40 }}>
                🎯 MAKS 2 AKTIF / ORANG &nbsp;&nbsp; 🗓️ MAKS 3 HARI PINJAM
                &nbsp;&nbsp; 🚫 BUKAN SABTU / MINGGU &nbsp;&nbsp; ✨ AJUKAN 30
                DETIK! &nbsp;&nbsp; 📷 STOK REALTIME! &nbsp;&nbsp; 📷 KAMERA
                &nbsp;&nbsp; 💡 LAMPU &nbsp;&nbsp; 🎙️ MIC &nbsp;&nbsp; ✏️ TABLET
                &nbsp;&nbsp; ✏️ TABLET &nbsp;&nbsp; 🎯 MAKS 2 AKTIF / ORANG
                &nbsp;&nbsp;
              </span>
            </div>
          </div>

          {/* Navbar */}
          <div
            style={{
              maxWidth: 1080,
              margin: "14px auto 0",
              padding: "0 14px",
              position: "sticky",
              top: 10,
              zIndex: 50,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,.92)",
                borderRadius: 999,
                padding: "8px 10px 8px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 10px 24px rgba(0,0,0,.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Link
                href="/"
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  textDecoration: "none",
                  letterSpacing: "-1px",
                }}
              >
                <span style={{ color: "#F97316" }}>Alat</span>
                <span style={{ color: "#059669" }}>DKV</span>
                <span style={{ color: "#F97316" }}>.</span>
              </Link>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                {/* Beranda: biasa kuning muda, aktif jadi oren pekat */}
                <Link href="/" style={gayaTombol("/", "#FACC15", "#EA580C")}>
                  • Beranda {aktif("/") ? "✓" : ""}
                </Link>
                {/* Alat: biasa ungu muda, aktif jadi ungu pekat */}
                <Link
                  href="/alat"
                  style={gayaTombol("/alat", "#EDE9FE", "#7C3AED")}
                >
                  📷 Alat {aktif("/alat") ? "✓" : ""}
                </Link>
                {/* Ajukan: biasa pink muda, aktif jadi pink pekat */}
                <Link
                  href="/ajukan"
                  style={gayaTombol("/ajukan", "#FCE7F3", "#DB2777")}
                >
                  ✨ Ajukan {aktif("/ajukan") ? "✓" : ""}
                </Link>
                {/* Cek Status: biasa biru muda, aktif jadi biru pekat */}
                <Link
                  href="/cek"
                  style={gayaTombol("/cek", "#BAE6FD", "#0284C7")}
                >
                  🔍 Cek Status {aktif("/cek") ? "✓" : ""}
                </Link>
                {/* Admin: biasa hijau muda, aktif jadi hijau pekat */}
                <Link
                  href="/admin"
                  style={gayaTombol("/admin", "#BBF7D0", "#059669")}
                >
                  • Admin {aktif("/admin") ? "✓" : ""}
                </Link>
                <Link
                  href="/alat"
                  style={{
                    background: "#FED7AA",
                    color: "#1E293B",
                    padding: "8px 14px",
                    borderRadius: 999,
                    fontWeight: 800,
                    fontSize: 13,
                    textDecoration: "none",
                  }}
                >
                  Pinjam Alat →
                </Link>
              </div>
            </div>
          </div>

          <main style={{ paddingTop: 18 }}>{children}</main>

          <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
        </div>
      </body>
    </html>
  );
}
