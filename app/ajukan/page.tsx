// app/ajukan/page.tsx - KODE LENGKAP - RAPET, 2 KOLOM, NGGAK PANJANG KE BAWAH LAGI

"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function AjukanContent() {
  const sp = useSearchParams();
  const alatDariUrl = sp.get("alat") || "";

  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [alat, setAlat] = useState(alatDariUrl);
  const [tanggal, setTanggal] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [sukses, setSukses] = useState(false);
  const [sudahPencet, setSudahPencet] = useState(false);

  const kurangNama = sudahPencet && !nama;
  const kurangKelas = sudahPencet && !kelas;
  const kurangAlat = sudahPencet && !alat;
  const kurangTanggal = sudahPencet && !tanggal;

  const terisi = [nama, kelas, alat, tanggal].filter(Boolean).length;
  const persen = (terisi / 4) * 100;

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    setSudahPencet(true);
    if (!nama || !kelas || !alat || !tanggal) return;
    const lama = JSON.parse(localStorage.getItem("pengajuan") || "[]");
    const baru = {
      id: Date.now(),
      nama,
      kelas,
      alat,
      tanggal,
      keperluan,
      status: "Menunggu",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("pengajuan", JSON.stringify([...lama, baru]));
    setSukses(true);
  };

  const inputStyle = (error: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "9px 12px",
    borderRadius: 10,
    border: error ? "2px solid #FCA5A5" : "1px solid #E5E7EB",
    outline: "none",
    fontSize: 13,
    background: error ? "#FEF2F2" : "#F9FAFB",
    color: "#1F2937",
    boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontWeight: 800,
    fontSize: 12,
    color: "#1F2937",
    marginBottom: 4,
  };

  const badgeWajib = (
    <span
      style={{
        background: "#FEE2E2",
        color: "#DC2626",
        fontSize: 9,
        fontWeight: 900,
        padding: "1px 6px",
        borderRadius: 999,
      }}
    >
      WAJIB
    </span>
  );
  const badgeOpsional = (
    <span
      style={{
        background: "#F3F4F6",
        color: "#6B7280",
        fontSize: 9,
        fontWeight: 900,
        padding: "1px 6px",
        borderRadius: 999,
      }}
    >
      OPSIONAL
    </span>
  );

  if (sukses) {
    return (
      <div
        style={{
          maxWidth: 520,
          margin: "28px auto",
          padding: "0 16px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 20,
            border: "1px solid #E5E7EB",
            padding: "26px 20px",
            boxShadow: "0 10px 30px rgba(0,0,0,.07)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: "linear-gradient(90deg, #F97316, #059669)",
            }}
          />
          <div style={{ fontSize: 40 }}>✅</div>
          <h2
            style={{
              margin: "8px 0 4px",
              fontSize: 22,
              fontWeight: 900,
              color: "#1F2937",
            }}
          >
            Pengajuan Terkirim!
          </h2>
          <p
            style={{
              margin: 0,
              color: "#6B7280",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            Makasih, <b style={{ color: "#1F2937" }}>{nama}</b>! Pengajuan{" "}
            <b style={{ color: "#F97316" }}>{alat}</b> buat tanggal{" "}
            <b>{tanggal}</b> udah masuk.
          </p>
          <div
            style={{
              background: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: 10,
              padding: "10px",
              marginTop: 12,
              textAlign: "left",
              fontSize: 12,
              color: "#374151",
              lineHeight: 1.6,
            }}
          >
            <div>
              <b>Nama:</b> {nama} • <b>Kelas:</b> {kelas}
            </div>
            <div>
              <b>Alat:</b> {alat} • <b>Tanggal:</b> {tanggal}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              marginTop: 14,
              flexWrap: "wrap",
            }}
          >
            <a
              href="/cek"
              style={{
                background: "#F97316",
                color: "white",
                padding: "10px 18px",
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              🔍 Cek Status →
            </a>
            <a
              href="/alat"
              style={{
                background: "white",
                color: "#1F2937",
                padding: "10px 18px",
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 13,
                textDecoration: "none",
                border: "1px solid #E5E7EB",
              }}
            >
              Lihat Alat Lain
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "6px 16px 16px" }}>
      {/* HERO - DIPENDEKIN: padding dikurangin, judul dikecilin dikit */}
      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "center",
          flexWrap: "wrap",
          padding: "8px 4px 12px",
        }}
      >
        <div style={{ flex: 1, minWidth: 260 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "white",
              color: "#374151",
              padding: "5px 10px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 800,
              border: "1px solid #E5E7EB",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#059669",
              }}
            />
            FORM PENGAJUAN • 30 DETIK!
          </div>
          <h1
            style={{
              margin: "8px 0 4px",
              fontSize: 36,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: "-1.5px",
              color: "#1F2937",
            }}
          >
            Ajukan Pinjam{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F97316, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Alat
            </span>
          </h1>
          <p
            style={{
              margin: 0,
              color: "#4B5563",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            Isi form di bawah, admin bakal ACC secepatnya!
          </p>
        </div>
        <div
          style={{
            width: 330,
            maxWidth: "100%",
            background: "white",
            borderRadius: 14,
            border: "1px solid #E5E7EB",
            padding: "12px 14px",
            boxShadow: "0 6px 16px rgba(0,0,0,.05)",
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: 13, color: "#1F2937" }}>
              Cara Pinjam 📋
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#6B7280",
                lineHeight: 1.5,
                marginTop: 3,
              }}
            >
              Isi form → Tunggu ACC → Ambil di Lab DKV
            </div>
          </div>
          <span style={{ fontSize: 22 }}>📋</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* KIRI - DIPENDEKIN JUGA */}
        <aside
          style={{
            width: 260,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 14,
              border: "1px solid #E5E7EB",
              padding: "12px 14px",
              boxShadow: "0 4px 12px rgba(0,0,0,.04)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 13, color: "#1F2937" }}>
              Aturan Pinjam ⚠️
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#4B5563",
                lineHeight: 1.6,
                marginTop: 5,
              }}
            >
              Maks <b>2 aktif / orang</b> • Maks <b>3 hari</b> • Bukan{" "}
              <b>Sabtu / Minggu</b>
            </div>
          </div>
          <div
            style={{
              background: "#ECFDF5",
              borderRadius: 14,
              border: "1px solid #A7F3D0",
              padding: "12px 14px",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 12, color: "#065F46" }}>
              💡 Tips biar di-ACC cepet
            </div>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 11,
                color: "#047857",
                lineHeight: 1.5,
              }}
            >
              Tulis keperluannya yang jelas, contoh: “Buat syuting tugas DKV”.
            </p>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: 14,
              border: "1px solid #E5E7EB",
              padding: "12px 14px",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 12, color: "#1F2937" }}>
              Alat rame 🔥 — klik buat isi otomatis
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 5,
                marginTop: 8,
              }}
            >
              {["Canon 2000D", "A6400", "Ring Light"].map((x) => (
                <button
                  key={x}
                  type="button"
                  onClick={() => setAlat(x)}
                  style={{
                    background: alat === x ? "#FFF7ED" : "#F9FAFB",
                    border:
                      alat === x ? "1.5px solid #F97316" : "1px solid #E5E7EB",
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 800,
                    cursor: "pointer",
                    color: "#1F2937",
                  }}
                >
                  {x} {alat === x ? "✓" : ""}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* KANAN: 1 KARTU, RAPET */}
        <form
          onSubmit={kirim}
          style={{
            flex: 1,
            minWidth: 280,
            background: "white",
            borderRadius: 18,
            border: "1px solid #E5E7EB",
            boxShadow: "0 10px 24px rgba(0,0,0,.07)",
            overflow: "hidden",
          }}
        >
          {/* Kepala kartu - rapet */}
          <div
            style={{
              background: "linear-gradient(90deg, #FFF7ED, #ECFDF5)",
              padding: "12px 16px",
              borderBottom: "1px solid #E5E7EB",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 14, color: "#1F2937" }}>
              📝 Form Pengajuan{" "}
              <span style={{ fontWeight: 600, fontSize: 12, color: "#6B7280" }}>
                — {terisi}/4 udah keisi
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 80,
                  height: 6,
                  background: "#E5E7EB",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${persen}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #F97316, #059669)",
                    borderRadius: 999,
                    transition: "width .3s",
                  }}
                />
              </div>
              <span style={{ fontSize: 11, fontWeight: 900, color: "#1F2937" }}>
                {Math.round(persen)}%
              </span>
            </div>
          </div>

          {/* Isi - gap cuma 10, padding 14 */}
          <div
            style={{
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/* BARIS 1: Nama + Kelas SEJAJAR */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <label style={labelStyle}>👤 Nama Lengkap {badgeWajib}</label>
                <input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Andi Pratama"
                  style={inputStyle(kurangNama)}
                />
                {kurangNama && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "#DC2626",
                      fontWeight: 700,
                      marginTop: 3,
                    }}
                  >
                    ⚠️ Wajib diisi!
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <label style={labelStyle}>
                  🏫 Kelas / Jurusan {badgeWajib}
                </label>
                <input
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  placeholder="XI DKV 1"
                  style={inputStyle(kurangKelas)}
                />
                {kurangKelas && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "#DC2626",
                      fontWeight: 700,
                      marginTop: 3,
                    }}
                  >
                    ⚠️ Wajib diisi!
                  </div>
                )}
              </div>
            </div>

            <div style={{ height: 1, background: "#F3F4F6" }} />

            {/* BARIS 2: Alat + Tanggal SEJAJAR */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <label style={labelStyle}>
                  🎬 Alat yang Dipinjam {badgeWajib}
                </label>
                <select
                  value={alat}
                  onChange={(e) => setAlat(e.target.value)}
                  style={inputStyle(kurangAlat)}
                >
                  <option value="">-- Pilih Alat --</option>
                  <option value="Kamera Canon EOS 2000D">
                    Kamera Canon EOS 2000D
                  </option>
                  <option value="Kamera A6400">Kamera A6400</option>
                  <option value="Lampu LED Panel 2x">Lampu LED Panel 2x</option>
                  <option value="Ring Light 18 inch">Ring Light 18 inch</option>
                  <option value="Mikrofon Rode Wireless GO">
                    Mikrofon Rode Wireless GO
                  </option>
                  <option value="Mikrofon Boya M1">Mikrofon Boya M1</option>
                  <option value="Tablet Intuos S">Tablet Intuos S</option>
                  <option value="Tripod">Tripod</option>
                </select>
                {kurangAlat && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "#DC2626",
                      fontWeight: 700,
                      marginTop: 3,
                    }}
                  >
                    ⚠️ Pilih dulu!
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <label style={labelStyle}>📅 Tanggal Pinjam {badgeWajib}</label>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  style={inputStyle(kurangTanggal)}
                />
                {kurangTanggal && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "#DC2626",
                      fontWeight: 700,
                      marginTop: 3,
                    }}
                  >
                    ⚠️ Wajib dipilih!
                  </div>
                )}
              </div>
            </div>

            <div style={{ height: 1, background: "#F3F4F6" }} />

            {/* BARIS 3: Keperluan - textarea dipendekin */}
            <div>
              <label style={labelStyle}>
                📝 Buat apa alatnya? {badgeOpsional}
              </label>
              <textarea
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
                placeholder="Contoh: Buat syuting tugas DKV, 28 Nov..."
                rows={2}
                style={{ ...inputStyle(false), resize: "vertical" }}
              />
            </div>

            {/* Ringkasan 1 baris aja, nggak 2 baris lagi */}
            <div
              style={{
                background: "#FFFBEB",
                border: "1px solid #FDE68A",
                borderRadius: 10,
                padding: "8px 12px",
                fontSize: 12,
                color: "#4B5563",
              }}
            >
              <b style={{ color: "#1F2937" }}>📋 Cek:</b> {nama || "Nama ⬜"} •{" "}
              {kelas || "Kelas ⬜"} • {alat || "Alat ⬜"} •{" "}
              {tanggal || "Tanggal ⬜"}
            </div>

            <button
              type="submit"
              style={{
                background: "#F97316",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: 999,
                fontWeight: 900,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 5px 12px rgba(249,115,22,.30)",
              }}
            >
              Kirim Pengajuan →
            </button>
            <p
              style={{
                margin: 0,
                textAlign: "center",
                fontSize: 11,
                color: "#6B7280",
              }}
            >
              Maks 2 aktif / orang • Maks 3 hari pinjam • Bukan Sabtu / Minggu
            </p>
          </div>
        </form>
      </div>

      <style>{`@media (max-width: 860px){ aside{ width: 100% !important; } } input:focus, select:focus, textarea:focus{ border-color: #F97316 !important; background: white !important; box-shadow: 0 0 0 3px rgba(249,115,22,.15) !important; }`}</style>
    </div>
  );
}

export default function AjukanPage() {
  return (
    <Suspense>
      <AjukanContent />
    </Suspense>
  );
}
