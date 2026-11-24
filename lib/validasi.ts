// lib/validasi.ts - SEMUA ATURAN WAJIB SOAL E2!
export function tglIndo(tgl: string) {
  if (!tgl) return "-";
  return new Date(tgl + "T00:00:00").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
export function isSabtuMinggu(tgl: string) {
  const d = new Date(tgl + "T00:00:00").getDay();
  return d === 0 || d === 6;
}
export function hariIni() {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}
export function tambahHari(tgl: string, n: number) {
  const d = new Date(tgl + "T00:00:00"); d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
// 👈 ATURAN: pinjam valid, bukan lampau, maks 14 hari ke depan, bukan Sabtu/Minggu!
export function validasiTanggal(pinjam: string, kembali: string): string | null {
  const today = hariIni();
  if (!pinjam || !kembali) return "Tanggal pinjam dan kembali wajib diisi!";
  if (pinjam < today) return "Tanggal pinjam tidak boleh tanggal lampau!";
  if (pinjam > tambahHari(today, 14)) return "Tanggal pinjam paling jauh 14 hari ke depan!";
  if (isSabtuMinggu(pinjam)) return "Tanggal pinjam tidak boleh Sabtu / Minggu!";
  if (isSabtuMinggu(kembali)) return "Tanggal kembali tidak boleh Sabtu / Minggu!";
  if (kembali < pinjam) return "Tanggal kembali tidak boleh sebelum tanggal pinjam!";
  const selisih = Math.round((new Date(kembali).getTime() - new Date(pinjam).getTime()) / 86400000);
  if (selisih > 3) return "Paling lama pinjam 3 hari! (Kembali - Pinjam maks 3 hari)";
  return null;
}
export function validasiForm(p: any): string | null {
  if (!p.peminjam || p.peminjam.trim().length < 3 || p.peminjam.trim().length > 40) return "Nama peminjam 3-40 huruf!";
  if (/[0-9]/.test(p.peminjam)) return "Nama peminjam tidak boleh ada angka!";
  if (!p.kelas || p.kelas.trim().length < 3 || p.kelas.trim().length > 20) return "Kelas 3-20 huruf!";
  if (!p.keperluan || p.keperluan.trim().length < 5 || p.keperluan.trim().length > 120) return "Keperluan 5-120 huruf!";
  if (!p.jumlah || p.jumlah < 1 || p.jumlah > 5) return "Jumlah 1-5 unit!";
  return validasiTanggal(p.tgl_pinjam, p.tgl_kembali);
}