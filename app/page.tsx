// app/page.tsx - BERANDA - Gradasi kartu DIBEDAIN dari latar: latar polos, kartu pekat + tegas

import Link from "next/link";

export default function Beranda() {
  const cats = [
    {
      nama: "KAMERA",
      desc: "Foto & Video",
      href: "/alat?kategori=kamera",
      img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
      border: "#F9A8D4",
      teks: "#BE185D",
      emoji: "📷",
      glow: "rgba(244,114,182,.25)",
    },
    {
      nama: "LAMPU",
      desc: "Pencahayaan",
      href: "/alat?kategori=pencahayaan",
      img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
      border: "#FCD34D",
      teks: "#B45309",
      emoji: "💡",
      glow: "rgba(251,191,36,.25)",
    },
    {
      nama: "MIC",
      desc: "Audio Jernih",
      href: "/alat?kategori=audio",
      img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
      border: "#C4B5FD",
      teks: "#6D28D9",
      emoji: "🎙️",
      glow: "rgba(167,139,250,.25)",
    },
    {
      nama: "TABLET",
      desc: "Gambar Digital",
      href: "/alat?kategori=tablet",
      img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
      border: "#86EFAC",
      teks: "#15803D",
      emoji: "✏️",
      glow: "rgba(74,222,128,.25)",
    },
  ];

  return (
    <div
      style={{
        maxWidth: 880,
        margin: "0 auto",
        padding: "0 14px 28px",
        background: "#F8FAFC",
        borderRadius: 24,
      }}
    >
      <style>{`
        /* Latar dibikin polos biar kartu misah - bukan gradasi lagi */
        .kartu-hero{
          position:relative;
          /* Gradasi KARTU dibikin PEKAT + BEDA dari latar */
          background:linear-gradient(135deg,#FF8FAB 0%,#FFB35C 35%,#FFD93D 55%,#6EE7B7 80%,#A78BFA 100%) !important;
          border:4px solid white !important;
          box-shadow:0 24px 48px rgba(244,114,182,.28), 0 16px 32px rgba(0,0,0,.14) !important;
          transition:transform .25s ease, box-shadow .25s ease;
        }
        .kartu-hero:hover{ transform:translateY(-3px); box-shadow:0 28px 54px rgba(244,114,182,.32), 0 18px 36px rgba(0,0,0,.16) !important; }

        .stiker-ngambang{
          position:absolute;
          background:transparent; border:none; box-shadow:none;
          width:auto; height:auto; padding:0; margin:0;
          display:block; z-index:3; line-height:1; font-size:46px;
          text-shadow:0 4px 8px rgba(0,0,0,.22);
          transition:transform .25s ease;
          pointer-events:none;
        }
        .kartu-hero:hover .stiker-ngambang{ transform:rotate(-4deg) scale(1.08); }
        .kartu-hero:hover .stiker-2{ transform:rotate(4deg) scale(1.08); }

        .btn-utama{ box-shadow:0 8px 16px rgba(30,41,59,.28); transition:transform .2s ease; }
        .btn-utama:hover{ transform:translateY(-2px); }
        .btn-putih{ box-shadow:0 8px 16px rgba(0,0,0,.12); transition:transform .2s ease; }
        .btn-putih:hover{ transform:translateY(-2px); }
        .card-pop{ transition:transform .25s ease, box-shadow .25s ease; box-shadow:0 12px 20px rgba(15,23,42,.10); background:white; }
        .card-pop:hover{ transform:translateY(-5px); box-shadow:0 16px 26px rgba(15,23,42,.14); }
        .foto-zoom{ transition:transform .35s ease; }
        .card-pop:hover .foto-zoom{ transform:scale(1.05); }

        .judul-gede{
          font-size:clamp(44px,6vw,62px);
          line-height:1.15;
          letter-spacing:-.5px;
          font-weight:900;
          /* Bayangan putih tebel biar huruf misah dari gradasi pekat */
          text-shadow:0 3px 0 white, 0 6px 14px rgba(0,0,0,.12);
          word-spacing:4px;
        }
        .baris-judul{ display:flex; justify-content:center; align-items:center; flex-wrap:wrap; gap:8px; line-height:1.15; }
        .baris-judul-2{ display:block; line-height:1.2; margin-top:14px; }

        .kata-blok{
          position:relative; display:inline-block;
          padding:4px 16px 8px;
          border-radius:999px;
          z-index:0; cursor:default;
          transition:transform .3s ease, color .25s ease;
        }
        .miring-kiri{ transform:rotate(-1deg); }
        .miring-kanan{ transform:rotate(1deg); }
        .miring-kiri-2{ transform:rotate(-1deg); }
        .kata-blok::before{
          content:""; position:absolute; inset:0; border-radius:999px; z-index:-1;
          background:transparent; box-shadow:none; opacity:0;
          transition:opacity .25s ease, background .25s ease;
        }
        .blok-hitam:hover{ transform:rotate(-1deg) translateY(-2px) scale(1.03); color:white !important; }
        .blok-hitam:hover::before{ opacity:1; background:#1E293B; box-shadow:0 10px 18px rgba(30,41,59,.22); }
        .blok-oranye:hover{ transform:rotate(1deg) translateY(-2px) scale(1.03); color:white !important; }
        .blok-oranye:hover::before{ opacity:1; background:#EA580C; box-shadow:0 10px 18px rgba(234,88,12,.25); }
        .blok-tosca:hover{ transform:rotate(-1deg) translateY(-2px) scale(1.03); color:white !important; }
        .blok-tosca:hover::before{ opacity:1; background:#0D9488; box-shadow:0 10px 18px rgba(13,148,136,.25); }

        .kotak-gerak{
          position:relative; display:inline-block; overflow:hidden;
          background:white; color:#C2410C;
          padding:6px 28px; border-radius:999px;
          transform:rotate(-1deg);
          box-shadow:0 10px 20px rgba(194,65,12,.18), inset 0 0 0 2px #FDE68A;
          transition:transform .25s ease; cursor:default;
        }
        .kotak-gerak:hover{ transform:rotate(1deg) translateY(-2px) scale(1.02); }

        .kata-blok-kecil{ position:relative; display:inline-block; padding:2px 8px; border-radius:999px; z-index:0; cursor:default; transition:transform .25s ease; }
        .kata-blok-kecil:hover{ transform:translateY(-2px) scale(1.05); }
        .kata-blok-kecil::before{ content:""; position:absolute; inset:0; border-radius:999px; background:rgba(255,255,255,0); z-index:-1; transition:background .25s ease; }
        .kata-blok-kecil:hover::before{ background:rgba(255,255,255,.9); }

        .judul-kategori{ display:inline-block; padding:2px 6px; border-radius:999px; transition:transform .25s ease, background .25s ease; cursor:default; }
        .judul-kategori:hover{ transform:translateY(-2px); background:white; }
        .pill-gerak{ display:inline-block; transition:transform .25s ease; cursor:default; }
        .pill-gerak:hover{ transform:translateY(-2px); }
        .nama-gerak{ display:inline-block; transition:transform .25s ease; cursor:pointer; }
        .nama-gerak:hover{ transform:translateY(-2px); }

        @media (max-width:640px){
          .hero-beranda{padding:18px 12px!important}
          .judul-gede{font-size:38px!important}
          .stiker-ngambang{font-size:34px!important}
          .grid-kategori{ grid-template-columns:1fr 1fr!important; gap:10px!important; }
        }
      `}</style>

      {/* ============ HERO - GRADASI PEKAT, LATAR POLOS ============ */}
      <div
        className="hero-beranda kartu-hero"
        style={{
          borderRadius: 28,
          padding: "22px 18px 18px",
          textAlign: "center",
          position: "relative",
          overflow: "visible",
        }}
      >
        <span className="stiker-ngambang" style={{ top: -14, left: 10 }}>
          📷
        </span>
        <span
          className="stiker-ngambang stiker-2"
          style={{ top: -12, right: 12 }}
        >
          ✨
        </span>
        <span
          className="stiker-ngambang"
          style={{ bottom: -12, right: 28, fontSize: 40 }}
        >
          🎨
        </span>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "white",
              padding: "7px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "1px",
              color: "#1E293B",
              boxShadow: "0 6px 12px rgba(0,0,0,.10)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                background: "#1E293B",
                color: "white",
                padding: "3px 8px",
                borderRadius: 999,
                fontSize: 10,
              }}
            >
              ALATDKV
            </span>
            <span style={{ color: "#DB2777" }}>✨ PORTAL RESMI</span>
            <span style={{ color: "#64748B", fontWeight: 700 }}>
              PINJAM ALAT LAB DKV
            </span>
            <span
              style={{
                width: 7,
                height: 7,
                background: "#22C55E",
                borderRadius: 999,
                display: "inline-block",
              }}
            />
          </span>
        </div>

        <h1 className="judul-gede" style={{ margin: "14px 0 0" }}>
          <span className="baris-judul">
            <span
              className="kata-blok blok-hitam miring-kiri"
              style={{ color: "#1E293B" }}
            >
              Pinjam
            </span>
            <span
              className="kata-blok blok-oranye miring-kanan"
              style={{ color: "#9A3412" }}
            >
              Alat
            </span>
            <span
              className="kata-blok blok-tosca miring-kiri-2"
              style={{ color: "#0F766E" }}
            >
              DKV,
            </span>
          </span>
          <span className="baris-judul-2">
            <span className="kotak-gerak">Gak Pake Ribet.</span>
          </span>
        </h1>

        <p
          style={{
            fontWeight: 800,
            fontSize: 15,
            margin: "14px 0 0",
            lineHeight: 1.9,
            textShadow: "0 2px 0 rgba(255,255,255,.7)",
          }}
        >
          <span className="kata-blok-kecil" style={{ color: "#9D174D" }}>
            Cari,
          </span>
          <span className="kata-blok-kecil" style={{ color: "#9A3412" }}>
            pilih,
          </span>
          <span className="kata-blok-kecil" style={{ color: "#166534" }}>
            ajukan
          </span>
          <span className="kata-blok-kecil" style={{ color: "#334155" }}>
            — beres dalam
          </span>
          <span className="kata-blok-kecil" style={{ color: "#5B21B6" }}>
            30 detik.
          </span>
          <br />
          <span className="kata-blok-kecil" style={{ color: "#155E75" }}>
            Stok realtime,
          </span>
          <span className="kata-blok-kecil" style={{ color: "#9D174D" }}>
            tanpa antri ke lab.
          </span>
        </p>

        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 14,
          }}
        >
          <Link
            href="/alat"
            className="btn-utama"
            style={{
              background: "#1E293B",
              color: "white",
              padding: "11px 22px",
              borderRadius: 999,
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 14,
              display: "inline-block",
            }}
          >
            🎬 Lihat Semua Alat →
          </Link>
          <Link
            href="/cek"
            className="btn-putih"
            style={{
              background: "white",
              color: "#1E293B",
              padding: "11px 20px",
              borderRadius: 999,
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 14,
              display: "inline-block",
            }}
          >
            🔍 Cek Status
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            gap: 7,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 12,
          }}
        >
          <span
            className="pill-gerak"
            style={{
              background: "white",
              padding: "6px 11px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 900,
              color: "#DB2777",
              boxShadow: "0 4px 10px rgba(0,0,0,.08)",
            }}
          >
            🎯 Maks 2 aktif / orang
          </span>
          <span
            className="pill-gerak"
            style={{
              background: "white",
              padding: "6px 11px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 900,
              color: "#0D9488",
              boxShadow: "0 4px 10px rgba(0,0,0,.08)",
            }}
          >
            🗓️ Maks 3 hari pinjam
          </span>
          <span
            className="pill-gerak"
            style={{
              background: "white",
              padding: "6px 11px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 900,
              color: "#6D28D9",
              boxShadow: "0 4px 10px rgba(0,0,0,.08)",
            }}
          >
            🚫 Libur Sabtu / Minggu
          </span>
        </div>
      </div>

      {/* ============ KATEGORI - LATAR POLOS, KARTU PUTIH ============ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "22px 4px 12px",
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-.5px",
          }}
        >
          <span className="judul-kategori" style={{ color: "#DB2777" }}>
            Mau
          </span>
          <span className="judul-kategori" style={{ color: "#EA580C" }}>
            Pinjam
          </span>
          <span className="judul-kategori" style={{ color: "#0D9488" }}>
            Apa
          </span>
          <span className="judul-kategori" style={{ color: "#6D28D9" }}>
            Hari
          </span>
          <span className="judul-kategori" style={{ color: "#1E293B" }}>
            Ini? ✨
          </span>
        </h2>
        <Link
          href="/alat"
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: "#DB2777",
            textDecoration: "none",
          }}
        >
          Semua Alat →
        </Link>
      </div>

      <div
        className="grid-kategori"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 12,
          maxWidth: 880,
          margin: "0 auto",
        }}
      >
        {cats.map((c) => (
          <Link
            key={c.nama}
            href={c.href}
            className="card-pop"
            style={{
              borderRadius: 24,
              overflow: "hidden",
              textDecoration: "none",
              border: `2.5px solid ${c.border}`,
              display: "block",
            }}
          >
            <div
              style={{
                height: 118,
                overflow: "hidden",
                position: "relative",
                background: "#F8FAFC",
              }}
            >
              <img
                src={c.img}
                alt={c.nama}
                className="foto-zoom"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: "white",
                  padding: "6px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 900,
                  color: c.teks,
                  boxShadow: "0 4px 10px rgba(0,0,0,.10)",
                }}
              >
                {c.emoji} {c.nama}
              </span>
            </div>
            <div
              style={{
                padding: "10px 12px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>
                <span
                  className="nama-gerak"
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 900,
                    color: c.teks,
                  }}
                >
                  {c.nama}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#64748B",
                  }}
                >
                  {c.desc}
                </span>
              </span>
              <span
                style={{
                  background: "#1E293B",
                  color: "white",
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  flexShrink: 0,
                }}
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
