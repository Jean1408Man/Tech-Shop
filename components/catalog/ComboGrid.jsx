import PropTypes from "prop-types";
import ComboCard from "./ComboCard";

export default function ComboGrid({
  combos,
  emptyMessage = "No hay combos disponibles.",
}) {
  if (!combos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {combos.map((combo) => (
        <ComboCard key={combo.id} combo={combo} />
      ))}
    </div>
  );
}

ComboGrid.propTypes = {
  combos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  emptyMessage: PropTypes.string,
};
