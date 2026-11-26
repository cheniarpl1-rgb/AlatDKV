// app/admin/page.tsx - Admin AlatDKV - GAYA EVENTKU TEMEN LO! JUARA 1 DUNIA!
// Persis kayak screenshot: pastel pelangi, judul warna-warni outline navy,
// kotak putih border navy! Colorful, anti-white, sangat modern, sangat memukau, sangat rapi!
// SESUAI SOAL E2: Daftar permohonan, saring status, terlambat, setujui/tolak/kembalikan!
// FIX Next.js 16: Hapus `dynamic`, ganti `connection()`!

import { supabaseRahasia } from "@/lib/supabase";
import { tglIndo } from "@/lib/validasi";
import { setujui, tolak, kembalikan } from "./actions";
import { logoutAdmin } from "@/app/login/actions";
import { gambarAlat, iconAlat } from "@/lib/gambar";
import Link from "next/link";
import { connection } from "next/server";

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  // 👈 PENGGANTI `force-dynamic` DI NEXT.JS 16! WAJIB ADA!
  await connection();

  const p = await searchParams;
  const filter = p.status || "Semua";

  // Ambil SEMUA buat hitung statistik!
  const { data: semua } = await supabaseRahasia()
    .from("peminjaman_alat")
    .select("*, alat(nama,kategori)")
    .order("dibuat", { ascending: false });
  const all = semua || [];

  const today = new Date().toISOString().slice(0, 10);
  const isTerlambat = (x: any) =>
    x.status === "dipinjam" && today > x.tgl_kembali;
  const hitungHariTerlambat = (x: any) => {
    if (!isTerlambat(x)) return 0;
    const a = new Date(x.tgl_kembali).getTime();
    const b = new Date(today).getTime();
    return Math.ceil((b - a) / (1000 * 60 * 60 * 24));
  };

  // Statistik!
  const total = all.length;
  const jmlMenunggu = all.filter((x: any) => x.status === "menunggu").length;
  const jmlDipinjam = all.filter((x: any) => x.status === "dipinjam").length;
  const jmlTerlambat = all.filter(isTerlambat).length;
  const jmlKembali = all.filter((x: any) => x.status === "dikembalikan").length;
  const jmlTolak = all.filter((x: any) => x.status === "ditolak").length;

  // Filter list!
  let list = all;
  if (filter === "terlambat") list = all.filter(isTerlambat);
  else if (filter !== "Semua")
    list = all.filter((x: any) => x.status === filter);

  // Warna badge status! PASTEL!
  const badgeStatus = (status: string, terlambat: boolean) => {
    if (terlambat)
      return { bg: "#FECDD3", color: "#881337", label: "⚠ TERLAMBAT!" };
    if (status === "menunggu")
      return { bg: "#FEF3C7", color: "#92400E", label: "⏳ MENUNGGU" };
    if (status === "dipinjam")
      return { bg: "#DBEAFE", color: "#1E40AF", label: "📦 DIPINJAM" };
    if (status === "dikembalikan")
      return { bg: "#D1FAE5", color: "#065F46", label: "✅ DIKEMBALIKAN" };
    if (status === "ditolak")
      return { bg: "#FECDD3", color: "#881337", label: "❌ DITOLAK" };
    return { bg: "#E2E8F0", color: "#1A1443", label: status.toUpperCase() };
  };

  const filters = [
    { key: "Semua", label: "📋 Semua", count: total, activeBg: "#FDE68A" },
    {
      key: "menunggu",
      label: "⏳ Menunggu",
      count: jmlMenunggu,
      activeBg: "#FEF3C7",
    },
    {
      key: "dipinjam",
      label: "📦 Dipinjam",
      count: jmlDipinjam,
      activeBg: "#DBEAFE",
    },
    {
      key: "dikembalikan",
      label: "✅ Dikembalikan",
      count: jmlKembali,
      activeBg: "#D1FAE5",
    },
    {
      key: "ditolak",
      label: "❌ Ditolak",
      count: jmlTolak,
      activeBg: "#FCE7F3",
    },
    {
      key: "terlambat",
      label: "⚠ Terlambat",
      count: jmlTerlambat,
      activeBg: "#FECDD3",
    },
  ];

  return (
    <div>
      {/* ============ 1. HEADER ADMIN! JADI PASTEL! ============ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              background: "#CCFBF1",
              color: "#0F766E",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: 1.5,
              padding: "9px 18px",
              borderRadius: 999,
              border: "2px solid #99F6E4",
            }}
          >
            🛠 DASHBOARD ADMIN • LAB DKV
          </span>
          <h1
            style={{
              fontSize: "clamp(30px, 5vw, 42px)",
              fontWeight: 900,
              margin: "10px 0 0",
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                color: "#5EEAD4",
                WebkitTextStroke: "2px #1A1443",
                textShadow: "3px 3px 0 #1A1443",
              }}
            >
              Admin
            </span>{" "}
            <span
              style={{
                color: "#F9A8D4",
                WebkitTextStroke: "2px #1A1443",
                textShadow: "3px 3px 0 #1A1443",
              }}
            >
              AlatDKV
            </span>{" "}
            <span
              style={{
                color: "#FDE68A",
                WebkitTextStroke: "2px #1A1443",
                textShadow: "3px 3px 0 #1A1443",
              }}
            >
              ({list.length})
            </span>
          </h1>
          <p
            style={{
              color: "#475569",
              fontSize: 13,
              fontWeight: 600,
              margin: "6px 0 0",
            }}
          >
            {filter === "Semua"
              ? "Semua permohonan, dari yang terbaru!"
              : `Filter: ${filter.toUpperCase()} • ${list.length} permohonan!`}
            {jmlTerlambat > 0 && (
              <b style={{ color: "#BE123C" }}>
                {" "}
                • ⚠ Ada {jmlTerlambat} terlambat, segera tindak lanjuti!
              </b>
            )}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            href="/admin/alat"
            style={{
              background: "#FDE68A",
              border: "2px solid #1A1443",
              color: "#1A1443",
              padding: "11px 18px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            + Kelola Alat →
          </Link>
          <Link
            href="/"
            style={{
              background: "white",
              border: "2px solid #1A1443",
              color: "#1A1443",
              padding: "11px 18px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            🏠 Beranda
          </Link>
          <form action={logoutAdmin}>
            <button
              style={{
                background: "#FECDD3",
                color: "#881337",
                padding: "11px 18px",
                borderRadius: 999,
                fontWeight: 900,
                border: "2px solid #1A1443",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Keluar →
            </button>
          </form>
        </div>
      </div>

      {/* ============ 2. 4 KARTU STATISTIK! PASTEL GANTIAN! ============ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: 12,
          marginTop: 16,
        }}
      >
        {[
          [
            "📋",
            "Total Permohonan",
            total,
            "#EDE9FE",
            "Semua yang pernah masuk!",
          ],
          [
            "⏳",
            "Menunggu",
            jmlMenunggu,
            "#FEF3C7",
            "Butuh disetujui / ditolak!",
          ],
          [
            "📦",
            "Sedang Dipinjam",
            jmlDipinjam,
            "#DBEAFE",
            "Alat lagi di luar lab!",
          ],
          [
            "⚠",
            "Terlambat!",
            jmlTerlambat,
            "#FCE7F3",
            "Lewat tanggal kembali!",
          ],
        ].map(([icon, label, nilai, bg, desc]) => (
          <div
            key={label as string}
            style={{
              background: bg as string,
              border: "2px solid #1A1443",
              borderRadius: 20,
              padding: 16,
              color: "#1A1443",
              boxShadow: "3px 3px 0 #1A1443",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 26 }}>{icon}</span>
              <b style={{ fontSize: 28, lineHeight: 1 }}>{nilai}</b>
            </div>
            <b style={{ fontSize: 14, display: "block", marginTop: 8 }}>
              {label}
            </b>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#475569",
                marginTop: 2,
              }}
            >
              {desc}
            </div>
          </div>
        ))}
      </div>

      {/* ============ 3. KOTAK TERLAMBAT GEDE! JADI PINK PASTEL! ============ */}
      {jmlTerlambat > 0 && filter !== "terlambat" && (
        <Link
          href="/admin?status=terlambat"
          style={{
            display: "block",
            marginTop: 14,
            background: "#FFE4E6",
            border: "2px solid #FB7185",
            color: "#881337",
            padding: 16,
            borderRadius: 20,
            textDecoration: "none",
            boxShadow: "3px 3px 0 #1A1443",
          }}
        >
          <b style={{ fontSize: 15 }}>
            ⚠ ADA {jmlTerlambat} PEMINJAMAN TERLAMBAT! KLIK DI SINI →
          </b>
          <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 600 }}>
            Ada yang belum kembalikan padahal udah lewat tanggal kembali! Segera
            hubungi peminjam-nya!
          </p>
        </Link>
      )}

      {/* ============ 4. FILTER TOMBOL WARNA + ANGKA! JADI PUTIH + PASTEL! ============ */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
        {filters.map((f) => (
          <Link
            key={f.key}
            href={f.key === "Semua" ? "/admin" : `/admin?status=${f.key}`}
            style={{
              background: filter === f.key ? f.activeBg : "white",
              color: "#1A1443",
              padding: "10px 16px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
              fontSize: 13,
              border: "2px solid #1A1443",
              boxShadow: filter === f.key ? "3px 3px 0 #1A1443" : "none",
            }}
          >
            {f.label} ({f.count})
          </Link>
        ))}
      </div>

      {/* ============ 5. LIST PEMINJAMAN! JADI PUTIH! ============ */}
      {list.length === 0 ? (
        <div
          style={{
            background: "white",
            border: "2px solid #1A1443",
            borderRadius: 24,
            padding: 32,
            textAlign: "center",
            marginTop: 16,
            boxShadow: "4px 4px 0 #1A1443",
          }}
        >
          <div style={{ fontSize: 48 }}>🎉</div>
          <b style={{ color: "#1A1443", fontSize: 18 }}>
            Gak Ada Permohonan di Filter Ini!
          </b>
          <p
            style={{
              color: "#64748B",
              fontSize: 13,
              fontWeight: 600,
              margin: "6px 0 0",
            }}
          >
            Coba filter lain, atau tunggu ada siswa yang ajukan!
          </p>
          <Link
            href="/admin"
            style={{
              display: "inline-block",
              marginTop: 12,
              background: "#1A1443",
              color: "white",
              padding: "11px 20px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            Lihat Semua →
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          {list.map((x: any) => {
            const terlambat = isTerlambat(x);
            const hariTelat = hitungHariTerlambat(x);
            const badge = badgeStatus(x.status, terlambat);
            return (
              <div
                key={x.id}
                style={{
                  background: "white",
                  border: terlambat ? "2px solid #EF4444" : "2px solid #1A1443",
                  borderRadius: 20,
                  padding: 16,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                  gap: 14,
                  boxShadow: "3px 3px 0 #1A1443",
                }}
              >
                {/* KIRI: FOTO + DETAIL! */}
                <div style={{ display: "flex", gap: 12 }}>
                  <img
                    src={gambarAlat(
                      x.alat?.kategori || "aksesoris",
                      x.alat?.nama || "",
                    )}
                    alt={x.alat?.nama}
                    style={{
                      width: 90,
                      height: 90,
                      objectFit: "cover",
                      borderRadius: 16,
                      flexShrink: 0,
                      border: "2px solid #1A1443",
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <b style={{ color: "#1A1443", fontSize: 15 }}>
                        #{x.id} •{" "}
                        {iconAlat(x.alat?.kategori || "", x.alat?.nama || "")}{" "}
                        {x.alat?.nama}
                      </b>
                      <span
                        style={{
                          background: badge.bg,
                          color: badge.color,
                          fontSize: 11,
                          fontWeight: 900,
                          padding: "4px 10px",
                          borderRadius: 999,
                          border: "2px solid #1A1443",
                        }}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#475569",
                        fontSize: 13,
                        fontWeight: 600,
                        marginTop: 6,
                        lineHeight: 1.6,
                      }}
                    >
                      👤 <b style={{ color: "#1A1443" }}>{x.peminjam}</b> • 🏫{" "}
                      {x.kelas} • 📦{" "}
                      <b style={{ color: "#1A1443" }}>{x.jumlah} unit</b>
                      <br />
                      📅 {tglIndo(x.tgl_pinjam)} → {tglIndo(x.tgl_kembali)}
                      <br />
                      🎯 {x.keperluan}
                    </div>
                    {x.status === "ditolak" && (
                      <div
                        style={{
                          background: "#FFE4E6",
                          border: "2px solid #FB7185",
                          color: "#881337",
                          padding: 8,
                          borderRadius: 10,
                          marginTop: 8,
                          fontSize: 12,
                          fontWeight: 800,
                        }}
                      >
                        ❌ Alasan Ditolak: {x.alasan_tolak}
                      </div>
                    )}
                    {x.status === "dikembalikan" && x.kondisi_kembali && (
                      <div
                        style={{
                          background: "#D1FAE5",
                          border: "2px solid #34D399",
                          color: "#065F46",
                          padding: 8,
                          borderRadius: 10,
                          marginTop: 8,
                          fontSize: 12,
                          fontWeight: 800,
                        }}
                      >
                        ✅ Dikembalikan • Kondisi: {x.kondisi_kembali}
                      </div>
                    )}
                  </div>
                </div>

                {/* KANAN: TERLAMBAT + TOMBOL AKSI! */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  {terlambat && (
                    <div
                      style={{
                        background: "#FFE4E6",
                        border: "2px solid #FB7185",
                        color: "#881337",
                        padding: 10,
                        borderRadius: 12,
                        fontWeight: 900,
                        fontSize: 12,
                      }}
                    >
                      ⚠ TERLAMBAT {hariTelat} HARI! Harusnya kembali{" "}
                      {tglIndo(x.tgl_kembali)}!
                    </div>
                  )}
                  {x.status === "menunggu" && (
                    <div style={{ display: "grid", gap: 8 }}>
                      <form action={setujui}>
                        <input type="hidden" name="id" value={x.id} />
                        <button
                          style={{
                            width: "100%",
                            background: "#D1FAE5",
                            color: "#065F46",
                            padding: "12px",
                            borderRadius: 999,
                            fontWeight: 900,
                            border: "2px solid #1A1443",
                            cursor: "pointer",
                            fontSize: 13,
                          }}
                        >
                          ✅ Serahkan Alat Ini
                        </button>
                      </form>
                      <form action={tolak} style={{ display: "flex", gap: 6 }}>
                        <input type="hidden" name="id" value={x.id} />
                        <input
                          name="alasan"
                          placeholder="Alasan tolak (wajib!)"
                          required
                          style={{
                            flex: 1,
                            padding: 11,
                            borderRadius: 999,
                            background: "white",
                            color: "#1A1443",
                            border: "2px solid #1A1443",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        />
                        <button
                          style={{
                            background: "#FECDD3",
                            color: "#881337",
                            padding: "11px 16px",
                            borderRadius: 999,
                            fontWeight: 900,
                            border: "2px solid #1A1443",
                            cursor: "pointer",
                            fontSize: 13,
                          }}
                        >
                          ❌ Tolak
                        </button>
                      </form>
                    </div>
                  )}
                  {x.status === "dipinjam" && (
                    <form
                      action={kembalikan}
                      style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                    >
                      <input type="hidden" name="id" value={x.id} />
                      <select
                        name="kondisi"
                        required
                        style={{
                          flex: 1,
                          padding: 11,
                          borderRadius: 999,
                          background: "white",
                          color: "#1A1443",
                          border: "2px solid #1A1443",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        <option value="">-- Kondisi Kembali --</option>
                        <option value="baik">✅ Baik</option>
                        <option value="rusak ringan">⚠ Rusak Ringan</option>
                        <option value="rusak berat">❌ Rusak Berat</option>
                      </select>
                      <button
                        style={{
                          background: "#1A1443",
                          color: "white",
                          padding: "11px 16px",
                          borderRadius: 999,
                          fontWeight: 900,
                          border: "2px solid #1A1443",
                          cursor: "pointer",
                          fontSize: 13,
                        }}
                      >
                        📦 Kembalikan
                      </button>
                    </form>
                  )}
                  {(x.status === "dikembalikan" || x.status === "ditolak") && (
                    <div
                      style={{
                        background: "#FFF7ED",
                        border: "2px solid #1A1443",
                        color: "#475569",
                        padding: 10,
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      {x.status === "dikembalikan"
                        ? "✅ Selesai! Gak ada aksi lagi."
                        : "❌ Ditolak! Gak ada aksi lagi."}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
