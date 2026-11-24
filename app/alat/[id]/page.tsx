// app/alat/[id]/page.tsx - Detail Alat AlatDKV - JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!
// SESUAI SOAL E2: Detail alat, tombol ajukan!
// FIX Next.js 16: Hapus `dynamic`, ganti `connection()`!

import { supabasePublik } from "@/lib/supabase";
import { gambarAlat, iconAlat } from "@/lib/gambar";
import Link from "next/link";
import { connection } from "next/server";

export default async function DetailAlat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 👈 PENGGANTI `force-dynamic` DI NEXT.JS 16! WAJIB ADA!
  await connection();

  const { id } = await params;
  const { data: a } = await supabasePublik()
    .from("alat")
    .select("*")
    .eq("id", id)
    .single();

  // 👈 KALAU ALAT GAK KETEMU, TAMPILIN 404 YANG CANTIK!
  if (!a) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
          paddingTop: 40,
        }}
      >
        <div style={{ fontSize: 64 }}>😢</div>
        <h1 style={{ color: "white", fontSize: 28, fontWeight: 900 }}>
          Alat Tidak Ditemukan!
        </h1>
        <p style={{ color: "#C4B5FD", fontSize: 13 }}>
          Mungkin alat-nya sudah dihapus / ID-nya salah. Coba cari alat lain ya!
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginTop: 16,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/alat"
            style={{
              background: "linear-gradient(90deg,#F59E0B,#EC4899)",
              color: "white",
              padding: "12px 24px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            🎬 Lihat Semua Alat →
          </Link>
          <Link
            href="/"
            style={{
              background: "white",
              color: "#6D28D9",
              padding: "12px 24px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            🏠 Beranda
          </Link>
        </div>
      </div>
    );
  }

  // Hitung stok tersedia: stok - yang sedang dipinjam! (ATURAN SOAL!)
  const { data: pinjam } = await supabasePublik()
    .from("peminjaman_alat")
    .select("jumlah")
    .eq("alat_id", a.id)
    .in("status", ["menunggu", "dipinjam"]);
  const terpakai = (pinjam || []).reduce(
    (s: number, x: any) => s + x.jumlah,
    0,
  );
  const tersedia = Math.max(0, a.stok - terpakai);
  const persen = a.stok > 0 ? Math.round((tersedia / a.stok) * 100) : 0;
  const warnaBar =
    persen > 50
      ? "linear-gradient(90deg,#10B981,#22D3EE)"
      : persen > 0
        ? "linear-gradient(90deg,#F59E0B,#F97316)"
        : "linear-gradient(90deg,#EF4444,#F97316)";

  // Warna per kategori!
  const warnaKat: Record<string, string> = {
    kamera: "linear-gradient(135deg,#F472B6,#A855F7)",
    pencahayaan: "linear-gradient(135deg,#FBBF24,#F97316)",
    audio: "linear-gradient(135deg,#60A5FA,#22D3EE)",
    tablet: "linear-gradient(135deg,#34D399,#10B981)",
    aksesoris: "linear-gradient(135deg,#A78BFA,#EC4899)",
  };

  // Alat lain yang se-kategori! (Buat bagian bawah!)
  const { data: mirip } = await supabasePublik()
    .from("alat")
    .select("*")
    .eq("aktif", true)
    .eq("kategori", a.kategori)
    .neq("id", a.id)
    .limit(3);
  const listMirip = mirip || [];

  return (
    <div>
      {/* ============ BREADCRUMB! 👈 BARU! ============ */}
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          fontSize: 13,
          color: "#A78BFA",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" style={{ color: "#C4B5FD", textDecoration: "none" }}>
          🏠 Beranda
        </Link>
        <span>›</span>
        <Link href="/alat" style={{ color: "#C4B5FD", textDecoration: "none" }}>
          🎬 Alat
        </Link>
        <span>›</span>
        <Link
          href={`/alat?kategori=${a.kategori}`}
          style={{
            color: "#C4B5FD",
            textDecoration: "none",
            textTransform: "capitalize",
          }}
        >
          {a.kategori}
        </Link>
        <span>›</span>
        <b style={{ color: "white" }}>{a.nama}</b>
      </div>

      {/* ============ LAYOUT 2 KOLOM! 👈 UPGRADE TOTAL! ============ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 18,
          marginTop: 16,
        }}
      >
        {/* KIRI: FOTO GEDE + BADGE! */}
        <div>
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
              src={gambarAlat(a.kategori, a.nama)}
              alt={a.nama}
              style={{
                width: "100%",
                height: 340,
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
                padding: "16px 18px",
              }}
            >
              <span
                style={{
                  fontSize: 30,
                  background: "rgba(0,0,0,0.45)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {iconAlat(a.kategori, a.nama)}
              </span>
              <span
                style={{
                  background: warnaKat[a.kategori] || warnaKat.aksesoris,
                  color: "white",
                  fontSize: 12,
                  fontWeight: 900,
                  padding: "7px 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                {a.kategori.toUpperCase()}
              </span>
            </div>
            {tersedia <= 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  background: "#DC2626",
                  color: "white",
                  fontSize: 12,
                  fontWeight: 900,
                  padding: "8px 12px",
                  borderRadius: 999,
                }}
              >
                ⛔ STOK HABIS!
              </span>
            )}
          </div>

          {/* Info kecil di bawah foto! */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              marginTop: 12,
            }}
          >
            {[
              ["🆔", "ID Alat", `#${a.id}`],
              ["📦", "Stok Total", `${a.stok} unit`],
              ["✅", "Tersedia", `${tersedia} unit`],
            ].map(([icon, label, nilai]) => (
              <div
                key={label}
                style={{
                  background: "#1E103A",
                  border: "1px solid #4C1D95",
                  borderRadius: 16,
                  padding: 12,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 20 }}>{icon}</div>
                <div
                  style={{
                    color: "#A78BFA",
                    fontSize: 11,
                    fontWeight: 800,
                    marginTop: 4,
                  }}
                >
                  {label.toUpperCase()}
                </div>
                <b
                  style={{
                    color: "white",
                    fontSize: 13,
                    display: "block",
                    marginTop: 2,
                  }}
                >
                  {nilai}
                </b>
              </div>
            ))}
          </div>
        </div>

        {/* KANAN: DETAIL + STOK + TOMBOL! */}
        <div>
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
            🎬 DETAIL ALAT • LAB DKV
          </span>
          <h1
            style={{
              color: "white",
              fontSize: 34,
              fontWeight: 900,
              margin: "12px 0 0",
              lineHeight: 1.1,
            }}
          >
            {a.nama}
          </h1>
          <p
            style={{
              color: "#C4B5FD",
              fontSize: 13,
              margin: "8px 0 0",
              lineHeight: 1.6,
            }}
          >
            {a.keterangan ||
              "Alat Lab DKV, siap dipakai untuk tugas, proyek, & karya terbaikmu!"}
          </p>

          {/* Badge status! */}
          <div
            style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}
          >
            <span
              style={{
                background: a.aktif ? "#14532D" : "#7F1D1D",
                color: a.aktif ? "#BBF7D0" : "#FECACA",
                fontSize: 12,
                fontWeight: 900,
                padding: "6px 12px",
                borderRadius: 999,
              }}
            >
              {a.aktif ? "✅ AKTIF • BISA DIPINJAM" : "❌ NONAKTIF"}
            </span>
            <span
              style={{
                background: "#1E103A",
                border: "1px solid #4C1D95",
                color: "#C4B5FD",
                fontSize: 12,
                fontWeight: 800,
                padding: "6px 12px",
                borderRadius: 999,
              }}
            >
              📦 Kategori: {a.kategori}
            </span>
            <span
              style={{
                background: "#1E103A",
                border: "1px solid #4C1D95",
                color: "#C4B5FD",
                fontSize: 12,
                fontWeight: 800,
                padding: "6px 12px",
                borderRadius: 999,
              }}
            >
              🆔 ID: #{a.id}
            </span>
          </div>

          {/* KOTAK STOK! */}
          <div
            style={{
              background: "linear-gradient(135deg,#1E103A,#3B0764)",
              border: "1px solid #7C3AED",
              borderRadius: 20,
              padding: 16,
              marginTop: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <div
                  style={{ color: "#A78BFA", fontSize: 11, fontWeight: 800 }}
                >
                  STOK TERSEDIA SEKARANG
                </div>
                <b style={{ color: "white", fontSize: 32, lineHeight: 1 }}>
                  {tersedia}{" "}
                  <span style={{ fontSize: 14, color: "#C4B5FD" }}>
                    / {a.stok} unit
                  </span>
                </b>
              </div>
              <span
                style={{
                  background: tersedia > 0 ? "#14532D" : "#7F1D1D",
                  color: tersedia > 0 ? "#BBF7D0" : "#FECACA",
                  fontSize: 12,
                  fontWeight: 900,
                  padding: "6px 12px",
                  borderRadius: 999,
                }}
              >
                {tersedia > 0 ? `✅ ${persen}% Tersedia` : "⛔ HABIS!"}
              </span>
            </div>
            {/* Bar stok! */}
            <div
              style={{
                height: 10,
                background: "#120826",
                borderRadius: 999,
                marginTop: 12,
                overflow: "hidden",
                border: "1px solid #4C1D95",
              }}
            >
              <div
                style={{
                  width: `${persen}%`,
                  height: "100%",
                  background: warnaBar,
                  borderRadius: 999,
                }}
              />
            </div>
            <div style={{ fontSize: 12, color: "#C4B5FD", marginTop: 8 }}>
              📦 <b style={{ color: "white" }}>{terpakai} unit</b> sedang
              dipinjam (menunggu + dipinjam) • Stok tersedia = stok total -
              dipinjam!
            </div>
            {tersedia <= 0 && (
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
                ⛔ Stok habis! Coba alat lain yang se-kategori di bawah, atau
                coba tanggal lain!
              </div>
            )}
          </div>

          {/* TOMBOL AJUKAN! */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 14,
              flexWrap: "wrap",
            }}
          >
            {tersedia > 0 ? (
              <Link
                href={`/ajukan?alat_id=${a.id}`}
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                  color: "white",
                  padding: "14px",
                  borderRadius: 999,
                  fontWeight: 900,
                  textDecoration: "none",
                  fontSize: 14,
                  boxShadow: "0 10px 30px rgba(236,72,153,0.4)",
                }}
              >
                📝 Ajukan Pinjam Alat Ini →
              </Link>
            ) : (
              <span
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "#374151",
                  color: "white",
                  padding: "14px",
                  borderRadius: 999,
                  fontWeight: 900,
                  fontSize: 14,
                }}
              >
                ⛔ Stok Habis!
              </span>
            )}
            <Link
              href="/cek"
              style={{
                background: "white",
                color: "#6D28D9",
                padding: "14px 20px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              🔍 Cek Status
            </Link>
          </div>

          {/* ATURAN PINJAM! */}
          <div
            style={{
              background: "#1E103A",
              border: "1px solid #4C1D95",
              borderRadius: 20,
              padding: 16,
              marginTop: 14,
            }}
          >
            <b style={{ color: "white", fontSize: 14 }}>
              Aturan Pinjam Alat Ini 🎯
            </b>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginTop: 10,
              }}
            >
              {[
                ["1️⃣", "Jumlah 1-5", "Per pinjam!"],
                ["2️⃣", "Maks 2 Aktif", "Per orang!"],
                ["3️⃣", "Maks 3 Hari", "Pinjam-Kembali!"],
                ["4️⃣", "Bukan Sab/Ming", "Lab tutup!"],
              ].map(([icon, judul, desc]) => (
                <div
                  key={judul}
                  style={{
                    background: "#120826",
                    border: "1px solid #4C1D95",
                    borderRadius: 12,
                    padding: 10,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <b
                    style={{
                      color: "white",
                      fontSize: 12,
                      display: "block",
                      marginTop: 4,
                    }}
                  >
                    {judul}
                  </b>
                  <div style={{ color: "#A78BFA", fontSize: 11 }}>{desc}</div>
                </div>
              ))}
            </div>
            <p
              style={{
                color: "#A78BFA",
                fontSize: 11,
                margin: "10px 0 0",
                lineHeight: 1.6,
              }}
            >
              Tanggal pinjam: bukan lampau, maks 14 hari ke depan, bukan
              Sabtu/Minggu, kembali ≥ pinjam!
            </p>
          </div>
        </div>
      </div>

      {/* ============ ALAT LAIN YANG MIRIP! 👈 BARU! ============ */}
      {listMirip.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h2
            style={{ color: "white", fontSize: 22, fontWeight: 900, margin: 0 }}
          >
            Alat Lain yang Mirip! 🎬
          </h2>
          <p style={{ color: "#C4B5FD", fontSize: 13, margin: "4px 0 0" }}>
            Masih se-kategori {a.kategori}, siapa tau kamu suka yang ini juga!
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
              gap: 14,
              marginTop: 14,
            }}
          >
            {listMirip.map((m: any) => (
              <Link
                key={m.id}
                href={`/alat/${m.id}`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  background: "linear-gradient(180deg,#2E1065,#1E103A)",
                  border: "1px solid #4C1D95",
                  borderRadius: 20,
                  overflow: "hidden",
                  display: "block",
                }}
              >
                <img
                  src={gambarAlat(m.kategori, m.nama)}
                  alt={m.nama}
                  style={{
                    width: "100%",
                    height: 130,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div style={{ padding: 14 }}>
                  <b style={{ fontSize: 15, display: "block" }}>
                    {iconAlat(m.kategori, m.nama)} {m.nama}
                  </b>
                  <div style={{ color: "#C4B5FD", fontSize: 12, marginTop: 4 }}>
                    📦 Stok {m.stok} unit •{" "}
                    {m.keterangan?.slice(0, 40) || "Alat Lab DKV"}...
                  </div>
                  <span
                    style={{
                      display: "block",
                      textAlign: "center",
                      marginTop: 10,
                      background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                      padding: "10px",
                      borderRadius: 999,
                      fontWeight: 900,
                      fontSize: 12,
                    }}
                  >
                    Lihat Detail →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ============ TOMBOL BALIK! ============ */}
      <div
        style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}
      >
        <Link
          href="/alat"
          style={{
            background: "#1E103A",
            border: "1px solid #4C1D95",
            color: "white",
            padding: "12px 20px",
            borderRadius: 999,
            fontWeight: 800,
            textDecoration: "none",
            fontSize: 13,
          }}
        >
          ← Semua Alat
        </Link>
        <Link
          href={`/alat?kategori=${a.kategori}`}
          style={{
            background: "white",
            color: "#6D28D9",
            padding: "12px 20px",
            borderRadius: 999,
            fontWeight: 900,
            textDecoration: "none",
            fontSize: 13,
          }}
        >
          Lihat Kategori {a.kategori} →
        </Link>
      </div>
    </div>
  );
}
