"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import PropTypes from "prop-types";

export default function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 animate-fade-in">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-primary transition-colors duration-200"
      >
        <Home size={16} />
        <span>Inicio</span>
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-gray-400" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    }),
  ).isRequired,
};
