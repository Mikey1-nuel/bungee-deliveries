import { Order, OrderItem, Menu, MenuWithOrderCount, RestaurantMenu } from "../app/types/type";

export function getTopOrderedMenus(
  orders: Order[],
  orderItems: OrderItem[],
  menus: Menu[],
  restaurantMenus: RestaurantMenu[],
  limit: number = 6
): MenuWithOrderCount[] {

  const paidOrders = orders.filter(o => o.status === "paid");
  const paidOrderIds = new Set(paidOrders.map(o => o.id));

  const menuCountMap: Record<string, number> = {};

  orderItems.forEach(item => {
    if (!paidOrderIds.has(item.orderId)) return;

    const menu = restaurantMenus.find(
      (rm) => rm.id === item.restaurantMenuId
    );

    if (!menu) return;

    const menuId = menu.menuId;

    menuCountMap[menuId] =
      (menuCountMap[menuId] || 0) + item.quantity;
  });

  return menus
    .map(menu => ({
      ...menu,
      orderCount: menuCountMap[menu.id] || 0,
    }))
    .filter(menu => menu.orderCount > 0)
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, limit);
}
