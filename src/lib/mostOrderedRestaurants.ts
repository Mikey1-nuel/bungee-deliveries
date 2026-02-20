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

// import { Order, Restaurant, RestaurantWithOrderCount } from "../app/types/type";

// export function getMostOrderedRestaurants(
//   orders: Order[],
//   restaurants: Restaurant[],
//   limit: number = 6
// ): RestaurantWithOrderCount[] {
//   const restaurantCountMap: Record<number, number> = {};

//   orders.forEach(order => {
//     if (order.status !== "paid") return;
//     restaurantCountMap[order.restaurantId] =
//       (restaurantCountMap[order.restaurantId] || 0) + 1;
//   });

//   return restaurants
//     .map(r => ({
//       ...r,
//       orderCount: restaurantCountMap[r.id] || 0,
//     }))
//     .filter(r => r.orderCount > 0)
//     .sort((a, b) => b.orderCount - a.orderCount)
//     .slice(0, limit);
// }

