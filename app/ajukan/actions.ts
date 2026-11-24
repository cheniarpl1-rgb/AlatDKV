// app/ajukan/actions.ts - Logika Bisnis di Server! SESUAI SOAL E2!
"use server";
import { supabaseRahasia } from "@/lib/supabase";
import { validasiForm } from "@/lib/validasi";
import { redirect } from "next/navigation";

export async function ajukanPinjam(form: FormData) {
  const body: any = {
    alat_id: Number(form.get("alat_id")),
    peminjam: String(form.get("peminjam") || "").trim(),
    kelas: String(form.get("kelas") || "").trim(),
    keperluan: String(form.get("keperluan") || "").trim(),
    jumlah: Number(form.get("jumlah")),
    tgl_pinjam: String(form.get("tgl_pinjam")),
    tgl_kembali: String(form.get("tgl_kembali")),
  };

  // Validasi form di server!
  const err = validasiForm(body);
  if (err)
    return redirect(
      `/ajukan?alat_id=${body.alat_id}&error=${encodeURIComponent(err)}`,
    );

  const db = supabaseRahasia();

  // Cek alat aktif!
  const { data: alat } = await db
    .from("alat")
    .select("*")
    .eq("id", body.alat_id)
    .single();
  if (!alat || !alat.aktif)
    return redirect(
      `/ajukan?alat_id=${body.alat_id}&error=${encodeURIComponent("Alat tidak aktif / tidak ditemukan!")}`,
    );

  // Cek maks 2 aktif per peminjam!
  const { data: aktif } = await db
    .from("peminjaman_alat")
    .select("id")
    .eq("peminjam", body.peminjam)
    .in("status", ["menunggu", "dipinjam"]);
  if ((aktif || []).length >= 2)
    return redirect(
      `/ajukan?alat_id=${body.alat_id}&error=${encodeURIComponent("Satu peminjam paling banyak 2 peminjaman aktif! Selesaikan yang lama dulu ya!")}`,
    );

  // Cek stok tersedia = stok - dipinjam!
  const { data: pakai } = await db
    .from("peminjaman_alat")
    .select("jumlah")
    .eq("alat_id", body.alat_id)
    .in("status", ["menunggu", "dipinjam"]);
  const terpakai = (pakai || []).reduce((a: number, x: any) => a + x.jumlah, 0);
  if (alat.stok - terpakai < body.jumlah)
    return redirect(
      `/ajukan?alat_id=${body.alat_id}&error=${encodeURIComponent(`Stok tidak mencukupi! Tersedia ${alat.stok - terpakai} unit, kamu minta ${body.jumlah} unit!`)}`,
    );

  const { data, error } = await db
    .from("peminjaman_alat")
    .insert({ ...body, status: "menunggu" })
    .select("id")
    .single();
  if (error)
    return redirect(
      `/ajukan?alat_id=${body.alat_id}&error=${encodeURIComponent(error.message)}`,
    );

  return redirect(
    `/cek?nomor=${data.id}&nama=${encodeURIComponent(body.peminjam)}&sukses=1`,
  );
}
