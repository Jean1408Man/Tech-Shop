import Image from 'next/image';
import Link from 'next/link';
import { categories, products } from '../data/products';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

/**
 * Home page displaying a hero section, a list of categories and
 * a selection of trending products. All data comes from the
 * static data file in data/products.js. You can expand the
 * product list to include more items.
 */
export default function HomePage() {
  // Use the first eight products as our "trending" set for the demo
  const trendingProducts = products.slice(0, 8);
  const heroImage =
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80';

  return (
    <div>
      {/* Hero banner */}
      <section className="relative h-64 md:h-96 w-full">
        <Image src={heroImage} alt="Hero" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Compra como un multimillonario
          </h1>
          <p className="text-white mt-2 max-w-2xl">
            Descubre productos únicos a precios inigualables. Desde ropa hasta
            electrónica, tenemos todo lo que buscas.
          </p>
          <Link href="/category/fashion" legacyBehavior>
            <a className="mt-4 inline-block bg-primary text-white px-5 py-2 rounded-md shadow hover:bg-primary-dark transition-colors duration-200">
              Explorar ahora
            </a>
          </Link>
        </div>
      </section>
      {/* Categories grid */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Explora tus intereses</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>
      {/* Trending products */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Ofertas tendencia</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}