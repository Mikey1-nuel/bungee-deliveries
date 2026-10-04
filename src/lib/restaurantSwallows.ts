import { restaurantMenus } from "./restaurantMenus";
import { RestaurantSwallowPrice } from "@/types";

const SWALLOWS = ["sw-1", "sw-2", "sw-3", "sw-4", "sw-5", "sw-6"];

export const restaurantSwallows: RestaurantSwallowPrice[] =
  restaurantMenus
    .filter((rm) => {
      const num = Number(rm.menuId.split("-")[1]);
      return num >= 14 && num <= 22; // soups only
    })
    .flatMap((rm) => {
      return SWALLOWS.slice(0, 3).map((swallowId, i) => ({
        restaurantMenuId: rm.id,
        swallowId,
        price: 300 + i * 100,
      }));
    });
    