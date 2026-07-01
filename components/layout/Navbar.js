import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";
import { Search } from "lucide-react";
import { Dropdown, DropdownList } from "../dropdown/Dropdown";
import { useAuth } from '../../hooks/useAuth';
import { useNavbarCategories } from '../../hooks/useCatalog';
export default function Navbar() {
  const router = useRouter();
  const { cartItems } = useCart();
  const { user, isAuthenticated, isHydrated, logout } = useAuth();
  const categories = useNavbarCategories();
  const [query, setQuery] = useState('');
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const displayName = user?.full_name || user?.name || user?.email;

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
      <div className="bg-primary-dark text-center text-xs py-1">
        ¡Envío gratis en tu primera compra! Compra como un multimillonario.
      </div>

      <div className="max-w-[1856px] mx-auto flex flex-wrap items-center gap-3 p-3 md:flex-nowrap">
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
        <form
          className="order-3 flex w-full min-w-0 items-center gap-2 overflow-hidden rounded-full bg-white py-1.5 pl-4 pr-2 md:order-none md:mx-4 md:max-w-2xl md:flex-1"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos"
            className="min-w-0 flex-1 text-gray-800 placeholder-gray-500 border-none bg-none focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center gap-1 rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:w-auto sm:px-3"
            aria-label="Buscar productos"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Buscar</span>
          </button>
        </form>
        {/* Cart icon */}
        <div className="ml-auto flex items-center space-x-3">
          {isHydrated && isAuthenticated ? (
            <div className="flex items-center space-x-2">
              {displayName && (
                <span className="hidden max-w-40 truncate text-sm md:inline">
                  Hola, {displayName}
                </span>
              )}
              <button
                type="button"
                onClick={logout}
                className="rounded-md bg-white px-3 py-1 text-sm font-semibold text-primary hover:bg-gray-100"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-sm font-semibold">
              <Link href="/login" legacyBehavior>
                <a className="hover:underline">Entrar</a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a className="hidden rounded-md bg-white px-3 py-1 text-primary hover:bg-gray-100 sm:inline-block">
                  Crear cuenta
                </a>
              </Link>
            </div>
          )}
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
