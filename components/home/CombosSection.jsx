import Link from "next/link";
import ComboGrid from "../catalog/ComboGrid";
import Loader from "../ui/Loader";
import TitleTab from "../ui/TitleTab";

export default function CombosSection({ combos = [], isLoading = false }) {
  if (!isLoading && !combos.length) {
    return null;
  }

  return (
    <section className="max-w-[1856px] mx-auto px-4 py-8 border-t-2 border-primary-dark">
      {isLoading && (
        <div className="grid justify-items-center content-center gap-8 py-12">
          <h1 className="text-3xl font-bold text-primary px-4 py-2 rounded-md">
            Cargando combos
          </h1>
          <Loader />
        </div>
      )}
      {combos && combos.length > 0 && (
        <>
          <TitleTab>Combos</TitleTab>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-end">
            <Link
              href="/combos"
              className="text-sm font-semibold text-primary hover:text-primary-dark"
            >
              Ver todos
            </Link>
          </div>
          <ComboGrid combos={combos.slice(0, 4)} />
        </>
      )}
    </section>
  );
}
