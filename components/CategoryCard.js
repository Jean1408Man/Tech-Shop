import Link from 'next/link';
import Image from 'next/image';

/**
 * Displays a clickable category tile with a background image and a label.
 * The overlay darkens the image to ensure the label remains legible.
 */
export default function CategoryCard({ category }) {
  return (
    <Link href={`/category/${category.slug}`} legacyBehavior>
      <a className="relative block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-32 sm:h-40 md:h-32 lg:h-40">
          <Image
            src={category.image}
            alt={category.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
          <h2 className="text-white text-sm sm:text-base font-semibold text-center px-2">
            {category.name}
          </h2>
        </div>
      </a>
    </Link>
  );
}