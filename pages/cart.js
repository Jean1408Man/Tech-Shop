import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

/**
 * Shopping cart page. Lists all items in the cart with controls to
 * increment/decrement quantity or remove items altogether. Shows a
 * calculated total and provides buttons to clear the cart or proceed
 * to a (stub) checkout. The checkout button does not implement
 * payment; it simply demonstrates call‑to‑action placement.
 */
export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Tu carrito</h1>
      {cartItems.length === 0 ? (
        <div>
          <p>Tu carrito está vacío.</p>
          <Link href="/" legacyBehavior>
            <a className="text-primary hover:underline">Seguir comprando</a>
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center bg-white p-4 rounded shadow"
              >
                <div className="relative h-24 w-24 flex-shrink-0 mb-4 sm:mb-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="sm:ml-4 flex-1">
                  <h2 className="font-semibold text-sm md:text-base">
                    {item.name}
                  </h2>
                  <p className="text-primary font-bold mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 text-sm hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <p className="text-xl font-bold">
              Total: <span className="text-primary">${total.toFixed(2)}</span>
            </p>
            <div className="space-x-2">
              <button
                onClick={clearCart}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
              >
                Vaciar carrito
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
                onClick={() => alert('Implementa tu lógica de compra aquí.')}
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}