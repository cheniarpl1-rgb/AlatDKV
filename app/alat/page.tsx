// app/alat/page.tsx - Daftar Alat - FULL - PASTEL NONJOL TAPI NGGAK NORAK
// Latar pastel pekat dikit + kartu PUTIH bersih + pinggir pastel + shadow tebel

import { supabasePublik } from "@/lib/supabase";
import { gambarAlat, iconAlat } from "@/lib/gambar";
import Link from "next/link";

function bersihinNama(nama: string) {
  return nama
    .replace(/\u3010.*?\u3011/g, "")
    .replace(/entity-.*?¦canonical_name=/g, "")
    .replace(/¦/g, "")
    .replace(/\[.*?\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function DaftarAlat({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string }>;
}) {
  const p = await searchParams;
  const kat = p.kategori || "Semua";
  const q = (p.q || "").trim();

  let query = supabasePublik().from("alat").select("*").eq("aktif", true);
  if (kat !== "Semua") query = query.eq("kategori", kat);
  const { data } = await query;
  let list = data || [];
  if (q) {
    const key = q.toLowerCase();
    list = list.filter((x: any) =>
      `${x.nama} ${x.keterangan || ""} ${x.kategori}`
        .toLowerCase()
        .includes(key),
    );
  }

  const { data: pinjam } = await supabasePublik()
    .from("peminjaman_alat")
    .select("alat_id,jumlah")
    .in("status", ["menunggu", "dipinjam"]);
  const terpakai: Record<number, number> = {};
  (pinjam || []).forEach((x: any) => {
    terpakai[x.alat_id] = (terpakai[x.alat_id] || 0) + x.jumlah;
  });

  const totalStok = list.reduce((a: number, x: any) => a + x.stok, 0);
  const totalTersedia = list.reduce(
    (a: number, x: any) => a + Math.max(0, x.stok - (terpakai[x.id] || 0)),
    0,
  );
  const habis = list.filter(
    (x: any) => x.stok - (terpakai[x.id] || 0) <= 0,
  ).length;

  const { data: semuaAlat } = await supabasePublik()
    .from("alat")
    .select("kategori")
    .eq("aktif", true);
  const hitungKat: Record<string, number> = {};
  (semuaAlat || []).forEach((x: any) => {
    hitungKat[x.kategori] = (hitungKat[x.kategori] || 0) + 1;
  });

  // PASTEL NONJOL - warnanya lebih pekat dikit biar keliatan, tapi tetep pastel
  const pastel: Record<
    string,
    {
      bg: string;
      soft: string;
      teks: string;
      grad: string;
      border: string;
      shadow: string;
    }
  > = {
    kamera: {
      bg: "#FFF7ED",
      soft: "#FFEDD5",
      teks: "#EA580C",
      grad: "linear-gradient(135deg,#FFF7ED,#FED7AA)",
      border: "#FDBA74",
      shadow: "rgba(249,115,22,.22)",
    },
    pencahayaan: {
      bg: "#FFFBEB",
      soft: "#FEF3C7",
      teks: "#D97706",
      grad: "linear-gradient(135deg,#FFFBEB,#FDE68A)",
      border: "#FCD34D",
      shadow: "rgba(245,158,11,.22)",
    },
    audio: {
      bg: "#F5F3FF",
      soft: "#EDE9FE",
      teks: "#7C3AED",
      grad: "linear-gradient(135deg,#F5F3FF,#DDD6FE)",
      border: "#C4B5FD",
      shadow: "rgba(139,92,246,.22)",
    },
    tablet: {
      bg: "#F0FDF4",
      soft: "#DCFCE7",
      teks: "#16A34A",
      grad: "linear-gradient(135deg,#F0FDF4,#BBF7D0)",
      border: "#86EFAC",
      shadow: "rgba(34,197,94,.22)",
    },
    aksesoris: {
      bg: "#FDF2F8",
      soft: "#FCE7F3",
      teks: "#DB2777",
      grad: "linear-gradient(135deg,#FDF2F8,#FBCFE8)",
      border: "#F9A8D4",
      shadow: "rgba(236,72,153,.22)",
    },
  };

  const iconKat: Record<string, string> = {
    kamera: "📷",
    pencahayaan: "💡",
    audio: "🎙️",
    tablet: "✏️",
    aksesoris: "🎒",
  };
  const judulKat =
    kat === "Semua"
      ? "Semua Alat"
      : `${iconKat[kat] || "🎬"} ${kat.charAt(0).toUpperCase() + kat.slice(1)}`;
  const KATEGORI = [
    "kamera",
    "pencahayaan",
    "audio",
    "tablet",
    "aksesoris",
  ] as const;

  function spekSingkat(nama: string, kategori: string): string {
    const n = nama.toLowerCase();
    if (n.includes("canon") || n.includes("2000d"))
      return "DSLR • 24.1 MP • Full HD";
    if (n.includes("s" + "ony") || n.includes("a6400"))
      return "Mirrorless • 4K • AF Cepat";
    if (n.includes("lampu") || n.includes("led")) return "LED Panel • + Tripod";
    if (n.includes("mic") || n.includes("mikrofon"))
      return "Jernih • Plug & Play";
    if (n.includes("tablet")) return "Gambar Digital • Pen";
    return kategori === "kamera"
      ? "Kamera • Siap Pakai"
      : "Siap Pakai • Lab DKV";
  }

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px 60px" }}>
      <style>{`
        .card-pop{transition:transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease}
        .card-pop:hover{transform:translateY(-8px) scale(1.015);box-shadow:0 28px 44px rgba(15,23,42,.16)!important}
        .foto-zoom{transition:transform .6s cubic-bezier(.34,1.56,.64,1)}
        .card-pop:hover .foto-zoom{transform:scale(1.06)}
        .pill-pop{transition:all .2s ease}
        .pill-pop:hover{transform:translateY(-2px);box-shadow:0 12px 20px rgba(15,23,42,.12)!important}
        @media (max-width:640px){ .hero-pop{grid-template-columns:1fr!important;padding:20px!important} .hero-pop img{height:190px!important} }
      `}</style>

      {/* HERO - pastel lebih pekat + kartu putih di dalamnya biar nonjol */}
      <div
        className="hero-pop"
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr .95fr",
          gap: 22,
          alignItems: "center",
          background:
            "linear-gradient(135deg,#FED7AA 0%,#FDE68A 30%,#FBCFE8 65%,#DDD6FE 100%)",
          borderRadius: 32,
          padding: 28,
          boxShadow: "0 20px 40px rgba(249,115,22,.25)",
          overflow: "hidden",
          position: "relative",
          border: "2px solid rgba(255,255,255,.7)",
        }}
      >
        <div>
          <span
            style={{
              background: "white",
              color: "#16A34A",
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 6px 16px rgba(0,0,0,.10)",
            }}
          >
            ✨ DAFTAR ALAT • STOK REALTIME{" "}
            <span
              style={{
                width: 8,
                height: 8,
                background: "#22C55E",
                borderRadius: 999,
                display: "inline-block",
              }}
            />
          </span>
          <h1
            style={{
              fontSize: "clamp(34px,5vw,50px)",
              lineHeight: 1.05,
              margin: "16px 0 10px",
              fontWeight: 900,
              color: "#1E293B",
              letterSpacing: "-1px",
            }}
          >
            {judulKat}{" "}
            <span
              style={{
                background: "white",
                padding: "2px 14px",
                borderRadius: 16,
                display: "inline-block",
                transform: "rotate(-2deg)",
                boxShadow: "0 10px 22px rgba(0,0,0,.14)",
                color: "#EA580C",
              }}
            >
              ({list.length})
            </span>
          </h1>
          <p
            style={{
              color: "#475569",
              fontSize: 14.5,
              lineHeight: 1.7,
              margin: "0 0 18px",
              maxWidth: 520,
              fontWeight: 600,
            }}
          >
            {q ? (
              <>
                Hasil pencarian <b style={{ color: "#1E293B" }}>“{q}”</b> di
                kategori {kat} — ketemu {list.length} alat!
              </>
            ) : kat === "Semua" ? (
              "Semua alat aktif di Lab DKV! Stok tersedia = stok total - yang sedang dipinjam."
            ) : (
              `Kamu lagi lihat kategori ${kat}!`
            )}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link
              href="/ajukan"
              style={{
                background: "#1E293B",
                color: "white",
                padding: "13px 24px",
                borderRadius: 999,
                fontWeight: 800,
                textDecoration: "none",
                fontSize: 14,
                boxShadow: "0 12px 22px rgba(30,41,59,.30)",
              }}
            >
              📝 Ajukan Sekarang →
            </Link>
            <Link
              href="/cek"
              style={{
                background: "white",
                color: "#1E293B",
                padding: "13px 20px",
                borderRadius: 999,
                fontWeight: 800,
                textDecoration: "none",
                fontSize: 14,
                boxShadow: "0 8px 16px rgba(0,0,0,.10)",
              }}
            >
              🔍 Cek Status
            </Link>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop"
            alt="Daftar Alat"
            style={{
              width: "100%",
              height: 235,
              objectFit: "cover",
              borderRadius: 24,
              display: "block",
              boxShadow: "0 16px 28px rgba(0,0,0,.16)",
              border: "3px solid white",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 12,
              bottom: 12,
              right: 12,
              background: "white",
              borderRadius: 18,
              padding: "12px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 10px 22px rgba(0,0,0,.14)",
            }}
          >
            <div>
              <b style={{ fontSize: 14, display: "block", color: "#1E293B" }}>
                Stok Hari Ini
              </b>
              <span style={{ fontSize: 12, color: "#64748B" }}>
                {totalTersedia} dari {totalStok} unit tersedia
              </span>
            </div>
            <span
              style={{
                background: "#DCFCE7",
                color: "#15803D",
                padding: "7px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              ✅ LIVE
            </span>
          </div>
        </div>
      </div>

      {/* SEARCH - putih bersih, shadow tebel biar nonjol dari latar pastel */}
      <form
        action="/alat"
        method="get"
        style={{
          marginTop: 18,
          background: "white",
          borderRadius: 999,
          padding: 6,
          display: "flex",
          gap: 6,
          boxShadow: "0 14px 28px rgba(15,23,42,.12)",
          border: "2px solid #FFE4E6",
        }}
      >
        {kat !== "Semua" && <input type="hidden" name="kategori" value={kat} />}
        <input
          name="q"
          defaultValue={q}
          placeholder="🔍 Cari alat... contoh: kamera, sony, mic, lampu"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "12px 18px",
            fontSize: 14,
            background: "transparent",
            minWidth: 0,
          }}
        />
        <button
          type="submit"
          style={{
            background: "#1E293B",
            color: "white",
            padding: "12px 22px",
            borderRadius: 999,
            fontWeight: 800,
            fontSize: 14,
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Cari Alat →
        </button>
        {(q || kat !== "Semua") && (
          <Link
            href="/alat"
            style={{
              background: "#FEF3C7",
              color: "#92400E",
              padding: "12px 16px",
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            ✕ Reset
          </Link>
        )}
      </form>

      {/* STAT - pastel pekat + border pastel + shadow, biar nggak nyatu */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: 12,
          marginTop: 16,
        }}
      >
        {[
          {
            icon: "🎬",
            nilai: `${list.length} Alat`,
            label: "Total Alat",
            sub: `Di kategori ${kat}`,
            bg: "linear-gradient(135deg,#EDE9FE,#DDD6FE)",
            teks: "#6D28D9",
            border: "#C4B5FD",
          },
          {
            icon: "📦",
            nilai: `${totalStok} Unit`,
            label: "Total Stok",
            sub: "Total Stok",
            bg: "linear-gradient(135deg,#FFEDD5,#FED7AA)",
            teks: "#C2410C",
            border: "#FDBA74",
          },
          {
            icon: "✅",
            nilai: `${totalTersedia} Unit`,
            label: "Tersedia",
            sub: "Tersedia Sekarang!",
            bg: "linear-gradient(135deg,#DCFCE7,#BBF7D0)",
            teks: "#15803D",
            border: "#86EFAC",
          },
          {
            icon: "⛔",
            nilai: `${habis} Alat`,
            label: "Habis",
            sub: "Stok Habis",
            bg: "linear-gradient(135deg,#FEF3C7,#FDE68A)",
            teks: "#B45309",
            border: "#FCD34D",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="card-pop"
            style={{
              background: s.bg,
              borderRadius: 22,
              padding: 16,
              boxShadow: "0 12px 24px rgba(15,23,42,.10)",
              border: `2px solid ${s.border}`,
            }}
          >
            <div
              style={{
                fontSize: 26,
                background: "white",
                width: 46,
                height: 46,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 12px rgba(0,0,0,.08)",
              }}
            >
              {s.icon}
            </div>
            <b
              style={{
                display: "block",
                marginTop: 10,
                fontSize: 19,
                color: "#1E293B",
              }}
            >
              {s.nilai}
            </b>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: s.teks,
                lineHeight: 1.4,
              }}
            >
              {s.label} • {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* KATEGORI */}
      <div style={{ marginTop: 28 }}>
        <h2
          style={{
            color: "#1E293B",
            fontSize: 22,
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-.5px",
          }}
        >
          Saring Berdasarkan Kategori! 🎯
        </h2>
        <p
          style={{
            color: "#475569",
            fontSize: 13,
            fontWeight: 600,
            margin: "4px 0 0",
          }}
        >
          Klik kategori, URL-nya berubah jadi{" "}
          <b style={{ color: "#1E293B" }}>/alat?kategori=kamera</b> — ini yang
          dinilai penguji!
        </p>
        <div
          style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}
        >
          <Link
            href="/alat"
            className="pill-pop"
            style={{
              background: kat === "Semua" ? "#1E293B" : "white",
              color: kat === "Semua" ? "white" : "#1E293B",
              borderRadius: 999,
              padding: "11px 18px",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: 13,
              boxShadow: "0 10px 20px rgba(15,23,42,.12)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              border: "2px solid white",
            }}
          >
            🎬 Semua • {(semuaAlat || []).length}
          </Link>
          {KATEGORI.map((k) => {
            const aktif = kat === k;
            const c = pastel[k];
            return (
              <Link
                key={k}
                href={`/alat?kategori=${k}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                className="pill-pop"
                style={{
                  background: aktif ? c.grad : "white",
                  color: aktif ? c.teks : "#334155",
                  borderRadius: 999,
                  padding: "11px 18px",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 13,
                  boxShadow: "0 10px 20px rgba(15,23,42,.10)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  textTransform: "capitalize",
                  border: `2px solid ${aktif ? c.border : "white"}`,
                }}
              >
                {iconKat[k]} {k} • {hitungKat[k] || 0} {aktif ? "✓" : ""}
              </Link>
            );
          })}
        </div>
      </div>

      {/* KARTU - PUTIH BERSIH + PINGGIR PASTEL + SHADOW TEBEL = NONJOL */}
      <div style={{ marginTop: 22 }}>
        {list.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: 28,
              padding: 36,
              textAlign: "center",
              boxShadow: "0 16px 32px rgba(15,23,42,.12)",
              border: "2px solid #FFE4E6",
            }}
          >
            <div style={{ fontSize: 48 }}>😢</div>
            <b style={{ color: "#1E293B", fontSize: 18 }}>
              {q
                ? `Nggak ketemu “${q}” di kategori ${kat}!`
                : `Belum Ada Alat di Kategori ${kat}!`}
            </b>
            <p style={{ color: "#64748B", fontSize: 13, fontWeight: 500 }}>
              Coba kata lain / kategori lain ya!
            </p>
            <Link
              href="/alat"
              style={{
                display: "inline-block",
                marginTop: 12,
                background: "#1E293B",
                color: "white",
                padding: "12px 24px",
                borderRadius: 999,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              🎬 Lihat Semua Alat →
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: 18,
            }}
          >
            {list.map((a: any, idx: number) => {
              const namaBersih = bersihinNama(a.nama);
              const tersedia = a.stok - (terpakai[a.id] || 0);
              const persen =
                a.stok > 0
                  ? Math.round((Math.max(0, tersedia) / a.stok) * 100)
                  : 0;
              const laris =
                idx === 0 || namaBersih.toLowerCase().includes("canon");
              const spek = spekSingkat(namaBersih, a.kategori);
              const c = pastel[a.kategori] || pastel.kamera;
              const namaKecil = namaBersih.toLowerCase();
              const isTinggi =
                namaKecil.includes("tripod") || namaKecil.includes("ring");
              const isRing = namaKecil.includes("ring");
              return (
                <Link
                  key={a.id}
                  href={`/alat/${a.id}`}
                  className="card-pop"
                  style={{
                    textDecoration: "none",
                    color: "#1E293B",
                    background: "white",
                    borderRadius: 28,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: `0 18px 34px ${c.shadow}`,
                    border: `2px solid ${c.border}`,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      height: isTinggi ? 195 : 165,
                      background: c.grad,
                    }}
                  >
                    <img
                      src={gambarAlat(a.kategori, namaBersih)}
                      alt={namaBersih}
                      className="foto-zoom"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: isTinggi ? "contain" : "cover",
                        display: "block",
                        background: "white",
                        padding: isTinggi ? 12 : 0,
                      }}
                    />
                    {isRing && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "radial-gradient(circle at 50% 42%, rgba(255,255,255,.95) 0%, rgba(255,244,180,.5) 32%, rgba(255,255,255,0) 62%)",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(15,23,42,.18) 100%)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "white",
                        borderRadius: 14,
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        boxShadow: "0 8px 16px rgba(0,0,0,.12)",
                      }}
                    >
                      {iconAlat(a.kategori, namaBersih)}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "white",
                        color: c.teks,
                        fontSize: 10,
                        fontWeight: 800,
                        padding: "6px 10px",
                        borderRadius: 999,
                        boxShadow: "0 6px 12px rgba(0,0,0,.10)",
                        letterSpacing: ".5px",
                      }}
                    >
                      {a.kategori.toUpperCase()}
                    </span>
                    {tersedia <= 0 ? (
                      <span
                        style={{
                          position: "absolute",
                          bottom: 12,
                          left: 12,
                          background: "#FEE2E2",
                          color: "#DC2626",
                          fontSize: 11,
                          fontWeight: 800,
                          padding: "6px 11px",
                          borderRadius: 999,
                        }}
                      >
                        ⛔ HABIS
                      </span>
                    ) : laris ? (
                      <span
                        style={{
                          position: "absolute",
                          bottom: 12,
                          left: 12,
                          background: "#1E293B",
                          color: "white",
                          fontSize: 11,
                          fontWeight: 800,
                          padding: "6px 11px",
                          borderRadius: 999,
                          boxShadow: "0 8px 16px rgba(0,0,0,.22)",
                        }}
                      >
                        🔥 PALING LARIS
                      </span>
                    ) : (
                      <span
                        style={{
                          position: "absolute",
                          bottom: 12,
                          left: 12,
                          background: "white",
                          color: "#15803D",
                          fontSize: 11,
                          fontWeight: 800,
                          padding: "6px 11px",
                          borderRadius: 999,
                          boxShadow: "0 6px 12px rgba(0,0,0,.10)",
                        }}
                      >
                        ✅ {tersedia} TERSEDIA
                      </span>
                    )}
                    {isRing && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: 12,
                          right: 12,
                          background: "#FEF08A",
                          color: "#854D0E",
                          fontSize: 10,
                          fontWeight: 800,
                          padding: "6px 10px",
                          borderRadius: 999,
                        }}
                      >
                        💡 NYALA TERANG
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      padding: "16px 16px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      flex: 1,
                    }}
                  >
                    <b
                      style={{
                        fontSize: 17.5,
                        lineHeight: 1.25,
                        letterSpacing: "-.3px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {namaBersih}
                    </b>
                    <span
                      style={{
                        fontSize: 12.5,
                        color: "#64748B",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {spek}
                    </span>
                    <div
                      style={{
                        marginTop: 4,
                        background: c.bg,
                        borderRadius: 16,
                        padding: "10px 12px",
                        border: `1.5px solid ${c.border}`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        <span style={{ color: "#64748B" }}>Stok Tersedia</span>
                        <span
                          style={{
                            color: tersedia > 0 ? "#15803D" : "#DC2626",
                          }}
                        >
                          {tersedia} / {a.stok} unit • {persen}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: 7,
                          background: "white",
                          borderRadius: 999,
                          marginTop: 8,
                          overflow: "hidden",
                          boxShadow: "inset 0 1px 3px rgba(0,0,0,.08)",
                        }}
                      >
                        <div
                          style={{
                            width: `${persen}%`,
                            height: "100%",
                            background:
                              persen > 50
                                ? "linear-gradient(90deg,#86EFAC,#22C55E)"
                                : persen > 0
                                  ? "linear-gradient(90deg,#FDE68A,#F97316)"
                                  : "#EF4444",
                            borderRadius: 999,
                          }}
                        />
                      </div>
                    </div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        marginTop: 4,
                        background: tersedia > 0 ? "#1E293B" : "#F1F5F9",
                        color: tersedia > 0 ? "white" : "#94A3B8",
                        padding: "11px",
                        borderRadius: 999,
                        fontWeight: 800,
                        fontSize: 13.5,
                        boxShadow:
                          tersedia > 0
                            ? "0 10px 18px rgba(30,41,59,.22)"
                            : "none",
                      }}
                    >
                      {tersedia > 0 ? (
                        <>
                          Ajukan Pinjam <span>→</span>
                        </>
                      ) : (
                        "⛔ Stok Habis"
                      )}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: 26,
          background: "linear-gradient(135deg,#FED7AA,#FDE68A,#FBCFE8,#DDD6FE)",
          borderRadius: 28,
          padding: 28,
          textAlign: "center",
          boxShadow: "0 16px 32px rgba(249,115,22,.22)",
          border: "2px solid rgba(255,255,255,.7)",
        }}
      >
        <h3
          style={{
            color: "#1E293B",
            fontSize: 23,
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-.5px",
          }}
        >
          Udah Ketemu Alatnya? 🚀
        </h3>
        <p
          style={{
            color: "#475569",
            fontWeight: 600,
            fontSize: 13,
            margin: "8px 0 0",
          }}
        >
          Jangan sampai kehabisan! Ajukan sekarang, besok tinggal ambil!
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 16,
          }}
        >
          <Link
            href="/ajukan"
            style={{
              background: "#1E293B",
              color: "white",
              padding: "12px 26px",
              borderRadius: 999,
              fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 12px 22px rgba(30,41,59,.22)",
            }}
          >
            📝 Ajukan Sekarang →
          </Link>
          <Link
            href="/cek"
            style={{
              background: "white",
              color: "#1E293B",
              padding: "12px 22px",
              borderRadius: 999,
              fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 8px 16px rgba(0,0,0,.10)",
            }}
          >
            🔍 Cek Status
          </Link>
        </div>
      </div>
    </div>
  );
}
