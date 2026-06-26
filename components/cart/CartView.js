import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';

export default function CartView() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  return (
    <>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        ))}
      </ul>
      <CartSummary onClear={clearCart} total={total} />
    </>
  );
}
