"use client";

import { Toaster } from "sonner";

export function Toast() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#161616",
          border: "1px solid #333333",
          color: "#FFFFFF",
          fontFamily: "var(--font-dm-sans)",
        },
      }}
    />
  );
}
