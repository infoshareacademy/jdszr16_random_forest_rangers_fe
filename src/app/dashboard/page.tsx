"use client";

import React, { useState, useEffect } from "react";

// import MoreInfo from "./moreInfo";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Renderuj tylko po stronie klienta

  return (
    <div>
      <div style={{ textAlign: "center" }}></div>
    </div>
  );
}
