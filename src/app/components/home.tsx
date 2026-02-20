"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Meal } from "../types/type";
import {
  meals,
  restaurants,
  restaurantMeals,
  mockOrders,
  mockOrderItems,
} from "@/data/restaurantsEtMeals";

import { getTopOrderedMeals } from "@/lib/mostOrderedMeals";
import { getMostOrderedRestaurants } from "@/lib/mostOrderedRestaurants";
import { getRestaurantsByCategory } from "@/lib/getRestaurantsByCategory";
import { useCategoryMeals } from "../hooks/useCategoryMeals";

import MealCard from "./mealCard";
import MealDetailsModal from "./mealDetailsModal";
import RestaurantCard from "./restaurantCard";
import { attachOrderCountToRestaurants } from "@/lib/restaurantOrderUtils";

export const categories = [
  { id: 1, name: "Main Meals", icon: "/restaurant.png" },
  { id: 2, name: "Soups & Swallows", icon: "/hot-soup.png" },
  { id: 3, name: "Grills & Sides", icon: "/chicken.png" },
  { id: 4, name: "Snacks & Pastries", icon: "/nachos.png" },
  { id: 5, name: "Desserts", icon: "/dessert.png" },
  { id: 6, name: "Drinks & Beverages", icon: "/lemonade.png" },
];

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

const Home = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);

  const { data: categoryMeals, loading } = useCategoryMeals(activeCategoryId);

  const topMeals = getTopOrderedMeals(mockOrders, mockOrderItems, meals);

  const topRestaurants = getMostOrderedRestaurants(mockOrders, restaurants);
  console.log("getMostOrderedRestaurants:", getMostOrderedRestaurants);

  const filteredRestaurantsRaw = getRestaurantsByCategory(
    activeCategoryId!,
    meals,
    restaurants,
    restaurantMeals,
  );

  const filteredRestaurants = attachOrderCountToRestaurants(
    filteredRestaurantsRaw,
    mockOrders,
  );

  return (
    <main className="h-screen bg-white">
      <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px] flex flex-col">
        {/* ================= CATEGORIES ================= */}
        <section className="flex justify-between items-center w-full">
          {categories.map((category) => {
            const isActive = activeCategoryId === category.id;

            return (
              <button
                key={category.id}
                onClick={() =>
                  setActiveCategoryId((prev) =>
                    prev === category.id ? null : category.id,
                  )
                }
                className={`flex flex-col items-center p-[10px] rounded-[20px_20px_0_0]
                ${isActive ? "bg-[#E95322]" : "bg-white"}`}
              >
                <div className="w-[70px] h-[70px] rounded-[20px] flex items-center justify-center bg-[#F3E9B5]">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={40}
                    height={40}
                  />
                </div>
                <p
                  className={`mt-2 text-sm font-medium ${
                    isActive ? "text-white" : "text-[#391713]"
                  }`}
                >
                  {category.name}
                </p>
              </button>
            );
          })}
        </section>

        {/* ================= CONTENT ================= */}
        <AnimatePresence mode="wait">
          {activeCategoryId === null ? (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* TOP MEALS */}
              <section className="mt-10">
                <h2 className="font-semibold mb-3">Top Ordered Meals</h2>
                <div className="grid grid-cols-4 gap-4">
                  {topMeals.map((meal) => (
                    <MealCard
                      key={meal.id}
                      meal={meal}
                      onClick={setActiveMeal}
                    />
                  ))}
                </div>
              </section>

              {/* TOP RESTAURANTS */}
              <section className="mt-10">
                <h2 className="font-semibold mb-3">Most Ordered Restaurants</h2>
                <div className="grid grid-cols-4 gap-4">
                  {topRestaurants.map((r) => (
                    <RestaurantCard key={r.id} restaurant={r} />
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="category"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-[#E95322] p-[15px] rounded-[0_0_20px_20px]"
            >
              {/* BACK BUTTON */}
              <button
                onClick={() => setActiveCategoryId(null)}
                className="text-white mb-4 underline"
              >
                ← Back to Home
              </button>

              <h2 className="text-white font-semibold mb-3">
                {categories.find((c) => c.id === activeCategoryId)?.name}
              </h2>

              {/* MEALS */}
              {loading ? (
                <p className="text-white">Loading meals...</p>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {categoryMeals.map((meal) => (
                    <MealCard
                      key={meal.id}
                      meal={meal}
                      onClick={setActiveMeal}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= MODAL ================= */}
        {activeMeal && (
          <MealDetailsModal
            meal={activeMeal}
            onClose={() => setActiveMeal(null)}
          />
        )}
      </div>
    </main>
  );
};

export default Home;
