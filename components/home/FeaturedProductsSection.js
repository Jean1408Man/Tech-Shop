import ProductGrid from '../catalog/ProductGrid';

export default function FeaturedProductsSection({ products }) {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Ofertas tendencia</h2>
      <ProductGrid products={products} />
    </section>
  );
}
