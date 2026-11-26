// app/ajukan/page.tsx - Ajukan - Tema Beranda, Hero SAGE!

"use client";
import { useState } from "react";
import Link from "next/link";

export default function Ajukan() {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [alat, setAlat] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [sukses, setSukses] = useState(false);

  const inputStyle: any = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 16,
    border: "2.5px solid #292524",
    fontSize: 14,
    background: "white",
    outline: "none",
    boxSizing: "border-box",
  };
  const labelStyle: any = {
    fontWeight: 900,
    fontSize: 13,
    display: "block",
    marginBottom: 6,
    color: "#292524",
  };

  if (sukses)
    return (
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          padding: "0 16px 60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "white",
            border: "2.5px solid #292524",
            borderRadius: 28,
            padding: 36,
            boxShadow: "6px 6px 0 #292524",
          }}
        >
          <div style={{ fontSize: 64 }}>🎉</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: "12px 0 8px" }}>
            Pengajuan Terkirim!
          </h1>
          <p style={{ color: "#78716C", fontWeight: 600, fontSize: 14 }}>
            Hai {nama}, pengajuanmu lagi nunggu ACC admin. Cek terus di menu Cek
            Status ya!
          </p>
          <Link
            href="/cek"
            style={{
              display: "inline-block",
              marginTop: 16,
              background: "#292524",
              color: "white",
              padding: "13px 26px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            🔍 Cek Status →
          </Link>
        </div>
      </div>
    );

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px 60px" }}>
      <div
        style={{
          background:
            "linear-gradient(135deg,#FFFBF0 0%,#BBF7D0 55%,#FEF9C3 100%)",
          border: "2.5px solid #292524",
          borderRadius: 28,
          padding: 26,
          boxShadow: "6px 6px 0 #292524",
          textAlign: "center",
        }}
      >
        <span
          style={{
            background: "white",
            border: "2px solid #292524",
            padding: "7px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 900,
            color: "#16A34A",
            boxShadow: "3px 3px 0 #292524",
          }}
        >
          📝 FORM PENGAJUAN • 30 DETIK!
        </span>
        <h1
          style={{
            fontSize: "clamp(30px,5vw,44px)",
            fontWeight: 900,
            margin: "12px 0 8px",
            color: "#292524",
          }}
        >
          Ajukan Pinjam{" "}
          <span
            style={{
              background: "#BBF7D0",
              padding: "0 12px",
              borderRadius: 12,
              border: "2.5px solid #292524",
              boxShadow: "3px 3px 0 #292524",
              display: "inline-block",
              transform: "rotate(-1deg)",
            }}
          >
            Alat
          </span>
        </h1>
        <p
          style={{ color: "#78716C", fontWeight: 600, fontSize: 14, margin: 0 }}
        >
          Isi form di bawah, admin bakal ACC secepatnya!
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSukses(true);
        }}
        style={{
          background: "white",
          border: "2.5px solid #292524",
          borderRadius: 28,
          padding: 24,
          marginTop: 16,
          boxShadow: "6px 6px 0 #292524",
          display: "grid",
          gap: 14,
        }}
      >
        <div>
          <label style={labelStyle}>👤 Nama Lengkap</label>
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            placeholder="Contoh: Andi Pratama"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>🏫 Kelas / Jurusan</label>
          <input
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            required
            placeholder="Contoh: XI DKV 1"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>🎬 Alat yang Dipinjam</label>
          <input
            value={alat}
            onChange={(e) => setAlat(e.target.value)}
            required
            placeholder="Contoh: Kamera Canon EOS 2000D"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>📅 Tanggal Pinjam</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#292524",
            color: "white",
            padding: "14px",
            borderRadius: 999,
            fontWeight: 900,
            fontSize: 15,
            border: "2px solid #292524",
            boxShadow: "4px 4px 0 #BBF7D0",
            cursor: "pointer",
          }}
        >
          Kirim Pengajuan →
        </button>
        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#78716C",
            fontWeight: 600,
            margin: 0,
          }}
        >
          Maks 2 aktif / orang • Maks 3 hari pinjam • Bukan Sabtu / Minggu
        </p>
      </form>
    </div>
  );
}
