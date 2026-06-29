import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CategoriesSection({ categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <section className="w-full max-w-[1856px] mx-auto relative overflow-hidden px-4 py-8">
      <Image
        src={selectedCategory.image}
        alt={selectedCategory.name}
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 -z-10 brightness-75"
      />
      <h1 className="relative top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-max z-50 text-3xl font-bold text-white bg-primary px-12 py-4 rounded-es-full rounded-ee-full">
        Galerías de productos
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with category list */}
        <div className="md:w-1/4">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    selectedCategory?.slug === category.slug
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic content area with background image */}
        <div className="md:w-3/4 relative overflow-hidden h-64 sm:h-80 md:h-96">
          {selectedCategory && (
            <>
              <div className="absolute inset-0 flex flex-col items-end justify-center p-6 pe-64 text-end">
                <h3 className="text-white text-3xl font-bold mb-3">
                  {selectedCategory.name}
                </h3>
                <p className="text-white text-sm mb-4 max-w-md">
                  {selectedCategory.description}
                </p>
                <Link
                  href={`/category/${selectedCategory.slug}`}
                  legacyBehavior
                >
                  <a className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors">
                    Ver productos
                  </a>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
