import { apiRequest } from './apiClient';

function normalizeOrderLine(line) {
  if (!line) {
    return null;
  }

  return {
    ...line,
    quantity: Number(line.cantidad || 0),
    unitPrice: Number(line.precio_unitario || 0),
    discount: Number(line.descuento_unitario || 0),
    subtotal: Number(line.subtotal || 0),
  };
}

export function normalizeOrder(order) {
  if (!order) {
    return null;
  }

  return {
    ...order,
    customerName: order.nombre,
    phone: order.telefono,
    totalAmount: Number(order.total || 0),
    productLines: Array.isArray(order.productos)
      ? order.productos.map(normalizeOrderLine)
      : [],
    comboLines: Array.isArray(order.combos)
      ? order.combos.map(normalizeOrderLine)
      : [],
  };
}

export async function createOrder(payload) {
  const order = await apiRequest('/pedidos/', {
    method: 'POST',
    body: payload,
  });

  return normalizeOrder(order);
}
