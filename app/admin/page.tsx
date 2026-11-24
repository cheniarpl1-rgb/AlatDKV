// app/admin/page.tsx - Admin AlatDKV - JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!
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

  // Warna badge status!
  const badgeStatus = (status: string, terlambat: boolean) => {
    if (terlambat)
      return { bg: "#7F1D1D", color: "#FECACA", label: "⚠ TERLAMBAT!" };
    if (status === "menunggu")
      return { bg: "#78350F", color: "#FDE68A", label: "⏳ MENUNGGU" };
    if (status === "dipinjam")
      return { bg: "#1E40AF", color: "#BFDBFE", label: "📦 DIPINJAM" };
    if (status === "dikembalikan")
      return { bg: "#14532D", color: "#BBF7D0", label: "✅ DIKEMBALIKAN" };
    if (status === "ditolak")
      return { bg: "#7F1D1D", color: "#FECACA", label: "❌ DITOLAK" };
    return { bg: "#374151", color: "white", label: status.toUpperCase() };
  };

  const filters = [
    {
      key: "Semua",
      label: "📋 Semua",
      count: total,
      activeBg: "linear-gradient(90deg,#F59E0B,#EC4899)",
    },
    {
      key: "menunggu",
      label: "⏳ Menunggu",
      count: jmlMenunggu,
      activeBg: "linear-gradient(90deg,#F59E0B,#F97316)",
    },
    {
      key: "dipinjam",
      label: "📦 Dipinjam",
      count: jmlDipinjam,
      activeBg: "linear-gradient(90deg,#3B82F6,#22D3EE)",
    },
    {
      key: "dikembalikan",
      label: "✅ Dikembalikan",
      count: jmlKembali,
      activeBg: "linear-gradient(90deg,#10B981,#22D3EE)",
    },
    {
      key: "ditolak",
      label: "❌ Ditolak",
      count: jmlTolak,
      activeBg: "linear-gradient(90deg,#EF4444,#F97316)",
    },
    {
      key: "terlambat",
      label: "⚠ Terlambat",
      count: jmlTerlambat,
      activeBg: "linear-gradient(90deg,#DC2626,#F97316)",
    },
  ];

  return (
    <div>
      {/* ============ 1. HEADER ADMIN! 👈 UPGRADE! ============ */}
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
              background: "white",
              color: "#6D28D9",
              fontSize: 11,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 999,
            }}
          >
            🛠 DASHBOARD ADMIN • LAB DKV
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
            Admin AlatDKV
            <span
              style={{
                background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {" "}
              ({list.length})
            </span>
          </h1>
          <p style={{ color: "#C4B5FD", fontSize: 13, margin: "6px 0 0" }}>
            {filter === "Semua"
              ? "Semua permohonan, dari yang terbaru!"
              : `Filter: ${filter.toUpperCase()} • ${list.length} permohonan!`}
            {jmlTerlambat > 0 && (
              <b style={{ color: "#FCA5A5" }}>
                {" "}
                - ⚠ Ada {jmlTerlambat} terlambat, segera tindak lanjuti!
              </b>
            )}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            href="/admin/alat"
            style={{
              background: "white",
              color: "#6D28D9",
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
              background: "#1E103A",
              border: "1px solid #4C1D95",
              color: "white",
              padding: "11px 18px",
              borderRadius: 999,
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            🏠 Beranda
          </Link>
          <form action={logoutAdmin}>
            <button
              style={{
                background: "#7F1D1D",
                color: "white",
                padding: "11px 18px",
                borderRadius: 999,
                fontWeight: 900,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Keluar →
            </button>
          </form>
        </div>
      </div>

      {/* ============ 2. 4 KARTU STATISTIK! 👈 BARU! ============ */}
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
            "linear-gradient(135deg,#7C3AED,#A855F7)",
            "Semua yang pernah masuk!",
          ],
          [
            "⏳",
            "Menunggu",
            jmlMenunggu,
            "linear-gradient(135deg,#F59E0B,#F97316)",
            "Butuh disetujui / ditolak!",
          ],
          [
            "📦",
            "Sedang Dipinjam",
            jmlDipinjam,
            "linear-gradient(135deg,#3B82F6,#22D3EE)",
            "Alat lagi di luar lab!",
          ],
          [
            "⚠",
            "Terlambat!",
            jmlTerlambat,
            "linear-gradient(135deg,#DC2626,#F97316)",
            "Lewat tanggal kembali!",
          ],
        ].map(([icon, label, nilai, bg, desc]) => (
          <div
            key={label as string}
            style={{
              background: bg as string,
              borderRadius: 20,
              padding: 16,
              color: "white",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
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
            <div style={{ fontSize: 11, opacity: 0.9, marginTop: 2 }}>
              {desc}
            </div>
          </div>
        ))}
      </div>

      {/* ============ 3. KOTAK TERLAMBAT GEDE! 👈 BARU! WAJIB DI SOAL! ============ */}
      {jmlTerlambat > 0 && filter !== "terlambat" && (
        <Link
          href="/admin?status=terlambat"
          style={{
            display: "block",
            marginTop: 14,
            background: "#7F1D1D",
            border: "2px solid #EF4444",
            color: "white",
            padding: 16,
            borderRadius: 20,
            textDecoration: "none",
          }}
        >
          <b style={{ fontSize: 15 }}>
            ⚠ ADA {jmlTerlambat} PEMINJAMAN TERLAMBAT! KLIK DI SINI →
          </b>
          <p style={{ margin: "4px 0 0", fontSize: 13, opacity: 0.9 }}>
            Ada yang belum kembalikan padahal udah lewat tanggal kembali! Segera
            hubungi peminjam-nya!
          </p>
        </Link>
      )}

      {/* ============ 4. FILTER TOMBOL WARNA + ANGKA! 👈 UPGRADE! ============ */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
        {filters.map((f) => (
          <Link
            key={f.key}
            href={f.key === "Semua" ? "/admin" : `/admin?status=${f.key}`}
            style={{
              background: filter === f.key ? f.activeBg : "#1E103A",
              color: "white",
              padding: "10px 16px",
              borderRadius: 999,
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 13,
              border: "1px solid #4C1D95",
              boxShadow:
                filter === f.key ? "0 5px 20px rgba(236,72,153,0.3)" : "none",
            }}
          >
            {f.label} ({f.count})
          </Link>
        ))}
      </div>

      {/* ============ 5. LIST PEMINJAMAN! 👈 UPGRADE TOTAL! ============ */}
      {list.length === 0 ? (
        <div
          style={{
            background: "#1E103A",
            border: "1px solid #4C1D95",
            borderRadius: 24,
            padding: 32,
            textAlign: "center",
            marginTop: 16,
          }}
        >
          <div style={{ fontSize: 48 }}>🎉</div>
          <b style={{ color: "white", fontSize: 18 }}>
            Gak Ada Permohonan di Filter Ini!
          </b>
          <p style={{ color: "#C4B5FD", fontSize: 13, margin: "6px 0 0" }}>
            Coba filter lain, atau tunggu ada siswa yang ajukan!
          </p>
          <Link
            href="/admin"
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
                  background: "#1E103A",
                  border: terlambat ? "2px solid #EF4444" : "1px solid #4C1D95",
                  borderRadius: 20,
                  padding: 16,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                  gap: 14,
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
                      border: "1px solid #4C1D95",
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
                      <b style={{ color: "white", fontSize: 15 }}>
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
                        }}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#C4B5FD",
                        fontSize: 13,
                        marginTop: 6,
                        lineHeight: 1.6,
                      }}
                    >
                      👤 <b style={{ color: "white" }}>{x.peminjam}</b> • 🏫{" "}
                      {x.kelas} • 📦{" "}
                      <b style={{ color: "white" }}>{x.jumlah} unit</b>
                      <br />
                      📅 {tglIndo(x.tgl_pinjam)} → {tglIndo(x.tgl_kembali)}
                      <br />
                      🎯 {x.keperluan}
                    </div>
                    {x.status === "ditolak" && (
                      <div
                        style={{
                          background: "#7F1D1D",
                          color: "#FECACA",
                          padding: 8,
                          borderRadius: 10,
                          marginTop: 8,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        ❌ Alasan Ditolak: {x.alasan_tolak}
                      </div>
                    )}
                    {x.status === "dikembalikan" && x.kondisi_kembali && (
                      <div
                        style={{
                          background: "#14532D",
                          color: "#BBF7D0",
                          padding: 8,
                          borderRadius: 10,
                          marginTop: 8,
                          fontSize: 12,
                          fontWeight: 700,
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
                        background: "#7F1D1D",
                        border: "1px solid #EF4444",
                        color: "white",
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
                            background: "#16A34A",
                            color: "white",
                            padding: "12px",
                            borderRadius: 999,
                            fontWeight: 900,
                            border: "none",
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
                            background: "#120826",
                            color: "white",
                            border: "1px solid #4C1D95",
                            fontSize: 13,
                          }}
                        />
                        <button
                          style={{
                            background: "#DC2626",
                            color: "white",
                            padding: "11px 16px",
                            borderRadius: 999,
                            fontWeight: 900,
                            border: "none",
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
                          background: "#120826",
                          color: "white",
                          border: "1px solid #4C1D95",
                          fontSize: 13,
                        }}
                      >
                        <option value="">-- Kondisi Kembali --</option>
                        <option value="baik">✅ Baik</option>
                        <option value="rusak ringan">⚠ Rusak Ringan</option>
                        <option value="rusak berat">❌ Rusak Berat</option>
                      </select>
                      <button
                        style={{
                          background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                          color: "white",
                          padding: "11px 16px",
                          borderRadius: 999,
                          fontWeight: 900,
                          border: "none",
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
                        background: "#120826",
                        border: "1px solid #4C1D95",
                        color: "#A78BFA",
                        padding: 10,
                        borderRadius: 12,
                        fontSize: 12,
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
