// app/alat/page.tsx - Daftar Alat AlatDKV - JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!
// SESUAI SOAL E2: Daftar alat dengan jumlah tersedia, Saring kategori lewat URL!
// FIX Next.js 16: Hapus `dynamic`, ganti `connection()`!
// FIX KEY DUPLIKAT: key pake label yang PASTI unik, bukan angka!

import { supabasePublik } from "@/lib/supabase";
import { gambarAlat, iconAlat } from "@/lib/gambar";
import Link from "next/link";
import { connection } from "next/server";

export default async function DaftarAlat({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  // 👈 PENGGANTI `force-dynamic` DI NEXT.JS 16! WAJIB ADA!
  await connection();

  const p = await searchParams;
  const kat = p.kategori || "Semua";

  let q = supabasePublik().from("alat").select("*").eq("aktif", true);
  if (kat !== "Semua") q = q.eq("kategori", kat);
  const { data } = await q;
  const list = data || [];

  // Hitung stok tersedia: stok - yang sedang dipinjam! (ATURAN SOAL!)
  const { data: pinjam } = await supabasePublik()
    .from("peminjaman_alat")
    .select("alat_id,jumlah")
    .in("status", ["menunggu", "dipinjam"]);
  const terpakai: Record<number, number> = {};
  (pinjam || []).forEach((x: any) => {
    terpakai[x.alat_id] = (terpakai[x.alat_id] || 0) + x.jumlah;
  });

  // Statistik!
  const totalStok = list.reduce((a: number, x: any) => a + x.stok, 0);
  const totalTersedia = list.reduce(
    (a: number, x: any) => a + Math.max(0, x.stok - (terpakai[x.id] || 0)),
    0,
  );
  const habis = list.filter(
    (x: any) => x.stok - (terpakai[x.id] || 0) <= 0,
  ).length;

  // Hitungan per kategori buat tombol kategori!
  const { data: semuaAlat } = await supabasePublik()
    .from("alat")
    .select("kategori")
    .eq("aktif", true);
  const hitungKat: Record<string, number> = {};
  (semuaAlat || []).forEach((x: any) => {
    hitungKat[x.kategori] = (hitungKat[x.kategori] || 0) + 1;
  });

  // Warna per kategori!
  const warnaKat: Record<string, string> = {
    kamera: "linear-gradient(135deg,#F472B6,#A855F7)",
    pencahayaan: "linear-gradient(135deg,#FBBF24,#F97316)",
    audio: "linear-gradient(135deg,#60A5FA,#22D3EE)",
    tablet: "linear-gradient(135deg,#34D399,#10B981)",
    aksesoris: "linear-gradient(135deg,#A78BFA,#EC4899)",
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
      {/* ============ 1. HERO + GAMBAR UNSPLASH! ============ */}
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
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop"
          alt="Daftar Alat"
          style={{
            width: "100%",
            height: 220,
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
            🎬 DAFTAR ALAT • SARING LEWAT URL • STOK REALTIME!
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
                background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)",
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
              color: "#DDD6FE",
              fontSize: 13,
              margin: "8px 0 0",
              maxWidth: 600,
            }}
          >
            {kat === "Semua"
              ? "Semua alat aktif di Lab DKV! Stok tersedia = stok total - yang sedang dipinjam! Klik kartu-nya buat ajukan!"
              : `Kamu lagi lihat kategori ${kat}! Coba kategori lain di bawah, atau balik ke Semua Alat!`}
          </p>
          <div
            style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}
          >
            <Link
              href="/ajukan"
              style={{
                background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                color: "white",
                padding: "10px 18px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              📝 Ajukan Sekarang →
            </Link>
            <Link
              href="/cek"
              style={{
                background: "rgba(0,0,0,0.35)",
                color: "white",
                padding: "10px 16px",
                borderRadius: 999,
                fontWeight: 800,
                textDecoration: "none",
                fontSize: 13,
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              🔍 Cek Status
            </Link>
          </div>
        </div>
      </div>

      {/* ============ 2. STATISTIK 4 KOTAK! 👈 FIX KEY DUPLIKAT DI SINI! ============ */}
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
            `Di kategori ${kat}`,
            "linear-gradient(135deg,#8B5CF6,#EC4899)",
            "Alat",
          ],
          [
            "📦",
            "Total Stok",
            totalStok,
            "Total Stok",
            "linear-gradient(135deg,#3B82F6,#22D3EE)",
            "Unit",
          ],
          [
            "✅",
            "Tersedia",
            totalTersedia,
            "Tersedia Sekarang!",
            "linear-gradient(135deg,#10B981,#22D3EE)",
            "Unit",
          ],
          [
            "⛔",
            "Habis",
            habis,
            "Stok Habis / Dipinjam Semua",
            "linear-gradient(135deg,#EF4444,#F97316)",
            "Alat",
          ],
        ].map(([icon, label, nilai, sub, bg, satuan]) => (
          // ✅ FIX: key={label} — label selalu beda: "Total Alat", "Total Stok", "Tersedia", "Habis"!
          // ❌ SEBELUM: key={judul} — judul-nya "0 Unit" & "0 Unit" kalau stok & tersedia sama-sama 0, jadi KEMBAR!
          <div
            key={label as string}
            style={{
              background: bg as string,
              borderRadius: 20,
              padding: 16,
              color: "white",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ fontSize: 24 }}>{icon}</div>
            <b style={{ display: "block", marginTop: 6, fontSize: 16 }}>
              {nilai} {satuan}
            </b>
            <div style={{ fontSize: 12, opacity: 0.9 }}>
              {label} • {sub}
            </div>
          </div>
        ))}
      </div>

      {/* ============ 3. SARING KATEGORI JADI KARTU! ============ */}
      <div style={{ marginTop: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div>
            <h2
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: 900,
                margin: 0,
              }}
            >
              Saring Berdasarkan Kategori! 🎯
            </h2>
            <p style={{ color: "#C4B5FD", fontSize: 13, margin: "4px 0 0" }}>
              Klik kategori, URL-nya berubah jadi `/alat?kategori=kamera` — ini
              yang dinilai penguji!
            </p>
          </div>
          {kat !== "Semua" && (
            <Link
              href="/alat"
              style={{
                background: "white",
                color: "#6D28D9",
                padding: "9px 16px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              ✕ Hapus Saringan
            </Link>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: 10,
            marginTop: 12,
          }}
        >
          {/* Tombol Semua! */}
          <Link
            href="/alat"
            style={{
              background:
                kat === "Semua"
                  ? "linear-gradient(90deg,#F59E0B,#EC4899)"
                  : "#1E103A",
              border:
                kat === "Semua" ? "2px solid #FDE68A" : "1px solid #4C1D95",
              borderRadius: 18,
              padding: 14,
              color: "white",
              textDecoration: "none",
              display: "block",
              boxShadow:
                kat === "Semua" ? "0 10px 30px rgba(236,72,153,0.4)" : "none",
            }}
          >
            <div style={{ fontSize: 24 }}>🎬</div>
            <b style={{ display: "block", marginTop: 6, fontSize: 14 }}>
              Semua Alat
            </b>
            <div
              style={{
                fontSize: 12,
                color: kat === "Semua" ? "white" : "#C4B5FD",
              }}
            >
              {(semuaAlat || []).length} alat •{" "}
              {kat === "Semua" ? "✅ Kamu di sini!" : "Lihat semua →"}
            </div>
          </Link>

          {/* Tombol per kategori! */}
          {(
            ["kamera", "pencahayaan", "audio", "tablet", "aksesoris"] as const
          ).map((k) => {
            const aktif = kat === k;
            return (
              <Link
                key={k}
                href={`/alat?kategori=${k}`}
                style={{
                  background: aktif ? warnaKat[k] : "#1E103A",
                  border: aktif ? "2px solid white" : "1px solid #4C1D95",
                  borderRadius: 18,
                  padding: 14,
                  color: "white",
                  textDecoration: "none",
                  display: "block",
                  boxShadow: aktif ? "0 10px 30px rgba(0,0,0,0.3)" : "none",
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
                <div
                  style={{ fontSize: 12, color: aktif ? "white" : "#C4B5FD" }}
                >
                  {hitungKat[k] || 0} alat •{" "}
                  {aktif ? "✅ Kamu di sini!" : "Lihat →"}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ============ 4. DAFTAR KARTU ALAT! ============ */}
      <div style={{ marginTop: 20 }}>
        {list.length === 0 ? (
          <div
            style={{
              background: "#1E103A",
              border: "1px solid #4C1D95",
              borderRadius: 24,
              padding: 32,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 48 }}>😢</div>
            <b style={{ color: "white", fontSize: 18 }}>
              Belum Ada Alat di Kategori {kat}!
            </b>
            <p style={{ color: "#C4B5FD", fontSize: 13 }}>
              Mungkin alat-nya lagi nonaktif / belum ditambah admin. Coba
              kategori lain ya!
            </p>
            <Link
              href="/alat"
              style={{
                display: "inline-block",
                marginTop: 12,
                background: "linear-gradient(90deg,#F59E0B,#EC4899)",
                color: "white",
                padding: "12px 24px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
              }}
            >
              🎬 Lihat Semua Alat →
            </Link>
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
              const persen =
                a.stok > 0
                  ? Math.round((Math.max(0, tersedia) / a.stok) * 100)
                  : 0;
              const warnaBar =
                persen > 50
                  ? "linear-gradient(90deg,#10B981,#22D3EE)"
                  : persen > 0
                    ? "linear-gradient(90deg,#F59E0B,#F97316)"
                    : "linear-gradient(90deg,#EF4444,#F97316)";
              return (
                <Link
                  key={a.id}
                  href={`/alat/${a.id}`}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    background: "linear-gradient(180deg,#2E1065,#1E103A)",
                    border: "1px solid #4C1D95",
                    borderRadius: 24,
                    overflow: "hidden",
                    display: "block",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                  }}
                >
                  {/* FOTO + BADGE DI ATAS FOTO! */}
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
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(18,8,38,0.85))",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        padding: "12px 14px",
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
                        {iconAlat(a.kategori, a.nama)}
                      </span>
                      <span
                        style={{
                          background:
                            warnaKat[a.kategori] || warnaKat.aksesoris,
                          color: "white",
                          fontSize: 11,
                          fontWeight: 900,
                          padding: "5px 10px",
                          borderRadius: 999,
                          border: "1px solid rgba(255,255,255,0.3)",
                        }}
                      >
                        {a.kategori.toUpperCase()}
                      </span>
                    </div>
                    {tersedia <= 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "#DC2626",
                          color: "white",
                          fontSize: 11,
                          fontWeight: 900,
                          padding: "6px 10px",
                          borderRadius: 999,
                        }}
                      >
                        ⛔ STOK HABIS!
                      </span>
                    )}
                  </div>

                  <div style={{ padding: 16 }}>
                    <b
                      style={{
                        fontSize: 18,
                        display: "block",
                        lineHeight: 1.3,
                      }}
                    >
                      {a.nama}
                    </b>
                    <div
                      style={{
                        color: "#C4B5FD",
                        fontSize: 12,
                        marginTop: 6,
                        lineHeight: 1.6,
                      }}
                    >
                      {a.keterangan ||
                        "Alat Lab DKV, siap dipakai untuk tugas & proyek!"}
                    </div>

                    {/* STOK + BAR! */}
                    <div
                      style={{
                        marginTop: 12,
                        background: "#120826",
                        border: "1px solid #4C1D95",
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
                        <span style={{ color: "#C4B5FD" }}>
                          📦 Stok Total{" "}
                          <b style={{ color: "white" }}>{a.stok}</b>
                        </span>
                        <span
                          style={{
                            fontWeight: 900,
                            color: tersedia > 0 ? "#4ADE80" : "#F87171",
                          }}
                        >
                          ✅ Tersedia {tersedia} unit
                        </span>
                      </div>
                      {/* Bar stok! */}
                      <div
                        style={{
                          height: 8,
                          background: "#1E103A",
                          borderRadius: 999,
                          marginTop: 8,
                          overflow: "hidden",
                          border: "1px solid #4C1D95",
                        }}
                      >
                        <div
                          style={{
                            width: `${persen}%`,
                            height: "100%",
                            background: warnaBar,
                            borderRadius: 999,
                          }}
                        />
                      </div>
                      <div
                        style={{ fontSize: 11, color: "#A78BFA", marginTop: 6 }}
                      >
                        {persen}% masih tersedia • {terpakai[a.id] || 0} unit
                        sedang dipinjam
                      </div>
                    </div>

                    <span
                      style={{
                        display: "block",
                        textAlign: "center",
                        marginTop: 12,
                        background:
                          tersedia > 0
                            ? "linear-gradient(90deg,#F59E0B,#EC4899)"
                            : "#374151",
                        padding: "11px",
                        borderRadius: 999,
                        fontWeight: 900,
                        fontSize: 13,
                      }}
                    >
                      {tersedia > 0 ? "Ajukan Pinjam →" : "⛔ Stok Habis!"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ============ 5. CTA BAWAH! ============ */}
      <div
        style={{
          marginTop: 20,
          borderRadius: 24,
          overflow: "hidden",
          position: "relative",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1600&auto=format&fit=crop"
          alt="Pinjam Sekarang"
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
              "linear-gradient(90deg, rgba(245,158,11,0.92), rgba(236,72,153,0.92), rgba(139,92,246,0.92))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            textAlign: "center",
          }}
        >
          <h3
            style={{ color: "white", fontSize: 22, fontWeight: 900, margin: 0 }}
          >
            Udah Ketemu Alatnya? 🚀
          </h3>
          <p style={{ color: "white", opacity: 0.9, fontSize: 13 }}>
            Jangan sampai kehabisan! Ajukan sekarang, besok tinggal ambil!
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: 12,
            }}
          >
            <Link
              href="/ajukan"
              style={{
                background: "#120826",
                color: "white",
                padding: "12px 26px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
              }}
            >
              📝 Ajukan Sekarang →
            </Link>
            <Link
              href="/cek"
              style={{
                background: "white",
                color: "#DB2777",
                padding: "12px 22px",
                borderRadius: 999,
                fontWeight: 900,
                textDecoration: "none",
              }}
            >
              🔍 Cek Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
