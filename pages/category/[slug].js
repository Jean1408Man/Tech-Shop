import { useRouter } from 'next/router';
import { categories, products } from '../../data/products';
import ProductGrid from '../../components/catalog/ProductGrid';

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
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
