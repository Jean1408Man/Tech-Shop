import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem.jsx";
import CartSummary from "./CartSummary.jsx";
import EmptyCart from "./EmptyCart.jsx";

export default function CartView() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        ))}
      </div>
      <div className="lg:col-span-1">
        <CartSummary onClear={clearCart} subtotal={total} />
      </div>
    </div>
  );
}
