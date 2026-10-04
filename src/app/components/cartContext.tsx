"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { CartItem } from "@/app/store/cartStore";
import { useAuth } from "@/context/authContext";

interface CartRestaurant {
  id: string;
  name: string;
  itemCount: number;
  subtotal: number;
}

interface CartContextType {
  cartItems: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: (restaurantMenuId: string) => void;

  clearCart: () => void;

  totalItems: number;

  totalAmount: number;

  /**
   * Kept for backwards compatibility.
   *
   * If the cart contains multiple restaurants,
   * this returns null.
   */
  restaurantId: string | null;

  /**
   * All restaurants represented in the cart.
   */
  restaurants: CartRestaurant[];

  /**
   * Number of different restaurants in the cart.
   */
  restaurantCount: number;

  /**
   * Get all items belonging to one restaurant.
   */
  getItemsByRestaurant: (restaurantId: string) => CartItem[];

  /**
   * Get subtotal for one restaurant.
   */
  getRestaurantSubtotal: (restaurantId: string) => number;

  /**
   * Remove every item belonging to a restaurant.
   */
  removeRestaurant: (restaurantId: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

//
// STORAGE KEY
//

const getCartKey = (userId?: string) => {
  return userId ? `cart:${userId}` : "cart:guest";
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  //
  // CURRENT USER CART KEY
  //

  const cartKey = getCartKey(user?.id);

  //
  // LOAD USER CART
  //

  useEffect(() => {
    //
    // WAIT UNTIL AUTH LOADS
    //

    if (!user) {
      setCartItems([]);

      return;
    }

    try {
      const stored = localStorage.getItem(cartKey);

      //
      // NO CART
      //

      if (!stored) {
        setCartItems([]);

        return;
      }

      const parsed = JSON.parse(stored);

      //
      // NORMALIZE OLD STRUCTURE
      //

      const normalized: CartItem[] = parsed.map((item: any) => ({
        id: item.id || crypto.randomUUID(),

        restaurant_menu_id: item.restaurant_menu_id || item.restaurantMenuId,

        restaurant_id: item.restaurant_id,

        restaurant_name: item.restaurant_name,

        menu_name: item.menu_name,

        menu_type: item.menu_type || "meal",

        menu_image: item.menu_image,

        unit_price: Number(item.unit_price || 0),

        quantity: Number(item.quantity || 1),

        total_price:
          Number(item.total_price) ||
          Number(item.unit_price || 0) * Number(item.quantity || 1),
      }));

      setCartItems(normalized);
    } catch (error) {
      console.error("Failed to load cart:", error);

      setCartItems([]);

      localStorage.removeItem(cartKey);
    }
  }, [cartKey, user]);

  //
  // SAVE USER CART
  //

  useEffect(() => {
    if (!user) return;

    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, cartKey, user]);

  //
  // ADD ITEM
  //

  const addItem = (item: CartItem) => {
    setCartItems((prev) => {
      //
      // CHECK EXISTING MENU ITEM
      //
      // restaurant_menu_id should uniquely identify
      // the menu offering at a restaurant.
      //

      const existing = prev.find(
        (cartItem) => cartItem.restaurant_menu_id === item.restaurant_menu_id,
      );

      //
      // UPDATE EXISTING ITEM
      //

      if (existing) {
        const newQuantity = existing.quantity + item.quantity;

        return prev.map((cartItem) => {
          if (cartItem.restaurant_menu_id !== item.restaurant_menu_id) {
            return cartItem;
          }

          return {
            ...cartItem,
            quantity: newQuantity,
            total_price: newQuantity * cartItem.unit_price,
          };
        });
      }

      //
      // ADD NEW ITEM
      //

      return [...prev, item];
    });
  };

  //
  // REMOVE ITEM
  //

  const removeItem = (restaurantMenuId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.restaurant_menu_id !== restaurantMenuId),
    );
  };

  //
  // REMOVE ENTIRE RESTAURANT
  //

  const removeRestaurant = (restaurantId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.restaurant_id !== restaurantId),
    );
  };

  //
  // CLEAR CART
  //

  const clearCart = () => {
    setCartItems([]);

    if (user) {
      localStorage.removeItem(cartKey);
    }
  };

  //
  // TOTAL ITEMS
  //

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  //
  // TOTAL AMOUNT
  //

  const totalAmount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.total_price, 0);
  }, [cartItems]);

  //
  // RESTAURANTS IN CART
  //

  const restaurants = useMemo<CartRestaurant[]>(() => {
    const map = new Map<string, CartRestaurant>();

    for (const item of cartItems) {
      const existing = map.get(item.restaurant_id);

      if (existing) {
        existing.itemCount += item.quantity;
        existing.subtotal += item.total_price;
      } else {
        map.set(item.restaurant_id, {
          id: item.restaurant_id,
          name: item.restaurant_name,
          itemCount: item.quantity,
          subtotal: item.total_price,
        });
      }
    }

    return Array.from(map.values());
  }, [cartItems]);

  //
  // RESTAURANT COUNT
  //

  const restaurantCount = restaurants.length;

  //
  // BACKWARD-COMPATIBLE RESTAURANT ID
  //
  // If there is only one restaurant, return it.
  // If multiple restaurants exist, return null.
  //

  const restaurantId = restaurantCount === 1 ? restaurants[0].id : null;

  //
  // GET ITEMS BY RESTAURANT
  //

  const getItemsByRestaurant = (restaurantId: string) => {
    return cartItems.filter((item) => item.restaurant_id === restaurantId);
  };

  //
  // GET RESTAURANT SUBTOTAL
  //

  const getRestaurantSubtotal = (restaurantId: string) => {
    return cartItems
      .filter((item) => item.restaurant_id === restaurantId)
      .reduce((total, item) => total + item.total_price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addItem,

        removeItem,

        clearCart,

        totalItems,

        totalAmount,

        restaurantId,

        restaurants,

        restaurantCount,

        getItemsByRestaurant,

        getRestaurantSubtotal,

        removeRestaurant,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
