import Link from 'next/link';
import Image from 'next/image';

/**
 * A card component that displays a product's image, name and price. Clicking
 * anywhere on the card navigates to the product detail page. Cards adjust
 * responsively via Tailwind’s grid utilities defined on parent containers.
 */
export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-200">
      <Link href={`/product/${product.id}`} legacyBehavior>
        <a>
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
            <p className="mt-1 text-primary font-bold">${product.price.toFixed(2)}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
