import ProductGrid from "../../components/catalog/ProductGrid";
import Link from "next/link";
import ProductNotFound from "../../components/catalog/ProductNotFound";
import { CatalogError } from "../../components/catalog/CatalogFeedback";
import BackButton from "../../components/navigation/BackButton";
import { useCategoryPage } from "../../hooks/useCatalog";
import SpecialOffers from "../../components/home/SpecialOffers";
import Breadcrumb from "../../components/ui/Breadcrumb.jsx";
import TitleTab from "../../components/ui/TitleTab.jsx";
import SEO from "../../components/seo/SEO.jsx";

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

  if (!category && !isLoading) {
    return (
      <div className="max-w-[1856px] mx-auto px-4 py-6 sm:py-8">
        <BackButton fallbackHref="/" />
        <ProductNotFound message="Categoría no encontrada." />
      </div>
    );
  }

  return (
    <>
      <SEO
        title={category?.name || "Categoría no encontrada"}
        description={
          category?.description ||
          `Explora nuestra categoría de ${category?.name || "productos"}. Encuentra los mejores artículos de tecnología y electrónica.`
        }
        keywords={`${category?.name || "categoría"}, tecnología, electrónica, tech shop, compra online`}
        image={category?.image || "/og-image.jpg"}
        url={`/category/${category?.slug || ""}`}
        type="website"
      />
      <div className="min-h-screen">
        {/* Special Offers Carousel at the top */}
        <SpecialOffers />

        {/* Category Content */}
        <main className="max-w-[1856px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-t-2 border-primary-dark">
          <TitleTab>
            {category ? category.name : "Categoría desconocida"}
          </TitleTab>

          <BackButton fallbackHref="/" />
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />
          {category?.subcategories?.length > 0 && (
            <nav className="mb-4 sm:mb-6 flex flex-wrap gap-2" aria-label="Subcategorías">
              {category?.subcategories?.map((subcategory) => (
                <Link
                  key={subcategory.slug}
                  href={`/category/${subcategory.slug}`}
                  className="rounded-full border border-gray-300 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 transition-colors hover:border-primary hover:text-primary"
                >
                  {subcategory.name}
                </Link>
              ))}
            </nav>
          )}

          <ProductGrid products={products} loading={isLoading} />
        </main>
      </div>
    </>
  );
}
