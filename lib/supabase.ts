// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export function supabasePublik() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
// 👈 RAHASIA! CUMA DI SERVER! Buat baca peminjaman_alat (data pribadi)!
export function supabaseRahasia() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}