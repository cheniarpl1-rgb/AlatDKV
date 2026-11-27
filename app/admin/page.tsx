// app/admin/page.tsx - KODE LENGKAP - Kartu dibikin MENARIK, isi tetep lengkap

"use client";

import { useEffect, useState } from "react";

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

export default function AdminPage() {
  const [semua, setSemua] = useState<Pengajuan[]>([]);
  const [filter, setFilter] = useState("Semua");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pengajuan") || "[]");
    setSemua(data);
  }, []);

  const simpan = (baru: Pengajuan[]) => {
    setSemua(baru);
    localStorage.setItem("pengajuan", JSON.stringify(baru));
  };

  const ubahStatus = (id: number, status: string) => {
    const baru = semua.map((p) => (p.id === id ? { ...p, status } : p));
    simpan(baru);
  };

  const hapus = (id: number) => {
    if (!confirm("Yakin mau hapus pengajuan ini?")) return;
    simpan(semua.filter((p) => p.id !== id));
  };

  const total = semua.length;
  const menunggu = semua.filter((p) => p.status === "Menunggu").length;
  const dipinjam = semua.filter(
    (p) => p.status === "Dipinjam" || p.status === "Di-ACC",
  ).length;
  const dikembalikan = semua.filter((p) => p.status === "Dikembalikan").length;
  const ditolak = semua.filter((p) => p.status === "Ditolak").length;
  const terlambat = semua.filter((p) => p.status === "Terlambat").length;

  const tampil = semua.filter((p) => {
    if (filter === "Semua") return true;
    if (filter === "Menunggu") return p.status === "Menunggu";
    if (filter === "Dipinjam")
      return p.status === "Dipinjam" || p.status === "Di-ACC";
    if (filter === "Dikembalikan") return p.status === "Dikembalikan";
    if (filter === "Ditolak") return p.status === "Ditolak";
    if (filter === "Terlambat") return p.status === "Terlambat";
    return true;
  });

  const badgeStatus = (status: string) => {
    if (status === "Menunggu")
      return { bg: "#FFFBEB", color: "#92400E", border: "#FDE68A" };
    if (status === "Dipinjam" || status === "Di-ACC")
      return { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" };
    if (status === "Dikembalikan")
      return { bg: "#ECFDF5", color: "#047857", border: "#A7F3D0" };
    if (status === "Ditolak")
      return { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" };
    if (status === "Terlambat")
      return { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" };
    return { bg: "#F3F4F6", color: "#374151", border: "#E5E7EB" };
  };

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "6px 16px 16px" }}>
      {/* HERO - SAMA */}
      <div
        style={{
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
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
            DASHBOARD ADMIN • LAB DKV
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
            Admin{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F97316, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AlatDKV
            </span>{" "}
            <span style={{ color: "#1F2937" }}>({total})</span>
          </h1>
          <p
            style={{
              margin: 0,
              color: "#4B5563",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            Semua permohonan, dari yang terbaru!
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a
            href="/admin/alat"
            style={{
              background: "linear-gradient(90deg, #FDE68A, #FCD34D)",
              color: "#1F2937",
              padding: "10px 16px",
              borderRadius: 999,
              fontWeight: 900,
              fontSize: 12,
              textDecoration: "none",
              boxShadow: "0 6px 14px rgba(251,191,36,.35)",
            }}
          >
            + Kelola Alat →
          </a>
          <a
            href="/"
            style={{
              background: "white",
              color: "#1F2937",
              padding: "10px 16px",
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 12,
              textDecoration: "none",
              border: "1px solid #D1D5DB",
              boxShadow: "0 4px 10px rgba(0,0,0,.06)",
            }}
          >
            🏠 Beranda
          </a>
          <a
            href="/"
            style={{
              background: "linear-gradient(90deg, #FEE2E2, #FECACA)",
              color: "#991B1B",
              padding: "10px 16px",
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 12,
              textDecoration: "none",
              border: "1px solid #FECACA",
            }}
          >
            Keluar →
          </a>
        </div>
      </div>

      {/* 4 KARTU STATISTIK - DIBIKIN MENARIK, ISI SAMA PERSIS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
          marginBottom: 12,
        }}
      >
        {[
          {
            icon: "📋",
            judul: "Total Permohonan",
            desc: "Semua yang pernah masuk!",
            angka: total,
            gradasi: "linear-gradient(90deg, #F97316, #FB923C)",
            bgIcon: "#FFF7ED",
            borderIcon: "#FED7AA",
            bgCard: "linear-gradient(180deg, #FFFFFF, #FFF7ED)",
            warnaAngka: "#EA580C",
          },
          {
            icon: "⏳",
            judul: "Menunggu",
            desc: "Butuh disetujui / ditolak!",
            angka: menunggu,
            gradasi: "linear-gradient(90deg, #EAB308, #FACC15)",
            bgIcon: "#FEFCE8",
            borderIcon: "#FDE68A",
            bgCard: "linear-gradient(180deg, #FFFFFF, #FFFBEB)",
            warnaAngka: "#CA8A04",
          },
          {
            icon: "📦",
            judul: "Sedang Dipinjam",
            desc: "Alat lagi di luar lab!",
            angka: dipinjam,
            gradasi: "linear-gradient(90deg, #2563EB, #38BDF8)",
            bgIcon: "#EFF6FF",
            borderIcon: "#BFDBFE",
            bgCard: "linear-gradient(180deg, #FFFFFF, #EFF6FF)",
            warnaAngka: "#1D4ED8",
          },
          {
            icon: "⚠️",
            judul: "Terlambat!",
            desc: "Lewat tanggal kembali!",
            angka: terlambat,
            gradasi: "linear-gradient(90deg, #DC2626, #F87171)",
            bgIcon: "#FEF2F2",
            borderIcon: "#FECACA",
            bgCard: "linear-gradient(180deg, #FFFFFF, #FEF2F2)",
            warnaAngka: "#DC2626",
          },
        ].map((s) => (
          <div
            key={s.judul}
            style={{
              position: "relative",
              background: s.bgCard,
              borderRadius: 16,
              border: "1px solid #E5E7EB",
              padding: "0 0 14px",
              boxShadow:
                "0 12px 22px rgba(0,0,0,.10), 0 4px 8px rgba(0,0,0,.04)",
              overflow: "hidden",
            }}
          >
            {/* Garis atas gradasi - bikin kartu langsung keliatan berwarna */}
            <div style={{ height: 5, background: s.gradasi }} />
            <div
              style={{
                padding: "12px 16px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                {/* Ikon di dalem lingkaran warna, gede */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: s.bgIcon,
                    border: `1.5px solid ${s.borderIcon}`,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 20,
                    boxShadow: "0 4px 8px rgba(0,0,0,.06)",
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 14,
                    color: "#1F2937",
                    marginTop: 10,
                  }}
                >
                  {s.judul}
                </div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                  {s.desc}
                </div>
              </div>
              {/* Angka gede + berwarna, bukan item polos lagi */}
              <span
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: s.warnaAngka,
                  lineHeight: 1,
                  letterSpacing: "-1px",
                }}
              >
                {s.angka}
              </span>
            </div>
            {/* Bar bawah kecil - nunjukin proporsi, biar hidup */}
            <div
              style={{
                margin: "10px 16px 0",
                height: 5,
                background: "#E5E7EB",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: total ? `${(s.angka / total) * 100}%` : "0%",
                  height: "100%",
                  background: s.gradasi,
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* FILTER - DIBIKIN BERWARNA JUGA, ISI TETEP 6 */}
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}
      >
        {[
          {
            label: "Semua",
            angka: total,
            icon: "📋",
            aktifBg: "linear-gradient(90deg, #F97316, #FB923C)",
            pasifBg: "#FFF7ED",
            pasifBorder: "#FED7AA",
          },
          {
            label: "Menunggu",
            angka: menunggu,
            icon: "⏳",
            aktifBg: "linear-gradient(90deg, #EAB308, #FACC15)",
            pasifBg: "#FFFBEB",
            pasifBorder: "#FDE68A",
          },
          {
            label: "Dipinjam",
            angka: dipinjam,
            icon: "📦",
            aktifBg: "linear-gradient(90deg, #2563EB, #38BDF8)",
            pasifBg: "#EFF6FF",
            pasifBorder: "#BFDBFE",
          },
          {
            label: "Dikembalikan",
            angka: dikembalikan,
            icon: "✅",
            aktifBg: "linear-gradient(90deg, #059669, #34D399)",
            pasifBg: "#ECFDF5",
            pasifBorder: "#A7F3D0",
          },
          {
            label: "Ditolak",
            angka: ditolak,
            icon: "❌",
            aktifBg: "linear-gradient(90deg, #DC2626, #F87171)",
            pasifBg: "#FEF2F2",
            pasifBorder: "#FECACA",
          },
          {
            label: "Terlambat",
            angka: terlambat,
            icon: "⚠️",
            aktifBg: "linear-gradient(90deg, #7C3AED, #C084FC)",
            pasifBg: "#F5F3FF",
            pasifBorder: "#DDD6FE",
          },
        ].map((f) => {
          const aktif = filter === f.label;
          return (
            <button
              key={f.label}
              onClick={() => setFilter(f.label)}
              style={{
                background: aktif ? f.aktifBg : f.pasifBg,
                color: aktif ? "white" : "#1F2937",
                border: aktif ? "none" : `1px solid ${f.pasifBorder}`,
                padding: "9px 14px",
                borderRadius: 999,
                fontWeight: 900,
                fontSize: 12,
                cursor: "pointer",
                boxShadow: aktif
                  ? "0 6px 14px rgba(0,0,0,.18)"
                  : "0 3px 8px rgba(0,0,0,.05)",
                transform: aktif ? "scale(1.03)" : "scale(1)",
              }}
            >
              {f.icon} {f.label} ({f.angka})
            </button>
          );
        })}
      </div>

      {/* LIST / EMPTY - KARTU NONJOL + MENARIK */}
      <div
        style={{
          background: "white",
          borderRadius: 18,
          border: "1px solid #E5E7EB",
          boxShadow: "0 18px 36px rgba(0,0,0,.12), 0 6px 12px rgba(0,0,0,.05)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 4,
            background: "linear-gradient(90deg, #F97316, #059669, #2563EB)",
          }}
        />
        {tampil.length === 0 ? (
          <div
            style={{
              padding: "28px 20px",
              textAlign: "center",
              background: "linear-gradient(180deg, #FFFFFF, #FFFBEB)",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                margin: "0 auto",
                borderRadius: "50%",
                background: "#FFFBEB",
                border: "1.5px solid #FDE68A",
                display: "grid",
                placeItems: "center",
                fontSize: 28,
                boxShadow: "0 6px 14px rgba(251,191,36,.20)",
              }}
            >
              🎉
            </div>
            <div
              style={{
                fontWeight: 900,
                fontSize: 16,
                color: "#1F2937",
                marginTop: 12,
              }}
            >
              Gak Ada Permohonan di Filter Ini!
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: "#6B7280" }}>
              Coba filter lain, atau tunggu ada siswa yang ajukan!
            </p>
            <button
              onClick={() => setFilter("Semua")}
              style={{
                marginTop: 14,
                background: "linear-gradient(90deg, #F97316, #FB923C)",
                color: "white",
                border: "none",
                padding: "11px 20px",
                borderRadius: 999,
                fontWeight: 900,
                fontSize: 12,
                cursor: "pointer",
                boxShadow: "0 6px 14px rgba(249,115,22,.35)",
              }}
            >
              Lihat Semua →
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {tampil.map((p) => {
              const b = badgeStatus(p.status);
              return (
                <div
                  key={p.id}
                  style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid #F3F4F6",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    background: "white",
                  }}
                >
                  <div
                    style={{ flex: 1, minWidth: 220, display: "flex", gap: 10 }}
                  >
                    {/* Avatar huruf pertama - biar listnya nggak polos */}
                    <span
                      style={{
                        width: 38,
                        height: 38,
                        flexShrink: 0,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #FFF7ED, #ECFDF5)",
                        border: "1px solid #E5E7EB",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 900,
                        fontSize: 15,
                        color: "#F97316",
                      }}
                    >
                      {p.nama.charAt(0).toUpperCase()}
                    </span>
                    <div style={{ flex: 1 }}>
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
                          {p.status}
                        </span>
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>
                          🏫 {p.kelas}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#4B5563",
                          marginTop: 5,
                          lineHeight: 1.6,
                        }}
                      >
                        <div>
                          🎬 <b>{p.alat}</b> • 📅 {p.tanggal}
                        </div>
                        {p.keperluan && (
                          <div style={{ color: "#6B7280" }}>
                            📝 {p.keperluan}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button
                      onClick={() => ubahStatus(p.id, "Di-ACC")}
                      style={{
                        background: "#ECFDF5",
                        color: "#047857",
                        border: "1px solid #A7F3D0",
                        padding: "8px 12px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      ✅ ACC
                    </button>
                    <button
                      onClick={() => ubahStatus(p.id, "Dipinjam")}
                      style={{
                        background: "#EFF6FF",
                        color: "#1D4ED8",
                        border: "1px solid #BFDBFE",
                        padding: "8px 12px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      📦 Dipinjam
                    </button>
                    <button
                      onClick={() => ubahStatus(p.id, "Dikembalikan")}
                      style={{
                        background: "#F0FDF4",
                        color: "#15803D",
                        border: "1px solid #BBF7D0",
                        padding: "8px 12px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      ↩️ Kembali
                    </button>
                    <button
                      onClick={() => ubahStatus(p.id, "Ditolak")}
                      style={{
                        background: "#FEF2F2",
                        color: "#DC2626",
                        border: "1px solid #FECACA",
                        padding: "8px 12px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      ❌ Tolak
                    </button>
                    <button
                      onClick={() => hapus(p.id)}
                      style={{
                        background: "white",
                        color: "#DC2626",
                        border: "1px solid #E5E7EB",
                        padding: "8px 12px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
