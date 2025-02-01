"use client";
import React from "react";

export default function Aplikacja() {
  return (
    <div style={{ marginTop: 60 }}>
      <div style={{ display: "flex", alignItems: "center", height: "700" }}>
        <img src="/logo.png" alt="Opis obrazu" width="15%" height="12%" />
        <h1 style={{ fontSize: 60 }}>CardioRanger </h1>
      </div>
      <p style={{ marginTop: 40, marginLeft: 40, fontSize: 20 }}>
        Aplikacja przewidująca potencjalną chorobą wieńcową serca (CHD) oparta
        na modelu uczenia maszynowego.
      </p>
      <p style={{ marginTop: 40, marginLeft: 40, fontSize: 14 }}>
        Projekt końcowy InfoShare Academy.
      </p>
    </div>
  );
}
