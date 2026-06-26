import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

/**
 * Navigation bar component. Displays a top promo bar, the site
 * logo, a search input, a cart indicator and a horizontal list
 * of product categories. The search input doesn't perform any
 * filtering on its own, but it gives the look and feel of a
 * marketplace search bar. Cart item count sums the quantities
 * from the cart context.
 */
export default function Navbar() {
  const { cartItems } = useCart();
  const [query, setQuery] = useState('');
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      {/* Promotional bar */}
      <div className="bg-primary-dark text-center text-xs py-1">
        ¡Envío gratis en tu primera compra! Compra como un multimillonario.
      </div>
      <div className="container mx-auto flex items-center justify-between p-3">
        {/* Logo */}
        <Link href="/" legacyBehavior>
          <a className="font-bold text-xl md:text-2xl tracking-tight">TemuClone</a>
        </Link>
        {/* Search bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos"
            className="w-full p-2 rounded-md text-gray-800 placeholder-gray-500"
          />
        </div>
        {/* Cart icon */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" legacyBehavior>
            <a className="relative" aria-label="Ver carrito">
              {/* Simple cart emoji as an icon. You could replace
                 this with an imported SVG or FontAwesome icon. */}
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
      {/* Category navigation */}
      <nav className="bg-primary-light overflow-x-auto">
        <ul className="container mx-auto flex space-x-4 px-4 py-2 whitespace-nowrap">
          {categories.map((category) => (
            <li key={category.slug} className="">
              <Link href={`/category/${category.slug}`} legacyBehavior>
                <a className="hover:underline text-sm md:text-base">{category.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}