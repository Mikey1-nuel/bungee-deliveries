// app/store/cartStore.ts

export interface CartItem {
  //
  // LOCAL CART ITEM ID
  //

  id: string;

  //
  // RESTAURANT MENU
  //

  restaurant_menu_id: string;

  //
  // RESTAURANT
  //

  restaurant_id: string;

  restaurant_name: string;

  //
  // MENU
  //

  menu_name: string;

  menu_type:
    | "meal"
    | "extra"
    | "swallow";

  menu_image?: string;

  //
  // PRICING
  //

  unit_price: number;

  quantity: number;

  total_price: number;
}

export interface CartState {
  items: CartItem[];
}
