import { Restaurant, RestaurantMenu } from "@/app/types/type";

export function getRestaurantsForMenu(
  menuId: string,
  restaurants: Restaurant[],
  restaurantMenus: RestaurantMenu[]
): Restaurant[] {
  // Step 1: find restaurantIds offering this menu
  const restaurantIds = restaurantMenus
    .filter(
      (rm) => rm.menuId === menuId && rm.isAvailable
    )
    .map((rm) => rm.restaurantId);

  // Step 2: return matching restaurants
  return restaurants.filter((r) =>
    restaurantIds.includes(r.id)
  );
}
