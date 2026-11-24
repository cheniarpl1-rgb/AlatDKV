// app/ajukan/page.tsx - Ajukan Peminjaman AlatDKV - Tema Feminim Pastel
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
  await connection();

  const p = await searchParams;
  const { data: alat } = await supabasePublik()
    .from("alat")
    .select("*")
    .eq("aktif", true)
    .order("id");
  const listAlat = alat || [];

  const alatDipilih = listAlat.find(
    (a: any) => String(a.id) === String(p.alat_id),
  );

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
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop"
          alt="Ajukan Pinjam"
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
            🌸 FORMULIR PEMINJAMAN • 30 DETIK SELESAI
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
                background: "linear-gradient(90deg,#FFB6C1,#FFDAB9,#E6E6FA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tanpa Perlu Antre!
            </span>
          </h1>
        </div>
      </div>

      {pesanError && (
        <div
          style={{
            marginTop: 14,
            background: "#FFC0CB",
            border: "1px solid #DB7093",
            color: "#4A3B5C",
            padding: 16,
            borderRadius: 20,
            display: "flex",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 24 }}>⚠️</span>
          <div>
            <b>Pengajuan Gagal</b>
            <p style={{ margin: "4px 0 0", fontSize: 13, lineHeight: 1.6 }}>
              {pesanError}
            </p>
          </div>
        </div>
      )}

      {/* ============ LAYOUT FORMULIR & PREVIEW ============ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 16,
          marginTop: 16,
          alignItems: "start",
        }}
      >
        <form
          action={ajukanPinjam}
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(221,160,221,0.4)",
            borderRadius: 24,
            padding: 20,
            display: "grid",
            gap: 14,
            boxShadow: "0 10px 25px rgba(221,160,221,0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: 13,
                background: "linear-gradient(135deg,#FFB6C1,#DDA0DD)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              📝
            </span>
            <div>
              <b style={{ color: "#4A3B5C", fontSize: 17, display: "block" }}>
                Formulir Peminjaman
              </b>
              <span style={{ color: "#705888", fontSize: 12 }}>
                Lengkapi data di bawah ini dengan benar
              </span>
            </div>
          </div>

          <label style={{ color: "#4A3B5C", fontWeight: 800, fontSize: 13 }}>
            🎬 Pilih Alat *
            <select
              name="alat_id"
              defaultValue={p.alat_id || ""}
              required
              style={{
                width: "100%",
                padding: 13,
                borderRadius: 13,
                marginTop: 6,
                background: "#FFF5F7",
                color: "#4A3B5C",
                border: "1px solid rgba(221,160,221,0.6)",
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
          </label>

          <label style={{ color: "#4A3B5C", fontWeight: 800, fontSize: 13 }}>
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
                background: "#FFF5F7",
                color: "#4A3B5C",
                border: "1px solid rgba(221,160,221,0.6)",
                fontSize: 14,
              }}
            />
          </label>

          <label style={{ color: "#4A3B5C", fontWeight: 800, fontSize: 13 }}>
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
                background: "#FFF5F7",
                color: "#4A3B5C",
                border: "1px solid rgba(221,160,221,0.6)",
                fontSize: 14,
              }}
            />
          </label>

          <label style={{ color: "#4A3B5C", fontWeight: 800, fontSize: 13 }}>
            🎯 Keperluan *
            <input
              name="keperluan"
              required
              placeholder="Contoh: Tugas Akhir Fotografi"
              style={{
                width: "100%",
                padding: 13,
                borderRadius: 13,
                marginTop: 6,
                background: "#FFF5F7",
                color: "#4A3B5C",
                border: "1px solid rgba(221,160,221,0.6)",
                fontSize: 14,
              }}
            />
          </label>

          <label style={{ color: "#4A3B5C", fontWeight: 800, fontSize: 13 }}>
            📦 Jumlah Unit *
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
                background: "#FFF5F7",
                color: "#4A3B5C",
                border: "1px solid rgba(221,160,221,0.6)",
                fontSize: 14,
              }}
            />
          </label>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <label style={{ color: "#4A3B5C", fontWeight: 800, fontSize: 13 }}>
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
                  background: "#FFF5F7",
                  color: "#4A3B5C",
                  border: "1px solid rgba(221,160,221,0.6)",
                  fontSize: 14,
                }}
              />
            </label>
            <label style={{ color: "#4A3B5C", fontWeight: 800, fontSize: 13 }}>
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
                  background: "#FFF5F7",
                  color: "#4A3B5C",
                  border: "1px solid rgba(221,160,221,0.6)",
                  fontSize: 14,
                }}
              />
            </label>
          </div>

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
            Kirim Pengajuan →
          </button>
        </form>

        {/* PREVIEW ALAT */}
        <div>
          {alatDipilih ? (
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(221,160,221,0.4)",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(221,160,221,0.15)",
              }}
            >
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
              <div style={{ padding: 16 }}>
                <b style={{ color: "#4A3B5C", fontSize: 18, display: "block" }}>
                  {alatDipilih.nama}
                </b>
                <p style={{ color: "#705888", fontSize: 12, marginTop: 6 }}>
                  {alatDipilih.keterangan || "Alat Lab DKV siap pakai."}
                </p>
                <div style={{ marginTop: 12, color: "#4A3B5C", fontSize: 13 }}>
                  📦 Stok Total: <b>{alatDipilih.stok}</b> | Tersedia:{" "}
                  <b>{tersediaDipilih}</b>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(221,160,221,0.4)",
                borderRadius: 24,
                padding: 20,
                textAlign: "center",
                color: "#5B4B6E",
              }}
            >
              <div style={{ fontSize: 40 }}>🌸</div>
              <b style={{ fontSize: 16 }}>Belum Memilih Alat</b>
              <p style={{ fontSize: 13, color: "#705888" }}>
                Silakan pilih alat pada formulir di sebelah kiri.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
