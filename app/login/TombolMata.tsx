// app/login/TombolMata.tsx - Tombol Lihat Sandi! HARUS Client Component!
// Karena ada onClick + useState, file ini WAJIB ada "use client" di baris pertama!
// GAYA EVENTKU TEMEN LO! JUARA 1 DUNIA! Pastel, colorful, anti-white!

"use client";

import { useState } from "react";

export default function TombolMata() {
  const [lihat, setLihat] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        const el = document.getElementById(
          "password-admin",
        ) as HTMLInputElement | null;
        if (el) {
          const baru = el.type === "password" ? "text" : "password";
          el.type = baru;
          setLihat(baru === "text");
        }
      }}
      style={{
        position: "absolute",
        right: 8,
        top: "50%",
        transform: "translateY(-50%)",
        background: lihat ? "#F9A8D4" : "#FDE68A",
        color: "#1A1443",
        border: "2px solid #1A1443",
        borderRadius: 999,
        width: 38,
        height: 38,
        cursor: "pointer",
        fontSize: 16,
        fontWeight: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "2px 2px 0 #1A1443",
        transition: "all 0.15s",
      }}
      title={lihat ? "Sembunyikan Sandi 🙈" : "Lihat Sandi 👁"}
      aria-label={lihat ? "Sembunyikan sandi" : "Lihat sandi"}
    >
      {lihat ? "🙈" : "👁"}
    </button>
  );
}
