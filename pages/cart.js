import CartView from "../components/cart/CartView";
import BackButton from "../components/navigation/BackButton";

export default function CartPage() {
  return (
    <div className="max-w-[1856px] mx-auto px-4 py-8">
      <BackButton fallbackHref="/" />
      <h1 className="text-3xl font-bold mb-4">Tu carrito</h1>
      <CartView />
    </div>
  );
}
