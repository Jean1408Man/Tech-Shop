import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return <p>No hay productos disponibles en esta categoría.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
