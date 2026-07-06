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
import { useTour } from "../../hooks/useTour";
import { PRODUCT_TOUR_STEPS } from "../../data/tours";
import TourButton from "../../components/tour/TourButton";
import SEO from "../../components/seo/SEO.jsx";

export default function ProductPage() {
  const { product, isLoading, error, reload } = useProductPage();
  const { startTour } = useTour(PRODUCT_TOUR_STEPS);

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
    <>
      <SEO
        title={product?.name || "Producto no encontrado"}
        description={
          product?.description ||
          "Descubre este increíble producto en Tech Shop. Los mejores precios en tecnología y electrónica."
        }
        keywords={`${product?.name || "producto"}, ${product?.category?.name || "tecnología"}, tech shop, compra online, electrónica`}
        image={product?.image || "/og-image.jpg"}
        url={`/product/${product?.id || ""}`}
        type="product"
      />
      <div className="max-w-[1856px] mx-auto">
        <SpecialOffers />
        <div className="px-4 py-6 sm:py-8">
          <BackButton fallbackHref="/" />
          <Breadcrumb items={breadcrumbItems} />
          {product ? <ProductDetails product={product} /> : <ProductNotFound />}
        </div>
        <div className="fixed bottom-4 right-4 z-50">
          <TourButton onClick={startTour} label="Tour" />
        </div>
      </div>
    </>
  );
}
