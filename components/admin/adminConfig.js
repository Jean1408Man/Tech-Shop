export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
export const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1";

export async function uploadToCloudinary(file) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary no está configurado. Verifica CLOUDINARY_CLOUD_NAME y CLOUDINARY_UPLOAD_PRESET.",
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `${CLOUDINARY_UPLOAD_URL}/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.error?.message || `Error al subir imagen: ${response.status}`,
    );
  }

  const data = await response.json();
  return data.secure_url;
}

export const ENTITY_KEYS = [
  "productos",
  "categorias",
  "ofertas",
  "combos",
  "pedidos",
  "usuarios",
];

export const ENTITY_CONFIG = {
  productos: {
    label: "Productos",
    singular: "Producto",
    description: "Catálogo, categorías y precios vigentes.",
  },
  categorias: {
    label: "Categorías",
    singular: "Categoría",
    description:
      "Categorías principales y subcategorías visibles del catálogo.",
  },
  ofertas: {
    label: "Ofertas",
    singular: "Oferta",
    description: "Descuentos, vigencia y productos asociados.",
  },
  combos: {
    label: "Combos",
    singular: "Combo",
    description: "Packs con precio final y productos incluidos.",
  },
  pedidos: {
    label: "Pedidos",
    singular: "Pedido",
    description: "Clientes, líneas y totales calculados por el backend.",
  },
  usuarios: {
    label: "Usuarios",
    singular: "Usuario",
    description: "Cuentas, estado y permisos de acceso.",
  },
};

export const FORM_FIELDS = {
  categorias: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    {
      name: "categoria_padre_id",
      label: "Categoría padre (opcional)",
      type: "select",
      source: "categorias",
      rootCategoriesOnly: true,
      excludeCurrent: true,
      emptyLabel: "Ninguna · categoría principal",
      helpText:
        "Selecciona una categoría principal solo si estás creando una subcategoría.",
    },
    { name: "url_img", label: "Imagen", type: "image" },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      fullWidth: true,
    },
  ],
  productos: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    {
      name: "precio_base",
      label: "Precio base",
      type: "number",
      min: "0",
      step: "0.01",
      required: true,
    },
    {
      name: "categoria_id",
      label: "Categoría principal",
      type: "select",
      source: "categorias",
      rootCategoriesOnly: true,
      required: true,
    },
    {
      name: "subcategoria_id",
      label: "Subcategoría (opcional)",
      type: "select",
      source: "categorias",
      childOfField: "categoria_id",
      emptyLabel: "Ninguna · usar categoría principal",
      helpText:
        "Si la eliges, el producto quedará asignado a esta subcategoría.",
    },
    { name: "url_img", label: "Imagen", type: "image" },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      fullWidth: true,
    },
  ],
  ofertas: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    {
      name: "monto_descuento",
      label: "Descuento por unidad",
      type: "number",
      min: "0",
      step: "0.01",
      required: true,
    },
    {
      name: "fecha_inicio",
      label: "Inicio",
      type: "datetime-local",
      required: true,
    },
    {
      name: "fecha_fin",
      label: "Fin",
      type: "datetime-local",
      required: true,
    },
    { name: "imagen", label: "Imagen", type: "image" },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      fullWidth: true,
    },
    {
      name: "producto_ids",
      label: "Productos asociados",
      type: "multiselect",
      source: "productos",
      fullWidth: true,
    },
  ],
  combos: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    {
      name: "precio",
      label: "Precio final",
      type: "number",
      min: "0",
      step: "0.01",
      required: true,
    },
    { name: "imagen", label: "Imagen", type: "image" },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      fullWidth: true,
    },
    {
      name: "producto_ids",
      label: "Productos incluidos",
      type: "multiselect",
      source: "productos",
      fullWidth: true,
    },
  ],
  pedidos: [
    {
      name: "nombre",
      label: "Nombre del cliente",
      type: "text",
      required: true,
    },
    { name: "telefono", label: "Teléfono", type: "tel", required: true },
    {
      name: "productos",
      label: "Productos",
      type: "order-products",
      fullWidth: true,
    },
    {
      name: "combos",
      label: "Combos",
      type: "order-combos",
      fullWidth: true,
    },
  ],
  usuarios: [
    { name: "email", label: "Email", type: "email", required: true },
    { name: "full_name", label: "Nombre completo", type: "text" },
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      createOnly: true,
      requiredOnCreate: true,
    },
    {
      name: "role",
      label: "Rol",
      type: "role",
      required: true,
    },
    {
      name: "is_active",
      label: "Usuario activo",
      type: "checkbox",
      fullWidth: true,
    },
  ],
};

function toDateTimeLocal(value) {
  return value ? String(value).slice(0, 16) : "";
}

function toIsoDate(value) {
  return value ? new Date(value).toISOString() : value;
}

export function getInitialFormValues(entityKey, item = null) {
  switch (entityKey) {
    case "categorias":
      return {
        nombre: item?.nombre || "",
        url_img: item?.url_img || "",
        descripcion: item?.descripcion || "",
        categoria_padre_id: item?.categoria_padre_id
          ? String(item.categoria_padre_id)
          : "",
      };
    case "productos": {
      const selectedCategory = item?.categoria;
      const parentCategoryId = selectedCategory?.categoria_padre_id;

      return {
        nombre: item?.nombre || "",
        descripcion: item?.descripcion || "",
        precio_base: item?.precio_base || "",
        url_img: item?.url_img || "",
        categoria_id: parentCategoryId
          ? String(parentCategoryId)
          : item?.categoria_id
            ? String(item.categoria_id)
            : "",
        subcategoria_id: parentCategoryId ? String(item.categoria_id) : "",
      };
    }
    case "ofertas":
      return {
        nombre: item?.nombre || "",
        descripcion: item?.descripcion || "",
        monto_descuento: item?.monto_descuento || "",
        fecha_inicio: toDateTimeLocal(item?.fecha_inicio),
        fecha_fin: toDateTimeLocal(item?.fecha_fin),
        imagen: item?.imagen || "",
        producto_ids:
          item?.productos?.map((product) => String(product.id)) || [],
      };
    case "combos":
      return {
        nombre: item?.nombre || "",
        descripcion: item?.descripcion || "",
        precio: item?.precio || "",
        imagen: item?.imagen || "",
        producto_ids:
          item?.productos?.map((product) => String(product.id)) || [],
      };
    case "pedidos":
      return {
        nombre: item?.nombre || "",
        telefono: item?.telefono || "",
        productos:
          item?.productos?.map((line) => ({
            producto_id: String(line.producto_id),
            cantidad: Number(line.cantidad || 1),
            oferta_id: line.oferta_id ? String(line.oferta_id) : "",
          })) || [],
        combos:
          item?.combos?.map((line) => ({
            combo_id: String(line.combo_id),
            cantidad: Number(line.cantidad || 1),
          })) || [],
      };
    case "usuarios":
      return {
        email: item?.email || "",
        full_name: item?.full_name || "",
        password: "",
        is_active: item?.is_active ?? true,
        role: item?.role || "cliente",
      };
    default:
      return {};
  }
}

export function toEntityPayload(entityKey, values, isEditing = false) {
  switch (entityKey) {
    case "categorias":
      return {
        nombre: values.nombre,
        url_img: values.url_img,
        descripcion: values.descripcion,
        categoria_padre_id: values.categoria_padre_id
          ? Number(values.categoria_padre_id)
          : null,
      };
    case "productos":
      return {
        nombre: values.nombre,
        descripcion: values.descripcion,
        precio_base: String(values.precio_base),
        url_img: values.url_img,
        categoria_id: Number(values.subcategoria_id || values.categoria_id),
      };
    case "ofertas":
      return {
        nombre: values.nombre,
        descripcion: values.descripcion,
        monto_descuento: String(values.monto_descuento),
        fecha_inicio: toIsoDate(values.fecha_inicio),
        fecha_fin: toIsoDate(values.fecha_fin),
        imagen: values.imagen,
        producto_ids: values.producto_ids.map(Number),
      };
    case "combos":
      return {
        nombre: values.nombre,
        descripcion: values.descripcion,
        precio: String(values.precio),
        imagen: values.imagen,
        producto_ids: values.producto_ids.map(Number),
      };
    case "pedidos":
      return {
        nombre: values.nombre,
        telefono: values.telefono,
        productos: values.productos
          .filter((line) => line.producto_id)
          .map((line) => ({
            producto_id: Number(line.producto_id),
            cantidad: Number(line.cantidad),
            ...(line.oferta_id ? { oferta_id: Number(line.oferta_id) } : {}),
          })),
        combos: values.combos
          .filter((line) => line.combo_id)
          .map((line) => ({
            combo_id: Number(line.combo_id),
            cantidad: Number(line.cantidad),
          })),
      };
    case "usuarios": {
      const payload = {
        email: values.email,
        full_name: values.full_name,
        is_active: Boolean(values.is_active),
        role: values.role,
      };

      if (!isEditing || values.password) {
        payload.password = values.password;
      }

      return payload;
    }
    default:
      return values;
  }
}

function flattenValues(value) {
  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(flattenValues);
  }

  if (typeof value === "object") {
    return Object.values(value).flatMap(flattenValues);
  }

  return [String(value)];
}

export function matchesEntitySearch(item, query) {
  const normalizedQuery = query.trim().toLocaleLowerCase("es");

  if (!normalizedQuery) {
    return true;
  }

  return flattenValues(item)
    .join(" ")
    .toLocaleLowerCase("es")
    .includes(normalizedQuery);
}
