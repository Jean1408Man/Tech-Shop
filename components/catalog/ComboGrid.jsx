import ComboCard from './ComboCard';

export default function ComboGrid({
  combos,
  emptyMessage = 'No hay combos disponibles.',
}) {
  if (!combos.length) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {combos.map((combo) => (
        <ComboCard key={combo.id} combo={combo} />
      ))}
    </div>
  );
}
