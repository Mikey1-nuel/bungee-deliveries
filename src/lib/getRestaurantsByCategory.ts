import { Menu, Restaurant, RestaurantMenu } from "@/app/types/type";

export function getRestaurantsByCategory(
  categoryId: string,
  menus: Menu[],
  restaurants: Restaurant[],
  restaurantMenus: RestaurantMenu[]
) {
  // Get menus in this category
  const menuIds = menus
    .filter((m) => m.categoryId === categoryId)
    .map((m) => m.id);

  // Get restaurants that have those menus
  const restaurantIds = new Set(
    restaurantMenus
      .filter((rm) => menuIds.includes(rm.menuId))
      .map((rm) => rm.restaurantId)
  );

  return restaurants.filter((r) => restaurantIds.has(r.id));
}
