// app/page.tsx - Beranda AlatDKV - Ultra Modern Pastel Edition
import { supabasePublik } from "@/lib/supabase";
import Link from "next/link";
import AlatCarousel from "./AlatCarousel";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore();

  const { data } = await supabasePublik()
    .from("alat")
    .select("*")
    .eq("aktif", true)
    .order("id");
  const list = data || [];

  const { data: pinjam } = await supabasePublik()
    .from("peminjaman_alat")
    .select("alat_id,jumlah")
    .in("status", ["menunggu", "dipinjam"]);
  const terpakai: Record<number, number> = {};
  (pinjam || []).forEach((x: any) => {
    terpakai[x.alat_id] = (terpakai[x.alat_id] || 0) + x.jumlah;
  });
  const totalTersedia = list.reduce(
    (a: number, alat: any) =>
      a + Math.max(0, alat.stok - (terpakai[alat.id] || 0)),
    0,
  );
  const totalStok = list.reduce((a: number, alat: any) => a + alat.stok, 0);

  return (
    <div style={{ display: "grid", gap: 32, paddingBottom: 40 }}>
      {/* ============ 1. HERO BANNER PASTEL DINAMIS ============ */}
      <div
        style={{
          borderRadius: 36,
          overflow: "hidden",
          position: "relative",
          background:
            "linear-gradient(135deg, #FFB6C1 0%, #DDA0DD 50%, #AFEEEE 100%)",
          boxShadow: "0 25px 60px rgba(221, 160, 221, 0.35)",
          border: "3px solid rgba(255, 255, 255, 0.8)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.4), transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            padding: "48px 36px",
            display: "grid",
            gap: 20,
            maxWidth: 750,
          }}
        >
          <span
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              color: "#6C3483",
              fontSize: 12,
              fontWeight: 900,
              padding: "8px 18px",
              borderRadius: 999,
              width: "fit-content",
              boxShadow: "0 8px 20px rgba(108, 52, 131, 0.15)",
              letterSpacing: 0.5,
            }}
          >
            🌸 LAB DKV • {list.length} ALAT AKTIF • {totalTersedia} UNIT
            TERSEDIA
          </span>
          <h1
            style={{
              color: "#2C1E3B",
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            Pinjam Alat DKV, <br />
            <span
              style={{
                background: "linear-gradient(90deg, #4A235A, #900C3F, #1B4F72)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cepat, Mudah & Estetik!
            </span>
          </h1>
          <p
            style={{
              color: "#4A3B5C",
              fontSize: 16,
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 700,
              maxWidth: 600,
            }}
          >
            Kamera, lampu, mikrofon, dan tablet! Cek ketersediaan dan ajukan
            peminjaman langsung dalam{" "}
            <b style={{ color: "#6C3483" }}>30 detik</b> tanpa perlu antre di
            lab.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            <Link
              href="/ajukan"
              style={{
                background: "#2C1E3B",
                color: "#FFB6C1",
                padding: "16px 32px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(44, 30, 59, 0.3)",
                transition: "transform 0.2s ease",
              }}
            >
              📝 Ajukan Sekarang →
            </Link>
            <Link
              href="/alat"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(12px)",
                color: "#2C1E3B",
                padding: "16px 28px",
                borderRadius: 999,
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
                border: "2px solid rgba(255, 255, 255, 0.9)",
              }}
            >
              🎬 Lihat Daftar Alat
            </Link>
          </div>
        </div>
      </div>

      {/* ============ 2. KARTU STATISTIK WARNA-WARNI PASTEL ============ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 18,
        }}
      >
        {[
          [
            "🌸",
            `${list.length} Alat Aktif`,
            "Siap dipinjam untuk tugas",
            "linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)",
            "#512E5F",
            "rgba(255, 182, 193, 0.4)",
          ],
          [
            "📦",
            `${totalTersedia} Unit Tersedia`,
            `Dari total ${totalStok} unit`,
            "linear-gradient(135deg, #AFEEEE 0%, #98FB98 100%)",
            "#0E6655",
            "rgba(175, 238, 238, 0.4)",
          ],
          [
            "⚡",
            "Proses 30 Detik",
            "Formulir kilat dari HP",
            "linear-gradient(135deg, #FFDAB9 0%, #FFE4B5 100%)",
            "#7E5109",
            "rgba(255, 218, 185, 0.4)",
          ],
          [
            "🛡️",
            "100% Aman & RLS",
            "Keamanan data terjamin",
            "linear-gradient(135deg, #E6E6FA 0%, #D8BFD8 100%)",
            "#4A235A",
            "rgba(230, 230, 250, 0.4)",
          ],
        ].map(([icon, judul, sub, bg, warnaTeks, shadowColor]) => (
          <div
            key={judul}
            style={{
              background: bg,
              borderRadius: 30,
              padding: 24,
              color: warnaTeks,
              boxShadow: `0 15px 35px ${shadowColor}`,
              border: "3px solid rgba(255, 255, 255, 0.9)",
              display: "flexflex-col",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
            <b
              style={{
                display: "block",
                fontSize: 19,
                fontWeight: 900,
                letterSpacing: -0.5,
              }}
            >
              {judul}
            </b>
            <div
              style={{
                fontSize: 13,
                opacity: 0.9,
                marginTop: 6,
                fontWeight: 700,
              }}
            >
              {sub}
            </div>
          </div>
        ))}
      </div>

      {/* ============ 3. CAROUSEL SECTION ============ */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          borderRadius: 36,
          padding: 28,
          border: "3px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 20px 50px rgba(221, 160, 221, 0.2)",
        }}
      >
        <AlatCarousel list={list} />
      </div>
    </div>
  );
}
