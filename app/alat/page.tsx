// app/alat/page.tsx - KODE LENGKAP - Tata letak SAMA, warna disamain ke tema pastel + logo AlatDKV (oranye-hijau)

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

const ALAT = [
  {
    id: "canon-2000d",
    nama: "Kamera Canon EOS 2000D",
    kat: "kamera",
    label: "KAMERA",
    desc: "DSLR • 24.1 MP • Full HD",
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
    stok: 5,
    total: 5,
    tag: "🔥 PALING LARIS",
  },
  {
    id: "a6400",
    nama: "Kamera A6400",
    kat: "kamera",
    label: "KAMERA",
    desc: "Mirrorless • 4K • AF Cepat",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    stok: 3,
    total: 3,
    tag: "✅ 3 TERSEDIA",
  },
  {
    id: "led-panel",
    nama: "Lampu LED Panel 2x",
    kat: "pencahayaan",
    label: "PENCAHAYAAN",
    desc: "LED Panel • + Tripod",
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    stok: 8,
    total: 8,
    tag: "✅ 8 TERSEDIA",
  },
  {
    id: "ring-light",
    nama: "Ring Light 18 inch",
    kat: "pencahayaan",
    label: "PENCAHAYAAN",
    desc: "Siap Pakai • Lab DKV",
    img: "https://www.hypop.com.au/cdn/shop/products/19-portable-led-beauty-ring-light-sephora-6_b3965a02-9f2f-4693-ad2f-2b5718d19d15.jpg?v=1704494001&width=732",
    stok: 6,
    total: 6,
    tag: "✅ 6 TERSEDIA",
  },
  {
    id: "rode-go",
    nama: "Mikrofon Rode Wireless GO",
    kat: "audio",
    label: "AUDIO",
    desc: "Jernih • Plug & Play",
    img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80",
    stok: 4,
    total: 4,
    tag: "✅ 4 TERSEDIA",
  },
  {
    id: "boya-m1",
    nama: "Mikrofon Boya M1",
    kat: "audio",
    label: "AUDIO",
    desc: "Jernih • Plug & Play",
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    stok: 10,
    total: 10,
    tag: "✅ 10 TERSEDIA",
  },
  {
    id: "intuos-s",
    nama: "Tablet Intuos S",
    kat: "tablet",
    label: "TABLET",
    desc: "Gambar Digital • Pen",
    img: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&q=80",
    stok: 5,
    total: 5,
    tag: "✅ 5 TERSEDIA",
  },
  {
    id: "tripod",
    nama: "Tripod",
    kat: "aksesoris",
    label: "AKSESORIS",
    desc: "Siap Pakai • Lab DKV",
    img: "https://cdn.myportfolio.com/53cba559-1f77-45e0-b274-c3395a7efd13/9ff26c6a-05b7-4405-8848-580d1dabd739_rw_600.png?h=4a631ba2452c27546b95e044ab560a14",
    stok: 7,
    total: 7,
    tag: "✅ 7 TERSEDIA",
  },
];

function AlatContent() {
  const sp = useSearchParams();
  const kategoriUrl = sp.get("kategori") || "semua";
  const [kategori, setKategori] = useState(kategoriUrl);
  const [cari, setCari] = useState("");

  const list = useMemo(() => {
    return ALAT.filter((a) => {
      const okKat = kategori === "semua" || a.kat === kategori;
      const okCari = a.nama.toLowerCase().includes(cari.toLowerCase());
      return okKat && okCari;
    });
  }, [kategori, cari]);

  const kategoriList = [
    { id: "semua", label: "Semua Alat", jml: 8, emoji: "🎬" },
    { id: "kamera", label: "Kamera", jml: 2, emoji: "📷" },
    { id: "pencahayaan", label: "Pencahayaan", jml: 2, emoji: "💡" },
    { id: "audio", label: "Audio", jml: 2, emoji: "🎙" },
    { id: "tablet", label: "Tablet", jml: 1, emoji: "✏" },
    { id: "aksesoris", label: "Aksesoris", jml: 1, emoji: "🎒" },
  ];

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "8px 16px 24px" }}>
      {/* ===== HERO - TATA LETAK SAMA, WARNA DISAMAIN KE TEMA ===== */}
      <div
        style={{
          display: "flex",
          gap: 28,
          alignItems: "center",
          flexWrap: "wrap",
          padding: "14px 4px 20px",
        }}
      >
        <div style={{ flex: 1, minWidth: 280 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "white",
              color: "#374151",
              padding: "6px 12px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: ".4px",
              border: "1px solid rgba(255,255,255,.9)",
              boxShadow: "0 4px 12px rgba(0,0,0,.06)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#059669",
              }}
            />
            LAB DKV • STOK REALTIME
          </div>
          {/* Judul: nggak hitam pekat lagi, abu gelap lembut + gradasi oranye-hijau kayak logo */}
          <h1
            style={{
              margin: "14px 0 8px",
              fontSize: 52,
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: "-2px",
              color: "#1F2937",
            }}
          >
            Pinjam Alat,
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #F97316, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Bikin Karya
            </span>
            <br />
            Lebih Gampang.
          </h1>
          <p
            style={{
              margin: 0,
              color: "#4B5563",
              fontSize: 14,
              lineHeight: 1.6,
              maxWidth: 420,
            }}
          >
            8 alat aktif, 48 unit siap pakai. Pilih alatnya, ajukan, tunggu ACC
            — beres, nggak ribet.
          </p>
          {/* Search: border lembut, tombol oranye kayak logo */}
          <div
            style={{
              marginTop: 16,
              background: "white",
              borderRadius: 999,
              padding: "5px 5px 5px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #E5E7EB",
              boxShadow: "0 8px 20px rgba(0,0,0,.07)",
              maxWidth: 460,
            }}
          >
            <span>🔍</span>
            <input
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari kamera, mic, lampu..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 13,
                background: "transparent",
                color: "#1F2937",
              }}
            />
            <button
              style={{
                background: "#F97316",
                color: "white",
                border: "none",
                padding: "9px 16px",
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 12,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(249,115,22,.35)",
              }}
            >
              Cari →
            </button>
          </div>
          <div
            style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}
          >
            <Link
              href="/ajukan"
              style={{
                background: "#F97316",
                color: "white",
                padding: "10px 18px",
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 13,
                textDecoration: "none",
                boxShadow: "0 6px 14px rgba(249,115,22,.30)",
              }}
            >
              📝 Ajukan Sekarang →
            </Link>
            <Link
              href="/cek"
              style={{
                background: "white",
                color: "#1F2937",
                padding: "10px 18px",
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 13,
                textDecoration: "none",
                border: "1px solid #E5E7EB",
              }}
            >
              🔍 Cek Status
            </Link>
          </div>
          {/* Stats: angka abu gelap lembut, bukan hitam pekat */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 18,
              flexWrap: "wrap",
            }}
          >
            {[
              { a: "8", b: "Alat" },
              { a: "48", b: "Unit" },
              { a: "48", b: "Tersedia" },
              { a: "0", b: "Habis" },
            ].map((s) => (
              <div
                key={s.b}
                style={{ display: "flex", gap: 6, alignItems: "baseline" }}
              >
                <span
                  style={{ fontSize: 20, fontWeight: 900, color: "#1F2937" }}
                >
                  {s.a}
                </span>
                <span
                  style={{ fontSize: 12, color: "#6B7280", fontWeight: 700 }}
                >
                  {s.b}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Kanan hero: border lembut, badge oranye-hijau */}
        <div
          style={{
            width: 420,
            maxWidth: "100%",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              borderRadius: 22,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.9)",
              boxShadow: "0 16px 30px rgba(0,0,0,.12)",
              transform: "rotate(1.5deg)",
              background: "white",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80"
              alt="Kamera"
              style={{
                width: "100%",
                height: 280,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: -14,
              bottom: 22,
              background: "white",
              borderRadius: 14,
              padding: "9px 12px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 8px 20px rgba(0,0,0,.10)",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 18 }}>✅</span>
            <div>
              <div style={{ fontWeight: 900, fontSize: 12, color: "#1F2937" }}>
                48 / 48 tersedia
              </div>
              <div style={{ fontSize: 11, color: "#6B7280" }}>
                Stok hari ini • LIVE
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: -8,
              top: -12,
              background: "#1F2937",
              color: "white",
              borderRadius: 999,
              padding: "7px 12px",
              fontSize: 11,
              fontWeight: 800,
              boxShadow: "0 8px 16px rgba(0,0,0,.15)",
            }}
          >
            🔥 PALING LARIS • Canon 2000D
          </div>
        </div>
      </div>

      {/* ===== LAYOUT: kiri sidebar, kanan grid - SAMA ===== */}
      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* SIDEBAR: yang aktif oranye lembut, bukan hitam pekat */}
        <aside
          style={{
            width: 230,
            flexShrink: 0,
            background: "white",
            borderRadius: 18,
            border: "1px solid #E5E7EB",
            padding: "14px",
            position: "sticky",
            top: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,.05)",
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 14, color: "#1F2937" }}>
            Kategori 🎯
          </div>
          <p
            style={{
              margin: "4px 0 12px",
              fontSize: 11,
              color: "#6B7280",
              lineHeight: 1.4,
            }}
          >
            URL berubah jadi{" "}
            <b style={{ color: "#F97316" }}>/alat?kategori=kamera</b>
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {kategoriList.map((k) => {
              const aktif = kategori === k.id;
              return (
                <button
                  key={k.id}
                  onClick={() => setKategori(k.id)}
                  style={{
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: aktif ? "#FFF7ED" : "#F9FAFB",
                    color: aktif ? "#9A3412" : "#1F2937",
                    border: aktif ? "1.5px solid #F97316" : "1px solid #E5E7EB",
                    padding: "10px 12px",
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  <span>
                    {k.emoji} {k.label}
                  </span>
                  <span
                    style={{
                      background: aktif ? "#F97316" : "#E5E7EB",
                      color: aktif ? "white" : "#374151",
                      fontSize: 11,
                      fontWeight: 900,
                      padding: "3px 8px",
                      borderRadius: 999,
                    }}
                  >
                    {k.jml}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            style={{
              marginTop: 14,
              background: "#ECFDF5",
              border: "1px solid #A7F3D0",
              borderRadius: 12,
              padding: "11px 12px",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 12, color: "#065F46" }}>
              💡 Tips cepat
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#047857",
                lineHeight: 1.5,
                marginTop: 4,
              }}
            >
              Kamera lagi rame dipinjam. Ajukan H-1 biar kebagian!
            </div>
          </div>
        </aside>

        {/* KANAN: grid alat */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 19,
                fontWeight: 900,
                color: "#1F2937",
              }}
            >
              Semua Alat{" "}
              <span style={{ color: "#9CA3AF", fontWeight: 800 }}>
                ({list.length})
              </span>
            </h2>
            <span style={{ fontSize: 12, color: "#6B7280" }}>
              {cari ? `Hasil untuk “${cari}”` : "Urut: paling laris dulu"}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 16,
            }}
          >
            {list.map((a, i) => {
              const isTinggi = a.id === "ring-light" || a.id === "tripod";
              return (
                <article
                  key={a.id}
                  className="alat-card"
                  style={{
                    background: "white",
                    borderRadius: 20,
                    overflow: "hidden",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 8px 22px rgba(0,0,0,.07)",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform .2s, box-shadow .2s",
                    marginTop: i % 2 === 1 ? 14 : 0,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      background: "white",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    <img
                      src={a.img}
                      alt={a.nama}
                      style={{
                        width: "100%",
                        height: isTinggi ? 230 : 172,
                        objectFit: isTinggi ? "contain" : "cover",
                        background: "white",
                        display: "block",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: "white",
                        color: "#9A3412",
                        fontSize: 10,
                        fontWeight: 900,
                        padding: "4px 8px",
                        borderRadius: 999,
                        border: "1px solid #FED7AA",
                      }}
                    >
                      {a.label}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        left: 10,
                        bottom: 10,
                        background: a.tag.includes("LARIS")
                          ? "#F97316"
                          : "white",
                        color: a.tag.includes("LARIS") ? "white" : "#047857",
                        fontSize: 10,
                        fontWeight: 900,
                        padding: "5px 9px",
                        borderRadius: 999,
                        border: "1px solid #FED7AA",
                      }}
                    >
                      {a.tag}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "12px 14px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      flex: 1,
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 16,
                          fontWeight: 900,
                          color: "#1F2937",
                          lineHeight: 1.2,
                        }}
                      >
                        {a.nama}
                      </h3>
                      <p
                        style={{
                          margin: "4px 0 0",
                          fontSize: 12,
                          color: "#6B7280",
                        }}
                      >
                        {a.desc}
                      </p>
                    </div>
                    <div
                      style={{
                        background: "#FFFBEB",
                        border: "1px solid #FEF3C7",
                        borderRadius: 10,
                        padding: "8px 10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#4B5563",
                        }}
                      >
                        <span>Stok Tersedia</span>
                        <span style={{ color: "#059669" }}>
                          {a.stok} / {a.total} unit • 100%
                        </span>
                      </div>
                      <div
                        style={{
                          height: 6,
                          background: "#E5E7EB",
                          borderRadius: 999,
                          marginTop: 6,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "#10B981",
                            borderRadius: 999,
                          }}
                        />
                      </div>
                    </div>
                    <Link
                      href={`/ajukan?alat=${a.id}`}
                      style={{
                        marginTop: "auto",
                        background: "#F97316",
                        color: "white",
                        textAlign: "center",
                        padding: "10px",
                        borderRadius: 999,
                        fontWeight: 800,
                        fontSize: 13,
                        textDecoration: "none",
                        boxShadow: "0 4px 12px rgba(249,115,22,.25)",
                      }}
                    >
                      Ajukan Pinjam →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {list.length === 0 && (
            <div
              style={{
                background: "white",
                borderRadius: 16,
                padding: 20,
                textAlign: "center",
                marginTop: 4,
                border: "1px solid #E5E7EB",
              }}
            >
              <p style={{ margin: 0, fontWeight: 800, color: "#1F2937" }}>
                Nggak ketemu, coba kata kunci lain.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`@media (max-width: 860px){ aside{ width: 100% !important; position: static !important; } aside div[style*="flex-direction: column"]{ flex-direction: row !important; flex-wrap: wrap; } } @media (max-width: 560px){ div[style*="grid-template-columns: repeat(2"]{ grid-template-columns: 1fr !important; } } .alat-card:hover{ transform: translateY(-4px) !important; box-shadow: 0 14px 28px rgba(0,0,0,.10) !important; }`}</style>
    </div>
  );
}

export default function AlatPage() {
  return (
    <Suspense>
      <AlatContent />
    </Suspense>
  );
}
