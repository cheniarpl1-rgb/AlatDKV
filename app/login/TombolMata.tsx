// app/login/TombolMata.tsx - Tombol Lihat Sandi! HARUS Client Component!
// Karena ada onClick, file ini WAJIB ada "use client" di baris pertama!
"use client";

export default function TombolMata() {
  return (
    <button
      type="button"
      onClick={() => {
        const el = document.getElementById(
          "password-admin",
        ) as HTMLInputElement | null;
        if (el) el.type = el.type === "password" ? "text" : "password";
      }}
      style={{
        position: "absolute",
        right: 8,
        top: "50%",
        transform: "translateY(-50%)",
        background: "#1E103A",
        color: "white",
        border: "1px solid #4C1D95",
        borderRadius: 999,
        width: 36,
        height: 36,
        cursor: "pointer",
        fontSize: 14,
      }}
      title="Lihat / Sembunyikan Sandi"
    >
      👁
    </button>
  );
}
