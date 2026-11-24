// app/alat/page.tsx - Daftar Alat AlatDKV - Tema Feminim Pastel
import { supabasePublik } from "@/lib/supabase";
import { gambarAlat, iconAlat } from "@/lib/gambar";
import Link from "next/link";
import { connection } from "next/server";

export default async function DaftarAlat({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  await connection();

  const p = await searchParams;
  const kat = p.kategori || "Semua";

  let q = supabasePublik().from("alat").select("*").eq("aktif", true);
  if (kat !== "Semua") q = q.eq("kategori", kat);
  const { data } = await q;
  const list = data || [];

  const { data: pinjam } = await supabasePublik()
    .from("peminjaman_alat")
    .select("alat_id,jumlah")
    .in("status", ["menunggu", "dipinjam"]);
  const terpakai: Record<number, number> = {};
  (pinjam || []).forEach((x: any) => {
    terpakai[x.alat_id] = (terpakai[x.alat_id] || 0) + x.jumlah;
  });

  const totalStok = list.reduce((a: number, x: any) => a + x.stok, 0);
  const totalTersedia = list.reduce(
    (a: number, x: any) => a + Math.max(0, x.stok - (terpakai[x.id] || 0)),
    0,
  );
  const habis = list.filter(
    (x: any) => x.stok - (terpakai[x.id] || 0) <= 0,
  ).length;

  const { data: semuaAlat } = await supabasePublik()
    .from("alat")
    .select("kategori")
    .eq("aktif", true);
  const hitungKat: Record<string, number> = {};
  (semuaAlat || []).forEach((x: any) => {
    hitungKat[x.kategori] = (hitungKat[x.kategori] || 0) + 1;
  });

  const warnaKat: Record<string, string> = {
    kamera: "linear-gradient(135deg,#FFB6C1,#DDA0DD)",
    pencahayaan: "linear-gradient(135deg,#FFDAB9,#FFE4B5)",
    audio: "linear-gradient(135deg,#AFEEEE,#98FB98)",
    tablet: "linear-gradient(135deg,#E6E6FA,#D8BFD8)",
    aksesoris: "linear-gradient(135deg,#FFC0CB,#FFB6C1)",
  };
  const iconKat: Record<string, string> = {
    kamera: "📷",
    pencahayaan: "💡",
    audio: "🎙",
    tablet: "✏",
    aksesoris: "🎒",
  };

  const judulKat =
    kat === "Semua"
      ? "Semua Alat"
      : `${iconKat[kat] || "🎬"} ${kat.charAt(0).toUpperCase() + kat.slice(1)}`;

  return (
    <div>
      {/* ============ 1. HERO BANNER PASTEL ============ */}
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
          alt="Daftar Alat"
          style={{
            width: "100%",
            height: 220,
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
            🌸 DAFTAR ALAT • STOK REALTIME PASTEL EDITION
          </span>
          <h1
            style={{
              color: "white",
              fontSize: 34,
              fontWeight: 900,
              margin: "10px 0 0",
              lineHeight: 1.1,
            }}
          >
            {judulKat}
            <span
              style={{
                background: "linear-gradient(90deg,#FFB6C1,#FFDAB9,#E6E6FA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {" "}
              ({list.length})
            </span>
          </h1>
          <p
            style={{
              color: "#F3E8FF",
              fontSize: 13,
              margin: "8px 0 0",
              maxWidth: 600,
            }}
          >
            {kat === "Semua"
              ? "Semua alat aktif di Lab DKV! Stok tersedia dihitung otomatis secara realtime."
              : `Menampilkan kategori ${kat}. Pilih kategori lain di bawah jika diperlukan.`}
          </p>
        </div>
      </div>

      {/* ============ 2. STATISTIK PASTEL ============ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: 12,
          marginTop: 14,
        }}
      >
        {[
          [
            "🎬",
            "Total Alat",
            list.length,
            `Kategori ${kat}`,
            "linear-gradient(135deg,#FFB6C1,#FFC0CB)",
            "Alat",
          ],
          [
            "📦",
            "Total Stok",
            totalStok,
            "Keseluruhan",
            "linear-gradient(135deg,#AFEEEE,#98FB98)",
            "Unit",
          ],
          [
            "✅",
            "Tersedia",
            totalTersedia,
            "Siap Pinjam",
            "linear-gradient(135deg,#E6E6FA,#D8BFD8)",
            "Unit",
          ],
          [
            "⛔",
            "Habis",
            habis,
            "Sedang Dipinjam",
            "linear-gradient(135deg,#FFDAB9,#FFE4B5)",
            "Alat",
          ],
        ].map(([icon, label, nilai, sub, bg, satuan]) => (
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
            <div style={{ fontSize: 24 }}>{icon}</div>
            <b style={{ display: "block", marginTop: 6, fontSize: 16 }}>
              {nilai} {satuan}
            </b>
            <div style={{ fontSize: 12, opacity: 0.85 }}>
              {label} • {sub}
            </div>
          </div>
        ))}
      </div>

      {/* ============ 3. SARING KATEGORI PASTEL ============ */}
      <div style={{ marginTop: 20 }}>
        <h2
          style={{ color: "#4A3B5C", fontSize: 22, fontWeight: 900, margin: 0 }}
        >
          Saring Berdasarkan Kategori 🎯
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: 10,
            marginTop: 12,
          }}
        >
          <Link
            href="/alat"
            style={{
              background:
                kat === "Semua"
                  ? "linear-gradient(90deg,#FFB6C1,#DDA0DD)"
                  : "#FFF0F5",
              border:
                kat === "Semua"
                  ? "2px solid #DB7093"
                  : "1px solid rgba(221,160,221,0.4)",
              borderRadius: 18,
              padding: 14,
              color: kat === "Semua" ? "#4A3B5C" : "#5B4B6E",
              textDecoration: "none",
              display: "block",
            }}
          >
            <div style={{ fontSize: 24 }}>🎬</div>
            <b style={{ display: "block", marginTop: 6, fontSize: 14 }}>
              Semua Alat
            </b>
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              {(semuaAlat || []).length} alat
            </div>
          </Link>

          {(
            ["kamera", "pencahayaan", "audio", "tablet", "aksesoris"] as const
          ).map((k) => {
            const aktif = kat === k;
            return (
              <Link
                key={k}
                href={`/alat?kategori=${k}`}
                style={{
                  background: aktif ? warnaKat[k] : "#FFF0F5",
                  border: aktif
                    ? "2px solid #DB7093"
                    : "1px solid rgba(221,160,221,0.4)",
                  borderRadius: 18,
                  padding: 14,
                  color: "#5B4B6E",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div style={{ fontSize: 24 }}>{iconKat[k]}</div>
                <b
                  style={{
                    display: "block",
                    marginTop: 6,
                    fontSize: 14,
                    textTransform: "capitalize",
                  }}
                >
                  {k}
                </b>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  {hitungKat[k] || 0} alat
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ============ 4. DAFTAR KARTU ALAT ============ */}
      <div style={{ marginTop: 20 }}>
        {list.length === 0 ? (
          <div
            style={{
              background: "#FFF0F5",
              border: "1px solid rgba(221,160,221,0.4)",
              borderRadius: 24,
              padding: 32,
              textAlign: "center",
              color: "#5B4B6E",
            }}
          >
            <div style={{ fontSize: 48 }}>🌸</div>
            <b style={{ fontSize: 18 }}>Belum Ada Alat di Kategori Ini!</b>
            <p style={{ fontSize: 13 }}>Coba pilih kategori lainnya ya.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: 14,
            }}
          >
            {list.map((a: any) => {
              const tersedia = a.stok - (terpakai[a.id] || 0);
              return (
                <Link
                  key={a.id}
                  href={`/alat/${a.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#4A3B5C",
                    background: "#FFFFFF",
                    border: "1px solid rgba(221,160,221,0.4)",
                    borderRadius: 24,
                    overflow: "hidden",
                    display: "block",
                    boxShadow: "0 10px 25px rgba(221,160,221,0.15)",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <img
                      src={gambarAlat(a.kategori, a.nama)}
                      alt={a.nama}
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  <div style={{ padding: 16 }}>
                    <b style={{ fontSize: 18, display: "block" }}>{a.nama}</b>
                    <div
                      style={{
                        color: "#705888",
                        fontSize: 12,
                        marginTop: 6,
                        lineHeight: 1.5,
                      }}
                    >
                      {a.keterangan || "Alat Lab DKV siap pakai."}
                    </div>

                    <div
                      style={{
                        marginTop: 12,
                        background: "#FFF5F7",
                        border: "1px solid rgba(221,160,221,0.3)",
                        borderRadius: 14,
                        padding: 12,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                        }}
                      >
                        <span style={{ color: "#705888" }}>
                          Stok Total: <b>{a.stok}</b>
                        </span>
                        <span
                          style={{
                            fontWeight: 900,
                            color: tersedia > 0 ? "#2E8B57" : "#DC143C",
                          }}
                        >
                          Tersedia: {tersedia}
                        </span>
                      </div>
                    </div>

                    <span
                      style={{
                        display: "block",
                        textAlign: "center",
                        marginTop: 12,
                        background:
                          tersedia > 0
                            ? "linear-gradient(90deg,#FFB6C1,#DDA0DD)"
                            : "#E0E0E0",
                        color: tersedia > 0 ? "#4A3B5C" : "#888888",
                        padding: "11px",
                        borderRadius: 999,
                        fontWeight: 900,
                        fontSize: 13,
                      }}
                    >
                      {tersedia > 0 ? "Ajukan Pinjam →" : "Stok Habis"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
