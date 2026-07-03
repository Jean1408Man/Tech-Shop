import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

/**
 * A card component that displays a product's image, name and price. Clicking
 * anywhere on the card navigates to the product detail page. Cards adjust
 * responsively via Tailwind's grid utilities defined on parent containers.
 */
export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-200 relative">
        <div className="relative h-40 sm:h-48">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-2">
          <h3 className="text-sm font-semibold leading-tight h-10 overflow-hidden">
            {product.name}
          </h3>
          <div className="flex items-center mt-1">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm text-gray-600 ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <p className="mt-1 text-primary font-bold">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <button
          onClick={openModal}
          className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium shadow-sm transition-all duration-200 z-5"
          aria-label="Fast view"
        >
          Vista rápida
        </button>
        <Link href={`/product/${product.id}`} legacyBehavior>
          <a className="absolute bottom-2 right-2 bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-md hover:bg-primary-dark transition-colors shadow-sm">
            Ver detalles
          </a>
        </Link>
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
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              <div className="flex space-x-2">
                <Link href={`/product/${product.id}`} legacyBehavior>
                  <a className="flex-1 bg-primary text-white text-center py-2 rounded-md hover:bg-primary-dark transition-colors">
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
