import Link from 'next/link';
import ComboGrid from '../catalog/ComboGrid';

export default function CombosSection({ combos = [] }) {
  if (!combos.length) {
    return null;
  }

  return (
    <section className="max-w-[1856px] mx-auto px-4 py-8">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Combos destacados</h2>
          <p className="mt-1 text-sm text-gray-600">
            Packs listos con precio final y productos seleccionados.
          </p>
        </div>
        <Link href="/combos" legacyBehavior>
          <a className="text-sm font-semibold text-primary hover:text-primary-dark">
            Ver todos
          </a>
        </Link>
      </div>
      <ComboGrid combos={combos.slice(0, 4)} />
    </section>
  );
}
