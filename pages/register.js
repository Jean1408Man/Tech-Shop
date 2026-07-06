import AuthPage from "../components/auth/AuthPage.jsx";
import SEO from "../components/seo/SEO.jsx";

export default function RegisterPage() {
  return (
    <>
      <SEO
        title="Crear cuenta"
        description="Crea una cuenta en Tech Shop para acceder a ofertas exclusivas, realizar compras y seguir tus pedidos."
        keywords="registro, crear cuenta, nueva cuenta, tech shop, usuario"
        type="website"
      />
      <AuthPage mode="register" />
    </>
  );
}
