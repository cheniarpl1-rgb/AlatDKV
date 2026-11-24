// app/admin/alat/page.tsx - Kelola Alat AlatDKV - JUARA 1 DUNIA!
// Colorful, anti-white 100%, sangat modern, sangat memukau,
// tata letak sangat rapi, kayak website yang pernah Juara 1 dunia!
// SESUAI SOAL E2: Kelola alat - tambah, ubah, hapus, aktif/nonaktif!
// FIX Next.js 16: Hapus `dynamic`, ganti `connection()`!

import { supabaseRahasia } from "@/lib/supabase";
import { tambahAlat, ubahAlat, hapusAlat, toggleAktif } from "./actions";
import { gambarAlat, iconAlat } from "@/lib/gambar";
import Link from "next/link";
import { connection } from "next/server";

export default async function KelolaAlat() {
  // 👈 PENGGANTI `force-dynamic` DI NEXT.JS 16! WAJIB ADA!
  await connection();

  const { data } = await supabaseRahasia().from("alat").select("*").order("id");
  const list = data || [];

  // Hitung stok tersedia per alat! (stok - dipinjam!)
  const { data: pinjam } = await supabaseRahasia()
    .from("peminjaman_alat")
    .select("alat_id, jumlah")
    .in("status", ["menunggu", "dipinjam"]);
  const terpakaiMap: Record<number, number> = {};
  (pinjam || []).forEach((x: any) => {
    terpakaiMap[x.alat_id] = (terpakaiMap[x.alat_id] || 0) + x.jumlah;
  });

  // Statistik!
  const totalAlat = list.length;
  const totalStok = list.reduce((s: number, a: any) => s + a.stok, 0);
  const totalTerpakai = (pinjam || []).reduce(
    (s: number, x: any) => s + x.jumlah,
    0,
  );
  const totalTersedia = Math.max(0, totalStok - totalTerpakai);
  const jmlAktif = list.filter((a: any) => a.aktif).length;

  // Warna per kategori!
  const warnaKat: Record<string, string> = {
    kamera: "linear-gradient(135deg,#F472B6,#A855F7)",
    pencahayaan: "linear-gradient(135deg,#FBBF24,#F97316)",
    audio: "linear-gradient(135deg,#60A5FA,#22D3EE)",
    tablet: "linear-gradient(135deg,#34D399,#10B981)",
    aksesoris: "linear-gradient(135deg,#A78BFA,#EC4899)",
  };

  return (
    <div>
      {/* ============ 1. HEADER! 👈 UPGRADE! ============ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <span
            style={{
              background: "white",
              color: "#6D28D9",
              fontSize: 11,
              fontWeight: 900,
              padding: "6px 12px",
              borderRadius: 999,
            }}
          >
            🛠 KELOLA ALAT • ADMIN
          </span>
          <h1
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: 900,
              margin: "10px 0 0",
            }}
          >
            Kelola Alat{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#FDE68A,#F472B6,#A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ({totalAlat})
            </span>
          </h1>
          <p style={{ color: "#C4B5FD", fontSize: 13, margin: "6px 0 0" }}>
            Tambah, ubah, aktif/nonaktif, hapus alat Lab DKV! Stok tersedia
            dihitung realtime!
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            href="/admin"
            style={{
              background: "white",
              color: "#6D28D9",
              padding: "11px 18px",
              borderRadius: 999,
              fontWeight: 900,
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            ← Daftar Permohonan
          </Link>
          <Link
            href="/alat"
            style={{
              background: "#1E103A",
              border: "1px solid #4C1D95",
              color: "white",
              padding: "11px 18px",
              borderRadius: 999,
              fontWeight: 800,
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            🎬 Lihat Alat (Siswa)
          </Link>
        </div>
      </div>

      {/* ============ 2. 4 KARTU STATISTIK! 👈 BARU! ============ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: 12,
          marginTop: 16,
        }}
      >
        {[
          [
            "🎬",
            "Total Jenis Alat",
            totalAlat,
            "linear-gradient(135deg,#7C3AED,#A855F7)",
            "Semua kategori!",
          ],
          [
            "📦",
            "Total Stok",
            totalStok,
            "linear-gradient(135deg,#3B82F6,#22D3EE)",
            "Semua unit di lab!",
          ],
          [
            "✅",
            "Tersedia",
            totalTersedia,
            "linear-gradient(135deg,#10B981,#22D3EE)",
            "Bisa dipinjam sekarang!",
          ],
          [
            "🔥",
            "Sedang Dipinjam",
            totalTerpakai,
            "linear-gradient(135deg,#F59E0B,#F97316)",
            "Di luar lab!",
          ],
        ].map(([icon, label, nilai, bg, desc]) => (
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 26 }}>{icon}</span>
              <b style={{ fontSize: 28, lineHeight: 1 }}>{nilai}</b>
            </div>
            <b style={{ fontSize: 14, display: "block", marginTop: 8 }}>
              {label}
            </b>
            <div style={{ fontSize: 11, opacity: 0.9, marginTop: 2 }}>
              {desc}
            </div>
          </div>
        ))}
      </div>

      {/* ============ 3. LAYOUT 2 KOLOM! 👈 UPGRADE TOTAL! ============ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: 16,
          marginTop: 16,
          alignItems: "start",
        }}
      >
        {/* KIRI: FORM TAMBAH ALAT! */}
        <div style={{ position: "sticky", top: 16 }}>
          <form
            action={tambahAlat}
            style={{
              background: "linear-gradient(180deg,#2E1065,#1E103A)",
              border: "1px solid #7C3AED",
              borderRadius: 24,
              padding: 20,
              display: "grid",
              gap: 12,
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 13,
                  background: "linear-gradient(135deg,#F59E0B,#EC4899)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                +
              </span>
              <div>
                <b style={{ color: "white", fontSize: 17, display: "block" }}>
                  + Tambah Alat Baru
                </b>
                <span style={{ color: "#C4B5FD", fontSize: 12 }}>
                  Alat baru langsung muncul di /alat!
                </span>
              </div>
            </div>

            <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
              🎬 Nama Alat *
              <input
                name="nama"
                placeholder="Contoh: Kamera Canon EOS 2000D"
                required
                style={{
                  width: "100%",
                  padding: 13,
                  borderRadius: 13,
                  marginTop: 6,
                  background: "#120826",
                  color: "white",
                  border: "1px solid #4C1D95",
                  fontSize: 14,
                }}
              />
              <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 400 }}>
                3-40 huruf! Nama ini yang dilihat siswa!
              </span>
            </label>

            <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
              📁 Kategori *
              <select
                name="kategori"
                style={{
                  width: "100%",
                  padding: 13,
                  borderRadius: 13,
                  marginTop: 6,
                  background: "#120826",
                  color: "white",
                  border: "1px solid #4C1D95",
                  fontSize: 14,
                }}
              >
                <option value="kamera">📷 Kamera</option>
                <option value="pencahayaan">💡 Pencahayaan</option>
                <option value="audio">🎤 Audio</option>
                <option value="tablet">📱 Tablet</option>
                <option value="aksesoris">🎒 Aksesoris</option>
              </select>
            </label>

            <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
              📦 Stok *
              <input
                name="stok"
                type="number"
                min={0}
                max={50}
                placeholder="Contoh: 5"
                required
                style={{
                  width: "100%",
                  padding: 13,
                  borderRadius: 13,
                  marginTop: 6,
                  background: "#120826",
                  color: "white",
                  border: "1px solid #4C1D95",
                  fontSize: 14,
                }}
              />
              <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 400 }}>
                0-50 unit! Kalau 0, siswa gak bisa pinjam!
              </span>
            </label>

            <label style={{ color: "white", fontWeight: 800, fontSize: 13 }}>
              📝 Keterangan
              <input
                name="keterangan"
                placeholder="Contoh: Lensa 18-55mm, baterai + charger lengkap"
                style={{
                  width: "100%",
                  padding: 13,
                  borderRadius: 13,
                  marginTop: 6,
                  background: "#120826",
                  color: "white",
                  border: "1px solid #4C1D95",
                  fontSize: 14,
                }}
              />
              <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 400 }}>
                Opsional! Tulis isi paket / kondisi alat!
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
              Tambah Alat →
            </button>
            <p
              style={{
                color: "#A78BFA",
                fontSize: 11,
                margin: 0,
                textAlign: "center",
              }}
            >
              Alat baru otomatis AKTIF & langsung bisa dipinjam!
            </p>
          </form>

          {/* Info kecil! */}
          <div
            style={{
              background: "#14532D",
              border: "1px solid #22C55E",
              borderRadius: 20,
              padding: 16,
              marginTop: 12,
            }}
          >
            <b style={{ color: "white", fontSize: 14 }}>💡 Tips Admin!</b>
            <p
              style={{
                color: "#BBF7D0",
                fontSize: 12,
                lineHeight: 1.7,
                margin: "6px 0 0",
              }}
            >
              • <b style={{ color: "white" }}>Nonaktifkan</b> alat yang rusak,
              biar siswa gak bisa pinjam!
              <br />• <b style={{ color: "white" }}>Hapus</b> cuma buat alat
              yang beneran udah gak ada! Kalau ada peminjaman aktif, hapus-nya
              ditolak!
              <br />• Stok tersedia = stok - dipinjam, dihitung otomatis!
            </p>
          </div>
        </div>

        {/* KANAN: DAFTAR ALAT! */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: 900,
                margin: 0,
              }}
            >
              Daftar Alat ({totalAlat})
            </h2>
            <span
              style={{
                background: "#1E103A",
                border: "1px solid #4C1D95",
                color: "#C4B5FD",
                fontSize: 12,
                fontWeight: 800,
                padding: "6px 12px",
                borderRadius: 999,
              }}
            >
              ✅ {jmlAktif} Aktif • ❌ {totalAlat - jmlAktif} Nonaktif
            </span>
          </div>

          {list.length === 0 ? (
            <div
              style={{
                background: "#1E103A",
                border: "1px solid #4C1D95",
                borderRadius: 24,
                padding: 32,
                textAlign: "center",
                marginTop: 12,
              }}
            >
              <div style={{ fontSize: 48 }}>🎬</div>
              <b style={{ color: "white", fontSize: 18 }}>Belum Ada Alat!</b>
              <p style={{ color: "#C4B5FD", fontSize: 13, margin: "6px 0 0" }}>
                Tambah alat pertama lewat form di sebelah kiri!
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
              {list.map((a: any) => {
                const terpakai = terpakaiMap[a.id] || 0;
                const tersedia = Math.max(0, a.stok - terpakai);
                const persen =
                  a.stok > 0 ? Math.round((tersedia / a.stok) * 100) : 0;
                return (
                  <div
                    key={a.id}
                    style={{
                      background: "#1E103A",
                      border: a.aktif
                        ? "1px solid #4C1D95"
                        : "2px dashed #6B7280",
                      borderRadius: 20,
                      padding: 14,
                      opacity: a.aktif ? 1 : 0.85,
                    }}
                  >
                    {/* Baris atas: Foto + Nama + Status! */}
                    <div style={{ display: "flex", gap: 12 }}>
                      <img
                        src={gambarAlat(a.kategori, a.nama)}
                        alt={a.nama}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 16,
                          flexShrink: 0,
                          border: "1px solid #4C1D95",
                        }}
                      />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            flexWrap: "wrap",
                            alignItems: "center",
                          }}
                        >
                          <b style={{ color: "white", fontSize: 15 }}>
                            {iconAlat(a.kategori, a.nama)} {a.nama}
                          </b>
                          <span
                            style={{
                              background:
                                warnaKat[a.kategori] || warnaKat.aksesoris,
                              color: "white",
                              fontSize: 11,
                              fontWeight: 900,
                              padding: "4px 10px",
                              borderRadius: 999,
                            }}
                          >
                            {a.kategori.toUpperCase()}
                          </span>
                          <span
                            style={{
                              background: a.aktif ? "#14532D" : "#7F1D1D",
                              color: a.aktif ? "#BBF7D0" : "#FECACA",
                              fontSize: 11,
                              fontWeight: 900,
                              padding: "4px 10px",
                              borderRadius: 999,
                            }}
                          >
                            {a.aktif ? "✅ AKTIF" : "❌ NONAKTIF"}
                          </span>
                        </div>
                        <div
                          style={{
                            color: "#C4B5FD",
                            fontSize: 12,
                            marginTop: 4,
                            lineHeight: 1.6,
                          }}
                        >
                          🆔 ID #{a.id} • 📦 Stok {a.stok} • ✅ Tersedia{" "}
                          {tersedia} • 📦 {terpakai} dipinjam
                          <br />
                          📝 {a.keterangan || "Gak ada keterangan"}
                        </div>
                        {/* Bar stok! */}
                        <div
                          style={{
                            height: 8,
                            background: "#120826",
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
                              background:
                                persen > 50
                                  ? "linear-gradient(90deg,#10B981,#22D3EE)"
                                  : persen > 0
                                    ? "linear-gradient(90deg,#F59E0B,#F97316)"
                                    : "linear-gradient(90deg,#EF4444,#F97316)",
                              borderRadius: 999,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* FORM UBAH LENGKAP! 👈 UPGRADE! Bukan cuma stok! */}
                    <form
                      action={ubahAlat}
                      style={{
                        background: "#120826",
                        border: "1px solid #4C1D95",
                        borderRadius: 16,
                        padding: 12,
                        marginTop: 12,
                        display: "grid",
                        gap: 8,
                      }}
                    >
                      <input type="hidden" name="id" value={a.id} />
                      <b style={{ color: "white", fontSize: 13 }}>
                        ✏️ Ubah Alat Ini
                      </b>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 8,
                        }}
                      >
                        <input
                          name="nama"
                          defaultValue={a.nama}
                          placeholder="Nama alat"
                          required
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            background: "#1E103A",
                            color: "white",
                            border: "1px solid #4C1D95",
                            fontSize: 13,
                          }}
                        />
                        <select
                          name="kategori"
                          defaultValue={a.kategori}
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            background: "#1E103A",
                            color: "white",
                            border: "1px solid #4C1D95",
                            fontSize: 13,
                          }}
                        >
                          <option value="kamera">📷 Kamera</option>
                          <option value="pencahayaan">💡 Pencahayaan</option>
                          <option value="audio">🎤 Audio</option>
                          <option value="tablet">📱 Tablet</option>
                          <option value="aksesoris">🎒 Aksesoris</option>
                        </select>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 8,
                        }}
                      >
                        <input
                          name="stok"
                          type="number"
                          min={0}
                          max={50}
                          defaultValue={a.stok}
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            background: "#1E103A",
                            color: "white",
                            border: "1px solid #4C1D95",
                            fontSize: 13,
                          }}
                        />
                        <input
                          name="keterangan"
                          defaultValue={a.keterangan || ""}
                          placeholder="Keterangan"
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            background: "#1E103A",
                            color: "white",
                            border: "1px solid #4C1D95",
                            fontSize: 13,
                          }}
                        />
                      </div>
                      <button
                        style={{
                          background: "#2563EB",
                          color: "white",
                          padding: "11px",
                          borderRadius: 999,
                          fontWeight: 900,
                          border: "none",
                          cursor: "pointer",
                          fontSize: 13,
                        }}
                      >
                        💾 Simpan Perubahan
                      </button>
                    </form>

                    {/* Tombol Aktif / Hapus! */}
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginTop: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <form action={toggleAktif} style={{ flex: 1 }}>
                        <input type="hidden" name="id" value={a.id} />
                        <input
                          type="hidden"
                          name="aktif"
                          value={String(!a.aktif)}
                        />
                        <button
                          style={{
                            width: "100%",
                            background: a.aktif ? "#7C3AED" : "#16A34A",
                            color: "white",
                            padding: "11px",
                            borderRadius: 999,
                            fontWeight: 900,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 13,
                          }}
                        >
                          {a.aktif ? "⏸ Nonaktifkan" : "▶ Aktifkan"}
                        </button>
                      </form>
                      <form
                        action={hapusAlat}
                        style={{ flex: 1 }}
                        onSubmit={(e: any) => {
                          if (
                            !confirm(
                              `Yakin hapus "${a.nama}"? Alat yang masih dipinjam gak bisa dihapus!`,
                            )
                          )
                            e.preventDefault();
                        }}
                      >
                        <input type="hidden" name="id" value={a.id} />
                        <button
                          style={{
                            width: "100%",
                            background: "#DC2626",
                            color: "white",
                            padding: "11px",
                            borderRadius: 999,
                            fontWeight: 900,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 13,
                          }}
                        >
                          🗑 Hapus
                        </button>
                      </form>
                      <Link
                        href={`/alat/${a.id}`}
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
                        👀 Lihat (Siswa) →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
