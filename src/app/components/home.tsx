"use client";

import { useState } from "react";

import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";

import { useQuery } from "@apollo/client/react";

import {
  GetCategoriesResponse,
  GetFeaturedMenusResponse,
  GetRestaurantsResponse,
  GetRestaurantMenusResponse,
  MenuResult,
} from "../types/type";

import { GET_CATEGORIES } from "@/graphql/queries/category.queries";

import { GET_FEATURED_MENUS } from "@/graphql/queries/menu.queries";

import { GET_RESTAURANTS } from "@/graphql/queries/restaurant.queries";

import { useCategoryMenus } from "../hooks/useCategoryMenus";

import MenuCard from "./menuCard";

import MenuDetailsModal from "./menuDetailsModal";

import RestaurantCard from "./restaurantCard";

import { useAuth } from "@/context/authContext";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 15,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: -15,
  },
};

const Home = () => {
  const { user } = useAuth();

  //
  // STATES
  //

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const [activeMenu, setActiveMenu] = useState<MenuResult | null>(null);

  //
  // CATEGORIES
  //

  const { data: categoriesData, loading: categoriesLoading } =
    useQuery<GetCategoriesResponse>(GET_CATEGORIES);

  const categories = categoriesData?.categories || [];

  //
  // FEATURED MENUS
  //

  const { data: featuredMenusData, loading: featuredMenusLoading } =
    useQuery<GetFeaturedMenusResponse>(GET_FEATURED_MENUS);

  const featuredMenus = featuredMenusData?.featuredMenus || [];

  //
  // RESTAURANTS
  //

  const { data: restaurantsData, loading: restaurantsLoading } =
    useQuery<GetRestaurantsResponse>(GET_RESTAURANTS);

  const restaurants = restaurantsData?.getRestaurants || [];

  //
  // CATEGORY MENUS
  //

  const { data: categoryMenus, loading: categoryMenusLoading } =
    useCategoryMenus(activeCategoryId);

  //
  // ACTIVE CATEGORY
  //

  const activeCategory = categories.find(
    (category) => category.id === activeCategoryId,
  );

  return (
    <main className="h-screen bg-white overflow-y-auto">
      <div
        className="
          bg-white
          rounded-[30px_30px_0_0]
          p-[35px_45px]
          flex
          flex-col
        "
      >
        {/* ================= CATEGORIES ================= */}

        <section
          className="
            grid
            grid-cols-5
            items-center
            gap-4
            overflow-x-auto
            scrollbar-hide
            pb-2
          "
        >
          {categoriesLoading ? (
            <p>Loading categories...</p>
          ) : (
            categories.map((category) => {
              const isActive = activeCategoryId === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() =>
                    setActiveCategoryId((prev) =>
                      prev === category.id ? null : category.id,
                    )
                  }
                  className={`
                      min-w-[110px]
                      flex
                      flex-col
                      items-center
                      p-[10px]
                      rounded-[20px_20px_0_0]
                      transition-all
                      duration-300
                      ${isActive ? "bg-[#E95322]" : "bg-white"}
                    `}
                >
                  <div
                    className="
                        w-[70px]
                        h-[70px]
                        rounded-[20px]
                        flex
                        items-center
                        justify-center
                        bg-[#F3E9B5]
                      "
                  >
                    <Image
                      src={category.icon || "/placeholder.png"}
                      alt={category.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>

                  <p
                    className={`
                        mt-2
                        text-sm
                        font-medium
                        ${isActive ? "text-white" : "text-[#391713]"}
                      `}
                  >
                    {category.name}
                  </p>
                </button>
              );
            })
          )}
        </section>

        {/* ================= CONTENT ================= */}

        <AnimatePresence mode="wait">
          {!activeCategoryId ? (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* ================= FEATURED MENUS ================= */}

              <section className="mt-10">
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-4
                  "
                >
                  <h2 className="font-semibold text-lg">Featured Menus</h2>
                </div>

                {featuredMenusLoading ? (
                  <p>Loading menus...</p>
                ) : featuredMenus.length === 0 ? (
                  <p>No featured menus available.</p>
                ) : (
                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      lg:grid-cols-3
                      xl:grid-cols-4
                      gap-5
                    "
                  >
                    {featuredMenus.map((item, index) => (
                      <MenuCard
                        key={"featured-" + index}
                        data={item}
                        role={user?.role}
                        onClick={setActiveMenu}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* ================= RESTAURANTS ================= */}

              <section className="mt-12">
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-4
                  "
                >
                  <h2 className="font-semibold text-lg">Restaurants</h2>
                </div>

                {restaurantsLoading ? (
                  <p>Loading restaurants...</p>
                ) : restaurants.length === 0 ? (
                  <p>No restaurants available.</p>
                ) : (
                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      lg:grid-cols-3
                      xl:grid-cols-4
                      gap-5
                    "
                  >
                    {restaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                      />
                    ))}
                  </div>
                )}
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="category"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="
                bg-[#E95322]
                mt-8
                p-[20px]
                rounded-[0_0_20px_20px]
              "
            >
              {/* ================= BACK BUTTON ================= */}

              <button
                onClick={() => setActiveCategoryId(null)}
                className="
                  text-white
                  mb-5
                  text-sm
                  underline
                "
              >
                ← Back to Home
              </button>

              {/* ================= TITLE ================= */}

              <h2
                className="
                  text-white
                  font-semibold
                  text-xl
                  mb-5
                "
              >
                {activeCategory?.name}
              </h2>

              {/* ================= CATEGORY MENUS ================= */}

              {categoryMenusLoading ? (
                <p className="text-white">Loading menus...</p>
              ) : categoryMenus.length === 0 ? (
                <p className="text-white">No menus found in this category.</p>
              ) : (
                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    gap-5
                  "
                >
                  {categoryMenus.map((item, index) => (
                    <MenuCard
                      key={"category-" + index}
                      data={item}
                      role={user?.role}
                      onClick={setActiveMenu}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= MODAL ================= */}

        {activeMenu && (
          <MenuDetailsModal
            menu={activeMenu}
            onClose={() => setActiveMenu(null)}
          />
        )}
      </div>
    </main>
  );
};

export default Home;
