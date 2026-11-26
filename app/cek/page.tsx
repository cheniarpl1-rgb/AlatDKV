// app/cek/page.tsx - Cek Status - Tema Beranda, Hero LAVENDER!

"use client";
import { useState } from "react";
import Link from "next/link";

export default function Cek() {
  const [nama, setNama] = useState("");
  const [cari, setCari] = useState(false);
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px 60px" }}>
      <div
        style={{
          background:
            "linear-gradient(135deg,#FFFBF0 0%,#DDD6FE 55%,#FEF9C3 100%)",
          border: "2.5px solid #292524",
          borderRadius: 28,
          padding: 26,
          boxShadow: "6px 6px 0 #292524",
          textAlign: "center",
        }}
      >
        <span
          style={{
            background: "white",
            border: "2px solid #292524",
            padding: "7px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 900,
            color: "#7C3AED",
            boxShadow: "3px 3px 0 #292524",
          }}
        >
          🔍 CEK STATUS • REALTIME!
        </span>
        <h1
          style={{
            fontSize: "clamp(30px,5vw,44px)",
            fontWeight: 900,
            margin: "12px 0 8px",
            color: "#292524",
          }}
        >
          Cek Status{" "}
          <span
            style={{
              background: "#DDD6FE",
              padding: "0 12px",
              borderRadius: 12,
              border: "2.5px solid #292524",
              boxShadow: "3px 3px 0 #292524",
              display: "inline-block",
              transform: "rotate(-1deg)",
            }}
          >
            Pinjamanmu
          </span>
        </h1>
        <p
          style={{ color: "#78716C", fontWeight: 600, fontSize: 14, margin: 0 }}
        >
          Masukin nama kamu, langsung keliatan udah di-ACC / belum!
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCari(true);
        }}
        style={{
          background: "white",
          border: "2.5px solid #292524",
          borderRadius: 999,
          padding: 6,
          display: "flex",
          gap: 6,
          marginTop: 16,
          boxShadow: "5px 5px 0 #292524",
        }}
      >
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          placeholder="Ketik nama kamu..."
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
            background: "#292524",
            color: "white",
            padding: "12px 22px",
            borderRadius: 999,
            fontWeight: 900,
            border: "none",
            cursor: "pointer",
          }}
        >
          Cek →
        </button>
      </form>
      {cari && (
        <div
          style={{
            background: "white",
            border: "2.5px solid #292524",
            borderRadius: 24,
            padding: 20,
            marginTop: 16,
            boxShadow: "5px 5px 0 #292524",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <b style={{ fontSize: 16 }}>Kamera Canon EOS 2000D</b>
            <span
              style={{
                background: "#FDE68A",
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 900,
                border: "1.5px solid #292524",
              }}
            >
              ⏳ MENUNGGU
            </span>
          </div>
          <p
            style={{
              color: "#78716C",
              fontSize: 13,
              fontWeight: 600,
              margin: "8px 0 0",
            }}
          >
            Pengaju: {nama} • Tanggal pinjam: besok • Jumlah: 1 unit
          </p>
          <p style={{ fontSize: 12, color: "#78716C", margin: "8px 0 0" }}>
            Ini contoh tampilan. Sambungin ke Supabase biar data beneran muncul
            dari database.
          </p>
        </div>
      )}
      {!cari && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link
            href="/alat"
            style={{ color: "#292524", fontWeight: 800, fontSize: 13 }}
          >
            Belum ajukan? Lihat alat dulu →
          </Link>
        </div>
      )}
    </div>
  );
}
