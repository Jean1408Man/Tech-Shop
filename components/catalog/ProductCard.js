import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "../../context/CartContext";

/**
 * A card component that displays a product's image, name and price. Clicking
 * anywhere on the card navigates to the product detail page. Cards adjust
 * responsively via Tailwind's grid utilities defined on parent containers.
 */
export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const price = Number(product.price || 0);
  const basePrice = Number(product.basePrice || price);

  const openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addProductToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-200 relative">
        <div className="relative h-40 sm:h-48">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold leading-tight h-10 overflow-hidden">
            {product.name}
          </h3>
          <div className="mt-1 h-10">
            <p className="text-primary font-bold">
              ${price.toFixed(2)}
            </p>
            {product.hasOffer && (
              <p className="text-xs text-gray-500 line-through">
                ${basePrice.toFixed(2)}
              </p>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            <Link href={`/product/${product.id}`} legacyBehavior>
              <a className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-primary-dark">
                Ver detalles
              </a>
            </Link>
            <button
              type="button"
              onClick={addProductToCart}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary text-primary transition-colors hover:bg-primary hover:text-white"
              aria-label={`Añadir ${product.name} al carrito`}
              title="Añadir al carrito"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
        {product.hasOffer && (
          <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
            Oferta
          </span>
        )}
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
          <div className="relative bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto overflow-x-hidden animate-fade-in-fb">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white shadow-sm rounded-full p-2 z-10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <Image
              src={product.image}
              alt={product.name}
              width={420}
              height={275}
              className="scale-110"
            />
            <div className="relative z-10 bg-white w-full h-full p-4">
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              <p className="text-primary font-bold text-xl mb-3">
                ${price.toFixed(2)}
              </p>
              {product.hasOffer && (
                <p className="-mt-2 mb-3 text-sm text-gray-500">
                  Antes <span className="line-through">${basePrice.toFixed(2)}</span>
                </p>
              )}
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={addProductToCart}
                  className="flex-1 rounded-md bg-primary py-2 text-white transition-colors hover:bg-primary-dark"
                >
                  Añadir
                </button>
                <Link href={`/product/${product.id}`} legacyBehavior>
                  <a className="flex-1 rounded-md border border-primary py-2 text-center text-primary transition-colors hover:bg-primary hover:text-white">
                    Ver detalles
                  </a>
                </Link>
                <button
                  onClick={closeModal}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
