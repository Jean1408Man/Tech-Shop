import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ComboCard({ combo }) {
  const { addToCart } = useCart();
  const price = Number(combo.price || 0);
  const productCount = combo.products?.length || 0;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-200">
      <Link href={`/combos/${combo.id}`} legacyBehavior>
        <a className="block">
          <div className="relative h-44 sm:h-52">
            <Image
              src={combo.image}
              alt={combo.name}
              layout="fill"
              objectFit="cover"
            />
            <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
              Combo
            </span>
          </div>
        </a>
      </Link>
      <div className="p-3">
        <Link href={`/combos/${combo.id}`} legacyBehavior>
          <a className="block">
            <h3 className="h-10 overflow-hidden text-sm font-semibold leading-tight text-gray-900 hover:text-primary">
              {combo.name}
            </h3>
          </a>
        </Link>
        <p className="mt-1 text-xs font-semibold text-gray-500">
          {productCount} productos incluidos
        </p>
        <p className="mt-2 text-primary font-bold">
          ${price.toFixed(2)}
        </p>
        <div className="mt-3 flex gap-2">
          <Link href={`/combos/${combo.id}`} legacyBehavior>
            <a className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-primary-dark">
              Ver detalles
            </a>
          </Link>
          <button
            type="button"
            onClick={() => addToCart(combo)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary text-primary transition-colors hover:bg-primary hover:text-white"
            aria-label={`Añadir ${combo.name} al carrito`}
            title="Añadir al carrito"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
