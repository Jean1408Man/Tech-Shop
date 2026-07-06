import { Trash } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ImageField({
  name = "imageFile",
  value,
  onChange,
  isUploading = false,
}) {
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const MAX_BYTES = 15 * 1024 * 1024;

  useEffect(() => {
    // Si hay un valor (URL existente) y no es un archivo, mostrarlo como preview
    if (value && typeof value === "string") {
      setPreview(value);
    }
  }, [value]);

  async function handleChange(e) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) {
      if (onChange) onChange(null);
      setPreview(null);
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(
        "El archivo es demasiado grande. Tamaño máximo permitido: 15 MB.",
      );
      e.target.value = null;
      if (onChange) onChange(null);
      return;
    }

    // Mostrar preview local mientras se sube
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onChange(file);
  }

  return (
    <div className="mt-1">
      {preview && (
        <Image
          src={preview}
          alt="Vista previa"
          width={320}
          height={320}
          className="shadow-lg mb-2 max-h-60 sm:max-h-80 h-auto w-full rounded-md object-contain"
        />
      )}
      <input
        id={name}
        type="file"
        name={name}
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        tabIndex={4}
      />
      <label
        htmlFor={name}
        className="inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <svg
          className="mr-2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Seleccionar imagen
      </label>
      {preview && !isUploading && (
        <button
          type="button"
          className="cursor-pointer flex items-center gap-2 mt-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={(e) => {
            e.preventDefault();
            setPreview(null);
            onChange(null);
          }}
        >
          <Trash size={16} /> Eliminar imagen
        </button>
      )}
      {isUploading && (
        <p className="mt-2 text-sm text-gray-500">Subiendo imagen...</p>
      )}
      {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
    </div>
  );
}
