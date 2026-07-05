import Loader from "../ui/Loader";

export function CatalogLoading({ message = "Cargando catalogo..." }) {
  return (
    <div className="max-w-[1856px] mx-auto px-4 py-8 sm:py-12 text-center text-gray-500 grid content-center justify-items-center">
      <h2 className="mb-6 sm:mb-8 text-xl sm:text-2xl font-bold bg-primary text-white px-4 py-2 rounded-md w-max">
        {message}
      </h2>
      <Loader />
    </div>
  );
}

export function CatalogError({ message, onRetry }) {
  return (
    <div className="max-w-[1856px] mx-auto px-4 py-8 sm:py-12 text-center">
      <p className="mb-4 text-sm sm:text-base text-red-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md bg-primary px-4 py-2 font-semibold text-white hover:bg-primary-dark text-sm sm:text-base"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
