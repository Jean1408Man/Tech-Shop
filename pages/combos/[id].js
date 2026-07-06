import ComboDetails from "../../components/catalog/ComboDetails";
import ProductNotFound from "../../components/catalog/ProductNotFound";
import {
  CatalogError,
  CatalogLoading,
} from "../../components/catalog/CatalogFeedback";
import BackButton from "../../components/navigation/BackButton";
import Breadcrumb from "../../components/ui/Breadcrumb.jsx";
import SpecialOffers from "../../components/home/SpecialOffers";
import { useComboPage } from "../../hooks/useCatalog";
import SEO from "../../components/seo/SEO.jsx";

export default function ComboPage() {
  const { combo, isLoading, error, reload } = useComboPage();

  if (isLoading) {
    return <CatalogLoading message="Cargando combo..." />;
  }

  const breadcrumbItems = combo
    ? [{ label: "Combos", href: "/combos" }, { label: combo.name }]
    : [];

  if (error) {
    return <CatalogError message={error} onRetry={reload} />;
  }

  return (
    <>
      <SEO
        title={combo?.name || "Combo no encontrado"}
        description={
          combo?.description ||
          "Descubre este increíble combo en Tech Shop. Packs armados con imagen propia, precio final y productos incluidos."
        }
        keywords={`${combo?.name || "combo"}, combos, ofertas, tech shop, tecnología, paquetes`}
        image={combo?.image || "/og-image.jpg"}
        url={`/combos/${combo?.id || ""}`}
        type="product"
      />
      <div className="max-w-[1856px] mx-auto">
        <SpecialOffers />
        <div className="px-4 py-6 sm:py-8">
          <BackButton fallbackHref="/combos" />
          <Breadcrumb items={breadcrumbItems} />
          {combo ? <ComboDetails combo={combo} /> : <ProductNotFound />}
        </div>
      </div>
    </>
  );
}
