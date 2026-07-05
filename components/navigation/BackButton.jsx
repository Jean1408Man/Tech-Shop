"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function BackButton({ fallbackHref = "/", label = "Regresar" }) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
