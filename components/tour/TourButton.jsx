"use client";

import { HelpCircle } from "lucide-react";

export default function TourButton({ onClick, label = "Iniciar tour" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-primary"
      title={label}
    >
      <HelpCircle size={14} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
