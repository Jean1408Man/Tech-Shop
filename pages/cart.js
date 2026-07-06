import CartView from "../components/cart/CartView.jsx";
import TitleTab from "../components/ui/TitleTab.jsx";
import Breadcrumb from "../components/ui/Breadcrumb.jsx";
import SEO from "../components/seo/SEO.jsx";

export default function CartPage() {
  return (
    <>
      <SEO
        title="Carrito de compras"
        description="Revisa tu carrito de compras en Tech Shop. Finaliza tu pedido con los mejores productos de tecnología y electrónica."
        keywords="carrito, compra, checkout, tecnología, electrónica, tech shop"
        type="website"
      />
      <div className="max-w-[1856px] mx-auto py-6 sm:py-8 px-4 border-t-2 border-primary-dark">
        <TitleTab>Tu carrito</TitleTab>
        <Breadcrumb items={[{ label: "Carrito" }]} />
        <CartView />
      </div>
    </>
  );
}
