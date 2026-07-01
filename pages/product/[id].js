import ProductDetails from "../../components/catalog/ProductDetails";
import ProductNotFound from "../../components/catalog/ProductNotFound";
import { CatalogError, CatalogLoading } from "../../components/catalog/CatalogFeedback";
import BackButton from "../../components/navigation/BackButton";
import { useProductPage } from "../../hooks/useCatalog";

export default function ProductPage() {
  const { product, isLoading, error, reload } = useProductPage();

  if (isLoading) {
    return <CatalogLoading message="Cargando producto..." />;
  }

  if (error) {
    return <CatalogError message={error} onRetry={reload} />;
  }

  return (
    <div className="max-w-[1856px] mx-auto px-4 py-8">
      <BackButton fallbackHref="/" />
      {product ? <ProductDetails product={product} /> : <ProductNotFound />}
    </div>
  );
}
