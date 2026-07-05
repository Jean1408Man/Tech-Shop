"use client";

import Image from "next/image";
import { useCart, getCartItemKey } from "../../context/CartContext";
import PropTypes from "prop-types";
import Link from "next/link";
import { Star, Minus, Plus } from "lucide-react";

export default function ProductDetails({ product }) {
  const { cartItems, addToCart, updateQuantity } = useCart();

  if (!product) return null;

  // Check if product is in cart
  const cartKey =
    product.cartKey || `${product.type || "product"}:${product.id}`;
  const cartItem = cartItems.find((item) => getCartItemKey(item) === cartKey);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const price = Number(product.price || 0);
  const basePrice = Number(product.basePrice || price);

  // Mock related products - in a real app these would come from an API
  const relatedProducts = [
    { id: 1, name: "Producto similar 1", price: 29.99, image: product.image },
    { id: 2, name: "Producto similar 2", price: 39.99, image: product.image },
    { id: 3, name: "Producto similar 3", price: 49.99, image: product.image },
    { id: 4, name: "Producto similar 4", price: 19.99, image: product.image },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Bento Grid */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Product Info - Top Left */}
        <div className="flex flex-col gap-5 animate-fade-in-fl order-2 lg:order-1">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>
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
                {(product.rating || 0).toFixed(1)}
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

          <div className="border-t border-gray-100 pt-4">
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
              <p className="text-xs font-medium text-gray-900">Gratis +$50</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                Devolución
              </p>
              <p className="text-xs font-medium text-gray-900">30 días</p>
            </div>
          </div>
        </div>

        {/* Product Image - Top Right */}
        <div className="relative animate-fade-in-fr order-1 lg:order-2 flex items-start justify-end">
          <div className="relative w-full md:max-w-[400px] h-[400px] rounded-2xl overflow-hidden bg-gray-100 shadow-lg grid place-items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full aspect-square absolute transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons - Bottom */}
      <div
        className="flex flex-col sm:flex-row gap-3 animate-fade-in-fb"
        style={{ animationDelay: "0.3s" }}
      >
        {quantityInCart > 0 ? (
          <div className="flex-1 flex items-center justify-center gap-4 bg-primary/10 rounded-full py-2 px-4">
            <button
              onClick={() => updateQuantity(cartKey, quantityInCart - 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
              aria-label="Disminuir cantidad"
            >
              <Minus size={20} className="text-primary" />
            </button>
            <span className="text-2xl font-bold text-primary min-w-[40px] text-center">
              {quantityInCart}
            </span>
            <button
              onClick={() => updateQuantity(cartKey, quantityInCart + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
              aria-label="Aumentar cantidad"
            >
              <Plus size={20} className="text-primary" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            Añadir al carrito
          </button>
        )}
        <button className="flex-1 sm:flex-none border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3.5 px-8 rounded-full transition-all duration-300 hover:bg-gray-50 flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Guardar
        </button>
      </div>

      {/* Related Products - Grid */}
      <div
        className="pt-8 border-t border-gray-100 animate-fade-in"
        style={{ animationDelay: "0.5s" }}
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Productos relacionados
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
          {relatedProducts.map((related) => (
            <Link
              key={related.id}
              href={`/product/${related.id}`}
              className="w-full max-w-[160px] group"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm mb-2">
                <Image
                  src={related.image}
                  alt={related.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-sm font-medium text-gray-900 truncate">
                {related.name}
              </p>
              <p className="text-sm font-bold text-primary">
                ${related.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    cartKey: PropTypes.string,
    type: PropTypes.string,
    basePrice: PropTypes.number,
    hasOffer: PropTypes.bool,
  }).isRequired,
};
