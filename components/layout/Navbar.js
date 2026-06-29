import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { categories } from "../../data/products";
import { Search } from "lucide-react";
import { Dropdown, DropdownList } from "../dropdown/Dropdown";

export default function Navbar() {
  const { cartItems } = useCart();
  const [query, setQuery] = useState("");
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-primary text-white sticky top-0 z-[1000] shadow-md">
      {/* Promotional bar */}
      <div className="bg-primary-dark text-center text-xs py-1">
        ¡Envío gratis en tu primera compra! Compra como un multimillonario.
      </div>

      <div className="max-w-[1856px] mx-auto flex items-center justify-between p-3">
        {/* Logo and Categories Toggle */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="font-bold text-xl md:text-2xl tracking-tight"
          >
            Temu
          </Link>

          {/* Categories Dropdown */}
          <Dropdown title="Categorías">
            <DropdownList list={categories} />
          </Dropdown>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex items-center gap-2 mx-4 max-w-2xl rounded-full bg-white overflow-hidden py-1.5 px-4">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos"
            className="flex-1 text-gray-800 placeholder-gray-500 border-none bg-none focus:outline-none"
          />
          <Search size={16} className="text-gray-800" />
        </div>

        {/* Admin link */}
        <div className="flex items-center space-x-4">
          <Link
            href="/admin"
            className="text-sm font-medium hover:text-gray-200 transition-colors"
          >
            Admin
          </Link>
          <Link href="/cart" legacyBehavior>
            <a className="relative" aria-label="Ver carrito">
              <span className="text-2xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-primary rounded-full text-xs px-1 font-bold">
                  {totalItems}
                </span>
              )}
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
