import { createContext, useContext, useState } from 'react';

/**
 * A context to manage the shopping cart state across the application.
 * Components can call useCart() to get access to the cart items and
 * manipulation functions such as addToCart, removeFromCart and
 * updateQuantity. The CartProvider should wrap the application
 * (see pages/_app.js).
 */
const CartContext = createContext({});

function getCartItemKey(item) {
  return item.cartKey || `${item.type || 'product'}:${item.id}`;
}

export function CartProvider({ children }) {
  // cartItems is an array of objects { id, cartKey, name, price, image, quantity }
  const [cartItems, setCartItems] = useState([]);

  /**
   * Add an item to the cart. If the item already exists in the
   * cart, its quantity is incremented by the provided amount.
   * @param {Object} product - The product or combo to add to the cart.
   * @param {number} quantity - How many of this item to add (default 1).
   */
  const addToCart = (itemToAdd, quantity = 1) => {
    setCartItems((prevItems) => {
      const cartKey = getCartItemKey(itemToAdd);
      const existing = prevItems.find((item) => getCartItemKey(item) === cartKey);

      if (existing) {
        return prevItems.map((item) =>
          getCartItemKey(item) === cartKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...itemToAdd, cartKey, quantity }];
    });
  };

  /**
   * Remove an item entirely from the cart.
   * @param {number|string} itemKey - The cart key of the item to remove.
   */
  const removeFromCart = (itemKey) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => getCartItemKey(item) !== itemKey)
    );
  };

  /**
   * Update the quantity of a given item. A quantity of zero will
   * remove the item from the cart.
   * @param {number|string} itemKey - The cart key of the item.
   * @param {number} quantity - The new quantity for the item.
   */
  const updateQuantity = (itemKey, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => getCartItemKey(item) !== itemKey);
      }

      return prevItems.map((item) =>
        getCartItemKey(item) === itemKey ? { ...item, quantity } : item
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
