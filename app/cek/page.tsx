// app/cek/page.tsx - KODE LENGKAP - Kartu dibuat NONJOL, nggak nyatu lagi sama latar

"use client";

import { Suspense, useState } from "react";

type Pengajuan = {
  id: number;
  nama: string;
  kelas: string;
  alat: string;
  tanggal: string;
  keperluan?: string;
  status: string;
  createdAt?: string;
};

function CekContent() {
  const [nama, setNama] = useState("");
  const [sudahCek, setSudahCek] = useState(false);
  const [hasil, setHasil] = useState<Pengajuan[]>([]);

  const cek = () => {
    setSudahCek(true);
    if (!nama.trim()) {
      setHasil([]);
      return;
    }
    const semua: Pengajuan[] = JSON.parse(
      localStorage.getItem("pengajuan") || "[]",
    );
    const ketemu = semua.filter((p) =>
      p.nama.toLowerCase().includes(nama.toLowerCase().trim()),
    );
    setHasil(ketemu);
  };

  const hapus = (id: number) => {
    if (!confirm("Yakin mau hapus pengajuan ini?")) return;
    const semua: Pengajuan[] = JSON.parse(
      localStorage.getItem("pengajuan") || "[]",
    );
    const sisa = semua.filter((p) => p.id !== id);
    localStorage.setItem("pengajuan", JSON.stringify(sisa));
    setHasil(hasil.filter((p) => p.id !== id));
  };

  const badgeStatus = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("acc") || s.includes("disetujui") || s.includes("diambil")) {
      return {
        bg: "#ECFDF5",
        color: "#047857",
        border: "#A7F3D0",
        teks: "✅ " + status,
      };
    }
    if (s.includes("tolak") || s.includes("ditolak")) {
      return {
        bg: "#FEF2F2",
        color: "#DC2626",
        border: "#FECACA",
        teks: "❌ " + status,
      };
    }
    return {
      bg: "#FFFBEB",
      color: "#92400E",
      border: "#FDE68A",
      teks: "⏳ " + status,
    };
  };

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "6px 16px 16px" }}>
      {/* HERO - SAMA */}
      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "center",
          flexWrap: "wrap",
          padding: "8px 4px 14px",
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
              boxShadow: "0 4px 12px rgba(0,0,0,.08)",
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
            CEK STATUS • REALTIME
          </div>
          <h1
            style={{
              margin: "8px 0 4px",
              fontSize: 36,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: "-1.5px",
              color: "#1F2937",
              textShadow: "0 2px 0 rgba(255,255,255,.6)",
            }}
          >
            Cek Status{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F97316, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Pinjamanmu
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
            Masukin nama kamu, langsung keliatan udah di-ACC / belum!
          </p>
        </div>
        {/* Kartu kanan - dibikin nonjol juga */}
        <div
          style={{
            width: 330,
            maxWidth: "100%",
            background: "white",
            borderRadius: 14,
            border: "1.5px solid white",
            outline: "1px solid #E5E7EB",
            padding: "12px 14px",
            boxShadow: "0 12px 24px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: 13, color: "#1F2937" }}>
              Statusnya apa aja? 🔍
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#6B7280",
                lineHeight: 1.5,
                marginTop: 3,
              }}
            >
              <span style={{ color: "#92400E", fontWeight: 800 }}>
                ⏳ Menunggu
              </span>{" "}
              •{" "}
              <span style={{ color: "#047857", fontWeight: 800 }}>
                ✅ Di-ACC
              </span>{" "}
              •{" "}
              <span style={{ color: "#DC2626", fontWeight: 800 }}>
                ❌ Ditolak
              </span>
            </div>
          </div>
          <span style={{ fontSize: 22 }}>🔍</span>
        </div>
      </div>

      {/* KARTU UTAMA - INI YANG DIBIKIN NONJOL */}
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          background: "#FFFFFF",
          borderRadius: 20,
          border: "1.5px solid #FFFFFF",
          outline: "1px solid #D1D5DB",
          boxShadow:
            "0 24px 48px rgba(0,0,0,.16), 0 8px 16px rgba(249,115,22,.08), 0 0 0 1px rgba(255,255,255,.8)",
          overflow: "hidden",
          transform: "translateY(0)",
        }}
      >
        {/* Kepala kartu - gradasi lebih kentara + garis bawah tegas */}
        <div
          style={{
            background:
              "linear-gradient(90deg, #FFF7ED 0%, #ECFDF5 60%, #FEF9C3 100%)",
            padding: "13px 18px",
            borderBottom: "2px solid #E5E7EB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 14, color: "#1F2937" }}>
            🔍 Cari Pengajuanmu
          </div>
          <span
            style={{
              background: "white",
              border: "1px solid #D1D5DB",
              boxShadow: "0 2px 6px rgba(0,0,0,.06)",
              padding: "5px 10px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 800,
              color: "#374151",
            }}
          >
            {sudahCek ? `${hasil.length} ketemu` : "Belum dicek"}
          </span>
        </div>

        <div
          style={{
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background: "white",
          }}
        >
          {/* Search - input dibikin nonjol: border tegas + bayangan */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              cek();
            }}
            style={{ display: "flex", gap: 8 }}
          >
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Ketik nama kamu... contoh: Andi"
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 999,
                border: "1.5px solid #D1D5DB",
                outline: "none",
                fontSize: 13,
                background: "#FFFFFF",
                color: "#1F2937",
                boxSizing: "border-box",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,.05)",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#F97316",
                color: "white",
                border: "none",
                padding: "12px 22px",
                borderRadius: 999,
                fontWeight: 900,
                fontSize: 13,
                cursor: "pointer",
                boxShadow:
                  "0 6px 16px rgba(249,115,22,.40), 0 2px 4px rgba(0,0,0,.10)",
                flexShrink: 0,
              }}
            >
              Cek →
            </button>
          </form>

          {/* Belum cek - kotak dalemnya juga dibikin kontras */}
          {!sudahCek && (
            <div
              style={{
                background: "#F9FAFB",
                border: "1.5px solid #E5E7EB",
                borderRadius: 12,
                padding: "14px",
                textAlign: "center",
                fontSize: 12,
                color: "#6B7280",
                lineHeight: 1.6,
                boxShadow: "inset 0 1px 3px rgba(0,0,0,.04)",
              }}
            >
              Ketik namamu di atas, terus pencet{" "}
              <b style={{ color: "#1F2937" }}>Cek →</b>
              <br />
              Belum ajukan?{" "}
              <a href="/alat" style={{ color: "#F97316", fontWeight: 800 }}>
                Lihat alat dulu →
              </a>
            </div>
          )}

          {/* Hasil ketemu - kartu hasil dibikin nonjol juga */}
          {sudahCek && hasil.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {hasil.map((p) => {
                const b = badgeStatus(p.status);
                return (
                  <div
                    key={p.id}
                    style={{
                      border: "1.5px solid #E5E7EB",
                      borderRadius: 14,
                      padding: "12px 14px",
                      background: "#FFFFFF",
                      boxShadow: "0 4px 12px rgba(0,0,0,.06)",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 10,
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 900,
                            fontSize: 14,
                            color: "#1F2937",
                          }}
                        >
                          {p.nama}
                        </span>
                        <span
                          style={{
                            background: b.bg,
                            color: b.color,
                            border: `1px solid ${b.border}`,
                            fontSize: 11,
                            fontWeight: 900,
                            padding: "3px 9px",
                            borderRadius: 999,
                          }}
                        >
                          {b.teks}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#4B5563",
                          marginTop: 6,
                          lineHeight: 1.6,
                        }}
                      >
                        <div>
                          🎬 <b>{p.alat}</b> • 🏫 {p.kelas} • 📅 {p.tanggal}
                        </div>
                        {p.keperluan && (
                          <div style={{ color: "#6B7280" }}>
                            📝 {p.keperluan}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => hapus(p.id)}
                      style={{
                        background: "white",
                        border: "1.5px solid #E5E7EB",
                        color: "#DC2626",
                        padding: "7px 10px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 800,
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,.05)",
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                );
              })}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a
                  href="/ajukan"
                  style={{
                    background: "#F97316",
                    color: "white",
                    padding: "10px 16px",
                    borderRadius: 999,
                    fontWeight: 800,
                    fontSize: 12,
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(249,115,22,.30)",
                  }}
                >
                  📝 Ajukan Lagi →
                </a>
                <a
                  href="/alat"
                  style={{
                    background: "white",
                    color: "#1F2937",
                    padding: "10px 16px",
                    borderRadius: 999,
                    fontWeight: 800,
                    fontSize: 12,
                    textDecoration: "none",
                    border: "1.5px solid #D1D5DB",
                  }}
                >
                  Lihat Alat
                </a>
              </div>
            </div>
          )}

          {/* Hasil nggak ketemu */}
          {sudahCek && nama.trim() && hasil.length === 0 && (
            <div
              style={{
                background: "#FFFBEB",
                border: "1.5px solid #FDE68A",
                borderRadius: 12,
                padding: "14px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,.04)",
              }}
            >
              <div style={{ fontSize: 22 }}>😕</div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 13,
                  color: "#1F2937",
                  marginTop: 4,
                }}
              >
                Nggak ketemu pengajuan atas nama “{nama}”
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
                Coba cek lagi namanya, atau mungkin kamu belum ngajuin?
              </div>
              <a
                href="/ajukan"
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  background: "#F97316",
                  color: "white",
                  padding: "9px 16px",
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: 12,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(249,115,22,.30)",
                }}
              >
                📝 Ajukan Sekarang →
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`input:focus{ border-color: #F97316 !important; background: white !important; box-shadow: 0 0 0 3px rgba(249,115,22,.20), inset 0 2px 6px rgba(0,0,0,.05) !important; }`}</style>
    </div>
  );
}

export default function CekPage() {
  return (
    <Suspense>
      <CekContent />
    </Suspense>
  );
}
