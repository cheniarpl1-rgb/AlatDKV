// lib/gambar.ts - Foto PAS sesuai nama alat! Tema nggak diubah.

export function gambarAlat(kategori: string, nama: string) {
  const n = nama.toLowerCase();

  // ===== KAMERA - foto kamera beneran =====
  if (n.includes("canon") || n.includes("2000d"))
    return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop";
  if (n.includes("sony") || n.includes("a6400"))
    return "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop";
  if (n.includes("【entity-nikon¦canonical_name=nikon】"))
    return "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=800&auto=format&fit=crop";
  if (
    n.includes("【entity-fujifilm¦canonical_name=fujifilm】") ||
    n.includes("fuji")
  )
    return "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop";
  if (
    n.includes("【entity-gopro¦canonical_name=gopro】") ||
    n.includes("action")
  )
    return "https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=800&auto=format&fit=crop";

  // ===== PENCAHAYAAN - foto lampu beneran =====
  if (n.includes("ring light") || n.includes("ringlight") || n.includes("ring"))
    return "https://m.media-amazon.com/images/I/51KOoGzrSuL._AC_SL3840_.jpg";
  if (n.includes("led panel") || n.includes("panel"))
    return "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop";
  if (n.includes("softbox") || n.includes("lampu studio"))
    return "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=800&auto=format&fit=crop";
  if (n.includes("lampu"))
    return "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop";

  // ===== AUDIO - foto mic beneran =====
  if (n.includes("rode") || n.includes("wireless"))
    return "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop";
  if (n.includes("boya") || n.includes("m1"))
    return "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop";
  if (n.includes("mikrofon") || n.includes("mic") || n.includes("audio"))
    return "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop";

  // ===== TABLET - foto tablet gambar, BUKAN monitor =====
  if (
    n.includes("intuos") ||
    n.includes("【entity-wacom¦canonical_name=Wacom】") ||
    n.includes("tablet")
  )
    return "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?q=80&w=800&auto=format&fit=crop";
  if (n.includes("ipad"))
    return "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop";

  // ===== AKSESORIS - foto tripod beneran, BUKAN jam / lampu studio =====
  if (n.includes("tripod"))
    return "https://www.cnkingjoy.com/pro_img/pro_shop/pro_pic/S_VT-910_1.jpg";
  if (
    n.includes("memory") ||
    n.includes("memori") ||
    n.includes("sd card") ||
    n.includes("kartu")
  )
    return "https://images.unsplash.com/photo-1618410320928-25228d811631?q=80&w=800&auto=format&fit=crop";
  if (n.includes("baterai") || n.includes("battery") || n.includes("charger"))
    return "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800&auto=format&fit=crop";
  if (n.includes("tas") || n.includes("bag"))
    return "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop";

  // ===== FALLBACK PER KATEGORI - kalau nama baru, tetep nyambung kategorinya =====
  if (kategori === "kamera")
    return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop";
  if (kategori === "pencahayaan")
    return "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop";
  if (kategori === "audio")
    return "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop";
  if (kategori === "tablet")
    return "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?q=80&w=800&auto=format&fit=crop";
  if (kategori === "aksesoris")
    return "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?q=80&w=800&auto=format&fit=crop";

  return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop";
}

export function iconAlat(kategori: string, nama: string) {
  const n = nama.toLowerCase();
  if (n.includes("canon") || n.includes("sony") || n.includes("kamera"))
    return "📷";
  if (n.includes("ring")) return "⭕";
  if (n.includes("led") || n.includes("lampu") || n.includes("softbox"))
    return "💡";
  if (
    n.includes("mic") ||
    n.includes("mikrofon") ||
    n.includes("rode") ||
    n.includes("boya")
  )
    return "🎙️";
  if (n.includes("tablet") || n.includes("intuos") || n.includes("wacom"))
    return "✏️";
  if (n.includes("tripod")) return "🦵";
  if (n.includes("tas")) return "🎒";
  if (kategori === "kamera") return "📷";
  if (kategori === "pencahayaan") return "💡";
  if (kategori === "audio") return "🎙️";
  if (kategori === "tablet") return "✏️";
  return "🎒";
}
