import React from "react";
import { ChevronDown } from "lucide-react";
import style from "./Dropdown.module.css";
import Link from "next/link";

export function Dropdown({ children, title }) {
  return (
    <div className={"relative " + style.dropdown}>
      <div
        className={
          "flex gap-2 items-center rounded-full py-2 px-4 cursor-pointer w-max " +
          style.btn
        }
      >
        {title}
        <ChevronDown size={16} className="translate-y-0.5 relative" />
        <div className="absolute top-0 left-0 z-10 w-full h-20" />
      </div>

      {children}
    </div>
  );
}

export function DropdownList({ list }) {
  return (
    <div
      className={
        "absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-xl z-50 py-2 " +
        style.body
      }
    >
      {list.length === 0 && (
        <span className="block px-4 py-2 text-sm text-gray-500">
          Sin categorias
        </span>
      )}
      {list.map((item) => (
        <Link
          key={item.slug}
          href={`/category/${item.slug}`}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
