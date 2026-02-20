import { Order, OrderItem, Meal, MealWithOrderCount } from "../app/types/type";

export function getTopOrderedMeals(
  orders: Order[],
  orderItems: OrderItem[],
  meals: Meal[],
  limit: number = 6
): MealWithOrderCount[] {
  const paidOrders = orders.filter(o => o.status === "paid");
  const paidOrderIds = new Set(paidOrders.map(o => o.id));

  const mealCountMap: Record<number, number> = {};

  orderItems.forEach(item => {
    if (!paidOrderIds.has(item.orderId)) return;
    mealCountMap[item.mealId] =
      (mealCountMap[item.mealId] || 0) + item.quantity;
  });

  return meals
    .map(meal => ({
      ...meal,
      orderCount: mealCountMap[meal.id] || 0,
    }))
    .filter(meal => meal.orderCount > 0)
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, limit);
}
