import AuthPage from "../components/auth/AuthPage.jsx";
import SEO from "../components/seo/SEO.jsx";

export default function LoginPage() {
  return (
    <>
      <SEO
        title="Iniciar sesión"
        description="Inicia sesión en Tech Shop para acceder a tu cuenta, ver tus pedidos y realizar compras."
        keywords="login, iniciar sesión, autenticación, cuenta, tech shop"
        type="website"
      />
      <AuthPage mode="login" />
    </>
  );
}
