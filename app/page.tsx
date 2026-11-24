// app/page.tsx - Beranda AlatDKV - Tema Feminim Pastel
import { supabasePublik } from "@/lib/supabase";
import { gambarAlat } from "@/lib/gambar";
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
    <div>
      {/* ============ 1. HERO BANNER PASTEL ============ */}
      <div
        style={{
          borderRadius: 28,
          overflow: "hidden",
          position: "relative",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0 20px 40px rgba(221,160,221,0.25)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop"
          alt="AlatDKV"
          style={{
            width: "100%",
            height: 340,
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.9)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,240,245,0.2), rgba(74,59,92,0.85))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "28px 24px",
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.9)",
              color: "#8A2BE2",
              fontSize: 11,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 999,
              width: "fit-content",
            }}
          >
            🌸 ALATDKV • {list.length} ALAT AKTIF • {totalTersedia} UNIT
            TERSEDIA
          </span>
          <h1
            style={{
              color: "white",
              fontSize: 42,
              fontWeight: 900,
              margin: "12px 0 0",
              lineHeight: 1.05,
            }}
          >
            Pinjam Alat DKV,
            <br />
            <span
              style={{
                background: "linear-gradient(90deg,#FFB6C1,#FFDAB9,#E6E6FA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Super Mudah & Estetik!
            </span>
          </h1>
          <p
            style={{
              color: "#F3E8FF",
              maxWidth: 600,
              lineHeight: 1.6,
              margin: "10px 0 0",
            }}
          >
            Kamera, lampu, mikrofon, tablet! Cek stok, ajukan, cek status —
            semua <b style={{ color: "white" }}>30 detik</b> dari HP!
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 16,
            }}
          >
            <Link
              href="/ajukan"
              style={{
                background: "linear-gradient(90deg,#FFB6C1,#DDA0DD)",
                color: "#4A3B5C",
                padding: "12px 22px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(255,182,193,0.4)",
              }}
            >
              📝 Ajukan Sekarang →
            </Link>
            <Link
              href="/alat"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                padding: "12px 20px",
                borderRadius: 999,
                fontWeight: 800,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              🎬 Lihat Alat
            </Link>
          </div>
        </div>
      </div>

      {/* ============ 2. KARTU STATISTIK PASTEL ============ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: 12,
          marginTop: 14,
        }}
      >
        {[
          [
            "🌸",
            `${list.length} Alat`,
            "Aktif & Siap Pinjam",
            "linear-gradient(135deg,#FFB6C1,#FFC0CB)",
          ],
          [
            "📦",
            `${totalTersedia} Unit`,
            `Tersedia dari ${totalStok} Total`,
            "linear-gradient(135deg,#98FB98,#AFEEEE)",
          ],
          [
            "⚡",
            "30 Detik",
            "Ajukan Dari HP",
            "linear-gradient(135deg,#FFDAB9,#FFE4B5)",
          ],
          [
            "🛡",
            "100% Aman",
            "RLS + Login Admin",
            "linear-gradient(135deg,#DDA0DD,#E6E6FA)",
          ],
        ].map(([icon, judul, sub, bg]) => (
          <div
            key={judul}
            style={{
              background: bg,
              borderRadius: 20,
              padding: 16,
              color: "#4A3B5C",
              boxShadow: "0 10px 25px rgba(221,160,221,0.2)",
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            <div style={{ fontSize: 24 }}>{icon}</div>
            <b style={{ display: "block", marginTop: 6, fontSize: 16 }}>
              {judul}
            </b>
            <div style={{ fontSize: 12, opacity: 0.85 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ============ 3. CAROUSEL & KATEGORI ============ */}
      <div style={{ marginTop: 22 }}>
        <AlatCarousel list={list} />
      </div>
    </div>
  );
}
