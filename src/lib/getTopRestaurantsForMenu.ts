// import { Restaurant, RestaurantMenu } from "@/app/types/type";
// import { getRestaurantsForMenu } from "./getRestaurantsForMenu";

// export function getTopRestaurantsForMenu(
//   menuId: string,
//   restaurants: Restaurant[],
//   restaurantMenus: RestaurantMenu[],
//   limit: number = 2
// ): Restaurant[] {
//   const availableRestaurants = getRestaurantsForMenu(
//     menuId,
//     restaurants,
//     restaurantMenus
//   );

//   return availableRestaurants
//     .sort((a, b) => b.rating - a.rating) // 🔥 ranking logic
//     .slice(0, limit);
// }
