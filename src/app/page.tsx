"use client";
import React from "react";

export default function Aplikacja() {
  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: "flex", alignItems: "center", height: "600" }}>
        <img src="/logo.png" alt="Opis obrazu" width="25%" height="18%" />
        <h1 style={{ fontSize: 60 }}>CardioRanger </h1>
      </div>
      <p style={{ marginTop: 50, marginLeft: 40, fontSize: 20 }}>
        Aplikacja przewidująca potencjalną chorobą wieńcową serca (CHD) oparta
        na modelu uczenia maszynowego.
      </p>
    </div>
  );
}
