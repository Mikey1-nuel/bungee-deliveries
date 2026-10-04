import { menus, restaurants } from "./restaurantsEtMenus";
import { restaurantCategoryMap } from "@/lib/categoryExtras";
import { RestaurantMenu } from "@/app/types/type";

export const restaurantMenus: RestaurantMenu[] = [];

let idCounter = 1;

restaurants.forEach(restaurant => {
  const allowedCategories = restaurantCategoryMap[restaurant.id] || [];
  const availableMenus = menus.filter(m => allowedCategories.includes(m.categoryId));

  availableMenus.forEach(menu => {
    restaurantMenus.push({
      id: idCounter++,
      restaurantId: restaurant.id,
      menuId: menu.id,
      basePrice: Math.floor(Math.random() * 2500) + 500, // random price
      isAvailable: true
    });
  });
});