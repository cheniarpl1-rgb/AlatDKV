// app/alat/[id]/page.tsx - Detail Alat AlatDKV - GAYA EVENTKU TEMEN LO! JUARA 1 DUNIA!
// Persis kayak screenshot: pastel pelangi, judul warna-warni outline navy,
// kotak putih border navy! Colorful, anti-white, sangat modern, sangat memukau, sangat rapi!
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

  // 👈 KALAU ALAT GAK KETEMU, TAMPILIN 404 YANG CANTIK! JADI PUTIH!
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
        <h1 style={{ color: "#1A1443", fontSize: 28, fontWeight: 900 }}>
          Alat Tidak Ditemukan!
        </h1>
        <p style={{ color: "#64748B", fontSize: 13, fontWeight: 600 }}>
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
              background: "#1A1443",
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
              background: "#FDE68A",
              border: "2px solid #1A1443",
              color: "#1A1443",
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
  const warnaBar = persen > 50 ? "#34D399" : persen > 0 ? "#F59E0B" : "#EF4444";

  // Warna per kategori! PASTEL!
  const warnaKat: Record<string, string> = {
    kamera: "#FCE7F3",
    pencahayaan: "#FEF3C7",
    audio: "#DBEAFE",
    tablet: "#D1FAE5",
    aksesoris: "#EDE9FE",
  };
  const warnaTeksKat: Record<string, string> = {
    kamera: "#9D174D",
    pencahayaan: "#92400E",
    audio: "#1E40AF",
    tablet: "#065F46",
    aksesoris: "#5B21B6",
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
      {/* ============ BREADCRUMB! JADI NAVY! ============ */}
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          fontSize: 13,
          fontWeight: 600,
          color: "#64748B",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" style={{ color: "#475569", textDecoration: "none" }}>
          🏠 Beranda
        </Link>
        <span>›</span>
        <Link href="/alat" style={{ color: "#475569", textDecoration: "none" }}>
          🎬 Alat
        </Link>
        <span>›</span>
        <Link
          href={`/alat?kategori=${a.kategori}`}
          style={{
            color: "#475569",
            textDecoration: "none",
            textTransform: "capitalize",
          }}
        >
          {a.kategori}
        </Link>
        <span>›</span>
        <b style={{ color: "#1A1443" }}>{a.nama}</b>
      </div>

      {/* ============ LAYOUT 2 KOLOM! JADI PUTIH! ============ */}
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
              border: "2px solid #1A1443",
              boxShadow: "6px 6px 0 #1A1443",
              background: "white",
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
                  "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(26,20,67,0.85))",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                padding: "16px 18px",
              }}
            >
              <span
                style={{
                  fontSize: 30,
                  background: "white",
                  border: "2px solid #1A1443",
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
                  color: warnaTeksKat[a.kategori] || "#5B21B6",
                  fontSize: 12,
                  fontWeight: 900,
                  padding: "7px 12px",
                  borderRadius: 999,
                  border: "2px solid #1A1443",
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
                  background: "#FECDD3",
                  color: "#881337",
                  fontSize: 12,
                  fontWeight: 900,
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: "2px solid #1A1443",
                }}
              >
                ⛔ STOK HABIS!
              </span>
            )}
          </div>

          {/* Info kecil di bawah foto! JADI PASTEL GANTIAN! */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              marginTop: 12,
            }}
          >
            {[
              ["🆔", "ID Alat", `#${a.id}`, "#EDE9FE"],
              ["📦", "Stok Total", `${a.stok} unit`, "#DBEAFE"],
              ["✅", "Tersedia", `${tersedia} unit`, "#D1FAE5"],
            ].map(([icon, label, nilai, bg]) => (
              <div
                key={label}
                style={{
                  background: bg as string,
                  border: "2px solid #1A1443",
                  borderRadius: 16,
                  padding: 12,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 20 }}>{icon}</div>
                <div
                  style={{
                    color: "#475569",
                    fontSize: 11,
                    fontWeight: 900,
                    marginTop: 4,
                  }}
                >
                  {label.toUpperCase()}
                </div>
                <b
                  style={{
                    color: "#1A1443",
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
              display: "inline-block",
              background: "#FDE68A",
              border: "2px solid #1A1443",
              color: "#1A1443",
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
              color: "#1A1443",
              fontSize: "clamp(28px, 4vw, 34px)",
              fontWeight: 900,
              margin: "12px 0 0",
              lineHeight: 1.1,
            }}
          >
            {a.nama}
          </h1>
          <p
            style={{
              color: "#64748B",
              fontSize: 13,
              fontWeight: 600,
              margin: "8px 0 0",
              lineHeight: 1.6,
            }}
          >
            {a.keterangan ||
              "Alat Lab DKV, siap dipakai untuk tugas, proyek, & karya terbaikmu!"}
          </p>

          {/* Badge status! JADI PASTEL! */}
          <div
            style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}
          >
            <span
              style={{
                background: a.aktif ? "#D1FAE5" : "#FECDD3",
                border: "2px solid #1A1443",
                color: a.aktif ? "#065F46" : "#881337",
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
                background: "white",
                border: "2px solid #1A1443",
                color: "#475569",
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
                background: "white",
                border: "2px solid #1A1443",
                color: "#475569",
                fontSize: 12,
                fontWeight: 800,
                padding: "6px 12px",
                borderRadius: 999,
              }}
            >
              🆔 ID: #{a.id}
            </span>
          </div>

          {/* KOTAK STOK! JADI KREM! */}
          <div
            style={{
              background: "#FFF7ED",
              border: "2px solid #1A1443",
              borderRadius: 20,
              padding: 16,
              marginTop: 16,
              boxShadow: "4px 4px 0 #1A1443",
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
                  style={{ color: "#475569", fontSize: 11, fontWeight: 900 }}
                >
                  STOK TERSEDIA SEKARANG
                </div>
                <b style={{ color: "#1A1443", fontSize: 32, lineHeight: 1 }}>
                  {tersedia}{" "}
                  <span style={{ fontSize: 14, color: "#64748B" }}>
                    / {a.stok} unit
                  </span>
                </b>
              </div>
              <span
                style={{
                  background: tersedia > 0 ? "#D1FAE5" : "#FECDD3",
                  border: "2px solid #1A1443",
                  color: tersedia > 0 ? "#065F46" : "#881337",
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
                background: "white",
                borderRadius: 999,
                marginTop: 12,
                overflow: "hidden",
                border: "2px solid #1A1443",
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
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#475569",
                marginTop: 8,
              }}
            >
              📦 <b style={{ color: "#1A1443" }}>{terpakai} unit</b> sedang
              dipinjam (menunggu + dipinjam) • Stok tersedia = stok total -
              dipinjam!
            </div>
            {tersedia <= 0 && (
              <div
                style={{
                  background: "#FFE4E6",
                  border: "2px solid #FB7185",
                  color: "#881337",
                  padding: 10,
                  borderRadius: 12,
                  marginTop: 10,
                  fontSize: 12,
                  fontWeight: 800,
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
                  background: "#1A1443",
                  color: "white",
                  padding: "14px",
                  borderRadius: 999,
                  fontWeight: 900,
                  textDecoration: "none",
                  fontSize: 14,
                  boxShadow: "3px 3px 0 #F59E0B",
                }}
              >
                📝 Ajukan Pinjam Alat Ini →
              </Link>
            ) : (
              <span
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "#E2E8F0",
                  color: "#64748B",
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
                background: "#FDE68A",
                border: "2px solid #1A1443",
                color: "#1A1443",
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

          {/* ATURAN PINJAM! JADI PUTIH! */}
          <div
            style={{
              background: "white",
              border: "2px solid #1A1443",
              borderRadius: 20,
              padding: 16,
              marginTop: 14,
            }}
          >
            <b style={{ color: "#1A1443", fontSize: 14 }}>
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
                ["1⃣", "Jumlah 1-5", "Per pinjam!", "#FCE7F3"],
                ["2⃣", "Maks 2 Aktif", "Per orang!", "#DBEAFE"],
                ["3⃣", "Maks 3 Hari", "Pinjam-Kembali!", "#FEF3C7"],
                ["4⃣", "Bukan Sab/Ming", "Lab tutup!", "#D1FAE5"],
              ].map(([icon, judul, desc, bg]) => (
                <div
                  key={judul}
                  style={{
                    background: bg as string,
                    border: "2px solid #1A1443",
                    borderRadius: 12,
                    padding: 10,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <b
                    style={{
                      color: "#1A1443",
                      fontSize: 12,
                      display: "block",
                      marginTop: 4,
                    }}
                  >
                    {judul}
                  </b>
                  <div
                    style={{ color: "#475569", fontSize: 11, fontWeight: 600 }}
                  >
                    {desc}
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                color: "#64748B",
                fontSize: 11,
                fontWeight: 600,
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

      {/* ============ ALAT LAIN YANG MIRIP! JADI PUTIH! ============ */}
      {listMirip.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h2
            style={{
              color: "#1A1443",
              fontSize: 22,
              fontWeight: 900,
              margin: 0,
            }}
          >
            Alat Lain yang Mirip! 🎬
          </h2>
          <p
            style={{
              color: "#64748B",
              fontSize: 13,
              fontWeight: 600,
              margin: "4px 0 0",
            }}
          >
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
                  color: "#1A1443",
                  background: "white",
                  border: "2px solid #1A1443",
                  borderRadius: 20,
                  overflow: "hidden",
                  display: "block",
                  boxShadow: "3px 3px 0 #1A1443",
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
                  <div
                    style={{
                      color: "#64748B",
                      fontSize: 12,
                      fontWeight: 600,
                      marginTop: 4,
                    }}
                  >
                    📦 Stok {m.stok} unit •{" "}
                    {m.keterangan?.slice(0, 40) || "Alat Lab DKV"}...
                  </div>
                  <span
                    style={{
                      display: "block",
                      textAlign: "center",
                      marginTop: 10,
                      background: "#1A1443",
                      color: "white",
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
            background: "white",
            border: "2px solid #1A1443",
            color: "#1A1443",
            padding: "12px 20px",
            borderRadius: 999,
            fontWeight: 900,
            textDecoration: "none",
            fontSize: 13,
          }}
        >
          ← Semua Alat
        </Link>
        <Link
          href={`/alat?kategori=${a.kategori}`}
          style={{
            background: "#FDE68A",
            border: "2px solid #1A1443",
            color: "#1A1443",
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
