import { Download, Pencil, RefreshCw, X } from 'lucide-react';
import { ENTITY_CONFIG } from './adminConfig';

function formatCurrency(value) {
  const amount = Number(value);

  return Number.isFinite(amount) ? `$${amount.toFixed(2)}` : '—';
}

function formatDate(value) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat('es', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function DetailField({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase text-gray-500">{label}</dt>
      <dd className="mt-1 break-words text-sm font-medium text-gray-900">
        {value === null || value === undefined || value === '' ? '—' : value}
      </dd>
    </div>
  );
}

function DetailSection({ children, title }) {
  return (
    <section className="border-t border-gray-200 pt-5">
      <h3 className="mb-4 text-base font-bold text-gray-900">{title}</h3>
      {children}
    </section>
  );
}

function EntityHero({ image, name, description }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      {image && (
        <img
          src={image}
          alt={name}
          className="h-28 w-full rounded-md object-cover sm:w-36"
        />
      )}
      <div className="min-w-0">
        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
        {description && <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>}
      </div>
    </div>
  );
}

function RelatedProducts({ products = [] }) {
  if (!products.length) {
    return <p className="text-sm text-gray-500">No hay productos asociados.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-3 py-2">Producto</th>
            <th className="px-3 py-2">Categoría</th>
            <th className="px-3 py-2 text-right">Precio base</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-gray-100">
              <td className="px-3 py-2">
                <p className="font-semibold text-gray-900">{product.nombre}</p>
                <p className="text-xs text-gray-500">ID {product.id}</p>
              </td>
              <td className="px-3 py-2 text-gray-600">#{product.categoria_id}</td>
              <td className="px-3 py-2 text-right font-semibold">
                {formatCurrency(product.precio_base)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductDetail({ item }) {
  const basePrice = Number(item.precio_base || 0);
  const discount = Number(item.oferta_actual?.monto_descuento || 0);
  const offerPrice = Math.max(basePrice - discount, 0);

  return (
    <div className="space-y-6">
      <EntityHero image={item.url_img} name={item.nombre} description={item.descripcion} />
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DetailField label="ID" value={item.id} />
        <DetailField label="Categoría" value={item.categoria?.nombre || item.categoria_id} />
        <DetailField label="Precio base" value={formatCurrency(basePrice)} />
        <DetailField
          label="Precio con oferta"
          value={item.oferta_actual ? formatCurrency(offerPrice) : 'Sin oferta'}
        />
      </dl>
      {item.oferta_actual && (
        <DetailSection title="Oferta activa">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailField label="Oferta" value={item.oferta_actual.nombre} />
            <DetailField label="Descuento" value={formatCurrency(discount)} />
            <DetailField label="Inicio" value={formatDate(item.oferta_actual.fecha_inicio)} />
            <DetailField label="Fin" value={formatDate(item.oferta_actual.fecha_fin)} />
          </dl>
        </DetailSection>
      )}
    </div>
  );
}

function CategoryDetail({ item }) {
  return (
    <div className="space-y-6">
      <EntityHero image={item.url_img} name={item.nombre} description={item.descripcion} />
      <dl className="grid gap-4 sm:grid-cols-2">
        <DetailField label="ID" value={item.id} />
        <DetailField label="Productos" value={item.productos?.length || 0} />
      </dl>
      <DetailSection title="Productos de la categoría">
        <RelatedProducts products={item.productos} />
      </DetailSection>
    </div>
  );
}

function OfferDetail({ item }) {
  return (
    <div className="space-y-6">
      <EntityHero image={item.imagen} name={item.nombre} description={item.descripcion} />
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DetailField label="ID" value={item.id} />
        <DetailField label="Descuento" value={formatCurrency(item.monto_descuento)} />
        <DetailField label="Inicio" value={formatDate(item.fecha_inicio)} />
        <DetailField label="Fin" value={formatDate(item.fecha_fin)} />
        <DetailField label="Creada" value={formatDate(item.fecha_creacion)} />
        <DetailField label="Productos" value={item.productos?.length || 0} />
      </dl>
      <DetailSection title="Productos asociados">
        <RelatedProducts products={item.productos} />
      </DetailSection>
    </div>
  );
}

function ComboDetail({ item }) {
  return (
    <div className="space-y-6">
      <EntityHero image={item.imagen} name={item.nombre} description={item.descripcion} />
      <dl className="grid gap-4 sm:grid-cols-3">
        <DetailField label="ID" value={item.id} />
        <DetailField label="Precio final" value={formatCurrency(item.precio)} />
        <DetailField label="Productos" value={item.productos?.length || 0} />
      </dl>
      <DetailSection title="Productos incluidos">
        <RelatedProducts products={item.productos} />
      </DetailSection>
    </div>
  );
}

function OrderDetail({ item }) {
  return (
    <div className="space-y-6">
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DetailField label="Pedido" value={`#${item.id}`} />
        <DetailField label="Fecha" value={formatDate(item.fecha)} />
        <DetailField label="Cliente" value={item.nombre} />
        <DetailField label="Teléfono" value={item.telefono} />
      </dl>

      <DetailSection title="Productos">
        {item.productos?.length ? (
          <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-3 py-2">Producto</th>
                  <th className="px-3 py-2">Cantidad</th>
                  <th className="px-3 py-2">Precio</th>
                  <th className="px-3 py-2">Oferta</th>
                  <th className="px-3 py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {item.productos.map((line) => (
                  <tr key={line.id} className="border-t border-gray-100">
                    <td className="px-3 py-2 font-semibold text-gray-900">
                      {line.producto_nombre}
                    </td>
                    <td className="px-3 py-2">{line.cantidad}</td>
                    <td className="px-3 py-2">{formatCurrency(line.precio_unitario)}</td>
                    <td className="px-3 py-2">
                      {line.oferta_nombre ? (
                        <div>
                          <p>{line.oferta_nombre}</p>
                          <p className="text-xs text-gray-500">
                            −{formatCurrency(line.descuento_unitario)} por unidad
                          </p>
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-3 py-2 text-right font-bold">
                      {formatCurrency(line.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500">El pedido no contiene productos.</p>
        )}
      </DetailSection>

      <DetailSection title="Combos">
        {item.combos?.length ? (
          <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-3 py-2">Combo</th>
                  <th className="px-3 py-2">Cantidad</th>
                  <th className="px-3 py-2">Precio</th>
                  <th className="px-3 py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {item.combos.map((line) => (
                  <tr key={line.id} className="border-t border-gray-100">
                    <td className="px-3 py-2 font-semibold text-gray-900">
                      {line.combo_nombre}
                    </td>
                    <td className="px-3 py-2">{line.cantidad}</td>
                    <td className="px-3 py-2">{formatCurrency(line.precio_unitario)}</td>
                    <td className="px-3 py-2 text-right font-bold">
                      {formatCurrency(line.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500">El pedido no contiene combos.</p>
        )}
      </DetailSection>

      <div className="border-t border-gray-200 pt-5 text-right">
        <p className="text-sm text-gray-500">Total del pedido</p>
        <p className="mt-1 text-3xl font-bold text-primary">{formatCurrency(item.total)}</p>
      </div>
    </div>
  );
}

function UserDetail({ item }) {
  return (
    <div className="space-y-6">
      <EntityHero name={item.full_name || item.email} description={item.email} />
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DetailField label="ID" value={item.id} />
        <DetailField label="Rol" value={item.role} />
        <DetailField label="Estado" value={item.is_active ? 'Activo' : 'Inactivo'} />
        <DetailField label="Email" value={item.email} />
      </dl>
    </div>
  );
}

const DETAIL_COMPONENTS = {
  productos: ProductDetail,
  categorias: CategoryDetail,
  ofertas: OfferDetail,
  combos: ComboDetail,
  pedidos: OrderDetail,
  usuarios: UserDetail,
};

export default function AdminEntityDetail({
  entityKey,
  error,
  isExporting,
  isLoading,
  item,
  onClose,
  onEdit,
  onExportPdf,
}) {
  const DetailComponent = DETAIL_COMPONENTS[entityKey];
  const config = ENTITY_CONFIG[entityKey];

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
        aria-label="Cerrar detalle"
      />
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-primary">Vista detallada</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">{config.singular}</h2>
          </div>
          <div className="flex items-center gap-2">
            {entityKey === 'pedidos' && item && (
              <button
                type="button"
                onClick={() => onExportPdf(item.id)}
                className="inline-flex h-9 items-center gap-2 rounded-md border border-primary px-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white disabled:opacity-60"
                disabled={isExporting}
              >
                <Download size={16} />
                {isExporting ? 'Exportando...' : 'Exportar PDF'}
              </button>
            )}
            {item && (
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                <Pencil size={16} />
                Editar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          {error && (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          {isLoading || !item ? (
            <div className="flex min-h-64 items-center justify-center gap-2 text-sm text-gray-500">
              <RefreshCw size={18} className="animate-spin" />
              Cargando detalle...
            </div>
          ) : (
            <DetailComponent item={item} />
          )}
        </div>
      </div>
    </div>
  );
}
