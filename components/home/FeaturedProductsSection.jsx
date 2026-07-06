/* eslint-disable react/prop-types */
import ProductGrid from "../catalog/ProductGrid";
import TitleTab from "../ui/TitleTab";
import CategoryFilter from "./CategoryFilter";

export default function FeaturedProductsSection({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  loading = false,
}) {
  return (
    <section
      id="tour-product-grid"
      className="relative max-w-[1856px] mx-auto px-4 py-6 sm:py-8 border-t-2 border-primary-dark"
    >
      <TitleTab>Ofertas tendencia</TitleTab>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <ProductGrid products={products} loading={loading} />
    </section>
  );
}
