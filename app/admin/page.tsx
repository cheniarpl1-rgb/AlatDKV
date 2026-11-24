// app/admin/page.tsx - Admin AlatDKV - Tema Feminim Pastel
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
  await connection();

  const p = await searchParams;
  const filter = p.status || "Semua";

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

  const total = all.length;
  const jmlMenunggu = all.filter((x: any) => x.status === "menunggu").length;
  const jmlDipinjam = all.filter((x: any) => x.status === "dipinjam").length;
  const jmlTerlambat = all.filter(isTerlambat).length;
  const jmlKembali = all.filter((x: any) => x.status === "dikembalikan").length;
  const jmlTolak = all.filter((x: any) => x.status === "ditolak").length;

  let list = all;
  if (filter === "terlambat") list = all.filter(isTerlambat);
  else if (filter !== "Semua")
    list = all.filter((x: any) => x.status === filter);

  const badgeStatus = (status: string, terlambat: boolean) => {
    if (terlambat)
      return { bg: "#FADBD8", color: "#78281F", label: "⚠ TERLAMBAT!" };
    if (status === "menunggu")
      return { bg: "#FCF3CF", color: "#7D6608", label: "⏳ MENUNGGU" };
    if (status === "dipinjam")
      return { bg: "#EBF5FB", color: "#1B4F72", label: "📦 DIPINJAM" };
    if (status === "dikembalikan")
      return { bg: "#E8F8F5", color: "#117A65", label: "✅ DIKEMBALIKAN" };
    if (status === "ditolak")
      return { bg: "#FADBD8", color: "#78281F", label: "❌ DITOLAK" };
    return { bg: "#F2F4F4", color: "#2C3E50", label: status.toUpperCase() };
  };

  const filters = [
    {
      key: "Semua",
      label: "📋 Semua",
      count: total,
      activeBg: "linear-gradient(90deg,#FFB6C1,#DDA0DD)",
    },
    {
      key: "menunggu",
      label: "⏳ Menunggu",
      count: jmlMenunggu,
      activeBg: "linear-gradient(90deg,#FFDAB9,#FFE4B5)",
    },
    {
      key: "dipinjam",
      label: "📦 Dipinjam",
      count: jmlDipinjam,
      activeBg: "linear-gradient(90deg,#AFEEEE,#98FB98)",
    },
    {
      key: "dikembalikan",
      label: "✅ Dikembalikan",
      count: jmlKembali,
      activeBg: "linear-gradient(135deg,#98FB98,#AFEEEE)",
    },
    {
      key: "ditolak",
      label: "❌ Ditolak",
      count: jmlTolak,
      activeBg: "linear-gradient(135deg,#FFC0CB,#FFB6C1)",
    },
    {
      key: "terlambat",
      label: "⚠ Terlambat",
      count: jmlTerlambat,
      activeBg: "linear-gradient(135deg,#F5B7B1,#FADBD8)",
    },
  ];

  return (
    <div>
      {/* ============ HEADER ADMIN PASTEL ============ */}
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
              background: "#FFB6C1",
              color: "#4A3B5C",
              fontSize: 11,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 999,
            }}
          >
            🌸 DASHBOARD ADMIN • LAB DKV
          </span>
          <h1
            style={{
              color: "#4A3B5C",
              fontSize: 32,
              fontWeight: 900,
              margin: "10px 0 0",
              lineHeight: 1.1,
            }}
          >
            Admin AlatDKV
            <span
              style={{
                background: "linear-gradient(90deg,#DB7093,#9370DB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {" "}
              ({list.length})
            </span>
          </h1>
          <p style={{ color: "#705888", fontSize: 13, margin: "6px 0 0" }}>
            {filter === "Semua"
              ? "Semua permohonan peminjaman alat."
              : `Filter: ${filter.toUpperCase()} • ${list.length} permohonan`}
            {jmlTerlambat > 0 && (
              <b style={{ color: "#C0392B" }}>
                {" "}
                - ⚠ Ada {jmlTerlambat} terlambat!
              </b>
            )}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            href="/admin/alat"
            style={{
              background: "linear-gradient(90deg,#FFB6C1,#DDA0DD)",
              color: "#4A3B5C",
              padding: "11px 18px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
              fontSize: 13,
              boxShadow: "0 8px 20px rgba(255,182,193,0.4)",
            }}
          >
            + Kelola Alat →
          </Link>
          <Link
            href="/"
            style={{
              background: "#FFF5F7",
              border: "1px solid rgba(221,160,221,0.5)",
              color: "#5B4B6E",
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
                background: "#FADBD8",
                color: "#78281F",
                padding: "11px 18px",
                borderRadius: 999,
                fontWeight: 900,
                border: "1px solid #F5B7B1",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Keluar →
            </button>
          </form>
        </div>
      </div>

      {/* ============ 4 KARTU STATISTIK PASTEL ============ */}
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
            "linear-gradient(135deg,#FFB6C1,#FFC0CB)",
            "Semua riwayat",
          ],
          [
            "⏳",
            "Menunggu",
            jmlMenunggu,
            "linear-gradient(135deg,#FFDAB9,#FFE4B5)",
            "Perlu ditinjau",
          ],
          [
            "📦",
            "Dipinjam",
            jmlDipinjam,
            "linear-gradient(135deg,#AFEEEE,#98FB98)",
            "Alat di luar lab",
          ],
          [
            "⚠",
            "Terlambat",
            jmlTerlambat,
            "linear-gradient(135deg,#F5B7B1,#FADBD8)",
            "Lewat tenggat",
          ],
        ].map(([icon, label, nilai, bg, desc]) => (
          <div
            key={label as string}
            style={{
              background: bg as string,
              borderRadius: 20,
              padding: 16,
              color: "#4A3B5C",
              boxShadow: "0 10px 25px rgba(221,160,221,0.2)",
              border: "1px solid rgba(255,255,255,0.6)",
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
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>
              {desc}
            </div>
          </div>
        ))}
      </div>

      {/* ============ KOTAK TERLAMBAT ============ */}
      {jmlTerlambat > 0 && filter !== "terlambat" && (
        <Link
          href="/admin?status=terlambat"
          style={{
            display: "block",
            marginTop: 14,
            background: "#FADBD8",
            border: "2px solid #F5B7B1",
            color: "#78281F",
            padding: 16,
            borderRadius: 20,
            textDecoration: "none",
          }}
        >
          <b style={{ fontSize: 15 }}>
            ⚠ ADA {jmlTerlambat} PEMINJAMAN TERLAMBAT! KLIK DI SINI →
          </b>
        </Link>
      )}

      {/* ============ TOMBOL FILTER ============ */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
        {filters.map((f) => (
          <Link
            key={f.key}
            href={f.key === "Semua" ? "/admin" : `/admin?status=${f.key}`}
            style={{
              background: filter === f.key ? f.activeBg : "#FFFFFF",
              color: "#4A3B5C",
              padding: "10px 16px",
              borderRadius: 999,
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 13,
              border: "1px solid rgba(221,160,221,0.5)",
              boxShadow:
                filter === f.key ? "0 4px 15px rgba(221,160,221,0.4)" : "none",
            }}
          >
            {f.label} ({f.count})
          </Link>
        ))}
      </div>

      {/* ============ DAFTAR PERMOHONAN ============ */}
      {list.length === 0 ? (
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(221,160,221,0.4)",
            borderRadius: 24,
            padding: 32,
            textAlign: "center",
            marginTop: 16,
            color: "#5B4B6E",
          }}
        >
          <div style={{ fontSize: 48 }}>🌸</div>
          <b style={{ fontSize: 18 }}>Tidak Ada Permohonan</b>
          <p style={{ fontSize: 13, marginTop: 4 }}>
            Belum ada data pada filter ini.
          </p>
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
                  background: "#FFFFFF",
                  border: terlambat
                    ? "2px solid #F5B7B1"
                    : "1px solid rgba(221,160,221,0.4)",
                  borderRadius: 20,
                  padding: 16,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                  gap: 14,
                  boxShadow: "0 10px 25px rgba(221,160,221,0.15)",
                }}
              >
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
                      border: "1px solid rgba(221,160,221,0.5)",
                    }}
                  />
                  <div style={{ minWidth: 0, color: "#4A3B5C" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <b style={{ fontSize: 15 }}>
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
                        color: "#705888",
                        fontSize: 13,
                        marginTop: 6,
                        lineHeight: 1.6,
                      }}
                    >
                      👤 <b>{x.peminjam}</b> • 🏫 {x.kelas} • 📦{" "}
                      <b>{x.jumlah} unit</b>
                      <br />
                      📅 {tglIndo(x.tgl_pinjam)} → {tglIndo(x.tgl_kembali)}
                      <br />
                      🎯 {x.keperluan}
                    </div>
                  </div>
                </div>

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
                        background: "#FADBD8",
                        border: "1px solid #F5B7B1",
                        color: "#78281F",
                        padding: 10,
                        borderRadius: 12,
                        fontWeight: 900,
                        fontSize: 12,
                      }}
                    >
                      ⚠ TERLAMBAT {hariTelat} HARI!
                    </div>
                  )}
                  {x.status === "menunggu" && (
                    <div style={{ display: "grid", gap: 8 }}>
                      <form action={setujui}>
                        <input type="hidden" name="id" value={x.id} />
                        <button
                          style={{
                            width: "100%",
                            background: "#A3E4D7",
                            color: "#0E6655",
                            padding: "12px",
                            borderRadius: 999,
                            fontWeight: 900,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 13,
                          }}
                        >
                          ✅ Setujui & Serahkan
                        </button>
                      </form>
                      <form action={tolak} style={{ display: "flex", gap: 6 }}>
                        <input type="hidden" name="id" value={x.id} />
                        <input
                          name="alasan"
                          placeholder="Alasan tolak..."
                          required
                          style={{
                            flex: 1,
                            padding: 11,
                            borderRadius: 999,
                            background: "#FFF5F7",
                            color: "#4A3B5C",
                            border: "1px solid rgba(221,160,221,0.6)",
                            fontSize: 13,
                          }}
                        />
                        <button
                          style={{
                            background: "#F5B7B1",
                            color: "#78281F",
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
                          background: "#FFF5F7",
                          color: "#4A3B5C",
                          border: "1px solid rgba(221,160,221,0.6)",
                          fontSize: 13,
                        }}
                      >
                        <option value="">-- Kondisi --</option>
                        <option value="baik">✅ Baik</option>
                        <option value="rusak ringan">⚠ Rusak Ringan</option>
                        <option value="rusak berat">❌ Rusak Berat</option>
                      </select>
                      <button
                        style={{
                          background: "linear-gradient(90deg,#FFB6C1,#DDA0DD)",
                          color: "#4A3B5C",
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
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
