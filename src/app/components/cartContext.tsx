"use client";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { CartItem } from "../store/cartStore";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

 useEffect(() => { 
    const stored = localStorage.getItem("cartItems"); 
    if (stored) { setItems(JSON.parse(stored)); } }, []); 
    
    // Save cart to localStorage whenever items change 
    useEffect(() => { 
        localStorage.setItem("cartItems", JSON.stringify(items));
     }, [items]); 

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);

      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                totalPrice:
                  (i.quantity + item.quantity) *
                  (i.basePrice + i.extrasTotal),
              }
            : i
        );
      }

      return [...prev, item];
    });
  };

  const removeItem = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id));

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
