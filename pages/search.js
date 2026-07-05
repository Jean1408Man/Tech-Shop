import BackButton from "../components/navigation/BackButton";
import ProductGrid from "../components/catalog/ProductGrid";
import { CatalogError, CatalogLoading } from "../components/catalog/CatalogFeedback";
import { useProductSearch } from "../hooks/useCatalog";

export default function SearchPage() {
  const {
    products,
    query,
    hasQuery,
    isLoading,
    error,
    reload,
    isReady,
  } = useProductSearch();

  if (!isReady || isLoading) {
    return <CatalogLoading message="Buscando productos..." />;
  }

  if (error) {
    return <CatalogError message={error} onRetry={reload} />;
  }

  return (
    <div className="max-w-[1856px] mx-auto px-4 py-6 sm:py-8">
      <BackButton fallbackHref="/" />
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Búsqueda de productos</h1>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-600">
          {hasQuery
            ? `Resultados para "${query}"`
            : "Escribe un término en el buscador para encontrar productos."}
        </p>
      </div>
      <ProductGrid
        products={products}
        emptyMessage={
          hasQuery
            ? "No encontramos productos que coincidan con tu búsqueda."
            : "No hay una búsqueda activa."
        }
      />
    </div>
  );
}
