import { Order, Restaurant, RestaurantWithOrderCount } from "@/app/types/type";

export function attachOrderCountToRestaurants(
  restaurants: Restaurant[],
  orders: Order[]
): RestaurantWithOrderCount[] {
  const countMap: Record<number, number> = {};

  orders.forEach(order => {
    if (order.status !== "paid") return;
    countMap[order.restaurantId] =
      (countMap[order.restaurantId] || 0) + 1;
  });

  return restaurants.map(r => ({
    ...r,
    orderCount: countMap[r.id] || 0,
  }));
}
