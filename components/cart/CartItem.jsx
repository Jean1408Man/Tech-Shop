import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import Link from "next/link";

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  const cartKey = item.cartKey || `${item.type || "product"}:${item.id}`;

  return (
    <li className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative h-40 sm:h-48 w-full sm:w-48 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex-1 w-full">
          <Link
            href={
              item.type === "combo"
                ? `/combos/${item.id}`
                : `/product/${item.id}`
            }
            className="flex items-end gap-2 w-max"
          >
            <h2 className="text-sm font-semibold text-gray-900 leading-tight hover:text-primary-dark">
              {item.name}
            </h2>
            {item.type === "combo" && (
              <p className="mt-1 text-xs px-1 py-0.5 rounded-md font-bold uppercase text-white bg-primary">
                Combo
              </p>
            )}
          </Link>
          {item.description && (
            <p className="text-sm text-gray-600 leading-relaxed text-justify mt-1">
              {item.description}
            </p>
          )}
          <p className="text-primary font-bold text-sm mt-1">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <div className="flex items-center mt-3 gap-2">
            <div className="flex items-center justify-center gap-2 bg-primary/10 rounded-full py-1 px-2">
              <button
                onClick={() => onUpdateQuantity(cartKey, item.quantity - 1)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
                aria-label="Disminuir cantidad"
              >
                <Minus size={14} className="text-primary" />
              </button>
              <span className="text-sm font-bold text-primary min-w-[20px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(cartKey, item.quantity + 1)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
                aria-label="Aumentar cantidad"
              >
                <Plus size={14} className="text-primary" />
              </button>
            </div>
            <button
              onClick={() => onRemove(cartKey)}
              className="ml-2 flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
              aria-label="Eliminar producto"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
};
