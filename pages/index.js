import CategoriesSection from "../components/home/CategoriesSection";
import CombosSection from "../components/home/CombosSection";
import FeaturedProductsSection from "../components/home/FeaturedProductsSection";
import HeroSection from "../components/home/HeroSection";
import SpecialOffers from "../components/home/SpecialOffers";
import { CatalogError } from "../components/catalog/CatalogFeedback";
import { useHomeCatalog } from "../hooks/useCatalog";

export default function HomePage() {
  const {
    categories,
    filteredProducts,
    offers,
    combos,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    error,
    reload,
  } = useHomeCatalog();

  if (error) {
    return <CatalogError message={error} onRetry={reload} />;
  }

  return (
    <div className="max-w-[1856px] mx-auto">
      <HeroSection />
      <SpecialOffers isLoading={isLoading} offers={offers} />
      <CombosSection isLoading={isLoading} combos={combos} />
      <CategoriesSection categories={categories} />
      <FeaturedProductsSection
        products={filteredProducts}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        loading={isLoading}
      />
    </div>
  );
}
