import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X, Star, Minus, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";

/**
 * A card component that displays a product's image, name and price. Clicking
 * anywhere on the card navigates to the product detail page. Cards adjust
 * responsively via Tailwind's grid utilities defined on parent containers.
 */
export default function ProductCard({ product, className }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, addToCart, updateQuantity } = useCart();
  const price = Number(product.price || 0);
  const basePrice = Number(product.basePrice || price);

  // Check if product is in cart
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 relative ${className}`}
      >
        <div className="relative h-40 sm:h-48">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-3 h-[384px] flex flex-col justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-900 leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {new Array(5).fill(0).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <div className="flex gap-2 items-end">
            <p className="text-primary font-bold text-sm">
              ${price.toFixed(2)}
            </p>
            {product.hasOffer && (
              <p className="text-xs text-gray-500 line-through">
                ${basePrice.toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex justify-end items-center gap-2">
            {quantityInCart > 0 ? (
              <div className="flex items-center justify-center gap-2 bg-primary/10 rounded-full py-1 px-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQuantity(product.id, quantityInCart - 1);
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
                  aria-label="Disminuir cantidad"
                >
                  <Minus size={14} className="text-primary" />
                </button>
                <span className="text-sm font-bold text-primary min-w-[20px] text-center">
                  {quantityInCart}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQuantity(product.id, quantityInCart + 1);
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={14} className="text-primary" />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold py-1.5 px-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Añadir
              </button>
            )}
            <Link
              href={`/product/${product.id}`}
              className="bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-primary-dark transition-colors shadow-sm"
            >
              Ver detalles
            </Link>
          </div>
        </div>
        <button
          onClick={openModal}
          className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium shadow-sm transition-all duration-200 z-5"
          aria-label="Fast view"
        >
          Vista rápida
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
          />
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden animate-fade-in-fb">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white shadow-sm rounded-full p-2 z-10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Product Image */}
              <div className="relative w-full h-[250px] sm:h-[300px] rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-2">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {new Array(5).fill(0).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 items-end">
                  <p className="text-primary font-bold text-sm">
                    ${price.toFixed(2)}
                  </p>
                  {product.hasOffer && (
                    <p className="text-xs text-gray-500 line-through">
                      ${basePrice.toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Descripción
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                      Envío
                    </p>
                    <p className="text-xs font-medium text-gray-900">
                      Gratis +$50
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                      Devolución
                    </p>
                    <p className="text-xs font-medium text-gray-900">30 días</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href={`/product/${product.id}`} legacyBehavior>
                    <a className="flex-1 bg-primary text-white text-center py-2.5 px-6 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-md font-semibold">
                      Ver detalles
                    </a>
                  </Link>
                  <button
                    onClick={closeModal}
                    className="flex-1 sm:flex-none border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-2.5 px-6 rounded-full transition-all duration-300 hover:bg-gray-50 font-semibold"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
