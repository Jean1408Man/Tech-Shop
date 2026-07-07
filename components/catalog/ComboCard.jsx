import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

export default function ComboCard({ combo }) {
  const { addToCart } = useCart();
  const price = Number(combo.price || 0);
  const productCount = combo.products?.length || 0;
  const description = combo.description || "";

  const descRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Detect if the clamped description overflows its two-line box so we can
  // apply the `test-ellipsis` class and reveal the full-text tooltip on hover.
  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const checkOverflow = () => {
      setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
    };
    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [description]);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-200">
      <Link href={`/combos/${combo.id}`} legacyBehavior>
        <a className="block">
          <div className="relative h-36 sm:h-40 md:h-44 lg:h-52">
            <Image
              src={combo.image}
              alt={combo.name}
              layout="fill"
              objectFit="cover"
            />
            <span className="absolute left-1.5 sm:left-2 top-1.5 sm:top-2 rounded-full bg-primary px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-white">
              Combo
            </span>
          </div>
        </a>
      </Link>
      <div className="p-2.5 sm:p-3">
        <Link href={`/combos/${combo.id}`} legacyBehavior>
          <a className="block">
            <h3 className="h-10 overflow-hidden text-sm font-semibold leading-tight text-gray-900 hover:text-primary">
              {combo.name}
            </h3>
          </a>
        </Link>
        <div className="relative group">
          <p
            ref={descRef}
            className={`mt-1 text-xs text-gray-600 line-clamp-2 ${
              isOverflowing ? "test-ellipsis" : ""
            }`}
          >
            {description}
          </p>
          {isOverflowing && (
            <span
              role="tooltip"
              className="absolute left-0 bottom-full -z-20 group-hover:z-20 hover:z-20 mb-1 w-full rounded-md bg-gray-900 px-2 py-1 text-xs leading-snug text-white shadow-lg opacity-0 hover:opacity-100 group-hover:animate-fade-in-fb"
              style={{ animationDelay: "1s", animationFillMode: "both" }}
            >
              {description}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs font-semibold text-gray-500">
          {productCount} productos incluidos
        </p>
        <p className="mt-2 text-primary font-bold">${price.toFixed(2)}</p>
        <div className="mt-3 flex gap-2">
          <Link href={`/combos/${combo.id}`} legacyBehavior>
            <a className="flex-1 rounded-md bg-primary px-2.5 sm:px-3 py-1.5 sm:py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-primary-dark">
              Ver detalles
            </a>
          </Link>
          <button
            type="button"
            onClick={() => addToCart(combo)}
            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md border border-primary text-primary transition-colors hover:bg-primary hover:text-white"
            aria-label={`Añadir ${combo.name} al carrito`}
            title="Añadir al carrito"
          >
            <ShoppingCart className="w-[14px] h-[14px] sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
