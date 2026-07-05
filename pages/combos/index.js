import ComboGrid from "../../components/catalog/ComboGrid";
import {
  CatalogError,
  CatalogLoading,
} from "../../components/catalog/CatalogFeedback";
import BackButton from "../../components/navigation/BackButton";
import SpecialOffers from "../../components/home/SpecialOffers";
import Breadcrumb from "../../components/ui/Breadcrumb.jsx";
import TitleTab from "../../components/ui/TitleTab.jsx";
import { useCombosPage } from "../../hooks/useCatalog";

export default function CombosPage() {
  const { combos, isLoading, error, reload } = useCombosPage();

  if (isLoading) {
    return <CatalogLoading message="Cargando combos..." />;
  }

  if (error) {
    return <CatalogError message={error} onRetry={reload} />;
  }

  return (
    <div className="min-h-screen">
      <SpecialOffers />
      <main className="max-w-[1856px] mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t-2 border-primary-dark">
        <TitleTab>Combos</TitleTab>
        <BackButton fallbackHref="/" />
        <Breadcrumb items={[{ label: "Combos" }]} />
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Combos</h1>
          <p className="mt-2 text-sm text-gray-600">
            Packs armados con imagen propia, precio final y productos incluidos.
          </p>
        </div>
        <ComboGrid combos={combos} />
      </main>
    </div>
  );
}
