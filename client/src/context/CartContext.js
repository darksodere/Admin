import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('otakuGhorCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('otakuGhorCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, options = {}) => {
    const { volume = 'Standard', printType = 'Regular', quantity = 1 } = options;
    
    // Create unique item ID based on product and options
    const itemId = `${product._id || product.id}_${volume}_${printType}`;
    
    setCart(prev => {
      const existingItem = prev.find(item => item.itemId === itemId);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prev.map(item =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prev, {
          itemId,
          productId: product._id || product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          volume,
          printType,
          quantity,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.itemId !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (productId, volume = 'Standard', printType = 'Regular') => {
    const itemId = `${productId}_${volume}_${printType}`;
    return cart.some(item => item.itemId === itemId);
  };

  const getCartItem = (productId, volume = 'Standard', printType = 'Regular') => {
    const itemId = `${productId}_${volume}_${printType}`;
    return cart.find(item => item.itemId === itemId);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
    getCartItem
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};