import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";
import { LayoutDashboard, Search, ShoppingCart } from "lucide-react";
import { Dropdown, DropdownList } from "../dropdown/Dropdown";
import { useAuth } from "../../hooks/useAuth";
import { useNavbarCategories } from "../../hooks/useCatalog";

export default function Navbar() {
  const router = useRouter();
  const { cartItems } = useCart();
  const { canAccessAdmin, isAuthenticated, isHydrated, logout } = useAuth();
  const categories = useNavbarCategories();
  const [query, setQuery] = useState("");
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (router.pathname === "/search") {
      const nextQuery = Array.isArray(router.query.q)
        ? router.query.q[0]
        : router.query.q;

      setQuery(nextQuery || "");
    }
  }, [router.pathname, router.query.q]);

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <header className="bg-primary text-white sticky top-0 z-[1000] shadow-md">
      {/* Promotional bar */}
      <div className="bg-primary-dark text-center text-xs py-1 px-4">
        ¡Envío gratis en tu primera compra! Compra como un multimillonario.
      </div>

      <div className="max-w-[1856px] mx-auto flex flex-wrap items-center gap-2 sm:gap-3 p-2 sm:p-3">
        {/* Logo and Categories Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight"
          >
            Temu
          </Link>

          {/* Categories Dropdown */}
          <Dropdown title="Categorías">
            <DropdownList list={categories} />
          </Dropdown>
          <Link
            href="/combos"
            className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-black/5 text-sm sm:text-base"
          >
            Combos
          </Link>
        </div>

        {/* Search bar */}
        <form
          className="order-3 flex w-full min-w-0 items-center gap-2 overflow-hidden rounded-full bg-white py-1.5 pl-3 sm:pl-4 pr-2"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos"
            className="min-w-0 flex-1 text-gray-800 placeholder-gray-500 border-none bg-none focus:outline-none text-sm sm:text-base"
          />
          <button
            type="submit"
            className="inline-flex h-8 w-8 sm:w-auto sm:px-3 shrink-0 items-center justify-center gap-1 rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            aria-label="Buscar productos"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Buscar</span>
          </button>
        </form>
        {/* Cart icon */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isHydrated && isAuthenticated ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {canAccessAdmin && (
                <Link href="/admin" legacyBehavior>
                  <a
                    className="inline-flex h-8 items-center gap-1 rounded-md border border-white/60 px-2 text-xs sm:text-sm font-semibold transition-colors hover:bg-white hover:text-primary"
                    title="Abrir panel de administración"
                  >
                    <LayoutDashboard size={14} sm:size={16} />
                    <span className="hidden sm:inline">Panel</span>
                  </a>
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="rounded-md bg-white px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-primary hover:bg-gray-100"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/login"
                className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-black/5 text-sm sm:text-base"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-primary hover:bg-gray-100 text-sm sm:text-base"
              >
                Crear cuenta
              </Link>
            </div>
          )}
          <Link href="/cart" className="relative" aria-label="Ver carrito">
            <ShoppingCart
              size={20}
              sm:size={24}
              className="fill-current text-white hover:text-gray-200 hover:scale-110 transition-all"
              style={{ transform: "rotateY(180deg)" }}
            />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1.5 sm:-right-2 bg-white text-primary rounded-full text-[10px] sm:text-xs px-1 font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
