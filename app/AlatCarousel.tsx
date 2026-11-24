// app/AlatCarousel.tsx
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
  return (
    <div>
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
              background: "linear-gradient(90deg,#22D3EE,#10B981)",
              color: "white",
              fontSize: 11,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 999,
            }}
          >
            🎬 ALAT TERSEDIA
          </span>
          <h2
            style={{
              color: "white",
              fontSize: 28,
              fontWeight: 900,
              margin: "10px 0 0",
            }}
          >
            Pilih Alat Favoritmu! ({list.length})
          </h2>
          <p style={{ color: "#C4B5FD", margin: "6px 0 0", fontSize: 13 }}>
            Geser otomatis! Klik kartu-nya buat ajukan langsung!
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link
            href="/alat"
            style={{
              background: "#1E103A",
              border: "1px solid #7C3AED",
              color: "white",
              padding: "10px 16px",
              borderRadius: 999,
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 13,
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
              background: "rgba(0,0,0,0.35)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontWeight: 900,
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
              background: "linear-gradient(90deg,#F59E0B,#EC4899)",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: 900,
            }}
          >
            ›
          </button>
        </div>
      </div>
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
          scrollbarWidth: "none",
        }}
      >
        {list.map((a: any) => (
          <Link
            key={a.id}
            href={`/alat/${a.id}`}
            style={{
              minWidth: 280,
              maxWidth: 280,
              flexShrink: 0,
              scrollSnapAlign: "start",
              textDecoration: "none",
              color: "white",
              background: "linear-gradient(180deg,#2E1065,#1E103A)",
              border: "1px solid #4C1D95",
              borderRadius: 24,
              overflow: "hidden",
              display: "block",
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
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(18,8,38,0.85))",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  padding: "12px 14px",
                }}
              >
                <span
                  style={{
                    fontSize: 26,
                    background: "rgba(0,0,0,0.45)",
                    border: "1px solid rgba(255,255,255,0.4)",
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
                    background: "linear-gradient(135deg,#F472B6,#A855F7)",
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
              <b style={{ fontSize: 18, display: "block" }}>{a.nama}</b>
              <div style={{ color: "#C4B5FD", fontSize: 12, marginTop: 6 }}>
                📦 Stok <b style={{ color: "white" }}>{a.stok} unit</b> •{" "}
                {a.keterangan}
              </div>
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: 12,
                  background: "linear-gradient(90deg,#F59E0B,#EC4899)",
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
        ))}
      </div>
      <div
        style={{
          textAlign: "center",
          color: pause ? "#FBBF24" : "#A78BFA",
          fontSize: 12,
          fontWeight: 800,
        }}
      >
        {pause ? "⏸ Dijeda!" : "▶ Geser Otomatis..."}
      </div>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}
