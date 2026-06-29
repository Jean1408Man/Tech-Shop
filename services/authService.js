import { apiRequest } from './apiClient';

export function login(credentials) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: credentials,
  });
}

export function register(userData) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: userData,
  });
}
