// app/AlatCarousel.tsx - Carousel AlatDKV - GAYA EVENTKU TEMEN LO! JUARA 1 DUNIA!
// Persis kayak screenshot: pastel pelangi, kartu warna-warni, border navy,
// shadow 4px 4px 0! Colorful, anti-white, sangat modern, sangat memukau, sangat rapi!

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gambarAlat, iconAlat } from "@/lib/gambar";

export default function AlatCarousel({ list }: { list: any[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (list.length <= 1) return;
    const t = setInterval(() => {
      if (pause) return;
      const el = ref.current;
      if (!el) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        setIndex(0);
      } else {
        el.scrollBy({ left: 300, behavior: "smooth" });
        setIndex((i) => Math.min(i + 1, list.length - 1));
      }
    }, 2500);
    return () => clearInterval(t);
  }, [pause, list.length]);

  // Warna kartu gantian, kayak pill di navbar screenshot!
  const warnaKartu = [
    "#F9A8D4", // pink
    "#FDE68A", // kuning
    "#6EE7B7", // mint
    "#93C5FD", // biru
    "#C4B5FD", // ungu
    "#FCA5A5", // coral
  ];

  if (list.length === 0) {
    return (
      <div
        style={{
          background: "white",
          border: "2px solid #1A1443",
          borderRadius: 24,
          padding: 28,
          textAlign: "center",
          boxShadow: "6px 6px 0 #1A1443",
        }}
      >
        <div style={{ fontSize: 40 }}>😢</div>
        <b style={{ color: "#1A1443", fontSize: 18 }}>Belum Ada Alat!</b>
        <p style={{ color: "#64748B", fontSize: 13, fontWeight: 600 }}>
          Admin belum nambah alat. Coba lagi nanti ya!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER CAROUSEL! */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <span
            style={{
              background: "#CCFBF1",
              color: "#0F766E",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: 1.5,
              padding: "7px 14px",
              borderRadius: 999,
              border: "2px solid #99F6E4",
            }}
          >
            🎬 ALAT TERSEDIA
          </span>
          <h2
            style={{
              color: "#1A1443",
              fontSize: 28,
              fontWeight: 900,
              margin: "10px 0 0",
              lineHeight: 1.1,
            }}
          >
            Pilih Alat <span style={{ color: "#EC4899" }}>Favoritmu!</span> (
            {list.length})
          </h2>
          <p
            style={{
              color: "#64748B",
              margin: "6px 0 0",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Geser otomatis! Klik kartu-nya buat ajukan langsung!
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link
            href="/alat"
            style={{
              background: "white",
              border: "2px solid #1A1443",
              color: "#1A1443",
              padding: "10px 16px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
              fontSize: 13,
              boxShadow: "3px 3px 0 #1A1443",
            }}
          >
            Semua Alat →
          </Link>
          <button
            onClick={() =>
              ref.current?.scrollBy({ left: -300, behavior: "smooth" })
            }
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "white",
              color: "#1A1443",
              border: "2px solid #1A1443",
              cursor: "pointer",
              fontWeight: 900,
              fontSize: 18,
              boxShadow: "2px 2px 0 #1A1443",
            }}
          >
            ‹
          </button>
          <button
            onClick={() =>
              ref.current?.scrollBy({ left: 300, behavior: "smooth" })
            }
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "#FBBF24",
              color: "#1A1443",
              border: "2px solid #1A1443",
              cursor: "pointer",
              fontWeight: 900,
              fontSize: 18,
              boxShadow: "2px 2px 0 #1A1443",
            }}
          >
            ›
          </button>
        </div>
      </div>

      {/* LIST KARTU! */}
      <div
        ref={ref}
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
        style={{
          display: "flex",
          gap: 14,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          marginTop: 14,
          paddingBottom: 8,
          paddingTop: 6,
          paddingLeft: 4,
          scrollbarWidth: "none",
        }}
      >
        {list.map((a: any, i: number) => {
          const bg = warnaKartu[i % warnaKartu.length];
          return (
            <Link
              key={a.id}
              href={`/alat/${a.id}`}
              style={{
                minWidth: 280,
                maxWidth: 280,
                flexShrink: 0,
                scrollSnapAlign: "start",
                textDecoration: "none",
                color: "#1A1443",
                background: bg,
                border: "2px solid #1A1443",
                borderRadius: 24,
                overflow: "hidden",
                display: "block",
                boxShadow: "4px 4px 0 #1A1443",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={gambarAlat(a.kategori, a.nama)}
                  alt={a.nama}
                  style={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    display: "block",
                    borderBottom: "2px solid #1A1443",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(26,20,67,0.65))",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    padding: "12px 14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 26,
                      background: "white",
                      border: "2px solid #1A1443",
                      width: 46,
                      height: 46,
                      borderRadius: 13,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {iconAlat(a.kategori, a.nama)}
                  </span>
                  <span
                    style={{
                      background: "#1A1443",
                      color: "white",
                      fontSize: 11,
                      fontWeight: 900,
                      padding: "5px 10px",
                      borderRadius: 999,
                    }}
                  >
                    {a.kategori.toUpperCase()} • ✅ AKTIF
                  </span>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <b style={{ fontSize: 18, display: "block", lineHeight: 1.3 }}>
                  {a.nama}
                </b>
                <div
                  style={{
                    color: "#475569",
                    fontSize: 12,
                    fontWeight: 600,
                    marginTop: 6,
                    lineHeight: 1.6,
                  }}
                >
                  📦 Stok <b style={{ color: "#1A1443" }}>{a.stok} unit</b> •{" "}
                  {a.keterangan
                    ? a.keterangan.slice(0, 60) +
                      (a.keterangan.length > 60 ? "..." : "")
                    : "Alat Lab DKV, siap dipakai!"}
                </div>
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: 12,
                    background: "#1A1443",
                    color: "white",
                    padding: "11px",
                    borderRadius: 999,
                    fontWeight: 900,
                    fontSize: 13,
                  }}
                >
                  Ajukan Pinjam →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* DOT INDIKATOR + STATUS! */}
      <div
        style={{
          display: "flex",
          gap: 6,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 6,
        }}
      >
        {list.map((a: any, i: number) => (
          <button
            key={a.id}
            onClick={() => {
              ref.current?.scrollTo({ left: i * 294, behavior: "smooth" });
              setIndex(i);
            }}
            style={{
              width: index === i ? 28 : 10,
              height: 10,
              borderRadius: 999,
              background: index === i ? "#1A1443" : "#CBD5E1",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.2s",
            }}
            aria-label={`Ke alat ${i + 1}`}
          />
        ))}
      </div>
      <div
        style={{
          textAlign: "center",
          color: pause ? "#D97706" : "#64748B",
          fontSize: 12,
          fontWeight: 800,
          marginTop: 6,
        }}
      >
        {pause
          ? "⏸ Dijeda! Hover lepas biar jalan lagi!"
          : "▶ Geser Otomatis... Hover buat jeda!"}
      </div>

      {/* Sembunyiin scrollbar khusus carousel ini! */}
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
