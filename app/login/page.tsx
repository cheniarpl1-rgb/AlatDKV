// app/login/page.tsx - Login Admin AlatDKV - Tema Feminim Pastel
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
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span
          style={{
            background: "#FFB6C1",
            color: "#4A3B5C",
            fontSize: 11,
            fontWeight: 900,
            padding: "6px 12px",
            borderRadius: 999,
          }}
        >
          🌸 KHUSUS ADMIN • LAB DKV
        </span>
        <h1
          style={{
            color: "#4A3B5C",
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
              background: "linear-gradient(90deg,#DB7093,#9370DB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Penjaga Lab DKV! ✨
          </span>
        </h1>
        <p style={{ color: "#705888", fontSize: 13, margin: "8px 0 0" }}>
          Masukkan kata sandi admin untuk mengelola alat & peminjaman.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 0,
          borderRadius: 28,
          overflow: "hidden",
          border: "1px solid rgba(221,160,221,0.4)",
          boxShadow: "0 20px 40px rgba(221,160,221,0.2)",
          background: "#FFFFFF",
        }}
      >
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
              filter: "brightness(0.9)",
            }}
          />
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "linear-gradient(135deg,#FFB6C1,#DDA0DD)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                boxShadow: "0 8px 20px rgba(255,182,193,0.4)",
              }}
            >
              🔐
            </span>
            <div>
              <b style={{ color: "#4A3B5C", fontSize: 18, display: "block" }}>
                Login Admin
              </b>
              <span style={{ color: "#705888", fontSize: 12 }}>
                AlatDKV • Pastel Edition
              </span>
            </div>
          </div>

          {adaError && (
            <div
              style={{
                marginTop: 16,
                background: "#FADBD8",
                border: "1px solid #F5B7B1",
                color: "#78281F",
                padding: "12px 14px",
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              ❌ Kata sandi salah! Coba lagi ya.
            </div>
          )}

          <form
            action={loginAdmin}
            style={{ display: "grid", gap: 14, marginTop: 18 }}
          >
            <label style={{ color: "#4A3B5C", fontWeight: 800, fontSize: 13 }}>
              Kata Sandi Admin *
              <div style={{ position: "relative", marginTop: 6 }}>
                <input
                  name="password"
                  type="password"
                  id="password-admin"
                  placeholder="Masukkan kata sandi..."
                  required
                  style={{
                    width: "100%",
                    padding: "14px 48px 14px 14px",
                    borderRadius: 14,
                    background: "#FFF5F7",
                    color: "#4A3B5C",
                    border: "1px solid rgba(221,160,221,0.6)",
                    fontSize: 14,
                  }}
                />
                <TombolMata />
              </div>
            </label>

            <button
              style={{
                background: "linear-gradient(90deg,#FFB6C1,#DDA0DD)",
                color: "#4A3B5C",
                padding: 14,
                borderRadius: 999,
                fontWeight: 900,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                boxShadow: "0 8px 20px rgba(255,182,193,0.4)",
              }}
            >
              Masuk ke Admin →
            </button>
          </form>

          <div style={{ marginTop: 14 }}>
            <Link
              href="/"
              style={{
                display: "block",
                textAlign: "center",
                background: "#FFF5F7",
                border: "1px solid rgba(221,160,221,0.5)",
                color: "#5B4B6E",
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
