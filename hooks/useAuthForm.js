import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from './useAuth';

const LOGIN_FIELDS = [
  {
    name: 'email',
    label: 'Correo electronico',
    type: 'email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: 'Contrasena',
    type: 'password',
    autoComplete: 'current-password',
  },
];

const REGISTER_FIELDS = [
  {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    autoComplete: 'name',
  },
  {
    name: 'email',
    label: 'Correo electronico',
    type: 'email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: 'Contrasena',
    type: 'password',
    autoComplete: 'new-password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirmar contrasena',
    type: 'password',
    autoComplete: 'new-password',
  },
];

const INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getRedirectPath(next) {
  if (typeof next === 'string' && next.startsWith('/') && !next.startsWith('//')) {
    return next;
  }

  return '/';
}

function validate(values, isRegister) {
  const nextErrors = {};

  if (isRegister && values.name.trim().length < 2) {
    nextErrors.name = 'Escribe tu nombre.';
  }

  if (!isValidEmail(values.email)) {
    nextErrors.email = 'Escribe un correo valido.';
  }

  if (values.password.length < 6) {
    nextErrors.password = 'La contrasena debe tener al menos 6 caracteres.';
  }

  if (isRegister && values.confirmPassword !== values.password) {
    nextErrors.confirmPassword = 'Las contrasenas no coinciden.';
  }

  return nextErrors;
}

export function useAuthForm(mode) {
  const router = useRouter();
  const { login, register, isAuthenticated, isHydrated } = useAuth();
  const isRegister = mode === 'register';
  const fields = useMemo(() => (isRegister ? REGISTER_FIELDS : LOGIN_FIELDS), [isRegister]);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = getRedirectPath(router.query.next);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isHydrated, redirectTo, router]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }));
    setAuthError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values, isRegister);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setAuthError('');

    try {
      if (isRegister) {
        await register({
          full_name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
        });
      } else {
        await login({
          email: values.email.trim(),
          password: values.password,
        });
      }

      router.push(redirectTo);
    } catch (error) {
      setAuthError(error.message || 'No pudimos completar la operacion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    fields,
    authError,
    isRegister,
    isSubmitting,
    shouldHideForm: isHydrated && isAuthenticated,
    handleChange,
    handleSubmit,
  };
}
