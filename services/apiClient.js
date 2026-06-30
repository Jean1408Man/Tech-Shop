const API_PREFIX = '/api/v1';
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || `http://localhost:8000${API_PREFIX}`;

function getApiBaseUrl() {
  const baseUrl = API_BASE_URL.replace(/\/$/, '');

  return baseUrl.endsWith(API_PREFIX) ? baseUrl : `${baseUrl}${API_PREFIX}`;
}

function parseResponseBody(body) {
  if (!body) {
    return null;
  }

  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}

function getErrorMessage(payload) {
  if (!payload) {
    return null;
  }

  if (typeof payload === 'string') {
    return payload;
  }

  if (Array.isArray(payload.detail)) {
    return payload.detail
      .map((error) => error.msg)
      .filter(Boolean)
      .join(' ');
  }

  return payload.message || payload.error || payload.detail || null;
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const hasBody = options.body !== undefined && options.body !== null;
  const isFormData = options.body instanceof FormData;
  const isUrlEncoded = options.body instanceof URLSearchParams;
  const shouldStringifyBody =
    hasBody && !isFormData && !isUrlEncoded && typeof options.body !== 'string';

  if (shouldStringifyBody && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers,
    body: shouldStringifyBody ? JSON.stringify(options.body) : options.body,
  });
  const payload = parseResponseBody(await response.text());

  if (!response.ok) {
    throw new Error(getErrorMessage(payload) || `La solicitud fallo (${response.status}).`);
  }

  return payload;
}
