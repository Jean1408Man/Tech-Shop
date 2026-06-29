const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL no esta configurada.');
  }

  return API_BASE_URL.replace(/\/$/, '');
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

  return payload.message || payload.error || payload.detail || null;
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const isFormData = options.body instanceof FormData;

  if (options.body && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers,
    body: isFormData ? options.body : JSON.stringify(options.body),
  });
  const payload = parseResponseBody(await response.text());

  if (!response.ok) {
    throw new Error(getErrorMessage(payload) || `La solicitud fallo (${response.status}).`);
  }

  return payload;
}
