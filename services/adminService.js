import { apiRequest } from './apiClient';

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
