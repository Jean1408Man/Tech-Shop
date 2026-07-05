import { Eye, Pencil, Trash2 } from 'lucide-react';

function formatCurrency(value) {
  const amount = Number(value);

  return Number.isFinite(amount) ? `$${amount.toFixed(2)}` : '—';
}

function formatDate(value) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('es', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function EntityImage({ src, alt }) {
  return src ? (
    <img
      src={src}
      alt={alt}
      className="h-10 w-10 shrink-0 rounded-md object-cover"
    />
  ) : (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-100 text-sm font-bold text-gray-400">
      {alt?.charAt(0)?.toUpperCase() || '—'}
    </div>
  );
}

function NameCell({ image, name, secondary }) {
  return (
    <div className="flex min-w-56 items-center gap-3">
      <EntityImage src={image} alt={name} />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900">{name}</p>
        {secondary && (
          <p className="max-w-72 truncate text-xs text-gray-500">{secondary}</p>
        )}
      </div>
    </div>
  );
}

function Actions({ item, onDelete, onEdit, onView }) {
  return (
    <div className="flex justify-end gap-1">
      <button
        type="button"
        onClick={() => onView(item)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-primary"
        aria-label={`Ver detalle de ${item.nombre || item.email || item.id}`}
        title="Ver detalle"
      >
        <Eye size={16} />
      </button>
      <button
        type="button"
        onClick={() => onEdit(item)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-primary"
        aria-label={`Editar ${item.nombre || item.email || item.id}`}
        title="Editar"
      >
        <Pencil size={16} />
      </button>
      <button
        type="button"
        onClick={() => onDelete(item)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600"
        aria-label={`Eliminar ${item.nombre || item.email || item.id}`}
        title="Eliminar"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

const HEADER_CLASS =
  'whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500';
const CELL_CLASS = 'whitespace-nowrap px-4 py-3 text-sm text-gray-700';

function ProductRows({ items, onDelete, onEdit, onView }) {
  return items.map((product) => {
    const basePrice = Number(product.precio_base || 0);
    const discount = Number(product.oferta_actual?.monto_descuento || 0);
    const offerPrice = Math.max(basePrice - discount, 0);

    return (
      <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50">
        <td className={CELL_CLASS}>
          <NameCell
            image={product.url_img}
            name={product.nombre}
            secondary={`ID ${product.id}`}
          />
        </td>
        <td className={CELL_CLASS}>{product.categoria?.nombre || product.categoria_id}</td>
        <td className={`${CELL_CLASS} font-semibold`}>{formatCurrency(basePrice)}</td>
        <td className={CELL_CLASS}>
          {product.oferta_actual ? (
            <div>
              <p className="font-bold text-primary">{formatCurrency(offerPrice)}</p>
              <p className="text-xs text-gray-500">
                −{formatCurrency(discount)} · {product.oferta_actual.nombre}
              </p>
            </div>
          ) : (
            <span className="text-gray-400">Sin oferta</span>
          )}
        </td>
        <td className={CELL_CLASS}>
          <Actions item={product} onDelete={onDelete} onEdit={onEdit} onView={onView} />
        </td>
      </tr>
    );
  });
}

function CategoryRows({ items, onDelete, onEdit, onView }) {
  const categoriesById = new Map(
    items.map((category) => [String(category.id), category])
  );

  return items.map((category) => {
    const parent = categoriesById.get(String(category.categoria_padre_id));

    return (
      <tr key={category.id} className="border-t border-gray-100 hover:bg-gray-50">
        <td className={CELL_CLASS}>
          <NameCell
            image={category.url_img}
            name={category.nombre}
            secondary={category.descripcion}
          />
        </td>
        <td className={CELL_CLASS}>
          {category.categoria_padre_id ? (
            <div>
              <p className="font-semibold text-gray-800">Subcategoría</p>
              <p className="text-xs text-gray-500">
                de {parent?.nombre || `#${category.categoria_padre_id}`}
              </p>
            </div>
          ) : (
            <span className="font-semibold text-primary">Principal</span>
          )}
        </td>
        <td className={CELL_CLASS}>{category.productos?.length || 0}</td>
        <td className={CELL_CLASS}>{category.subcategorias?.length || 0}</td>
        <td className={CELL_CLASS}>#{category.id}</td>
        <td className={CELL_CLASS}>
          <Actions item={category} onDelete={onDelete} onEdit={onEdit} onView={onView} />
        </td>
      </tr>
    );
  });
}

function OfferRows({ items, onDelete, onEdit, onView }) {
  return items.map((offer) => (
    <tr key={offer.id} className="border-t border-gray-100 hover:bg-gray-50">
      <td className={CELL_CLASS}>
        <NameCell image={offer.imagen} name={offer.nombre} secondary={offer.descripcion} />
      </td>
      <td className={`${CELL_CLASS} font-semibold text-primary`}>
        {formatCurrency(offer.monto_descuento)}
      </td>
      <td className={CELL_CLASS}>
        <p>{formatDate(offer.fecha_inicio)}</p>
        <p className="text-xs text-gray-500">Hasta {formatDate(offer.fecha_fin)}</p>
      </td>
      <td className={CELL_CLASS}>{offer.productos?.length || 0}</td>
      <td className={CELL_CLASS}>
        <Actions item={offer} onDelete={onDelete} onEdit={onEdit} onView={onView} />
      </td>
    </tr>
  ));
}

function ComboRows({ items, onDelete, onEdit, onView }) {
  return items.map((combo) => (
    <tr key={combo.id} className="border-t border-gray-100 hover:bg-gray-50">
      <td className={CELL_CLASS}>
        <NameCell image={combo.imagen} name={combo.nombre} secondary={combo.descripcion} />
      </td>
      <td className={`${CELL_CLASS} font-semibold`}>{formatCurrency(combo.precio)}</td>
      <td className={CELL_CLASS}>{combo.productos?.length || 0}</td>
      <td className={CELL_CLASS}>
        <Actions item={combo} onDelete={onDelete} onEdit={onEdit} onView={onView} />
      </td>
    </tr>
  ));
}

function OrderRows({ items, onDelete, onEdit, onView }) {
  return items.map((order) => (
    <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
      <td className={CELL_CLASS}>
        <div>
          <p className="font-semibold text-gray-900">Pedido #{order.id}</p>
          <p className="text-xs text-gray-500">{formatDate(order.fecha)}</p>
        </div>
      </td>
      <td className={CELL_CLASS}>
        <p className="font-semibold text-gray-900">{order.nombre}</p>
        <p className="text-xs text-gray-500">{order.telefono}</p>
      </td>
      <td className={CELL_CLASS}>
        {(order.productos?.length || 0) + (order.combos?.length || 0)} líneas
      </td>
      <td className={`${CELL_CLASS} font-bold text-primary`}>
        {formatCurrency(order.total)}
      </td>
      <td className={CELL_CLASS}>
        <Actions item={order} onDelete={onDelete} onEdit={onEdit} onView={onView} />
      </td>
    </tr>
  ));
}

function UserRows({ items, onDelete, onEdit, onView }) {
  return items.map((user) => (
    <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
      <td className={CELL_CLASS}>
        <div className="min-w-56">
          <p className="font-semibold text-gray-900">{user.full_name || 'Sin nombre'}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </td>
      <td className={CELL_CLASS}>
        <span className="rounded bg-orange-50 px-2 py-1 text-xs font-semibold capitalize text-primary-dark">
          {user.role}
        </span>
      </td>
      <td className={CELL_CLASS}>
        <span className={user.is_active ? 'text-green-700' : 'text-gray-400'}>
          {user.is_active ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td className={CELL_CLASS}>#{user.id}</td>
      <td className={CELL_CLASS}>
        <Actions item={user} onDelete={onDelete} onEdit={onEdit} onView={onView} />
      </td>
    </tr>
  ));
}

const TABLES = {
  productos: {
    headers: ['Producto', 'Categoría', 'Precio base', 'Precio con oferta', 'Acciones'],
    Rows: ProductRows,
  },
  categorias: {
    headers: ['Categoría', 'Tipo', 'Productos', 'Subcategorías', 'ID', 'Acciones'],
    Rows: CategoryRows,
  },
  ofertas: {
    headers: ['Oferta', 'Descuento', 'Vigencia', 'Productos', 'Acciones'],
    Rows: OfferRows,
  },
  combos: {
    headers: ['Combo', 'Precio final', 'Productos', 'Acciones'],
    Rows: ComboRows,
  },
  pedidos: {
    headers: ['Pedido', 'Cliente', 'Contenido', 'Total', 'Acciones'],
    Rows: OrderRows,
  },
  usuarios: {
    headers: ['Usuario', 'Rol', 'Estado', 'ID', 'Acciones'],
    Rows: UserRows,
  },
};

export default function AdminEntityTable({
  entityKey,
  items,
  onDelete,
  onEdit,
  onView,
}) {
  const { headers, Rows } = TABLES[entityKey];

  if (!items.length) {
    return (
      <div className="border-t border-gray-200 px-6 py-16 text-center text-sm text-gray-500">
        No hay registros que coincidan con la búsqueda.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border-t border-gray-200">
      <table className="w-full min-w-[760px] border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                className={`${HEADER_CLASS} ${index === headers.length - 1 ? 'text-right' : ''}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          <Rows items={items} onDelete={onDelete} onEdit={onEdit} onView={onView} />
        </tbody>
      </table>
    </div>
  );
}
