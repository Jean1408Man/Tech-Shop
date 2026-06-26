import { useRouter } from 'next/router';
import { products } from '../../data/products';
import ProductDetails from '../../components/catalog/ProductDetails';
import ProductNotFound from '../../components/catalog/ProductNotFound';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  const product = products.find((p) => p.id.toString() === id);

  return (
    <div className="container mx-auto px-4 py-8">
      {product ? <ProductDetails product={product} /> : <ProductNotFound />}
    </div>
  );
}
