import ProductGrid from "../../components/catalog/ProductGrid";
import Link from "next/link";
import ProductNotFound from "../../components/catalog/ProductNotFound";
import { CatalogError } from "../../components/catalog/CatalogFeedback";
import BackButton from "../../components/navigation/BackButton";
import { useCategoryPage } from "../../hooks/useCatalog";
import SpecialOffers from "../../components/home/SpecialOffers";
import Breadcrumb from "../../components/ui/Breadcrumb.jsx";
import TitleTab from "../../components/ui/TitleTab.jsx";

export default function CategoryPage() {
  const { category, parentCategory, products, isLoading, error, reload } =
    useCategoryPage();

  const breadcrumbItems = [];
  if (parentCategory) {
    breadcrumbItems.push({
      label: parentCategory.name,
      href: `/category/${parentCategory.slug}`,
    });
  }
  if (category) {
    breadcrumbItems.push({
      label: category.name,
      href: `/category/${category.slug}`,
    });
  }

  if (error) {
    return <CatalogError message={error} onRetry={reload} />;
  }

  if (!category) {
    return (
      <div className="max-w-[1856px] mx-auto px-4 py-8">
        <BackButton fallbackHref="/" />
        <ProductNotFound message="Categoría no encontrada." />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Special Offers Carousel at the top */}
      <SpecialOffers />

      {/* Category Content */}
      <main className="max-w-[1856px] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t-2 border-primary-dark">
        <TitleTab>
          {category ? category.name : "Categoría desconocida"}
        </TitleTab>

        <BackButton fallbackHref="/" />
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />
        {category.subcategories?.length > 0 && (
          <nav className="mb-6 flex flex-wrap gap-2" aria-label="Subcategorías">
            {category.subcategories.map((subcategory) => (
              <Link
                key={subcategory.slug}
                href={`/category/${subcategory.slug}`}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-primary hover:text-primary"
              >
                {subcategory.name}
              </Link>
            ))}
          </nav>
        )}

        <ProductGrid products={products} loading={isLoading} />
      </main>
    </div>
  );
}
