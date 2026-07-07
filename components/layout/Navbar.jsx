import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";
import { LayoutDashboard, Search, ShoppingCart, Menu } from "lucide-react";
import { Dropdown, DropdownList } from "../dropdown/Dropdown";
import { useAuth } from "../../hooks/useAuth";
import { useNavbarCategories } from "../../hooks/useCatalog";

export default function Navbar() {
  const router = useRouter();
  const { cartItems } = useCart();
  const { canAccessAdmin, isAuthenticated, isHydrated, logout } = useAuth();
  const categories = useNavbarCategories();
  const [query, setQuery] = useState("");
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollFlag, setScrollFlag] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (router.pathname === "/search") {
      const nextQuery = Array.isArray(router.query.q)
        ? router.query.q[0]
        : router.query.q;

      setQuery(nextQuery || "");
    }
  }, [router.pathname, router.query.q]);

  useEffect(() => {
    setScrollFlag(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setScrollFlag(true);
      } else {
        setScrollFlag(false);
      }
    };
    window.addEventListener("resize", handleResize);

    if (scrollFlag)
      return () => {
        window.removeEventListener("resize", handleResize);
      };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [prevScrollY, scrollFlag]);

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <header
      className={`bg-primary text-white sticky top-0 z-[1000] shadow-md transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Promotional bar - hidden on mobile */}
      <div className="hidden md:block sm:bg-primary-dark sm:text-center sm:text-xs sm:py-1 sm:px-4">
        ¡Envío gratis en tu primera compra! Compra como un multimillonario.
      </div>

      {/* Desktop Navbar */}
      <div className="hidden sm:max-w-[1856px] sm:mx-auto sm:flex sm:items-center sm:justify-between sm:gap-2 md:gap-3 sm:p-2 md:p-3">
        {/* Logo and Categories Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight"
          >
            Temu
          </Link>

          {/* Categories Dropdown */}
          <Dropdown id="tour-categories" title="Categorías">
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
          id="tour-search"
          className="flex w-full min-w-0 max-w-[512px] items-center gap-2 overflow-hidden rounded-full bg-white py-1.5 pl-3 sm:pl-4 pr-2"
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
            <span className="hidden lg:inline">Buscar</span>
          </button>
        </form>
        {/* Cart icon */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isHydrated && isAuthenticated ? (
            <div className="flex items-center gap-1.5 sm:gap-2" id="tour-auth">
              {canAccessAdmin && (
                <Link href="/admin" legacyBehavior>
                  <a
                    className="inline-flex h-8 items-center gap-1 rounded-md border border-white/60 px-2 text-xs sm:text-sm font-semibold transition-colors hover:bg-white hover:text-primary"
                    title="Abrir panel de administración"
                  >
                    <LayoutDashboard className="w-[14px] h-[14px] sm:w-4 sm:h-4" />
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
            <div id="tour-auth" className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/login"
                className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-black/5 text-sm sm:text-base"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="rounded-full w-max bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-primary hover:bg-gray-100 text-sm sm:text-base"
              >
                Crear cuenta
              </Link>
            </div>
          )}
          <Link
            id="tour-cart"
            href="/cart"
            className="relative"
            aria-label="Ver carrito"
          >
            <ShoppingCart
              className="fill-current text-white hover:text-gray-200 hover:scale-110 transition-all w-5 h-5 sm:w-6 sm:h-6"
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

      {/* Mobile Navbar */}
      <div className="flex sm:hidden flex-col p-2 gap-2">
        {/* Top row: Title and Burger Menu */}
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-lg tracking-tight">
            Temu
          </Link>
          {/* Search bar */}
          <form
            className="flex w-full max-w-[200px] mx-auto items-center gap-2 overflow-hidden rounded-full bg-white py-1.5 pl-3 pr-2"
            onSubmit={handleSearch}
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos"
              className="flex-1 text-gray-800 placeholder-gray-500 border-none bg-none focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              aria-label="Buscar productos"
            >
              <Search size={16} />
            </button>
          </form>
          {/* Burger Menu Custom Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="p-2 text-white hover:text-gray-200 transition-colors"
              aria-label="Menú"
            >
              <Menu size={16} />
            </button>

            {/* Full screen dropdown */}
            <div className="fixed top-16 left-0 bg-white z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out overflow-y-auto w-full">
              <div className="p-4 max-w-lg mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <span className="font-bold text-xl text-gray-800">Menú</span>
                </div>

                {/* Categories with nested subcategories */}
                <div className="mb-6">
                  <span className="block px-4 py-2 text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    Categorías
                  </span>
                  {categories.length === 0 && (
                    <span className="block px-4 py-2 text-sm text-gray-500">
                      Sin categorías
                    </span>
                  )}
                  {categories.map((item) => (
                    <div
                      key={item.slug}
                      className="group/category border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/category/${item.slug}`}
                          className="flex-1 block px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        {item.subcategories?.length > 0 && (
                          <span className="px-4 text-gray-400 text-lg select-none">
                            ›
                          </span>
                        )}
                      </div>
                      {/* Nested subcategories */}
                      {item.subcategories?.length > 0 && (
                        <div className="overflow-hidden max-h-0 group-hover/category:max-h-96 transition-all duration-300 ease-in-out">
                          <div className="pl-4 bg-gray-50">
                            {item.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory.slug}
                                href={`/category/${subcategory.slug}`}
                                className="block px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary"
                              >
                                {subcategory.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Combos */}
                <div className="mb-6 border-b border-gray-200 pb-4">
                  <Link
                    href="/combos"
                    className="block px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 hover:text-primary"
                  >
                    Combos
                  </Link>
                </div>

                {/* Auth/Admin/Cart */}
                <div>
                  {isHydrated && isAuthenticated ? (
                    <>
                      {canAccessAdmin && (
                        <Link href="/admin" legacyBehavior>
                          <a className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 hover:text-primary">
                            <LayoutDashboard size={16} />
                            Panel de administración
                          </a>
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 hover:text-primary"
                      >
                        Salir
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 hover:text-primary"
                      >
                        Entrar
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 hover:text-primary"
                      >
                        Crear cuenta
                      </Link>
                    </>
                  )}

                  {/* Cart */}
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 hover:text-primary"
                  >
                    <ShoppingCart size={16} />
                    Carrito
                    {totalItems > 0 && (
                      <span className="ml-auto bg-primary text-white rounded-full text-xs px-2 font-bold">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
