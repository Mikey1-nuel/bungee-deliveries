import { menus, restaurants } from "@/data/restaurantsEtMenus";
import { restaurantMenus } from "./restaurantMenus";
import { MenuWithPrice } from "@/app/types/type";

export function getMenusForRestaurant(
  restaurantId: number
): MenuWithPrice[] {

  console.log(
    "Restaurant:",
    restaurants.find(r => r.id === restaurantId)
  );

  return restaurantMenus
    .filter(
      rm =>
        rm.restaurantId === restaurantId &&
        rm.isAvailable
    )
    .map(rm => {

      const menu = menus.find(m => m.id === rm.menuId);

      if (!menu) return null;

      return {
        ...menu,
        price: rm.basePrice
      };

    })
    .filter(Boolean) as MenuWithPrice[];

}
