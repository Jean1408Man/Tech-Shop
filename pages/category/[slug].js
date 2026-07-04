import ProductGrid from "../../components/catalog/ProductGrid";
import Link from "next/link";
import ProductNotFound from "../../components/catalog/ProductNotFound";
import { CatalogError, CatalogLoading } from "../../components/catalog/CatalogFeedback";
import BackButton from "../../components/navigation/BackButton";
import { useCategoryPage } from "../../hooks/useCatalog";

export default function CategoryPage() {
  const {
    category,
    parentCategory,
    products,
    isLoading,
    error,
    reload,
    isReady,
  } = useCategoryPage();

  if (!isReady || isLoading) {
    return <CatalogLoading message="Cargando categoria..." />;
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
    <div className="max-w-[1856px] mx-auto px-4 py-8">
      <BackButton fallbackHref="/" />
      {parentCategory && (
        <Link
          href={`/category/${parentCategory.slug}`}
          className="mb-2 inline-block text-sm font-semibold text-primary hover:underline"
        >
          {parentCategory.name} / {category.name}
        </Link>
      )}
      <h1 className="text-3xl font-bold mb-4">
        {category.name}
      </h1>
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
      <ProductGrid products={products} />
    </div>
  );
}
