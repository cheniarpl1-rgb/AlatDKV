// lib/gambar.ts - Gambar per kategori! Kayak EventKu!
export function gambarAlat(kategori: string, nama: string) {
  const n = (nama || "").toLowerCase();
  if (n.includes("kamera") || n.includes("canon") || n.includes("sony")) return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop";
  if (kategori === "pencahayaan" || n.includes("lampu") || n.includes("ring")) return "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1200&auto=format&fit=crop";
  if (kategori === "audio" || n.includes("mikrofon") || n.includes("mic")) return "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop";
  if (kategori === "tablet" || n.includes("wacom") || n.includes("tablet")) return "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?q=80&w=1200&auto=format&fit=crop";
  return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"; // Aksesoris
}
export function iconAlat(kategori: string, nama: string) {
  const n = (nama || "").toLowerCase();
  if (n.includes("kamera") || n.includes("canon") || n.includes("sony")) return "📷";
  if (kategori === "pencahayaan") return "💡";
  if (kategori === "audio") return "🎙";
  if (kategori === "tablet") return "✏️";
  return "🎒";
}