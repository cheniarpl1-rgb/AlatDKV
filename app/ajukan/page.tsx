// app/ajukan/page.tsx - Ajukan Peminjaman AlatDKV - JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!
// SESUAI SOAL E2: Formulir alat, tanggal pinjam/kembali, jumlah, peminjam, kelas, keperluan!
// FIX Next.js 16: Hapus `dynamic`, ganti `connection()`!

import { supabasePublik } from "@/lib/supabase";
import { ajukanPinjam } from "./actions";
import { gambarAlat, iconAlat } from "@/lib/gambar";
import Link from "next/link";
import { connection } from "next/server";

export default async function Ajukan({
  searchParams,
}: {
  searchParams: Promise<{ alat_id?: string; error?: string }>;
}) {
  // 👈 PENGGANTI `force-dynamic` DI NEXT.JS 16! WAJIB ADA!
  await connection();

  const p = await searchParams;
  const { data: alat } = await supabasePublik()
    .from("alat")
    .select("*")
    .eq("aktif", true)
    .order("id");
  const listAlat = alat || [];

  // Alat yang dipilih (dari ?alat_id=... atau dari form sebelumnya)!
  const alatDipilih = listAlat.find(
    (a: any) => String(a.id) === String(p.alat_id),
  );

  // Hitung stok tersedia buat alat yang dipilih!
  let tersediaDipilih = 0;
  let terpakaiDipilih = 0;
  if (alatDipilih) {
    const { data: pinjam } = await supabasePublik()
      .from("peminjaman_alat")
      .select("jumlah")
      .eq("alat_id", alatDipilih.id)
      .in("status", ["menunggu", "dipinjam"]);
    terpakaiDipilih = (pinjam || []).reduce(
      (s: number, x: any) => s + x.jumlah,
      0,
    );
    tersediaDipilih = Math.max(0, alatDipilih.stok - terpakaiDipilih);
  }

  const pesanError = p.error ? decodeURIComponent(p.error) : "";

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* ============ 1. HERO + GAMBAR! 👈 BARU! ============ */}
      <div
        style={{
          borderRadius: 28,
          overflow: "hidden",
          position: "relative",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 20px 60px rgba(109,40,217,0.4)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop"
          alt="Ajukan Pinjam"
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            display: "block",
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
            padding: "22px 22px",
          }}
        >
          <span
            style={{
              background: "white",
              color: "#6D28D9",
              fontSize: 11,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 999,
              width: "fit-content",
            }}
          >
            📝 AJUKAN PEMINJAMAN • 30 DETIK SELESAI!
          </span>
          <h1
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: 900,
              margin: "10px 0 0",
              lineHeight: 1.1,
            }}
          >
            Ajukan Peminjaman,
            <br />
            <span
              style={{
                background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Gak Perlu Antre di Lab!
            </span>
          </h1>
          <p style={{ color: "#DDD6FE", fontSize: 13, margin: "8px 0 0" }}>
            Isi form di bawah, tunggu admin setujui, cek status di{" "}
            <b style={{ color: "white" }}>/cek</b>! Gampang!
          </p>
        </div>
      </div>

      {/* ============ 2. PESAN ERROR KALAU GAGAL! 👈 BARU! WAJIB DI SOAL! ============ */}
      {pesanError && (
        <div
          style={{
            marginTop: 14,
            background: "#7F1D1D",
            border: "1px solid #EF4444",
            color: "white",
            padding: 16,
            borderRadius: 20,
            display: "flex",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 24 }}>❌</span>
          <div>
            <b>Pengajuan Gagal! 😢</b>
            <p style={{ margin: "4px 0 0", fontSize: 13, lineHeight: 1.6 }}>
              {pesanError}
            </p>
            <p style={{ margin: "8px 0 0", fontSize: 12, opacity: 0.85 }}>
              Coba ganti alat / tanggal / jumlah-nya, terus kirim lagi ya!
            </p>
          </div>
        </div>
      )}

      {/* ============ 3. LAYOUT 2 KOLOM! 👈 UPGRADE TOTAL! ============ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 16,
          marginTop: 16,
          alignItems: "start",
        }}
      >
        {/* KIRI: FORM! */}
        <form
          action={ajukanPinjam}
          style={{
            background: "#1E103A",
            border: "1px solid #4C1D95",
            borderRadius: 24,
            padding: 20,
            display: "grid",
            gap: 14,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: 13,
                background: "linear-gradient(135deg,#F59E0B,#EC4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              📝
            </span>
            <div>
              <b style={{ color: "white", fontSize: 17, display: "block" }}>
                Formulir Peminjaman
              </b>
              <span style={{ color: "#C4B5FD", fontSize: 12 }}>
                Semua kolom bertanda * wajib diisi!
              </span>
            </div>
          </div>

          <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
            🎬 Alat yang Dipinjam *
            <select
              name="alat_id"
              defaultValue={p.alat_id || ""}
              required
              style={{
                width: "100%",
                padding: 13,
                borderRadius: 13,
                marginTop: 6,
                background: "#120826",
                color: "white",
                border: "1px solid #4C1D95",
                fontSize: 14,
              }}
            >
              <option value="">-- Pilih Alat --</option>
              {listAlat.map((a: any) => (
                <option key={a.id} value={a.id}>
                  {a.nama} (Stok {a.stok})
                </option>
              ))}
            </select>
            <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 400 }}>
              Pilih alat yang masih tersedia! Stok dihitung realtime!
            </span>
          </label>

          <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
            👤 Nama Peminjam *
            <input
              name="peminjam"
              required
              placeholder="Contoh: Rina Putri"
              style={{
                width: "100%",
                padding: 13,
                borderRadius: 13,
                marginTop: 6,
                background: "#120826",
                color: "white",
                border: "1px solid #4C1D95",
                fontSize: 14,
              }}
            />
            <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 400 }}>
              3-40 huruf, tanpa angka! Nama ini dipakai buat cek status!
            </span>
          </label>

          <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
            🏫 Kelas *
            <input
              name="kelas"
              required
              placeholder="Contoh: 12 DKV 1"
              style={{
                width: "100%",
                padding: 13,
                borderRadius: 13,
                marginTop: 6,
                background: "#120826",
                color: "white",
                border: "1px solid #4C1D95",
                fontSize: 14,
              }}
            />
            <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 400 }}>
              3-20 huruf! Contoh: 10 DKV 1, 11 DKV 2, 12 DKV 1
            </span>
          </label>

          <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
            🎯 Keperluan *
            <input
              name="keperluan"
              required
              placeholder="Contoh: Foto produk untuk tugas akhir"
              style={{
                width: "100%",
                padding: 13,
                borderRadius: 13,
                marginTop: 6,
                background: "#120826",
                color: "white",
                border: "1px solid #4C1D95",
                fontSize: 14,
              }}
            />
            <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 400 }}>
              5-120 huruf! Jelaskan buat apa alat-nya!
            </span>
          </label>

          <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
            📦 Jumlah *
            <input
              name="jumlah"
              type="number"
              min={1}
              max={5}
              defaultValue={1}
              required
              style={{
                width: "100%",
                padding: 13,
                borderRadius: 13,
                marginTop: 6,
                background: "#120826",
                color: "white",
                border: "1px solid #4C1D95",
                fontSize: 14,
              }}
            />
            <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 400 }}>
              1-5 unit! Kalau minta lebih dari stok, ditolak!
            </span>
          </label>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
              📅 Tanggal Pinjam *
              <input
                name="tgl_pinjam"
                type="date"
                required
                style={{
                  width: "100%",
                  padding: 13,
                  borderRadius: 13,
                  marginTop: 6,
                  background: "#120826",
                  color: "white",
                  border: "1px solid #4C1D95",
                  fontSize: 14,
                }}
              />
            </label>
            <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
              📅 Tanggal Kembali *
              <input
                name="tgl_kembali"
                type="date"
                required
                style={{
                  width: "100%",
                  padding: 13,
                  borderRadius: 13,
                  marginTop: 6,
                  background: "#120826",
                  color: "white",
                  border: "1px solid #4C1D95",
                  fontSize: 14,
                }}
              />
            </label>
          </div>
          <p
            style={{
              color: "#A78BFA",
              fontSize: 11,
              margin: "-6px 0 0",
              lineHeight: 1.6,
            }}
          >
            Maks 3 hari pinjam! Bukan Sabtu/Minggu! Maks 14 hari ke depan! Bukan
            tanggal lampau!
          </p>

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
            Kirim Pengajuan →
          </button>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link
              href="/alat"
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
              ← Lihat Alat
            </Link>
            <Link
              href="/cek"
              style={{
                flex: 1,
                textAlign: "center",
                background: "white",
                color: "#6D28D9",
                padding: "11px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              🔍 Cek Status
            </Link>
          </div>
        </form>

        {/* KANAN: PREVIEW ALAT + ATURAN! */}
        <div style={{ display: "grid", gap: 14 }}>
          {/* Preview Alat yang Dipilih! */}
          {alatDipilih ? (
            <div
              style={{
                background: "linear-gradient(180deg,#2E1065,#1E103A)",
                border: "1px solid #4C1D95",
                borderRadius: 24,
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={gambarAlat(alatDipilih.kategori, alatDipilih.nama)}
                  alt={alatDipilih.nama}
                  style={{
                    width: "100%",
                    height: 170,
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
                    {iconAlat(alatDipilih.kategori, alatDipilih.nama)}
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
                    {alatDipilih.kategori.toUpperCase()}
                  </span>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <b style={{ color: "white", fontSize: 18, display: "block" }}>
                  {alatDipilih.nama}
                </b>
                <p
                  style={{
                    color: "#C4B5FD",
                    fontSize: 12,
                    margin: "6px 0 0",
                    lineHeight: 1.6,
                  }}
                >
                  {alatDipilih.keterangan || "Alat Lab DKV, siap dipakai!"}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: "#120826",
                      border: "1px solid #4C1D95",
                      color: "white",
                      fontSize: 12,
                      fontWeight: 800,
                      padding: "6px 10px",
                      borderRadius: 999,
                    }}
                  >
                    📦 Stok {alatDipilih.stok}
                  </span>
                  <span
                    style={{
                      background: tersediaDipilih > 0 ? "#14532D" : "#7F1D1D",
                      color: tersediaDipilih > 0 ? "#BBF7D0" : "#FECACA",
                      fontSize: 12,
                      fontWeight: 900,
                      padding: "6px 10px",
                      borderRadius: 999,
                    }}
                  >
                    ✅ Tersedia {tersediaDipilih} unit
                  </span>
                  <span
                    style={{
                      background: "#120826",
                      border: "1px solid #4C1D95",
                      color: "#C4B5FD",
                      fontSize: 12,
                      fontWeight: 800,
                      padding: "6px 10px",
                      borderRadius: 999,
                    }}
                  >
                    📦 {terpakaiDipilih} dipinjam
                  </span>
                </div>
                {tersediaDipilih <= 0 && (
                  <div
                    style={{
                      background: "#7F1D1D",
                      color: "white",
                      padding: 10,
                      borderRadius: 12,
                      marginTop: 10,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    ⛔ Stok habis! Pilih alat lain ya!
                  </div>
                )}
                <Link
                  href={`/alat/${alatDipilih.id}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: 12,
                    background: "white",
                    color: "#6D28D9",
                    padding: "11px",
                    borderRadius: 999,
                    fontWeight: 900,
                    textDecoration: "none",
                    fontSize: 13,
                  }}
                >
                  Lihat Detail Alat →
                </Link>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "#1E103A",
                border: "1px solid #4C1D95",
                borderRadius: 24,
                padding: 20,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40 }}>🎬</div>
              <b style={{ color: "white", fontSize: 16 }}>Belum Pilih Alat?</b>
              <p style={{ color: "#C4B5FD", fontSize: 13, margin: "6px 0 0" }}>
                Pilih alat di form sebelah kiri, atau klik alat di bawah ini!
                Preview-nya langsung muncul di sini!
              </p>
              <Link
                href="/alat"
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                  color: "white",
                  padding: "11px 20px",
                  borderRadius: 999,
                  fontWeight: 900,
                  textDecoration: "none",
                  fontSize: 13,
                }}
              >
                🎬 Lihat Semua Alat →
              </Link>
            </div>
          )}

          {/* Aturan Pinjam! */}
          <div
            style={{
              background: "linear-gradient(135deg,#1E103A,#3B0764)",
              border: "1px solid #7C3AED",
              borderRadius: 24,
              padding: 18,
            }}
          >
            <b style={{ color: "white", fontSize: 15 }}>
              Aturan Pinjam? Gampang! 🎯
            </b>
            <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
              {[
                ["1️⃣", "Jumlah 1-5 unit", "Per peminjaman, gak boleh lebih!"],
                [
                  "2️⃣",
                  "Maks 2 aktif / orang",
                  "Kalau udah 2, tunggu yang lama kembali dulu!",
                ],
                ["3️⃣", "Pinjam maks 3 hari", "Kembali - Pinjam maks 3 hari!"],
                ["4️⃣", "Bukan Sabtu / Minggu", "Lab tutup, gak bisa pinjam!"],
                [
                  "5️⃣",
                  "Maks 14 hari ke depan",
                  "Gak bisa booking jauh-jauh hari!",
                ],
                [
                  "6️⃣",
                  "Stok harus cukup",
                  "Kalau stok habis, ditolak pesan ramah!",
                ],
              ].map(([icon, judul, desc]) => (
                <div
                  key={judul}
                  style={{
                    background: "#120826",
                    border: "1px solid #4C1D95",
                    borderRadius: 14,
                    padding: 12,
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <div>
                    <b
                      style={{ color: "white", fontSize: 13, display: "block" }}
                    >
                      {judul}
                    </b>
                    <div style={{ color: "#C4B5FD", fontSize: 12 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cara Cek Status! */}
          <div
            style={{
              background: "#14532D",
              border: "1px solid #22C55E",
              borderRadius: 20,
              padding: 16,
            }}
          >
            <b style={{ color: "white", fontSize: 14 }}>
              Setelah Kirim, Terus Ngapain? 🤔
            </b>
            <p
              style={{
                color: "#BBF7D0",
                fontSize: 13,
                lineHeight: 1.7,
                margin: "6px 0 0",
              }}
            >
              1. Catat <b style={{ color: "white" }}>nomor peminjaman</b> yang
              muncul di halaman sukses!
              <br />
              2. Buka <b style={{ color: "white" }}>/cek</b>, masukin nomor +
              nama kamu!
              <br />
              3. Tunggu admin setujui, biasanya di jam kerja!
            </p>
            <Link
              href="/cek"
              style={{
                display: "inline-block",
                marginTop: 10,
                background: "white",
                color: "#065F46",
                padding: "10px 18px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              🔍 Cek Status Saya →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
