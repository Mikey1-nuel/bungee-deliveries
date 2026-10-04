import { restaurantMenus } from "./restaurantMenus";
import { menus } from "./restaurantsEtMenus";
import { swallows } from "./restaurantsEtMenus";
import { RestaurantSwallowPrice } from "@/app/types/type";

export const restaurantSwallowPrices: RestaurantSwallowPrice[] = [];

restaurantMenus.forEach(menu => {

  const menu = menus.find(m => m.id === menu.menuId);

  if (!menu) return;

  if (menu.categoryId === 2) {

    swallows.forEach(swallow => {

      restaurantSwallowPrices.push({
        restaurantMenuId: menu.id,
        swallowId: swallow.id,
        price: 400 + swallow.id * 200
      });

    });

  }

});