import { useRouter } from 'next/router';
import { categories, products } from '../../data/products';
import ProductCard from '../../components/ProductCard';

/**
 * Displays all products belonging to a given category. The slug comes from
 * the URL. If no matching category is found, a fallback message is shown.
 */
export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return null;

  const category = categories.find((cat) => cat.slug === slug);
  const filteredProducts = products.filter((product) => product.category === slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {category ? category.name : 'Categoría desconocida'}
      </h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No hay productos disponibles en esta categoría.</p>
      )}
    </div>
  );
}