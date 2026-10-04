// import { restaurantMenus } from "./restaurantMenus";
// /**
//  * Returns the price of a menu for a given restaurant.
//  * If no restaurant is provided, returns the cheapest available price.
//  */
// export function getMenuPrice(
//   menuId: string,
//   restaurantId?: string
// ): number | null {

//   // If restaurant is specified
//   if (restaurantId) {

//     const match = restaurantMenus.find(
//       menu =>
//         menu.menuId === menuId &&
//         menu.restaurantId === restaurantId &&
//         menu.isAvailable
//     );

//     return match?.basePrice ?? null;
//   }

//   // Otherwise find cheapest across all restaurants
//   const prices = restaurantMenus
//     .filter(menu =>
//       menu.menuId === menuId &&
//       menu.isAvailable
//     )
//     .map(menu => menu.basePrice);

//   return prices.length ? Math.min(...prices) : null;
// }
