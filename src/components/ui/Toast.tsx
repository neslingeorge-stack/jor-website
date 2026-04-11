"use client";

import { Toaster } from "sonner";

export function Toast() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#2A2A2E",
          border: "1px solid #44444A",
          color: "#FFFFFF",
          fontFamily: "var(--font-dm-sans)",
        },
      }}
    />
  );
}
