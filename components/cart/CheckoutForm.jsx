import { useState } from "react";

export default function CheckoutForm({
  defaultName = "",
  error = "",
  isSubmitting = false,
  onCancel,
  onSubmit,
}) {
  const [values, setValues] = useState({
    nombre: defaultName,
    telefono: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      nombre: values.nombre.trim(),
      telefono: values.telefono.trim(),
    };

    if (!payload.nombre || !payload.telefono) {
      setValidationError("Completa nombre y teléfono para crear el pedido.");
      return;
    }

    setValidationError("");
    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white shadow-sm p-4 sm:p-6"
    >
      <h2 className="text-lg sm:text-xl font-bold">Datos para el pedido</h2>
      <p className="mt-1 text-xs sm:text-sm text-gray-600">
        Se calcularán total, descuentos y subtotales al confirmar.
      </p>

      {(validationError || error) && (
        <div className="mt-3 sm:mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-700">
          {validationError || error}
        </div>
      )}

      <div className="mt-3 sm:mt-4 grid gap-3 sm:gap-4">
        <label className="block">
          <span className="text-xs sm:text-sm font-semibold text-gray-700">
            Nombre
          </span>
          <input
            type="text"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none text-sm sm:text-base"
            autoComplete="name"
            disabled={isSubmitting}
          />
        </label>

        <label className="block">
          <span className="text-xs sm:text-sm font-semibold text-gray-700">
            Teléfono
          </span>
          <input
            type="tel"
            name="telefono"
            value={values.telefono}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none text-sm sm:text-base"
            autoComplete="tel"
            pattern="[0-9]{8}"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col-reverse lg:flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 shadow-sm text-sm sm:text-base"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-full bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70 shadow-sm text-sm sm:text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando pedido..." : "Confirmar pedido"}
        </button>
      </div>
    </form>
  );
}
