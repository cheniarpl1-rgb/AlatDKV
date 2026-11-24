// app/admin/alat/actions.ts - Aksi Kelola Alat! SESUAI SOAL E2!
"use server";
import { supabaseRahasia } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function tambahAlat(form: FormData) {
  const nama = String(form.get("nama") || "").trim();
  const kategori = String(form.get("kategori") || "aksesoris");
  const stok = Number(form.get("stok"));
  const keterangan = String(form.get("keterangan") || "").trim();
  if (nama.length < 3 || nama.length > 40) return redirect("/admin/alat");
  if (stok < 0 || stok > 50) return redirect("/admin/alat");
  await supabaseRahasia()
    .from("alat")
    .insert({ nama, kategori, stok, keterangan, aktif: true });
  revalidatePath("/admin/alat");
  revalidatePath("/alat");
  redirect("/admin/alat");
}

export async function ubahAlat(form: FormData) {
  const id = Number(form.get("id"));
  const nama = String(form.get("nama") || "").trim();
  const kategori = String(form.get("kategori") || "aksesoris");
  const stok = Number(form.get("stok"));
  const keterangan = String(form.get("keterangan") || "").trim();
  if (!id || nama.length < 3 || nama.length > 40)
    return redirect("/admin/alat");
  if (stok < 0 || stok > 50) return redirect("/admin/alat");
  await supabaseRahasia()
    .from("alat")
    .update({ nama, kategori, stok, keterangan })
    .eq("id", id);
  revalidatePath("/admin/alat");
  revalidatePath("/alat");
  redirect("/admin/alat");
}

export async function toggleAktif(form: FormData) {
  const id = Number(form.get("id"));
  const aktif = form.get("aktif") === "true";
  await supabaseRahasia().from("alat").update({ aktif }).eq("id", id);
  revalidatePath("/admin/alat");
  revalidatePath("/alat");
  redirect("/admin/alat");
}

export async function hapusAlat(form: FormData) {
  const id = Number(form.get("id"));
  // Cek dulu: kalau masih ada peminjaman aktif, tolak hapus!
  const { data: aktif } = await supabaseRahasia()
    .from("peminjaman_alat")
    .select("id")
    .eq("alat_id", id)
    .in("status", ["menunggu", "dipinjam"]);
  if ((aktif || []).length > 0) return redirect("/admin/alat");
  await supabaseRahasia().from("alat").delete().eq("id", id);
  revalidatePath("/admin/alat");
  revalidatePath("/alat");
  redirect("/admin/alat");
}
