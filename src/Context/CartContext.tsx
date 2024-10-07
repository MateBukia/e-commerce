import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ImageSet } from '../Interfaces/types';

interface CartItem {
  id: number;
  name: string;
  productcount: number;
  price: number;
  quantity: number;
  image: ImageSet;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: CartItem) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity, productcount: item.quantity + product.quantity } : item
        );
      }
      return [...prevCart, product];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const incrementQuantity = (id: number) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1, productcount: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id: number) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1, productcount: item.quantity - 1 } : item
    ));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
