// app/cek/page.tsx - Cek Status AlatDKV - Tema Feminim Pastel
import { supabaseRahasia } from "@/lib/supabase";
import { tglIndo } from "@/lib/validasi";
import { gambarAlat, iconAlat } from "@/lib/gambar";
import Link from "next/link";
import { connection } from "next/server";

export default async function Cek({
  searchParams,
}: {
  searchParams: Promise<{ nomor?: string; nama?: string; sukses?: string }>;
}) {
  await connection();

  const p = await searchParams;
  let hasil: any = null;
  let err = "";
  if (p.nomor && p.nama) {
    const { data } = await supabaseRahasia()
      .from("peminjaman_alat")
      .select("*, alat(nama,kategori)")
      .eq("id", Number(p.nomor))
      .eq("peminjam", p.nama)
      .single();
    if (!data)
      err =
        "Nomor dan nama tidak cocok! Cek lagi ya! Pastikan persis sama waktu mengajukan!";
    else hasil = data;
  }

  const today = new Date().toISOString().slice(0, 10);
  const terlambat =
    hasil && hasil.status === "dipinjam" && today > hasil.tgl_kembali;
  const hariTerlambat = terlambat
    ? Math.round(
        (new Date(today).getTime() - new Date(hasil.tgl_kembali).getTime()) /
          86400000,
      )
    : 0;
  const baruSukses = p.sukses === "1" && p.nomor;

  const statusInfo: Record<
    string,
    { warna: string; bg: string; emoji: string; teks: string }
  > = {
    menunggu: {
      warna: "#FFB6C1",
      bg: "linear-gradient(135deg,#FFB6C1,#FFDAB9)",
      emoji: "⏳",
      teks: "MENUNGGU",
    },
    dipinjam: {
      warna: "#ADD8E6",
      bg: "linear-gradient(135deg,#AFEEEE,#E6E6FA)",
      emoji: "📦",
      teks: "DIPINJAM",
    },
    dikembalikan: {
      warna: "#98FB98",
      bg: "linear-gradient(135deg,#98FB98,#AFEEEE)",
      emoji: "✅",
      teks: "DIKEMBALIKAN",
    },
    ditolak: {
      warna: "#FFC0CB",
      bg: "linear-gradient(135deg,#FFC0CB,#FFB6C1)",
      emoji: "❌",
      teks: "DITOLAK",
    },
  };
  const info = hasil ? statusInfo[hasil.status] || statusInfo.menunggu : null;

  const stepAktif = !hasil
    ? 0
    : hasil.status === "menunggu"
      ? 0
      : hasil.status === "dipinjam"
        ? 1
        : hasil.status === "dikembalikan"
          ? 2
          : 0;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {/* ============ HERO BANNER PASTEL ============ */}
      <div
        style={{
          borderRadius: 28,
          overflow: "hidden",
          position: "relative",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0 20px 40px rgba(221,160,221,0.25)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1600&auto=format&fit=crop"
          alt="Cek Status"
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.9)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,240,245,0.2), rgba(74,59,92,0.85))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "22px 22px",
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.9)",
              color: "#8A2BE2",
              fontSize: 11,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 999,
              width: "fit-content",
            }}
          >
            🌸 CEK STATUS • NOMOR + NAMA HARUS COCOK
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
            Lacak Pinjamanmu,
            <br />
            <span
              style={{
                background: "linear-gradient(90deg,#FFB6C1,#FFDAB9,#E6E6FA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mudah & Realtime!
            </span>
          </h1>
        </div>
      </div>

      {baruSukses && (
        <div
          style={{
            marginTop: 14,
            background: "#E8F8F5",
            border: "1px solid #A3E4D7",
            borderRadius: 20,
            padding: 18,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            color: "#117A65",
          }}
        >
          <span style={{ fontSize: 28 }}>🎉</span>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: 16 }}>Pengajuan Berhasil Dikirim!</b>
            <p style={{ fontSize: 13, margin: "4px 0 0", lineHeight: 1.6 }}>
              Nomor peminjaman kamu adalah{" "}
              <b style={{ fontSize: 16 }}>#{p.nomor}</b>
            </p>
          </div>
        </div>
      )}

      {/* ============ FORM CEK STATUS ============ */}
      <form
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(221,160,221,0.4)",
          borderRadius: 24,
          padding: 20,
          display: "grid",
          gap: 12,
          marginTop: 16,
          boxShadow: "0 10px 25px rgba(221,160,221,0.15)",
        }}
      >
        <label style={{ color: "#4A3B5C", fontWeight: 800, fontSize: 13 }}>
          Nomor Peminjaman (ID) *
          <input
            name="nomor"
            placeholder="Contoh: 1, 2, 3..."
            defaultValue={p.nomor || ""}
            required
            style={{
              width: "100%",
              padding: 13,
              borderRadius: 13,
              background: "#FFF5F7",
              color: "#4A3B5C",
              border: "1px solid rgba(221,160,221,0.6)",
              marginTop: 6,
              fontSize: 14,
            }}
          />
        </label>
        <label style={{ color: "#4A3B5C", fontWeight: 800, fontSize: 13 }}>
          Nama Peminjam (Harus Persis!) *
          <input
            name="nama"
            placeholder="Contoh: Rina Putri"
            defaultValue={p.nama || ""}
            required
            style={{
              width: "100%",
              padding: 13,
              borderRadius: 13,
              background: "#FFF5F7",
              color: "#4A3B5C",
              border: "1px solid rgba(221,160,221,0.6)",
              marginTop: 6,
              fontSize: 14,
            }}
          />
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
          🔍 Cek Status →
        </button>
      </form>

      {err && (
        <div
          style={{
            background: "#FADBD8",
            border: "1px solid #F5B7B1",
            color: "#78281F",
            padding: 16,
            borderRadius: 20,
            marginTop: 14,
          }}
        >
          <b>Nomor & Nama Tidak Cocok!</b>
          <p style={{ margin: "4px 0 0", fontSize: 13, lineHeight: 1.6 }}>
            {err}
          </p>
        </div>
      )}

      {/* ============ HASIL PENCARIAN ============ */}
      {hasil && (
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              background: "#FFFFFF",
              border: terlambat
                ? "2px solid #F5B7B1"
                : "1px solid rgba(221,160,221,0.4)",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(221,160,221,0.15)",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={gambarAlat(
                  hasil.alat?.kategori || "",
                  hasil.alat?.nama || "",
                )}
                alt={hasil.alat?.nama}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div style={{ padding: 20, color: "#4A3B5C" }}>
              <b style={{ fontSize: 20, display: "block" }}>
                🎬 {hasil.alat?.nama}
              </b>
              <span style={{ color: "#705888", fontSize: 12 }}>
                ID Peminjaman: <b>#{hasil.id}</b> • Jumlah: {hasil.jumlah} unit
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
