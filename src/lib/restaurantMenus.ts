import { RestaurantMenu } from "@/app/types/type";

import { menus } from "@/data/restaurantsEtMenus";

const TARGET_RESTAURANTS = ["rest-2", "rest-7", "rest-24", "rest-26"];

let idCounter = 1;

export const restaurantMenus: RestaurantMenu[] = menus.flatMap((menu, index) => {
  // rotate restaurants to distribute evenly
  const r1 = TARGET_RESTAURANTS[index % 4];
  const r2 = TARGET_RESTAURANTS[(index + 1) % 4];

  return [
    {
      id: `rm-${idCounter++}`,
      restaurantId: r1,
      menuId: menu.id,
      basePrice: 1500 + (index % 5) * 500,
      isAvailable: true,
    },
    {
      id: `rm-${idCounter++}`,
      restaurantId: r2,
      menuId: menu.id,
      basePrice: 1700 + (index % 5) * 500,
      isAvailable: true,
    },
  ];
});
