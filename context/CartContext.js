import { createContext, useContext, useState } from 'react';

/**
 * A context to manage the shopping cart state across the application.
 * Components can call useCart() to get access to the cart items and
 * manipulation functions such as addToCart, removeFromCart and
 * updateQuantity. The CartProvider should wrap the application
 * (see pages/_app.js).
 */
const CartContext = createContext({});

export function CartProvider({ children }) {
  // cartItems is an array of objects { id, name, price, image, quantity }
  const [cartItems, setCartItems] = useState([]);

  /**
   * Add a product to the cart. If the product already exists in the
   * cart, its quantity is incremented by the provided amount.
   * @param {Object} product - The product to add to the cart.
   * @param {number} quantity - How many of this product to add (default 1).
   */
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  /**
   * Remove a product entirely from the cart.
   * @param {number|string} productId - The id of the product to remove.
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  /**
   * Update the quantity of a given product. A quantity of zero will
   * remove the item from the cart.
   * @param {number|string} productId - The id of the product.
   * @param {number} quantity - The new quantity for the product.
   */
  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  /**
   * Remove all items from the cart.
   */
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook to access the cart context. Throws an error if used
 * outside of a CartProvider.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}