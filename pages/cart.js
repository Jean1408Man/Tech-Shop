import CartView from "../components/cart/CartView.jsx";
import TitleTab from "../components/ui/TitleTab.jsx";
import Breadcrumb from "../components/ui/Breadcrumb.jsx";

export default function CartPage() {
  return (
    <div className="max-w-[1856px] mx-auto py-6 sm:py-8 px-4 border-t-2 border-primary-dark">
      <TitleTab>Tu carrito</TitleTab>
      <Breadcrumb items={[{ label: "Carrito" }]} />
      <CartView />
    </div>
  );
}
