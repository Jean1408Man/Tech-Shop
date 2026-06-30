import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import {
  getCurrentUser,
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
    const parsedSession = storedSession ? JSON.parse(storedSession) : EMPTY_SESSION;

    return parsedSession?.token
      ? {
          ...EMPTY_SESSION,
          ...parsedSession,
          isAuthenticated: true,
        }
      : EMPTY_SESSION;
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

function getAccessToken(payload) {
  return payload?.access_token || payload?.accessToken || payload?.token || null;
}

function buildSession(token, user) {
  return {
    token,
    user,
    isAuthenticated: Boolean(token),
  };
}

function getFallbackUser(values) {
  const fullName = values.full_name || values.name;

  return {
    email: values.email,
    full_name: fullName || values.email,
    name: fullName || values.email,
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(EMPTY_SESSION);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setSession(readStoredSession());
    setIsHydrated(true);
  }, []);

  const createSessionFromLogin = useCallback(async (values) => {
    const payload = await loginRequest(values);
    const token = getAccessToken(payload);

    if (!token) {
      throw new Error('El backend no devolvio access_token.');
    }

    let user = getFallbackUser(values);

    try {
      user = await getCurrentUser(token);
    } catch {
      user = getFallbackUser(values);
    }

    const nextSession = buildSession(token, user);

    setSession(nextSession);
    saveSession(nextSession);

    return {
      ...payload,
      user,
    };
  }, []);

  const login = useCallback(
    (values) => createSessionFromLogin(values),
    [createSessionFromLogin]
  );

  const register = useCallback(async (values) => {
    const createdUser = await registerRequest(values);
    const payload = await createSessionFromLogin(values);

    return {
      ...payload,
      createdUser,
    };
  }, [createSessionFromLogin]);

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
