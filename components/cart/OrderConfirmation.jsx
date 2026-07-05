export default function OrderConfirmation({ order }) {
  const productLines = order.productLines || [];
  const comboLines = order.comboLines || [];

  return (
    <div className="rounded-lg bg-white p-4 shadow sm:p-6">
      <p className="text-sm font-semibold uppercase text-primary">
        Pedido confirmado
      </p>
      <h2 className="mt-1 text-2xl font-bold">Pedido #{order.id}</h2>
      <p className="mt-2 text-sm text-gray-600">
        {order.customerName} · {order.phone}
      </p>

      <div className="mt-6 space-y-4">
        {productLines.map((line) => (
          <div
            key={`product-line-${line.id}`}
            className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3"
          >
            <div>
              <p className="font-semibold">{line.producto_nombre}</p>
              <p className="text-sm text-gray-500">
                Producto · Cantidad {line.quantity}
              </p>
              {line.oferta_nombre && (
                <p className="text-xs font-semibold text-primary">
                  {line.oferta_nombre}
                </p>
              )}
            </div>
            <p className="font-bold text-primary">
              ${line.subtotal.toFixed(2)}
            </p>
          </div>
        ))}

        {comboLines.map((line) => (
          <div
            key={`combo-line-${line.id}`}
            className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3"
          >
            <div>
              <p className="font-semibold">{line.combo_nombre}</p>
              <p className="text-sm text-gray-500">
                Combo · Cantidad {line.quantity}
              </p>
            </div>
            <p className="font-bold text-primary">
              ${line.subtotal.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-right text-xl font-bold">
        Total: <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
      </p>
    </div>
  );
}
