// app/login/page.tsx - Login Admin AlatDKV - JUARA 1 DUNIA! FIX Runtime Error!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!
// FIX: onClick TIDAK BOLEH di Server Component! Tombol 👁 dipindah ke TombolMata.tsx (Client Component)!
// SESUAI SOAL E2: Login admin, sandi salah tampil pesan galat, yang sudah masuk dialihkan ke /admin!

import { loginAdmin } from "./actions";
import TombolMata from "./TombolMata";
import Link from "next/link";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const p = await searchParams;
  const adaError = p.error === "1";

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 20 }}>
      {/* ============ JUDUL ATAS! ============ */}
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span
          style={{
            background: "white",
            color: "#6D28D9",
            fontSize: 11,
            fontWeight: 900,
            padding: "6px 12px",
            borderRadius: 999,
          }}
        >
          🛡 KHUSUS ADMIN • BUKAN UNTUK PENGUNJUNG
        </span>
        <h1
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: 900,
            margin: "12px 0 0",
            lineHeight: 1.1,
          }}
        >
          Selamat Datang,
          <br />
          <span
            style={{
              background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Penjaga Lab DKV! 🛠
          </span>
        </h1>
        <p style={{ color: "#C4B5FD", fontSize: 13, margin: "8px 0 0" }}>
          Masukkan kata sandi admin untuk mengelola alat & peminjaman!
        </p>
      </div>

      {/* ============ KOTAK SPLIT 2 KOLOM! ============ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 0,
          borderRadius: 28,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 20px 60px rgba(109,40,217,0.4)",
          background: "#1E103A",
        }}
      >
        {/* KIRI: FOTO + KATA-KATA! */}
        <div style={{ position: "relative", minHeight: 320 }}>
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop"
            alt="Lab DKV"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              position: "absolute",
              inset: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(18,8,38,0.2), rgba(18,8,38,0.92))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 22,
            }}
          >
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span
                style={{
                  background: "white",
                  color: "#6D28D9",
                  fontSize: 11,
                  fontWeight: 900,
                  padding: "5px 10px",
                  borderRadius: 999,
                }}
              >
                🎬 ALATDKV
              </span>
              <span
                style={{
                  background: "rgba(0,0,0,0.4)",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 900,
                  padding: "5px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              >
                🛡 AREA ADMIN
              </span>
            </div>
            <b
              style={{
                color: "white",
                fontSize: 20,
                marginTop: 12,
                lineHeight: 1.3,
              }}
            >
              Satu Login,
              <br />
              Semua Lab Terkendali!
            </b>
            <p
              style={{
                color: "#DDD6FE",
                fontSize: 13,
                lineHeight: 1.6,
                margin: "8px 0 0",
              }}
            >
              Setujui peminjaman, tolak yang stoknya habis, catat kondisi
              kembali, kelola stok alat — semua dari sini!
            </p>
          </div>
        </div>

        {/* KANAN: FORM LOGIN! */}
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "linear-gradient(135deg,#F59E0B,#EC4899,#8B5CF6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                boxShadow: "0 8px 24px rgba(236,72,153,0.5)",
              }}
            >
              🔐
            </span>
            <div>
              <b style={{ color: "white", fontSize: 18, display: "block" }}>
                Login Admin
              </b>
              <span style={{ color: "#C4B5FD", fontSize: 12 }}>
                AlatDKV • Lab DKV
              </span>
            </div>
          </div>

          {adaError && (
            <div
              style={{
                marginTop: 16,
                background: "#7F1D1D",
                border: "1px solid #EF4444",
                color: "white",
                padding: "12px 14px",
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 18 }}>❌</span>
              <span>
                Kata sandi salah! Coba lagi ya!
                <span
                  style={{
                    display: "block",
                    fontWeight: 400,
                    fontSize: 12,
                    opacity: 0.85,
                    marginTop: 2,
                  }}
                >
                  Pastikan huruf besar / kecil-nya benar.
                </span>
              </span>
            </div>
          )}

          <form
            action={loginAdmin}
            style={{ display: "grid", gap: 14, marginTop: 18 }}
          >
            <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
              Kata Sandi Admin *
              <div style={{ position: "relative", marginTop: 6 }}>
                <input
                  name="password"
                  type="password"
                  id="password-admin"
                  placeholder="Masukkan kata sandi admin..."
                  required
                  style={{
                    width: "100%",
                    padding: "14px 48px 14px 14px",
                    borderRadius: 14,
                    background: "#120826",
                    color: "white",
                    border: "1px solid #4C1D95",
                    fontSize: 14,
                  }}
                />
                <TombolMata />
              </div>
            </label>

            <button
              style={{
                background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                color: "white",
                padding: 14,
                borderRadius: 999,
                fontWeight: 900,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                boxShadow: "0 10px 30px rgba(236,72,153,0.4)",
              }}
            >
              Masuk ke Admin →
            </button>
          </form>

          <div
            style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}
          >
            <Link
              href="/"
              style={{
                flex: 1,
                textAlign: "center",
                background: "#120826",
                border: "1px solid #4C1D95",
                color: "white",
                padding: "11px",
                borderRadius: 999,
                fontWeight: 800,
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              ← Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
