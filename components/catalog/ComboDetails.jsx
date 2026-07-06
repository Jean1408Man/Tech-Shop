"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart, getCartItemKey } from "../../context/CartContext";
import PropTypes from "prop-types";
import Link from "next/link";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";

export default function ComboDetails({ combo }) {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [isSaved, setIsSaved] = useState(false);

  if (!combo) return null;

  const price = Number(combo.price || 0);
  const products = combo.products || [];

  // Check if combo is in cart
  const cartKey = combo.cartKey || `combo:${combo.id}`;
  const cartItem = cartItems.find((item) => getCartItemKey(item) === cartKey);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const rating =
    products.reduce(
      (pp, cp) => Number(pp.rating || 0) + Number(cp.rating || 0),
      0,
    ) / products.length;

  return (
    <div className="flex flex-col gap-8">
      {/* Bento Grid */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Combo Info - Top Left */}
        <div className="flex flex-col gap-5 animate-fade-in-fl order-2 lg:order-1">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
              {combo.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {new Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {(rating || 0).toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex gap-2 items-end">
            <p className="text-primary font-bold text-sm">
              ${price.toFixed(2)}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">
              Descripción
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {combo.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                Productos
              </p>
              <p className="text-xs font-medium text-gray-900">
                {products.length} incluidos
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                Envío
              </p>
              <p className="text-xs font-medium text-gray-900">Gratis +$50</p>
            </div>
          </div>
        </div>

        {/* Combo Image - Top Right */}
        <div className="relative animate-fade-in-fr order-1 lg:order-2 flex items-start justify-center lg:justify-end">
          <div className="relative w-full max-w-full md:max-w-md h-72 md:h-80 lg:h-[400px] rounded-2xl overflow-hidden bg-gray-100 shadow-lg grid place-items-center">
            <Image
              src={combo.image}
              alt={combo.name}
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
            onClick={() => addToCart(combo)}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Añadir al carrito
          </button>
        )}
        <button
          onClick={() => setIsSaved((prev) => !prev)}
          className={`flex-1 sm:flex-none border-2 font-semibold py-3.5 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
            isSaved
              ? "border-primary bg-primary/10 text-primary"
              : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill={isSaved ? "currentColor" : "none"}
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
          {isSaved ? "Guardado" : "Guardar"}
        </button>
      </div>

      {/* Included Products - Grid */}
      <div
        className="pt-6 sm:pt-8 border-t border-gray-300 animate-fade-in mx-auto w-max"
        style={{ animationDelay: "0.5s" }}
      >
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
          Productos incluidos
        </h3>
        {products.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 justify-items-center">
            {products.map((product) => {
              const productPrice = Number(
                product.price || product.basePrice || 0,
              );

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="w-full max-w-[200px] sm:max-w-[256px] group"
                >
                  <div className="relative w-48 sm:w-64 aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm mb-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-primary">
                    ${productPrice.toFixed(2)}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No hay productos asociados a este combo.
          </p>
        )}
      </div>
    </div>
  );
}

ComboDetails.propTypes = {
  combo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    cartKey: PropTypes.string,
    type: PropTypes.string,
    products: PropTypes.array,
  }).isRequired,
};
