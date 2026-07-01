import ProductGrid from "../../components/catalog/ProductGrid";
import ProductNotFound from "../../components/catalog/ProductNotFound";
import { CatalogError, CatalogLoading } from "../../components/catalog/CatalogFeedback";
import BackButton from "../../components/navigation/BackButton";
import { useCategoryPage } from "../../hooks/useCatalog";

export default function CategoryPage() {
  const {
    category,
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
      <h1 className="text-3xl font-bold mb-4">
        {category.name}
      </h1>
      <ProductGrid products={products} />
    </div>
  );
}
