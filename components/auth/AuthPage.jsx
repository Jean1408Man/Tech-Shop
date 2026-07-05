import Link from 'next/link';
import { useAuthForm } from '../../hooks/useAuthForm';

const COPY = {
  login: {
    title: 'Iniciar sesion',
    subtitle: 'Entra para continuar comprando y guardar tu progreso.',
    submitLabel: 'Entrar',
    loadingLabel: 'Entrando...',
    switchText: 'No tienes cuenta?',
    switchHref: '/register',
    switchLabel: 'Crear cuenta',
  },
  register: {
    title: 'Crear cuenta',
    subtitle: 'Registrate y empieza a comprar en segundos.',
    submitLabel: 'Crear cuenta',
    loadingLabel: 'Creando cuenta...',
    switchText: 'Ya tienes cuenta?',
    switchHref: '/login',
    switchLabel: 'Iniciar sesion',
  },
};

export default function AuthPage({ mode }) {
  const copy = COPY[mode] || COPY.login;
  const {
    values,
    errors,
    fields,
    authError,
    isSubmitting,
    shouldHideForm,
    handleChange,
    handleSubmit,
  } = useAuthForm(mode);

  if (shouldHideForm) {
    return null;
  }

  return (
    <section className="py-8 sm:py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md rounded-lg bg-white p-5 sm:p-6 shadow md:p-8">
          <div className="mb-5 sm:mb-6 text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{copy.title}</h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-600">{copy.subtitle}</p>
          </div>

          {authError && (
            <div className="mb-3 sm:mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-700">
              {authError}
            </div>
          )}

          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit} noValidate>
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  className="mb-1 block text-xs sm:text-sm font-semibold text-gray-700"
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={values[field.name]}
                  onChange={handleChange}
                  autoComplete={field.autoComplete}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-primary focus:outline-none text-sm sm:text-base"
                />
                {errors[field.name] && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600" id={`${field.name}-error`}>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-primary px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-400 text-sm sm:text-base"
            >
              {isSubmitting ? copy.loadingLabel : copy.submitLabel}
            </button>
          </form>

          <p className="mt-4 sm:mt-5 text-center text-xs sm:text-sm text-gray-600">
            {copy.switchText}{' '}
            <Link href={copy.switchHref} legacyBehavior>
              <a className="font-semibold text-primary hover:underline">{copy.switchLabel}</a>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
