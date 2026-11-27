"use client";

import Link from "next/link";

export default function Beranda() {
  return (
    <div
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "6px 16px 24px",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "white",
            color: "#374151",
            padding: "7px 16px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 800,
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 12px rgba(0,0,0,.06)",
          }}
        >
          <span
            style={{
              background: "#1F2937",
              color: "white",
              padding: "3px 9px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.5px",
            }}
          >
            ALATDKV
          </span>
          <span
            style={{ color: "#F97316", letterSpacing: "1.5px", fontSize: 11 }}
          >
            PORTAL RESMI
          </span>
          <span style={{ letterSpacing: "0.5px" }}>PINJAM ALAT LAB DKV</span>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#059669",
            }}
          />
        </span>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "22px 0 10px",
          position: "relative",
          maxWidth: 820,
          margin: "0 auto",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 18,
            left: "2%",
            background: "#FEF3C7",
            border: "1px solid #FDE68A",
            color: "#92400E",
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 900,
            transform: "rotate(-4deg)",
            boxShadow: "0 4px 10px rgba(251,191,36,.25)",
            zIndex: 2,
          }}
        >
          30 DETIK DOANG!
        </span>
        <span
          style={{
            position: "absolute",
            top: 52,
            right: "3%",
            background: "#1F2937",
            color: "white",
            padding: "6px 11px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 900,
            transform: "rotate(3deg)",
            boxShadow: "0 4px 10px rgba(0,0,0,.20)",
            zIndex: 2,
          }}
        >
          LAB DKV
        </span>
        <div
          style={{
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: "4px",
            color: "#F97316",
          }}
        >
          SELAMAT DATANG DI
        </div>
        <div style={{ lineHeight: 0.9, marginTop: 8 }}>
          <span
            style={{
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: "-2.5px",
              color: "#1F2937",
            }}
          >
            Pinjam
          </span>
        </div>
        <div
          style={{
            lineHeight: 0.95,
            marginTop: 2,
            position: "relative",
            display: "inline-block",
          }}
        >
          <span
            style={{
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: "-3.5px",
              background: "linear-gradient(90deg, #F97316, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Alat DKV,
          </span>
          <div
            style={{
              height: 6,
              background: "#FDE68A",
              borderRadius: 999,
              margin: "4px 40px 0",
            }}
          />
        </div>
        <div style={{ marginTop: 10, position: "relative", zIndex: 1 }}>
          <span
            style={{
              display: "inline-block",
              background: "white",
              borderRadius: 999,
              border: "1px solid #E5E7EB",
              boxShadow: "0 14px 28px rgba(0,0,0,.12)",
              padding: "12px 32px",
              transform: "rotate(-0.8deg)",
            }}
          >
            <span
              style={{
                fontSize: 56,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: "-2px",
                color: "#1F2937",
              }}
            >
              Gak Pake{" "}
              <span
                style={{
                  background: "#FEF3C7",
                  padding: "0 10px",
                  borderRadius: 12,
                }}
              >
                Ribet.
              </span>
            </span>
          </span>
        </div>
        <p
          style={{
            margin: "20px 0 4px",
            fontSize: 17,
            fontWeight: 700,
            color: "#4B5563",
            lineHeight: 1.6,
          }}
        >
          Cari, pilih, ajukan - beres dalam{" "}
          <span
            style={{
              color: "#F97316",
              fontWeight: 900,
              background: "#FFF7ED",
              padding: "3px 10px",
              borderRadius: 999,
              border: "1px solid #FED7AA",
            }}
          >
            30 detik.
          </span>
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 700,
            color: "#4B5563",
            lineHeight: 1.6,
          }}
        >
          Stok realtime,{" "}
          <span
            style={{
              color: "#059669",
              fontWeight: 900,
              background: "#ECFDF5",
              padding: "3px 10px",
              borderRadius: 999,
              border: "1px solid #A7F3D0",
            }}
          >
            tanpa antri ke lab.
          </span>
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/alat"
            style={{
              background: "#1F2937",
              color: "white",
              padding: "15px 30px",
              borderRadius: 999,
              fontWeight: 900,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 10px 20px rgba(0,0,0,.22)",
              transform: "rotate(-0.5deg)",
            }}
          >
            Lihat Semua Alat
          </Link>
          <Link
            href="/cek"
            style={{
              background: "white",
              color: "#1F2937",
              padding: "12px 22px",
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 13,
              textDecoration: "none",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 10px rgba(0,0,0,.06)",
              transform: "rotate(0.6deg)",
            }}
          >
            Cek Status
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginTop: 18,
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              background: "white",
              color: "#374151",
              border: "1px solid #E5E7EB",
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              boxShadow: "0 3px 8px rgba(0,0,0,.04)",
              transform: "translateY(4px) rotate(-1deg)",
            }}
          >
            Maks 2 aktif / orang
          </span>
          <span
            style={{
              background: "white",
              color: "#374151",
              border: "1px solid #E5E7EB",
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              boxShadow: "0 3px 8px rgba(0,0,0,.04)",
              transform: "translateY(-3px) rotate(0.5deg)",
            }}
          >
            Maks 3 hari pinjam
          </span>
          <span
            style={{
              background: "white",
              color: "#374151",
              border: "1px solid #E5E7EB",
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              boxShadow: "0 3px 8px rgba(0,0,0,.04)",
              transform: "translateY(4px) rotate(1deg)",
            }}
          >
            Libur Sabtu / Minggu
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: 30,
          background: "white",
          borderRadius: 24,
          border: "1px solid #E5E7EB",
          boxShadow: "0 20px 40px rgba(0,0,0,.10)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 6,
            background: "linear-gradient(90deg, #F97316, #EAB308, #059669)",
          }}
        />
        <div style={{ padding: "22px 20px 24px", textAlign: "center" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "3px",
              color: "#F97316",
            }}
          >
            LANGKAH-LANGKAH
          </div>
          <h2
            style={{
              margin: "8px 0 0",
              fontSize: 30,
              fontWeight: 900,
              color: "#1F2937",
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            Cara Pinjam,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F97316, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Gampang Banget
            </span>
          </h2>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: 14,
              color: "#6B7280",
              fontWeight: 500,
            }}
          >
            Dari pilih sampe ambil, cuma segini doang.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 14,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                background: "#FFFBEB",
                borderRadius: 20,
                border: "2px solid #FDE68A",
                padding: "22px 18px 20px",
                boxShadow: "0 14px 24px rgba(249,115,22,.14)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  right: 14,
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#FDE68A",
                  lineHeight: 1,
                }}
              >
                1
              </span>
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 auto",
                  borderRadius: "50%",
                  background: "white",
                  border: "2px solid #FDE68A",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 30,
                  boxShadow: "0 8px 16px rgba(0,0,0,.08)",
                }}
              >
                📸
              </div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#1F2937",
                  marginTop: 14,
                  letterSpacing: "-0.4px",
                }}
              >
                Pilih Alat
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#78716C",
                  lineHeight: 1.65,
                  marginTop: 6,
                }}
              >
                Lihat di menu Alat, pilih yang kamu butuhin - kamera, mic,
                lampu, dll.
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  background: "#F97316",
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.5px",
                }}
              >
                LANGKAH 1
              </div>
            </div>
            <div
              style={{
                position: "relative",
                background: "#ECFDF5",
                borderRadius: 20,
                border: "2px solid #A7F3D0",
                padding: "22px 18px 20px",
                boxShadow: "0 14px 24px rgba(5,150,105,.14)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  right: 14,
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#A7F3D0",
                  lineHeight: 1,
                }}
              >
                2
              </span>
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 auto",
                  borderRadius: "50%",
                  background: "white",
                  border: "2px solid #A7F3D0",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 30,
                  boxShadow: "0 8px 16px rgba(0,0,0,.08)",
                }}
              >
                📝
              </div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#1F2937",
                  marginTop: 14,
                  letterSpacing: "-0.4px",
                }}
              >
                Isi Form 30 Detik
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#78716C",
                  lineHeight: 1.65,
                  marginTop: 6,
                }}
              >
                Nama, kelas, alat, tanggal. Kirim, langsung masuk ke admin.
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  background: "#059669",
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.5px",
                }}
              >
                LANGKAH 2
              </div>
            </div>
            <div
              style={{
                position: "relative",
                background: "#EFF6FF",
                borderRadius: 20,
                border: "2px solid #BFDBFE",
                padding: "22px 18px 20px",
                boxShadow: "0 14px 24px rgba(37,99,235,.14)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  right: 14,
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#BFDBFE",
                  lineHeight: 1,
                }}
              >
                3
              </span>
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 auto",
                  borderRadius: "50%",
                  background: "white",
                  border: "2px solid #BFDBFE",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 30,
                  boxShadow: "0 8px 16px rgba(0,0,0,.08)",
                }}
              >
                🏃
              </div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#1F2937",
                  marginTop: 14,
                  letterSpacing: "-0.4px",
                }}
              >
                Ambil di Lab DKV
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#78716C",
                  lineHeight: 1.65,
                  marginTop: 6,
                }}
              >
                Kalo udah di-ACC, tinggal ambil bawa kartu pelajar. Beres!
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  background: "#2563EB",
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.5px",
                }}
              >
                LANGKAH 3
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 20,
            border: "1px solid #E5E7EB",
            padding: "20px 18px",
            boxShadow: "0 12px 22px rgba(0,0,0,.08)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              margin: "0 auto",
              borderRadius: 16,
              background: "linear-gradient(135deg, #FFF7ED, #FFEDD5)",
              border: "1px solid #FED7AA",
              display: "grid",
              placeItems: "center",
              fontSize: 26,
            }}
          >
            ⚡
          </div>
          <div
            style={{
              fontWeight: 900,
              fontSize: 17,
              color: "#1F2937",
              marginTop: 12,
              letterSpacing: "-0.3px",
            }}
          >
            30 Detik Beres
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#6B7280",
              marginTop: 5,
              lineHeight: 1.6,
            }}
          >
            Nggak perlu isi kertas, nggak perlu antri. Dari HP aja.
          </div>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 20,
            border: "1px solid #E5E7EB",
            padding: "20px 18px",
            boxShadow: "0 12px 22px rgba(0,0,0,.08)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              margin: "0 auto",
              borderRadius: 16,
              background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
              border: "1px solid #A7F3D0",
              display: "grid",
              placeItems: "center",
              fontSize: 26,
            }}
          >
            📦
          </div>
          <div
            style={{
              fontWeight: 900,
              fontSize: 17,
              color: "#1F2937",
              marginTop: 12,
              letterSpacing: "-0.3px",
            }}
          >
            Stok Realtime
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#6B7280",
              marginTop: 5,
              lineHeight: 1.6,
            }}
          >
            Keliatan mana yang masih tersedia, mana yang lagi dipinjam.
          </div>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 20,
            border: "1px solid #E5E7EB",
            padding: "20px 18px",
            boxShadow: "0 12px 22px rgba(0,0,0,.08)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              margin: "0 auto",
              borderRadius: 16,
              background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
              border: "1px solid #BFDBFE",
              display: "grid",
              placeItems: "center",
              fontSize: 26,
            }}
          >
            ✅
          </div>
          <div
            style={{
              fontWeight: 900,
              fontSize: 17,
              color: "#1F2937",
              marginTop: 12,
              letterSpacing: "-0.3px",
            }}
          >
            Admin Cepet ACC
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#6B7280",
              marginTop: 5,
              lineHeight: 1.6,
            }}
          >
            Pengajuan langsung masuk dashboard admin, nggak nyangkut.
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          background: "linear-gradient(90deg, #F97316, #EA580C 40%, #059669)",
          borderRadius: 20,
          padding: "22px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
          boxShadow: "0 14px 28px rgba(249,115,22,.30)",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 900,
              fontSize: 22,
              color: "white",
              letterSpacing: "-0.5px",
            }}
          >
            Udah siap pinjam?
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,.90)",
              marginTop: 4,
            }}
          >
            Pilih alatnya sekarang, ambil besok juga bisa!
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            href="/alat"
            style={{
              background: "white",
              color: "#EA580C",
              padding: "12px 20px",
              borderRadius: 999,
              fontWeight: 900,
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            Lihat Alat
          </Link>
          <Link
            href="/ajukan"
            style={{
              background: "#1F2937",
              color: "white",
              padding: "12px 20px",
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            Ajukan Langsung
          </Link>
        </div>
      </div>
    </div>
  );
}
