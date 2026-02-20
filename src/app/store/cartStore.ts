import { SidesExtra } from "../types/type";

export interface CartItem {
  id: string; // unique (meal + restaurant + extras)
  mealId: number;
  mealName: string;

  restaurantId: number;
  restaurantName: string;

  quantity: number;

  basePrice: number;
  extras: SidesExtra[];
  extrasTotal: number;

  totalPrice: number; // frozen at add-to-cart time
  image?: string;
}

export interface CartState {
  items: CartItem[];
}
