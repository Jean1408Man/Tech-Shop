import ComboDetails from '../../components/catalog/ComboDetails';
import ProductNotFound from '../../components/catalog/ProductNotFound';
import { CatalogError, CatalogLoading } from '../../components/catalog/CatalogFeedback';
import BackButton from '../../components/navigation/BackButton';
import { useComboPage } from '../../hooks/useCatalog';

export default function ComboPage() {
  const { combo, isLoading, error, reload } = useComboPage();

  if (isLoading) {
    return <CatalogLoading message="Cargando combo..." />;
  }

  if (error) {
    return <CatalogError message={error} onRetry={reload} />;
  }

  return (
    <div className="max-w-[1856px] mx-auto px-4 py-8">
      <BackButton fallbackHref="/combos" />
      {combo ? (
        <ComboDetails combo={combo} />
      ) : (
        <ProductNotFound message="Combo no encontrado." />
      )}
    </div>
  );
}
