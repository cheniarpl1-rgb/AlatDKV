// app/login/page.tsx - Login Admin AlatDKV - GAYA EVENTKU TEMEN LO! JUARA 1 DUNIA!
// Persis kayak screenshot: pastel pelangi, judul warna-warni outline navy,
// kotak putih border navy! Colorful, anti-white, sangat modern, sangat memukau, sangat rapi!
// FIX: onClick TIDAK BOLEH di Server Component! Tombol 👁 dipindah ke TombolMata.tsx!
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
      {/* ============ JUDUL ATAS! ALA SCREENSHOT! ============ */}
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span
          style={{
            display: "inline-block",
            background: "#CCFBF1",
            color: "#0F766E",
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: 1.5,
            padding: "9px 18px",
            borderRadius: 999,
            border: "2px solid #99F6E4",
          }}
        >
          🛡 KHUSUS ADMIN • BUKAN UNTUK PENGUNJUNG
        </span>
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 52px)",
            fontWeight: 900,
            margin: "14px 0 0",
            lineHeight: 1.05,
          }}
        >
          <span style={{ color: "#1A1443" }}>Selamat Datang,</span>
          <br />
          <span
            style={{
              color: "#5EEAD4",
              WebkitTextStroke: "2px #1A1443",
              textShadow: "3px 3px 0 #1A1443",
            }}
          >
            Penjaga
          </span>{" "}
          <span
            style={{
              color: "#F9A8D4",
              WebkitTextStroke: "2px #1A1443",
              textShadow: "3px 3px 0 #1A1443",
            }}
          >
            Lab DKV! 🛠
          </span>
        </h1>
        <p
          style={{
            color: "#475569",
            fontSize: 14,
            fontWeight: 600,
            margin: "12px 0 0",
          }}
        >
          Masukkan kata sandi admin untuk mengelola alat & peminjaman!
        </p>
      </div>

      {/* ============ KOTAK SPLIT 2 KOLOM! JADI PUTIH! ============ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 0,
          borderRadius: 28,
          overflow: "hidden",
          border: "2px solid #1A1443",
          boxShadow: "6px 6px 0 #1A1443",
          background: "white",
        }}
      >
        {/* KIRI: FOTO + KATA-KATA! */}
        <div style={{ position: "relative", minHeight: 340 }}>
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
                "linear-gradient(180deg, rgba(26,20,67,0.1), rgba(26,20,67,0.92))",
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
                  color: "#1A1443",
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
                  background: "#FDE68A",
                  color: "#1A1443",
                  fontSize: 11,
                  fontWeight: 900,
                  padding: "5px 10px",
                  borderRadius: 999,
                }}
              >
                🛡 AREA ADMIN
              </span>
            </div>
            <b
              style={{
                color: "white",
                fontSize: 22,
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
                color: "#E2E8F0",
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.6,
                margin: "8px 0 0",
              }}
            >
              Setujui peminjaman, tolak yang stoknya habis, catat kondisi
              kembali, kelola stok alat — semua dari sini!
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginTop: 14,
              }}
            >
              {[
                ["✅", "Setujui / Tolak"],
                ["📦", "Kembalikan + Kondisi"],
                ["🛠", "Kelola Stok Alat"],
                ["⚠", "Lihat Terlambat"],
              ].map(([icon, teks]) => (
                <div
                  key={teks}
                  style={{
                    background: "white",
                    border: "2px solid #1A1443",
                    borderRadius: 12,
                    padding: "10px 12px",
                    color: "#1A1443",
                    fontSize: 12,
                    fontWeight: 900,
                  }}
                >
                  {icon} {teks}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KANAN: FORM LOGIN! JADI PUTIH! */}
        <div style={{ padding: 24, background: "white" }}>
          {/* Logo kecil di atas form! */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "#FDE68A",
                border: "2px solid #1A1443",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                boxShadow: "3px 3px 0 #1A1443",
              }}
            >
              🔐
            </span>
            <div>
              <b style={{ color: "#1A1443", fontSize: 18, display: "block" }}>
                Login Admin
              </b>
              <span style={{ color: "#64748B", fontSize: 12, fontWeight: 700 }}>
                AlatDKV • Lab DKV
              </span>
            </div>
            <span
              style={{
                marginLeft: "auto",
                background: "#D1FAE5",
                color: "#065F46",
                fontSize: 11,
                fontWeight: 900,
                padding: "5px 10px",
                borderRadius: 999,
                border: "1px solid #6EE7B7",
              }}
            >
              🔒 AMAN
            </span>
          </div>

          {/* PESAN GALAT KALAU SANDI SALAH! JADI PINK PASTEL! */}
          {adaError && (
            <div
              style={{
                marginTop: 16,
                background: "#FFE4E6",
                border: "2px solid #FB7185",
                color: "#881337",
                padding: "12px 14px",
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 800,
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
                    fontWeight: 600,
                    fontSize: 12,
                    opacity: 0.85,
                    marginTop: 2,
                  }}
                >
                  Pastikan huruf besar / kecil-nya benar. Kalau lupa, tanya guru
                  pembimbing!
                </span>
              </span>
            </div>
          )}

          <form
            action={loginAdmin}
            style={{ display: "grid", gap: 14, marginTop: 18 }}
          >
            <label style={{ color: "#1A1443", fontWeight: 900, fontSize: 13 }}>
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
                    padding: "14px 52px 14px 14px",
                    borderRadius: 14,
                    background: "white",
                    color: "#1A1443",
                    border: "2px solid #1A1443",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                />
                <TombolMata />
              </div>
              <span
                style={{
                  color: "#64748B",
                  fontSize: 11,
                  fontWeight: 600,
                  display: "block",
                  marginTop: 6,
                }}
              >
                🔒 Kata sandi tidak pernah ditampilkan di layar / GitHub. Aman!
              </span>
            </label>

            <button
              style={{
                background: "#1A1443",
                color: "white",
                padding: 14,
                borderRadius: 999,
                fontWeight: 900,
                border: "2px solid #1A1443",
                cursor: "pointer",
                fontSize: 14,
                boxShadow: "3px 3px 0 #F59E0B",
              }}
            >
              Masuk ke Admin →
            </button>

            <div
              style={{
                background: "#FFF7ED",
                border: "2px solid #FDE68A",
                borderRadius: 14,
                padding: 12,
              }}
            >
              <b style={{ color: "#1A1443", fontSize: 12 }}>
                Setelah login, kamu bisa:
              </b>
              <div
                style={{
                  color: "#475569",
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: 1.7,
                  marginTop: 4,
                }}
              >
                ✅ Lihat semua permohonan (termasuk yang terlambat!)
                <br />
                ✅ Serahkan / Tolak (wajib isi alasan!)
                <br />
                ✅ Kembalikan + catat kondisi (baik / rusak ringan / rusak
                berat!)
                <br />✅ Tambah alat, ubah stok, aktif / nonaktifkan!
              </div>
            </div>
          </form>

          <div
            style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}
          >
            <Link
              href="/"
              style={{
                flex: 1,
                textAlign: "center",
                background: "white",
                border: "2px solid #1A1443",
                color: "#1A1443",
                padding: "11px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              ← Beranda
            </Link>
            <Link
              href="/alat"
              style={{
                flex: 1,
                textAlign: "center",
                background: "#FDE68A",
                border: "2px solid #1A1443",
                color: "#1A1443",
                padding: "11px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              Lihat Alat →
            </Link>
          </div>

          <p
            style={{
              color: "#64748B",
              fontSize: 11,
              fontWeight: 600,
              textAlign: "center",
              margin: "14px 0 0",
            }}
          >
            Bukan admin? Kamu tetap bisa{" "}
            <Link href="/ajukan" style={{ color: "#DB2777", fontWeight: 900 }}>
              ajukan pinjam
            </Link>{" "}
            &{" "}
            <Link href="/cek" style={{ color: "#DB2777", fontWeight: 900 }}>
              cek status
            </Link>{" "}
            tanpa login!
          </p>
        </div>
      </div>

      {/* ============ INFO KEAMANAN DI BAWAH! JADI PUTIH! ============ */}
      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 12,
        }}
      >
        {[
          [
            "🛡",
            "RLS Aktif!",
            "Data pribadi hanya bisa dibaca server, bukan publik!",
            "#D1FAE5",
          ],
          [
            "🔐",
            "Cookie HttpOnly!",
            "Sesi admin disimpan aman, gak bisa dicuri JS!",
            "#DBEAFE",
          ],
          [
            "🚪",
            "Logout = Terkunci!",
            "Setelah logout, /admin tidak bisa dibuka lagi!",
            "#FEF3C7",
          ],
        ].map(([icon, judul, desc, bg]) => (
          <div
            key={judul}
            style={{
              background: bg as string,
              border: "2px solid #1A1443",
              borderRadius: 16,
              padding: 14,
              boxShadow: "3px 3px 0 #1A1443",
            }}
          >
            <div style={{ fontSize: 20 }}>{icon}</div>
            <b
              style={{
                color: "#1A1443",
                fontSize: 13,
                display: "block",
                marginTop: 6,
              }}
            >
              {judul}
            </b>
            <div
              style={{
                color: "#475569",
                fontSize: 12,
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              {desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
