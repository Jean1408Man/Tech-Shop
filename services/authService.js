import { apiRequest } from './apiClient';

function normalizeUser(user) {
  if (!user || typeof user !== 'object') {
    return user;
  }

  return {
    ...user,
    name: user.name || user.full_name || user.email,
  };
}

function getLoginBody({ email, password }) {
  const body = new URLSearchParams();

  body.set('username', email);
  body.set('password', password);

  return body;
}

export function login(credentials) {
  return apiRequest('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: getLoginBody(credentials),
  });
}

export async function register(userData) {
  const payload = {
    email: userData.email,
    password: userData.password,
    full_name: userData.full_name || userData.name,
    is_active: userData.is_active ?? true,
  };

  const user = await apiRequest('/auth/register', {
    method: 'POST',
    body: payload,
  });

  return normalizeUser(user);
}

export async function getCurrentUser(token) {
  const user = await apiRequest('/users/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return normalizeUser(user);
}
