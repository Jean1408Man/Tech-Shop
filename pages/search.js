import BackButton from "../components/navigation/BackButton";
import ProductGrid from "../components/catalog/ProductGrid";
import {
  CatalogError,
  CatalogLoading,
} from "../components/catalog/CatalogFeedback";
import { useProductSearch } from "../hooks/useCatalog";
import TitleTab from "../components/ui/TitleTab.jsx";
import Breadcrumb from "../components/ui/Breadcrumb.jsx";
import SEO from "../components/seo/SEO.jsx";

export default function SearchPage() {
  const { products, query, hasQuery, isLoading, error, reload, isReady } =
    useProductSearch();

  if (!isReady || isLoading) {
    return <CatalogLoading message="Buscando productos..." />;
  }

  if (error) {
    return <CatalogError message={error} onRetry={reload} />;
  }

  return (
    <>
      <SEO
        title={hasQuery ? `Resultados para "${query}"` : "Búsqueda"}
        description={
          hasQuery
            ? `Resultados de búsqueda para "${query}" - Encuentra los productos que buscas en Tech Shop.`
            : "Busca productos en Tech Shop - Tu tienda en línea de tecnología y electrónica."
        }
        keywords={`${query || "búsqueda"}, tecnología, electrónica, tech shop, productos`}
        type="website"
      />
      <div className="max-w-[1856px] mx-auto py-6 sm:py-8 px-4 border-t-2 border-primary-dark">
        <TitleTab>Búsqueda</TitleTab>
        <BackButton fallbackHref="/" />
        <Breadcrumb
          items={
            hasQuery
              ? [{ label: `Resultados para "${query}"` }]
              : [{ label: "Búsqueda" }]
          }
        />
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Búsqueda de productos
          </h1>
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
    </>
  );
}
