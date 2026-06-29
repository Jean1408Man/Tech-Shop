/* eslint-disable react/prop-types */
import ProductGrid from "../catalog/ProductGrid";
import CategoryFilter from "./CategoryFilter";

export default function FeaturedProductsSection({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <section className="max-w-[1856px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Ofertas tendencia</h2>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <ProductGrid products={products} />
    </section>
  );
}
