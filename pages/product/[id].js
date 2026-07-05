import ProductDetails from "../../components/catalog/ProductDetails";
import ProductNotFound from "../../components/catalog/ProductNotFound";
import {
  CatalogError,
  CatalogLoading,
} from "../../components/catalog/CatalogFeedback";
import BackButton from "../../components/navigation/BackButton";
import Breadcrumb from "../../components/ui/Breadcrumb.jsx";
import SpecialOffers from "../../components/home/SpecialOffers";
import { useProductPage } from "../../hooks/useProductPage";

export default function ProductPage() {
  const { product, isLoading, error, reload } = useProductPage();

  if (isLoading) {
    return <CatalogLoading message="Cargando producto..." />;
  }

  const breadcrumbItems = product
    ? [
        {
          label: product.category.name,
          href: `/category/${product.category.slug}`,
        },
        { label: product.name },
      ]
    : [];

  if (error) {
    return <CatalogError message={error} onRetry={reload} />;
  }

  return (
    <div className="max-w-[1856px] mx-auto">
      <SpecialOffers />
      <div className="px-4 py-6 sm:py-8">
        <BackButton fallbackHref="/" />
        <Breadcrumb items={breadcrumbItems} />
        {product ? <ProductDetails product={product} /> : <ProductNotFound />}
      </div>
    </div>
  );
}
