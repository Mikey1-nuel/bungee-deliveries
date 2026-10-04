"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { useQuery } from "@apollo/client/react";

import MenuCard from "@/app/components/menuCard";

import MenuDetailsModal from "@/app/components/menuDetailsModal";

import {
  RestaurantMenu,
  GetRestaurantMenusByRestaurantResponse,
} from "@/app/types/type";

import { GET_RESTAURANT_MENUS_BY_RESTAURANT } from "@/graphql/queries/restaurant.queries";

export default function RestaurantPage() {
  const { id } = useParams<{
    id: string;
  }>();

  //
  // ACTIVE MENU
  //

  const [activeMenu, setActiveMenu] = useState<RestaurantMenu | null>(null);

  //
  // FETCH MENUS
  //

  const { data, loading, error } =
    useQuery<GetRestaurantMenusByRestaurantResponse>(
      GET_RESTAURANT_MENUS_BY_RESTAURANT,
      {
        variables: {
          restaurantId: id,
        },

        skip: !id,
      },
    );

  const restaurantMenus = data?.getRestaurantMenusByRestaurant || [];

  //
  // LOADING
  //

  if (loading) {
    return <main className="p-6">Loading restaurant menus...</main>;
  }

  //
  // ERROR
  //

  if (error) {
    return <main className="p-6">{error.message}</main>;
  }

  //
  // EMPTY
  //

  if (restaurantMenus.length === 0) {
    return <main className="p-6">No menus available</main>;
  }

  return (
    <>
      <main
        className="
          grid
          grid-cols-4
          gap-4
          bg-white
          rounded-[30px_30px_0_0]
          p-[35px_45px]
        "
      >
        {restaurantMenus.map((menu: RestaurantMenu) => (
          <MenuCard
            key={menu.id}
            data={menu}
            role="customer"
            onClick={(clickedMenu) =>
              setActiveMenu(clickedMenu as RestaurantMenu)
            }
          />
        ))}
      </main>

      {activeMenu && (
        <MenuDetailsModal
          menu={activeMenu}
          onClose={() => setActiveMenu(null)}
        />
      )}
    </>
  );
}
