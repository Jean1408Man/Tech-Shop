import { useMemo, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';
import { createOrder } from '../../services/orderService';
import CheckoutForm from './CheckoutForm';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';
import OrderConfirmation from './OrderConfirmation';

function getCartItemKey(item) {
  return item.cartKey || `${item.type || 'product'}:${item.id}`;
}

function getErrorMessage(error) {
  return error?.message || 'No pudimos crear el pedido.';
}

function buildOrderPayload(cartItems, customerValues) {
  const productos = cartItems
    .filter((item) => item.type !== 'combo')
    .map((item) => ({
      producto_id: Number(item.id),
      cantidad: Number(item.quantity),
    }));

  const combos = cartItems
    .filter((item) => item.type === 'combo')
    .map((item) => ({
      combo_id: Number(item.id),
      cantidad: Number(item.quantity),
    }));

  return {
    ...customerValues,
    productos,
    combos,
  };
}

export default function CartView() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [createdOrder, setCreatedOrder] = useState(null);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const defaultCustomerName = useMemo(
    () => user?.full_name || user?.name || user?.email || '',
    [user]
  );

  const handleOpenCheckout = () => {
    setCheckoutError('');
    setIsCheckoutOpen(true);
  };

  const handleCreateOrder = async (customerValues) => {
    setIsSubmitting(true);
    setCheckoutError('');

    try {
      const order = await createOrder(buildOrderPayload(cartItems, customerValues));

      setCreatedOrder(order);
      setIsCheckoutOpen(false);
      clearCart();
    } catch (error) {
      setCheckoutError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (createdOrder) {
    return <OrderConfirmation order={createdOrder} />;
  }

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  return (
    <>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={getCartItemKey(item)}
            item={item}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        ))}
      </ul>
      <CartSummary
        onCheckout={handleOpenCheckout}
        onClear={clearCart}
        total={total}
      />
      {isCheckoutOpen && (
        <CheckoutForm
          defaultName={defaultCustomerName}
          error={checkoutError}
          isSubmitting={isSubmitting}
          onCancel={() => setIsCheckoutOpen(false)}
          onSubmit={handleCreateOrder}
        />
      )}
    </>
  );
}
