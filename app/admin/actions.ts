// app/admin/actions.ts - Aksi Admin! SESUAI SOAL E2!
"use server";
import { supabaseRahasia } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function setujui(form: FormData) {
  const id = Number(form.get("id"));
  await supabaseRahasia()
    .from("peminjaman_alat")
    .update({ status: "dipinjam" })
    .eq("id", id)
    .eq("status", "menunggu");
  revalidatePath("/admin");
  redirect("/admin?status=dipinjam");
}

export async function tolak(form: FormData) {
  const id = Number(form.get("id"));
  const alasan = String(form.get("alasan") || "").trim();
  if (!alasan) return redirect("/admin?status=menunggu");
  await supabaseRahasia()
    .from("peminjaman_alat")
    .update({ status: "ditolak", alasan_tolak: alasan })
    .eq("id", id)
    .eq("status", "menunggu");
  revalidatePath("/admin");
  redirect("/admin?status=ditolak");
}

export async function kembalikan(form: FormData) {
  const id = Number(form.get("id"));
  const kondisi = String(form.get("kondisi") || "");
  if (!kondisi) return redirect("/admin?status=dipinjam");
  await supabaseRahasia()
    .from("peminjaman_alat")
    .update({ status: "dikembalikan", kondisi_kembali: kondisi })
    .eq("id", id)
    .eq("status", "dipinjam");
  revalidatePath("/admin");
  redirect("/admin?status=dikembalikan");
}
