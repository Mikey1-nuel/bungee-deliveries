import {
  menus,
} from "@/data/restaurantsEtMenus";

import {
  Menu,
  RestaurantMenu,
  RestaurantExtraPrice,
  RestaurantSwallowPrice,
  MenuForm
} from "@/app/types/type";

import { restaurantMenus } from "@/data/restaurantMenus";
import { restaurantExtraPrices } from "@/data/restaurantExtraPrices";

import { restaurantSwallowPrices } from "@/data/restaurantSwallowPrices";

export function createMenu(form: MenuForm) {

  /* -------- CREATE Menu -------- */

const newMenu: Menu = {
  id: crypto.randomUUID(), // ✅ correct
  name: form.name,
  categoryId: form.categoryId,
  description: form.description,
  image: form.image,
};

  menus.push(newMenu);

  /* -------- CREATE RESTAURANT MENU -------- */

  const newRestaurantMenu: RestaurantMenu = {
    id: crypto.randomUUID(),
    restaurantId: form.restaurantId,
    menuId: newMenu.id,
    basePrice: form.basePrice,
    isAvailable: true
  };

  restaurantMenus.push(newRestaurantMenu);

  /* -------- EXTRAS -------- */

  const extraPrices: RestaurantExtraPrice[] =
    form.extraPrices.map(extra => ({
      restaurantMenuId: newRestaurantMenu.id,
      extraId: extra.extraId,
      price: extra.price
    }));

  restaurantExtraPrices.push(...extraPrices);

  /* -------- SWALLOWS -------- */

  const swallowPrices: RestaurantSwallowPrice[] =
    form.swallowPrices.map(swallow => ({
      restaurantMenuId: newRestaurantMenu.id,
      swallowId: swallow.swallowId,
      price: swallow.price
    }));

  restaurantSwallowPrices.push(...swallowPrices);

  return {
    newMenu,
    newRestaurantMenu,
    extraPrices,
    swallowPrices
  };
}
