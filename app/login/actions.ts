// app/login/actions.ts - Login + Logout Admin! SESUAI SOAL E2!
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(form: FormData) {
  const pw = String(form.get("password") || "");

  // 👈 KALAU SANDI SALAH, BALIK KE /login?error=1 BIAR MUNCUL KOTAK MERAH!
  if (pw !== process.env.ADMIN_PASSWORD) {
    return redirect("/login?error=1");
  }

  // 👈 KALAU BENAR, SIMPAN COOKIE + LANGSUNG KE /admin!
  (await cookies()).set("alatdkv_admin", "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 jam!
    sameSite: "lax",
  });
  return redirect("/admin");
}

export async function logoutAdmin() {
  (await cookies()).delete("alatdkv_admin");
  redirect("/login");
}
