export function CatalogLoading({ message = 'Cargando catalogo...' }) {
  return (
    <div className="max-w-[1856px] mx-auto px-4 py-12 text-center text-gray-500">
      {message}
    </div>
  );
}

export function CatalogError({ message, onRetry }) {
  return (
    <div className="max-w-[1856px] mx-auto px-4 py-12 text-center">
      <p className="mb-4 text-red-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md bg-primary px-4 py-2 font-semibold text-white hover:bg-primary-dark"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
