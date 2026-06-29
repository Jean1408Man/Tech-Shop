import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import {
  login as loginRequest,
  register as registerRequest,
} from '../services/authService';

export const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'temu-auth-session';
const EMPTY_SESSION = {
  token: null,
  user: null,
  isAuthenticated: false,
};

function readStoredSession() {
  if (typeof window === 'undefined') {
    return EMPTY_SESSION;
  }

  try {
    const storedSession = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return storedSession ? JSON.parse(storedSession) : EMPTY_SESSION;
  } catch {
    return EMPTY_SESSION;
  }
}

function saveSession(session) {
  if (typeof window === 'undefined') {
    return;
  }

  if (session.isAuthenticated) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

function unwrapPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return {};
  }

  if (payload.data && typeof payload.data === 'object') {
    return { ...payload, ...payload.data };
  }

  return payload;
}

function getFallbackUser(values) {
  if (!values?.email && !values?.name) {
    return null;
  }

  return {
    name: values.name || values.email,
    email: values.email,
  };
}

function buildSession(payload, values) {
  const data = unwrapPayload(payload);
  const token =
    data.token || data.accessToken || data.access_token || data.authToken || data.jwt || null;
  const user = data.user || data.customer || data.account || data.profile || getFallbackUser(values);

  return {
    token,
    user,
    isAuthenticated: Boolean(token || user),
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(EMPTY_SESSION);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setSession(readStoredSession());
    setIsHydrated(true);
  }, []);

  const authenticate = useCallback(async (request, values) => {
    const payload = await request(values);
    const nextSession = buildSession(payload, values);

    setSession(nextSession);
    saveSession(nextSession);

    return payload;
  }, []);

  const login = useCallback(
    (values) => authenticate(loginRequest, values),
    [authenticate]
  );

  const register = useCallback(
    (values) => authenticate(registerRequest, values),
    [authenticate]
  );

  const logout = useCallback(() => {
    setSession(EMPTY_SESSION);
    saveSession(EMPTY_SESSION);
  }, []);

  const value = useMemo(
    () => ({
      ...session,
      isHydrated,
      login,
      register,
      logout,
    }),
    [isHydrated, login, logout, register, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
