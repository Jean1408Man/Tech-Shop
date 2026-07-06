import CategoriesSection from "../components/home/CategoriesSection";
import CombosSection from "../components/home/CombosSection";
import FeaturedProductsSection from "../components/home/FeaturedProductsSection";
import HeroSection from "../components/home/HeroSection";
import SpecialOffers from "../components/home/SpecialOffers";
import { CatalogError } from "../components/catalog/CatalogFeedback";
import { useHomeCatalog } from "../hooks/useCatalog";
import SEO from "../components/seo/SEO.jsx";

export default function HomePage() {
  const {
    categories,
    filteredProducts,
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
    <>
      <SEO
        title="Inicio"
        description="Bienvenido a Tech Shop - Tu tienda en línea de tecnología y productos electrónicos. Encuentra los mejores productos con precios increíbles y ofertas exclusivas."
        keywords="tecnología, electrónica, productos, tienda online, tech shop, gadgets, ofertas, inicio"
        type="website"
      />
      <div className="max-w-[1856px] mx-auto px-0 sm:px-0">
        <HeroSection />
        <SpecialOffers />
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
    </>
  );
}
