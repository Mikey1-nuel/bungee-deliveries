"use client";

import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import MenuCard from "@/app/components/menuCard";

import MenuDetailsModal from "@/app/components/menuDetailsModal";

import { GET_RESTAURANT_MENUS } from "@/graphql/queries/menu.queries";

import { MenuResult, GetRestaurantMenusResponse } from "@/app/types/type";

import { useAuth } from "@/context/authContext";

export default function MenusPage() {
  const { user } = useAuth();

  const [activeMenu, setActiveMenu] = useState<MenuResult | null>(null);

  //
  // FETCH MENUS
  //

  const { data, loading, error } =
    useQuery<GetRestaurantMenusResponse>(GET_RESTAURANT_MENUS);

  const menus = data?.getRestaurantMenus || [];

  console.log("FULL DATA:", data);
  console.log("MENUS:", menus);
  console.log("ERROR:", error);
  console.log("LOADING:", loading);

  return (
    <>
      <main
        className="
          bg-white rounded-t-3xl p-8 min-h-screen
        "
      >
        <h2
          className="
            font-semibold
            mb-5
          "
        >
          {user?.role === "customer"
            ? "Available Meals"
            : "My Restaurant Menus"}
        </h2>

        {loading && <p>Loading menus...</p>}

        {error && <p>Failed to load menus</p>}

        {!loading && !error && (
          <div
            className="
                grid
                grid-cols-4
                gap-5
              "
          >
            {menus.map((item, index) => {
              //
              // RESTAURANT OWNER MENU
              //

              if (item.__typename === "RestaurantMenu") {
                return (
                  <MenuCard
                    key={item.id}
                    data={item}
                    role={user?.role}
                    onClick={setActiveMenu}
                  />
                );
              }

              //
              // CUSTOMER GROUPED MENU
              //

              if (item.__typename === "GroupedMenu") {
                return (
                  <MenuCard
                    key={item.slug}
                    data={item}
                    role={user?.role}
                    onClick={setActiveMenu}
                  />
                );
              }

              return null;
            })}
          </div>
        )}
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
