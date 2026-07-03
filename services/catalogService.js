import { apiRequest } from './apiClient';

const DEFAULT_CATEGORY_IMAGE =
  'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=900&q=70';
const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=70';
const DEFAULT_OFFER_IMAGE =
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=70';
const DEFAULT_COMBO_IMAGE =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=70';

function toNumber(value) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

function getDiscountedPrice(product) {
  const basePrice = toNumber(product.precio_base);
  const discount = toNumber(product.oferta_actual?.monto_descuento);

  return Math.max(basePrice - discount, 0);
}

export function normalizeCategory(category) {
  if (!category) {
    return null;
  }

  return {
    ...category,
    slug: String(category.id),
    name: category.nombre,
    image: category.url_img || DEFAULT_CATEGORY_IMAGE,
    description: category.descripcion || '',
    products: Array.isArray(category.productos)
      ? category.productos.map(normalizeProduct)
      : [],
  };
}

export function normalizeOffer(offer) {
  if (!offer) {
    return null;
  }

  return {
    ...offer,
    name: offer.nombre,
    image: offer.imagen || DEFAULT_OFFER_IMAGE,
    description: offer.descripcion || '',
    discount: toNumber(offer.monto_descuento),
    products: Array.isArray(offer.productos)
      ? offer.productos.map(normalizeProduct)
      : [],
  };
}

export function normalizeProduct(product) {
  if (!product) {
    return null;
  }

  const offer = normalizeOffer(product.oferta_actual);
  const categoryId = product.categoria_id || product.categoria?.id;
  const basePrice = toNumber(product.precio_base);

  return {
    ...product,
    type: 'product',
    cartKey: `product:${product.id}`,
    slug: String(product.id),
    name: product.nombre,
    image: product.url_img || DEFAULT_PRODUCT_IMAGE,
    description: product.descripcion || '',
    price: getDiscountedPrice(product),
    basePrice,
    hasOffer: Boolean(offer),
    offer,
    category: String(categoryId || ''),
    categoryId,
    categoryName: product.categoria?.nombre || '',
  };
}

export function normalizeCombo(combo) {
  if (!combo) {
    return null;
  }

  return {
    ...combo,
    type: 'combo',
    cartKey: `combo:${combo.id}`,
    slug: String(combo.id),
    name: combo.nombre,
    image: combo.imagen || DEFAULT_COMBO_IMAGE,
    description: combo.descripcion || '',
    price: toNumber(combo.precio),
    products: Array.isArray(combo.productos)
      ? combo.productos.map(normalizeProduct)
      : [],
  };
}

function toProductPayload(values) {
  return {
    nombre: values.name,
    descripcion: values.description,
    precio_base: String(values.price),
    url_img: values.image,
    categoria_id: Number(values.categoryId || values.category),
  };
}

export async function getCategories(params = {}) {
  const searchParams = new URLSearchParams({
    skip: String(params.skip ?? 0),
    limit: String(params.limit ?? 100),
  });
  const categories = await apiRequest(`/categorias/?${searchParams.toString()}`);

  return Array.isArray(categories) ? categories.map(normalizeCategory) : [];
}

export async function getCategory(categoryId) {
  const category = await apiRequest(`/categorias/${categoryId}`);

  return normalizeCategory(category);
}

export async function getProducts(params = {}) {
  const searchParams = new URLSearchParams({
    skip: String(params.skip ?? 0),
    limit: String(params.limit ?? 100),
  });

  if (params.nombre) {
    searchParams.set('nombre', params.nombre);
  }

  const products = await apiRequest(`/productos/?${searchParams.toString()}`);

  return Array.isArray(products) ? products.map(normalizeProduct) : [];
}

export function searchProducts(query, params = {}) {
  return getProducts({
    ...params,
    nombre: query,
  });
}

export async function getProduct(productId) {
  const product = await apiRequest(`/productos/${productId}`);

  return normalizeProduct(product);
}

export async function createProduct(values) {
  const product = await apiRequest('/productos/', {
    method: 'POST',
    body: toProductPayload(values),
  });

  return normalizeProduct(product);
}

export async function updateProduct(productId, values) {
  const product = await apiRequest(`/productos/${productId}`, {
    method: 'PUT',
    body: toProductPayload(values),
  });

  return normalizeProduct(product);
}

export async function deleteProduct(productId) {
  const product = await apiRequest(`/productos/${productId}`, {
    method: 'DELETE',
  });

  return normalizeProduct(product);
}

export async function getOffers(params = {}) {
  const searchParams = new URLSearchParams({
    skip: String(params.skip ?? 0),
    limit: String(params.limit ?? 100),
  });
  const offers = await apiRequest(`/ofertas/?${searchParams.toString()}`);

  return Array.isArray(offers) ? offers.map(normalizeOffer) : [];
}

export async function getCombos(params = {}) {
  const searchParams = new URLSearchParams({
    skip: String(params.skip ?? 0),
    limit: String(params.limit ?? 100),
  });

  if (params.nombre) {
    searchParams.set('nombre', params.nombre);
  }

  const combos = await apiRequest(`/combos/?${searchParams.toString()}`);

  return Array.isArray(combos) ? combos.map(normalizeCombo) : [];
}

export async function getCombo(comboId) {
  const combo = await apiRequest(`/combos/${comboId}`);

  return normalizeCombo(combo);
}
