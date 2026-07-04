import { apiRequest, getApiBaseUrl } from './apiClient';

const ENTITY_PATHS = {
  categorias: '/categorias',
  productos: '/productos',
  ofertas: '/ofertas',
  combos: '/combos',
  pedidos: '/pedidos',
  usuarios: '/users',
};

function getPath(entityKey) {
  const path = ENTITY_PATHS[entityKey];

  if (!path) {
    throw new Error(`Entidad administrativa desconocida: ${entityKey}.`);
  }

  return path;
}

function getAuthHeaders(token) {
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

export function listAdminEntity(entityKey, token) {
  const path = getPath(entityKey);
  const searchParams = new URLSearchParams({
    skip: '0',
    limit: '100',
  });

  return apiRequest(`${path}/?${searchParams.toString()}`, {
    headers: getAuthHeaders(token),
  });
}

export function getAdminEntity(entityKey, entityId, token) {
  return apiRequest(`${getPath(entityKey)}/${entityId}`, {
    headers: getAuthHeaders(token),
  });
}

export async function downloadOrderPdf(orderId, token) {
  const response = await fetch(`${getApiBaseUrl()}/pedidos/${orderId}/pdf`, {
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(error?.detail || 'No se pudo descargar el pedido.');
  }

  const blob = await response.blob();
  const disposition = response.headers.get('Content-Disposition');
  const filename =
    disposition?.match(/filename="?([^";]+)"?/i)?.[1] || `pedido-${orderId}.pdf`;
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
}

async function createUser(payload, token, { isAdmin = false } = {}) {
  const { role = 'cliente', ...userData } = payload;
  const createdUser = await apiRequest('/auth/register', {
    method: 'POST',
    body: userData,
  });

  if (!isAdmin || role === 'cliente') {
    return createdUser;
  }

  return apiRequest(`/users/${createdUser.id}/role`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: { role },
  });
}

export function createAdminEntity(entityKey, payload, token, context = {}) {
  if (entityKey === 'usuarios') {
    return createUser(payload, token, context);
  }

  return apiRequest(`${getPath(entityKey)}/`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: payload,
  });
}

async function updateUser(userId, payload, token, context = {}) {
  const { currentUserId, isAdmin = false } = context;
  const { role, ...profileValues } = payload;
  let updatedUser = null;

  if (Number(userId) === Number(currentUserId)) {
    const profilePayload = Object.fromEntries(
      Object.entries(profileValues).filter(([, value]) => value !== undefined)
    );

    if (Object.keys(profilePayload).length) {
      updatedUser = await apiRequest('/users/me', {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: profilePayload,
      });
    }
  }

  if (isAdmin && role) {
    updatedUser = await apiRequest(`/users/${userId}/role`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: { role },
    });
  }

  if (updatedUser) {
    return updatedUser;
  }

  return apiRequest(`/users/${userId}`, {
    headers: getAuthHeaders(token),
  });
}

export function updateAdminEntity(
  entityKey,
  entityId,
  payload,
  token,
  context = {}
) {
  if (entityKey === 'usuarios') {
    return updateUser(entityId, payload, token, context);
  }

  return apiRequest(`${getPath(entityKey)}/${entityId}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: payload,
  });
}

export function deleteAdminEntity(entityKey, entityId, token) {
  return apiRequest(`${getPath(entityKey)}/${entityId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });
}
