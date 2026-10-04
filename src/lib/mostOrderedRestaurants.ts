import { Order, Restaurant, RestaurantWithOrderCount } from "../app/types/type";
import { attachOrderCountToRestaurants } from "@/lib/restaurantOrderUtils";

export function getMostOrderedRestaurants(
  orders: Order[],
  restaurants: Restaurant[],
  limit: number = 6
): RestaurantWithOrderCount[] {
  return attachOrderCountToRestaurants(restaurants, orders)
  .filter(r => r.orderCount > 0)
  .sort((a, b) => b.orderCount - a.orderCount)
  .slice(0, limit);
}

