import { restaurantMenus } from "./restaurantMenus";
import { RestaurantExtraPrice } from "@/app/types/type";

let id = 1;

function pickExtrasForMenu(menuId: string) {
  // Smart mapping (this is the key improvement)
  if (menuId.startsWith("menu-1") || menuId <= "menu-13") {
    return ["ext-1", "ext-2", "ext-4"]; // rice/meat/plantain
  }

  if (menuId >= "menu-23" && menuId <= "menu-39") {
    return ["ext-25", "ext-27"]; // grill extras
  }

  if (menuId >= "menu-40" && menuId <= "menu-49") {
    return ["ext-29"]; // snacks → fries
  }

  if (menuId >= "menu-50" && menuId <= "menu-53") {
    return ["ext-42", "ext-43", "ext-44"]; // desserts
  }

  if (menuId >= "menu-54") {
    return ["ext-62", "ext-63", "ext-64"]; // drink sizes
  }

  return ["ext-1"]; // fallback
}

export const restaurantExtras: RestaurantExtraPrice[] =
  restaurantMenus.flatMap((rm) => {
    const extras = pickExtrasForMenu(rm.menuId);

    return extras.map((extraId) => ({
      restaurantMenuId: rm.id,
      extraId,
      price: Math.floor(Math.random() * 1000) + 200,
    }));
  });
  