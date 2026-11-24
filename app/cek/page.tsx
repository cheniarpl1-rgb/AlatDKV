// app/cek/page.tsx - Cek Status AlatDKV - JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!
// SESUAI SOAL E2: Cek status dengan nomor + nama (keduanya harus cocok!), tampil bila terlambat!
// FIX Next.js 16: Hapus `dynamic`, ganti `connection()`!

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
  // 👈 PENGGANTI `force-dynamic` DI NEXT.JS 16! WAJIB ADA!
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
        "Nomor dan nama tidak cocok! Cek lagi ya! Nomor dan nama harus persis sama kayak waktu kamu ajukan!";
    else hasil = data;
  }

  // Terlambat? = status dipinjam + hari ini > tgl_kembali!
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

  // Warna + Emoji per status!
  const statusInfo: Record<
    string,
    { warna: string; bg: string; emoji: string; teks: string }
  > = {
    menunggu: {
      warna: "#FBBF24",
      bg: "linear-gradient(135deg,#F59E0B,#F97316)",
      emoji: "⏳",
      teks: "MENUNGGU",
    },
    dipinjam: {
      warna: "#60A5FA",
      bg: "linear-gradient(135deg,#3B82F6,#22D3EE)",
      emoji: "📦",
      teks: "DIPINJAM",
    },
    dikembalikan: {
      warna: "#4ADE80",
      bg: "linear-gradient(135deg,#10B981,#22D3EE)",
      emoji: "✅",
      teks: "DIKEMBALIKAN",
    },
    ditolak: {
      warna: "#F87171",
      bg: "linear-gradient(135deg,#EF4444,#F97316)",
      emoji: "❌",
      teks: "DITOLAK",
    },
  };
  const info = hasil ? statusInfo[hasil.status] || statusInfo.menunggu : null;

  // Timeline: 0 = menunggu, 1 = dipinjam, 2 = dikembalikan
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
      {/* ============ 1. HERO + GAMBAR UNSPLASH! 👈 BARU! ============ */}
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
          src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1600&auto=format&fit=crop"
          alt="Cek Status"
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
            🔍 CEK STATUS • NOMOR + NAMA HARUS COCOK!
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
                background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Kayak Lacak Paket!
            </span>
          </h1>
          <p style={{ color: "#DDD6FE", fontSize: 13, margin: "8px 0 0" }}>
            Masukkan{" "}
            <b style={{ color: "white" }}>nomor peminjaman + nama peminjam</b> —
            keduanya harus persis! Kalau salah satu salah, gak akan ketemu!
          </p>
        </div>
      </div>

      {/* ============ 2. KOTAK SUKSES SETELAH AJUKAN! 👈 BARU! ============ */}
      {baruSukses && (
        <div
          style={{
            marginTop: 14,
            background: "linear-gradient(135deg,#14532D,#059669)",
            border: "1px solid #4ADE80",
            borderRadius: 20,
            padding: 18,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: 28 }}>🎉</span>
          <div style={{ flex: 1 }}>
            <b style={{ color: "white", fontSize: 16 }}>
              Pengajuan Berhasil Dikirim!
            </b>
            <p
              style={{
                color: "#BBF7D0",
                fontSize: 13,
                margin: "4px 0 0",
                lineHeight: 1.6,
              }}
            >
              Simpan nomor ini baik-baik! Nomor peminjaman kamu adalah{" "}
              <b style={{ color: "white", fontSize: 16 }}>#{p.nomor}</b>
              <br />
              Pakai nomor + nama kamu untuk cek status di bawah ini!
            </p>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 10,
                flexWrap: "wrap",
              }}
            >
              <Link
                href={`/cek?nomor=${p.nomor}&nama=${encodeURIComponent(p.nama || "")}`}
                style={{
                  background: "white",
                  color: "#065F46",
                  padding: "10px 16px",
                  borderRadius: 999,
                  fontWeight: 900,
                  textDecoration: "none",
                  fontSize: 13,
                }}
              >
                🔍 Cek Status Sekarang →
              </Link>
              <Link
                href="/alat"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: 999,
                  fontWeight: 800,
                  textDecoration: "none",
                  fontSize: 13,
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              >
                Lihat Alat Lain
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ============ 3. FORM CEK STATUS! (PUNYA LO, GUE UPGRADE!) ============ */}
      <form
        style={{
          background: "#1E103A",
          border: "1px solid #4C1D95",
          borderRadius: 24,
          padding: 20,
          display: "grid",
          gap: 12,
          marginTop: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
          Nomor Peminjaman (ID) *
          <input
            name="nomor"
            placeholder="Contoh: 1, 2, 3..."
            defaultValue={p.nomor || ""}
            required
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 14,
              background: "#120826",
              color: "white",
              border: "1px solid #4C1D95",
              marginTop: 6,
              fontSize: 14,
            }}
          />
          <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 400 }}>
            Nomor ini dikasih setelah kamu ajukan! Cek di halaman sukses / tanya
            admin!
          </span>
        </label>
        <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
          Nama Peminjam (Harus Persis!) *
          <input
            name="nama"
            placeholder="Contoh: Rina Putri"
            defaultValue={p.nama || ""}
            required
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 14,
              background: "#120826",
              color: "white",
              border: "1px solid #4C1D95",
              marginTop: 6,
              fontSize: 14,
            }}
          />
          <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 400 }}>
            Harus persis sama kayak waktu ajukan, termasuk huruf besar / kecil!
          </span>
        </label>
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
          🔍 Cek Status →
        </button>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            href="/ajukan"
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
            📝 Belum Ajukan? Ajukan Dulu!
          </Link>
          <Link
            href="/alat"
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
            🎬 Lihat Alat
          </Link>
        </div>
      </form>

      {/* ============ 4. PESAN ERROR! (PUNYA LO, GUE UPGRADE!) ============ */}
      {err && (
        <div
          style={{
            background: "#7F1D1D",
            border: "1px solid #EF4444",
            color: "white",
            padding: 16,
            borderRadius: 20,
            marginTop: 14,
            display: "flex",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 24 }}>❌</span>
          <div>
            <b>Nomor & Nama Tidak Cocok!</b>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                opacity: 0.9,
                lineHeight: 1.6,
              }}
            >
              {err}
            </p>
            <p style={{ margin: "8px 0 0", fontSize: 12, opacity: 0.8 }}>
              Tips: Cek lagi nomor-nya, pastikan nama-nya persis (Rina Putri ≠
              rina putri!). Kalau lupa nomor, tanya admin lab!
            </p>
          </div>
        </div>
      )}

      {/* ============ 5. HASIL + TIMELINE + FOTO ALAT! 👈 UPGRADE TOTAL! ============ */}
      {hasil && (
        <div style={{ marginTop: 16 }}>
          {/* Kartu Hasil Utama + Foto! */}
          <div
            style={{
              background: "linear-gradient(180deg,#2E1065,#1E103A)",
              border: terlambat ? "2px solid #EF4444" : "1px solid #4C1D95",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            {/* Foto Alat! */}
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
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(18,8,38,0.9))",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  padding: "14px 16px",
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
                  {iconAlat(hasil.alat?.kategori || "", hasil.alat?.nama || "")}
                </span>
                <span
                  style={{
                    background: info?.bg,
                    color: "white",
                    fontSize: 12,
                    fontWeight: 900,
                    padding: "7px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {info?.emoji} {info?.teks}
                </span>
              </div>
            </div>

            <div style={{ padding: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <b style={{ color: "white", fontSize: 20, display: "block" }}>
                    🎬 {hasil.alat?.nama}
                  </b>
                  <span style={{ color: "#C4B5FD", fontSize: 12 }}>
                    Nomor Peminjaman{" "}
                    <b style={{ color: "white" }}>#{hasil.id}</b> •{" "}
                    {hasil.jumlah} unit • Kategori {hasil.alat?.kategori}
                  </span>
                </div>
                <span
                  style={{
                    background: "#120826",
                    border: "1px solid #4C1D95",
                    color: "#C4B5FD",
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "6px 10px",
                    borderRadius: 999,
                  }}
                >
                  ID #{hasil.id}
                </span>
              </div>

              {/* Detail! */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                  gap: 10,
                  marginTop: 14,
                }}
              >
                {[
                  ["👤", "Peminjam", `${hasil.peminjam} • ${hasil.kelas}`],
                  ["📅", "Tanggal Pinjam", tglIndo(hasil.tgl_pinjam)],
                  ["📅", "Tanggal Kembali", tglIndo(hasil.tgl_kembali)],
                  ["🎯", "Keperluan", hasil.keperluan],
                ].map(([icon, label, nilai]) => (
                  <div
                    key={label}
                    style={{
                      background: "#120826",
                      border: "1px solid #4C1D95",
                      borderRadius: 14,
                      padding: 12,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{icon}</span>
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
                        lineHeight: 1.4,
                      }}
                    >
                      {nilai}
                    </b>
                  </div>
                ))}
              </div>

              {/* 👈 BARU! TIMELINE STATUS! KAYAK LACAK PAKET! */}
              {hasil.status !== "ditolak" && (
                <div
                  style={{
                    marginTop: 16,
                    background: "#120826",
                    border: "1px solid #4C1D95",
                    borderRadius: 16,
                    padding: 16,
                  }}
                >
                  <b style={{ color: "white", fontSize: 13 }}>
                    Perjalanan Pinjamanmu 📦
                  </b>
                  <div style={{ display: "flex", gap: 0, marginTop: 12 }}>
                    {[
                      ["⏳", "Menunggu", "Pengajuan dikirim"],
                      ["📦", "Dipinjam", "Alat sudah diambil"],
                      ["✅", "Dikembalikan", "Alat sudah kembali"],
                    ].map(([icon, judul, desc], i) => {
                      const aktif = i <= stepAktif;
                      const sekarang = i === stepAktif;
                      return (
                        <div
                          key={judul}
                          style={{
                            flex: 1,
                            textAlign: "center",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: "50%",
                              margin: "0 auto",
                              background: aktif
                                ? "linear-gradient(135deg,#F59E0B,#EC4899)"
                                : "#1E103A",
                              border: sekarang
                                ? "3px solid #FDE68A"
                                : "1px solid #4C1D95",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 18,
                              boxShadow: sekarang
                                ? "0 0 0 4px rgba(245,158,11,0.25)"
                                : "none",
                            }}
                          >
                            {icon}
                          </div>
                          <b
                            style={{
                              color: aktif ? "white" : "#A78BFA",
                              fontSize: 12,
                              display: "block",
                              marginTop: 6,
                            }}
                          >
                            {judul}
                          </b>
                          <div style={{ color: "#A78BFA", fontSize: 11 }}>
                            {desc}
                          </div>
                          {sekarang && (
                            <span
                              style={{
                                display: "inline-block",
                                marginTop: 4,
                                background: "#F59E0B",
                                color: "#120826",
                                fontSize: 10,
                                fontWeight: 900,
                                padding: "3px 8px",
                                borderRadius: 999,
                              }}
                            >
                              KAMU DI SINI!
                            </span>
                          )}
                          {i < 2 && (
                            <div
                              style={{
                                position: "absolute",
                                top: 22,
                                left: "60%",
                                right: "-40%",
                                height: 3,
                                background:
                                  i < stepAktif
                                    ? "linear-gradient(90deg,#F59E0B,#EC4899)"
                                    : "#4C1D95",
                                borderRadius: 999,
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pesan per status! */}
              {terlambat && (
                <div
                  style={{
                    background: "#7F1D1D",
                    border: "1px solid #EF4444",
                    color: "white",
                    padding: 14,
                    borderRadius: 14,
                    marginTop: 14,
                    fontWeight: 700,
                  }}
                >
                  ⚠ TERLAMBAT {hariTerlambat} HARI!
                  <span
                    style={{
                      display: "block",
                      fontWeight: 400,
                      fontSize: 13,
                      marginTop: 4,
                      lineHeight: 1.6,
                    }}
                  >
                    Alat belum dikembalikan padahal sudah lewat tanggal kembali
                    ({tglIndo(hasil.tgl_kembali)})! Segera kembalikan ke lab ya,
                    biar gak kena sanksi! 🙏
                  </span>
                </div>
              )}
              {hasil.status === "menunggu" && (
                <div
                  style={{
                    background: "#78350F",
                    border: "1px solid #F59E0B",
                    color: "#FEF3C7",
                    padding: 14,
                    borderRadius: 14,
                    marginTop: 14,
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  ⏳ <b>Pengajuanmu sedang ditinjau admin!</b>
                  <br />
                  Tunggu ya, biasanya admin balas di jam kerja. Cek lagi besok /
                  tanya langsung ke lab!
                </div>
              )}
              {hasil.status === "dipinjam" && !terlambat && (
                <div
                  style={{
                    background: "#1E3A8A",
                    border: "1px solid #3B82F6",
                    color: "#BFDBFE",
                    padding: 14,
                    borderRadius: 14,
                    marginTop: 14,
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  📦 <b>Alat sudah di tanganmu!</b>
                  <br />
                  Jangan lupa kembalikan sebelum{" "}
                  <b style={{ color: "white" }}>
                    {tglIndo(hasil.tgl_kembali)}
                  </b>{" "}
                  ya! Jaga baik-baik alatnya!
                </div>
              )}
              {hasil.status === "ditolak" && (
                <div
                  style={{
                    background: "#7F1D1D",
                    border: "1px solid #EF4444",
                    color: "white",
                    padding: 14,
                    borderRadius: 14,
                    marginTop: 14,
                  }}
                >
                  ❌ <b>Ditolak oleh Admin!</b>
                  <p
                    style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.6 }}
                  >
                    Alasan:{" "}
                    <b>
                      {hasil.alasan_tolak ||
                        "Stok tidak tersedia / tanggal bentrok!"}
                    </b>
                    <br />
                    Coba ajukan lagi di tanggal lain / alat lain ya!
                  </p>
                </div>
              )}
              {hasil.status === "dikembalikan" && (
                <div
                  style={{
                    background: "#14532D",
                    border: "1px solid #22C55E",
                    color: "#BBF7D0",
                    padding: 14,
                    borderRadius: 14,
                    marginTop: 14,
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  ✅ <b>Sudah Dikembalikan! Terima kasih!</b>
                  <br />
                  Kondisi saat kembali:{" "}
                  <b style={{ color: "white" }}>{hasil.kondisi_kembali}</b> •
                  Tanggal dikembalikan:{" "}
                  <b style={{ color: "white" }}>
                    {hasil.tgl_dikembalikan
                      ? tglIndo(hasil.tgl_dikembalikan)
                      : "-"}
                  </b>
                  <br />
                  Mau pinjam lagi? Gas!
                </div>
              )}
            </div>
          </div>

          {/* Tombol bawah hasil! */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 14,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/ajukan"
              style={{
                flex: 1,
                textAlign: "center",
                background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                color: "white",
                padding: "12px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              📝 Ajukan Lagi →
            </Link>
            <Link
              href="/alat"
              style={{
                flex: 1,
                textAlign: "center",
                background: "white",
                color: "#6D28D9",
                padding: "12px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              🎬 Lihat Alat Lain
            </Link>
          </div>
        </div>
      )}

      {/* ============ 6. CARA CEK STATUS! 👈 BARU! ============ */}
      {!hasil && !err && (
        <div
          style={{
            marginTop: 16,
            background: "linear-gradient(135deg,#1E103A,#3B0764)",
            border: "1px solid #7C3AED",
            borderRadius: 20,
            padding: 18,
          }}
        >
          <b style={{ color: "white", fontSize: 14 }}>Gak Tau Nomornya? 🤔</b>
          <div
            style={{
              color: "#C4B5FD",
              fontSize: 13,
              lineHeight: 1.7,
              marginTop: 6,
            }}
          >
            1. Nomor dikasih setelah kamu ajukan (halaman sukses)!
            <br />
            2. Kalau lupa, tanya admin lab, sebutin nama + tanggal ajukan!
            <br />
            3. Kalau baru ajukan, tunggu admin setujui dulu, biasanya di jam
            kerja!
          </div>
        </div>
      )}
    </div>
  );
}
