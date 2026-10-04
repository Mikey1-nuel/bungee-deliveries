import { restaurantMenus } from "./restaurantMenus";
import { menus } from "./restaurantsEtMenus";
import { categoryExtrasMap } from "@/lib/categoryExtras";
import { RestaurantExtraPrice } from "@/app/types/type";

export const restaurantExtraPrices: RestaurantExtraPrice[] = [];

restaurantMenus.forEach(menu => {

  const menu = menus.find(m => m.id === menu.menuId);

  if (!menu) return;

  const allowedExtras = categoryExtrasMap[menu.categoryId] ?? [];

  allowedExtras.forEach(extraId => {

    restaurantExtraPrices.push({
      restaurantMenuId: menu.id,
      extraId,
      price: Math.floor(Math.random() * 1500) + 200
    });

  });

});